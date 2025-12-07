interface Corretora {
  nome_comercial: string;
  municipio: string;
  cnpj: string;
}

interface Props {
  corretoras: Corretora[];
  filter: { search: string; order: string };
}

export default function CorretoraList({ corretoras, filter }: Props) {
  const searchTerm = filter.search.trim().toLowerCase();

  const sorted = [...corretoras].sort((a, b) => {
    const A = (filter.order === "cidade" ? a.municipio : a.nome_comercial || "").toLowerCase();
    const B = (filter.order === "cidade" ? b.municipio : b.nome_comercial || "").toLowerCase();
    return A.localeCompare(B, "pt", { sensitivity: "base" });
  });

  const filtered = sorted.filter((c) => {
    const nome = (c.nome_comercial || "").trim().toLowerCase();
    const cidade = (c.municipio || "").trim().toLowerCase();
    return nome.includes(searchTerm) || cidade.includes(searchTerm);
  });

  return (
    <ul style={{ padding: 0, listStyle: "none", margin: 0 }}>
      {filtered.length > 0 ? (
        filtered.map((c) => (
          <li
            key={c.cnpj}
            style={{
              marginBottom: "10px",
              padding: "15px 20px",
              background: "#fff",
              borderRadius: "8px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              color: "#111827",
            }}
          >
            <div>
              <div style={{ fontWeight: "600", fontSize: "16px" }}>{c.nome_comercial || "—"}</div>
              <div style={{ fontSize: "14px", color: "#555" }}>{c.municipio}</div>
            </div>
            <div style={{ fontSize: "14px", color: "#888" }}>{c.cnpj}</div>
          </li>
        ))
      ) : (
        <li
          style={{
            padding: "15px 20px",
            color: "#555",
            textAlign: "center",
          }}
        >
          Nenhum resultado encontrado
        </li>
      )}
    </ul>
  );
}
