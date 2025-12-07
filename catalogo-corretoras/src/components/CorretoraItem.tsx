interface Corretora {
  nome_comercial: string;
  municipio: string;
  cnpj: string;
}

interface Props {
  corretora: Corretora;
}

export default function CorretoraItem({ corretora }: Props) {
  return (
    <li style={{
      background: "white",
      padding: "18px 22px",
      marginBottom: "10px",
      borderRadius: "10px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.08)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }}>
      <div>
        <div style={{ fontWeight: 600, fontSize: "17px" }}>{corretora.nome_comercial}</div>
        <div style={{ fontSize: "14px", color: "#555" }}>{corretora.municipio}</div>
      </div>
      <div style={{ fontSize: "14px", color: "#888" }}>{corretora.cnpj}</div>
    </li>
  );
}
