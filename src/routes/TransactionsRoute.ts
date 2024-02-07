import { Router } from "express";
import { TransactionController } from "../controllers/Transactions";

export const TransactionRoute = Router()

TransactionRoute.get("/transactions", TransactionController.buscaTransactions)

TransactionRoute.post("/transactions", TransactionController.criaTransactions)