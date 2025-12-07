# Broker-Catalog

Este projeto contém o flow do Node-RED para o Catálogo de Corretoras, incluindo o banco SQLite (opcional) e instruções para rodar.

---

## Requisitos

- Node.js >= 18.x
- Node-RED >= 3.x
- npm >= 9.x

---

## Como usar

1. **Clonar o repositório

```git clone https://github.com/PedroHTLemos/Broker-Catalog```
```cd Broker-Catalog```

3. Instalar npm
```npm install```

## Iniciando o Node-RED

•  Abra o terminal na pasta do projeto.
•  Execute:
```node-red```

3. Restaurar o Flow no Node-RED

• Abra o Node-RED no navegador.
• Vá em Menu → Import → Clipboard.
• Abra flows/flows.json e clique em Import.
• Clique em Deploy para ativar o flow.

4. Configurar o banco SQLite (opcional)

• O caminho padrão do banco é db/teste.db.
• Se necessário, ajuste o path no nó SQLite dentro do Node-RED.

## Contribuições

• Abra uma issue para discutir sugestões ou bugs.
• Crie uma branch separada para alterações e envie um Pull Request.

