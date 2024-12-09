# Ezy Mailer Flow

Ezy Mailer Flow é um projeto que utiliza o **[Temporal.io](https://temporal.io/)** para gerenciar o fluxo de envio de emails em lotes, garantindo confiabilidade e escalabilidade no processo.

Este projeto é capaz de:

- Receber o nome de uma template de email via rota.
- Consultar os emails de clientes armazenados.
- Gerenciar o envio dos emails em lotes, utilizando Temporal.io para orquestração.

---

## 🚀 **Tecnologias Utilizadas**

- [Nestjs](https://nestjs.com/)
- [Temporal.io](https://temporal.io/)
- [TypeScript](https://www.typescriptlang.org/)
- [Express.js](https://expressjs.com/)

---

## 📂 **Estrutura do Projeto**

```plaintext
📦ezy-mailer-flow/
├── 📂 src/
│   ├── 📂 workflows/      # Workflows gerenciados pelo Temporal
│   ├── 📂activities/      # Atividades que realizam operações externas (e.g., envio de email)
│   ├── 📂 routes/         # Definições de rotas da API
│   ├── 📂 services/       # Serviços para consulta de dados e lógica de negócio
│   ├── 📂 templates/      # Diretório contendo templates de email
│   └── index.ts           # Arquivo principal para inicialização do servidor
├── package.json           # Configurações do projeto e dependências
└── README.md              # Documentação do projeto
```

---

## 📌 **Funcionalidades**

### 1. Rota para Enviar Emails

- **Endpoint**: `POST /send`
- **Parâmetros**:
  - `templateName` (string): Nome do template de email a ser utilizado.
- **Descrição**: Consulta os emails dos clientes no banco de dados e dispara os emails utilizando workflows do Temporal.io.

### 2. Gestão de Fluxo com Temporal

- O Temporal.io gerencia as seguintes etapas:
  1. Consulta dos clientes no banco de dados.
  2. Divisão dos emails em lotes.
  3. Envio dos emails para cada lote, garantindo que falhas sejam tratadas e reprocessadas, se necessário.

### 3. Templates de Email

Os templates de email estão localizados no diretório `src/templates/` e são utilizados para personalizar as mensagens enviadas.

---

## 🛠️ **Instalação e Configuração**

1. Clone este repositório:

   ```bash
   git clone https://github.com/GabrielCSTR/ezy-mailer-flow.git
   cd ezy-mailer-flow
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```
3. Configure as variáveis de ambiente no arquivo `.env`:
   ```bash
    # MAIL CONFIG
    MAIL_DRIVER=
    MAIL_HOST=
    MAIL_PORT=
    MAIL_SECURE=
    MAIL_USER=
    MAIL_PASSWORD=
    MAIL_FROM=
   ```
4. Inicie o servidor Temporal:

- Certifique-se de ter o [Temporal Server](https://github.com/temporalio/docker-compose) configurado e em execução.

5. Inicie o projeto:
   ```bash
   npm run start:dev
   ```

---

## 🧪 **Exemplos de Uso**

### Exemplo de Requisição

```bash
curl -X POST http://localhost:3000/email-campaign/start \
-H "Content-Type: application/json" \
-d '{"templateName": "confirmation"}'
```

### Exemplo de Resposta

```json
{
  "status": "success",
  "message": "Emails are being sent in batches."
}
```

---

## 🤝 **Contribuição**

Sinta-se à vontade para abrir issues ou enviar pull requests para melhorar este projeto!

---

## **Licença**

Este projeto está licenciado sob a [MIT License](LICENSE).
