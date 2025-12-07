"use client";

import { useState, useEffect, useRef } from "react";
import SearchBar from "./components/SearchBar";
import CorretoraList from "./components/CorretoraList";
import mqtt from "mqtt";

interface Corretora {
  nome_comercial: string;
  municipio: string;
  cnpj: string;
}

export default function App() {
  const [corretoras, setCorretoras] = useState<Corretora[]>([]);
  const [filter, setFilter] = useState({ search: "", order: "nome" });
  const [total, setTotal] = useState<number>(0);
  const mqttClientRef = useRef<any>(null);

  useEffect(() => {
    fetch("http://localhost:1880/corretoras")
      .then(res => res.json())
      .then(data => {
        setCorretoras(data);
        setTotal(data.length);
      })
      .catch(err => console.error("Erro ao buscar corretoras via HTTP:", err));
  }, []);

  useEffect(() => {
    const client = mqttClientRef.current = mqtt.connect("wss://broker.hivemq.com:8884/mqtt", {
      protocolVersion: 4,
      clean: true,
      reconnectPeriod: 4000,
    });

    client.on("connect", () => {
      console.log("MQTT conectado ✔️");
      client.subscribe(["corretoras/contagem", "corretoras/lista"], err => {
        if (err) console.log("Erro ao subscrever tópicos:", err);
      });
    });

    client.on("message", (topic, message) => {
      try {
        const payload = JSON.parse(message.toString());
        console.log("MQTT RECEBIDO:", topic, payload);

        if (topic === "corretoras/contagem" && typeof payload.valor === "number") {
          setTotal(payload.valor);
        }

        if (topic === "corretoras/lista" && Array.isArray(payload)) {
          setCorretoras(payload);
          setTotal(payload.length);
        }
      } catch (err) {
        console.error("Erro ao processar payload MQTT:", err);
      }
    });

    client.on("error", (err) => console.log("Erro MQTT:", err));

    return () => {
      console.log("Encerrando conexão MQTT...");
      client.end(true);
    };
  }, []);

  return (
    <div
      style={{
        fontFamily: "'Poppins', sans-serif",
        background: "#f3f4f6",
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          maxWidth: "1200px",
          display: "flex",
          flexDirection: "column",
          background: "#fff",
          borderRadius: "12px",
          padding: "30px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          boxSizing: "border-box",
        }}
      >
        <h1
          style={{
            fontSize: "28px",
            marginBottom: "15px",
            color: "#111827",
            textAlign: "center",
          }}
        >
          Catálogo de Corretoras
        </h1>

        <div
          style={{
            textAlign: "center",
            marginBottom: "20px",
            fontWeight: 500,
            color: "#374151",
          }}
        >
          Total de registros: {total}
        </div>

        <SearchBar filter={filter} setFilter={setFilter} />

        <div style={{ flex: 1, overflowY: "auto" }}>
          <CorretoraList corretoras={corretoras} filter={filter} />
        </div>
      </div>
    </div>
  );
}
