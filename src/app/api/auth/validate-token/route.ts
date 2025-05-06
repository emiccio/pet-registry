import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  const { token } = await req.json()

  const record = await prisma.passwordResetToken.findUnique({
    where: { token },
  })

  const isValid = record && record.expires > new Date()

  return isValid
    ? NextResponse.json({ valid: true, message: "Token válido" })
    : NextResponse.json({ valid: false, message: "Token inválido o expirado" }, { status: 400 })
}
