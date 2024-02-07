import { Request, Response } from "express";
import { prisma } from "../Database/Prisma/PrismaClient";

export class TransactionController {
    static async buscaTransactions(req: Request, res: Response) {
        try {
            const buscaTransactions = await prisma.transactions.findMany()

            if (!buscaTransactions) {
                return res.json({ "error": "nenhuma transaction encontrada" })
            }

            return res.json(buscaTransactions)
        } catch (error) {
            return res.json({ "error": `${error}` })
        }
    }

    static async criaTransactions(req: Request, res: Response) {
        try {

            const { description, type, category, price } = req.body

            if (!description || !type || !category || !price) {
                return res.json({ "error": "campos ausentes" })
            }

            const criaTransactions = await prisma.transactions.create({
                data: { description, type, category, price }
            })

            return res.json({
                message: "sucesso",
                data: criaTransactions
            })
        } catch (error) {
            return res.json({ "error": `${error}` })
        }
    }
}