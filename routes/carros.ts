import { PrismaClient } from "@prisma/client"
import { Router } from "express"

const prisma = new PrismaClient()
const router = Router()

router.get("/", async (req, res) => {
  try {
    const carros = await prisma.carro.findMany({
      include: {
        marca: true
      }
    })
    res.status(200).json(carros)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.post("/", async (req, res) => {
  const { modelo, ano, preco, combustivel, km, foto, acessorios, marcaId } = req.body

  if (!modelo || !ano || !preco || !combustivel || !km || !foto || !acessorios || !marcaId) {
    res.status(400).json({ "erro": "Informe modelo, ano, preco, combustivel, km, foto, acessorios e marcaId" })
    return
  }

  try {
    const carro = await prisma.carro.create({
      data: { modelo, ano, preco, combustivel, km, foto, acessorios, marcaId }
    })
    res.status(201).json(carro)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.delete("/:id", async (req, res) => {
  const { id } = req.params

  try {
    const carro = await prisma.carro.delete({
      where: { id: Number(id) }
    })
    res.status(200).json(carro)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.put("/:id", async (req, res) => {
  const { id } = req.params
  const { modelo, ano, preco, combustivel, km, foto, acessorios, marcaId } = req.body

  if (!modelo || !ano || !preco || !combustivel || !km || !foto || !acessorios || !marcaId) {
    res.status(400).json({ "erro": "Informe modelo, ano, preco, combustivel, km, foto, acessorios e marcaId" })
    return
  }

  try {
    const carro = await prisma.carro.update({
      where: { id: Number(id) },
      data: { modelo, ano, preco, combustivel, km, foto, acessorios, marcaId }
    })
    res.status(200).json(carro)
  } catch (error) {
    res.status(400).json(error)
  }
})

export default router