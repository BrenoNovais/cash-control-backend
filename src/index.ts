import cors from 'cors';
import 'dotenv/config';
import express from "express";
import fs from "fs";
import https from "https";
import { TransactionRoute } from './routes/TransactionsRoute';

const { CAMINHO_KEY, CAMINHO_CERT } = process.env

if (!CAMINHO_KEY || !CAMINHO_CERT) {
  throw new Error("Caminhos certificado não encontrados");
}

if (!fs.existsSync(CAMINHO_KEY)) {
  throw new Error("Caminho key inválido");
}

if (!fs.existsSync(CAMINHO_CERT)) {
  throw new Error("Caminho CERT inválido");
}

const httpsOptions = {
  key: fs.readFileSync(CAMINHO_KEY),
  cert: fs.readFileSync(CAMINHO_CERT)
};

const app = express()
app.use(cors());

app.use(express.json())

app.get("/ping", (request, response) => {
  console.log('Pong!')
  return response.json({ "message": 'Pong!' })
})

app.use(TransactionRoute)

const httpsServer = https.createServer(httpsOptions, app);

const PORT = 3737;

httpsServer.listen(PORT, () => {
  console.log(`cash-control: ${PORT}`);
});

