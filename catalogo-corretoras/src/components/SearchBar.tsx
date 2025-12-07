import React from "react";

interface Filter {
  search: string;
  order: string;
}

interface Props {
  filter: Filter;
  setFilter: React.Dispatch<React.SetStateAction<Filter>>;
}

export default function SearchBar({ filter, setFilter }: Props) {
  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        marginBottom: "20px",
        width: "100%",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      <input
        type="text"
        placeholder="Buscar por nome ou cidade..."
        value={filter.search}
        onChange={(e) => setFilter((prev) => ({ ...prev, search: e.target.value }))}
        style={{
          flex: 1,
          minWidth: "200px",
          padding: "10px 15px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          fontSize: "15px",
          outline: "none",
        }}
      />
      <select
        value={filter.order}
        onChange={(e) => setFilter((prev) => ({ ...prev, order: e.target.value }))}
        style={{
          padding: "10px 15px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          fontSize: "15px",
          minWidth: "150px",
        }}
      >
        <option value="nome">Ordenar por Nome</option>
        <option value="cidade">Ordenar por Cidade</option>
      </select>
    </div>
  );
}
