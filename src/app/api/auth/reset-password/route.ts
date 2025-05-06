import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const { token, password } = await req.json()

  const record = await prisma.passwordResetToken.findUnique({ where: { token } })

  if (!record || record.expires < new Date()) {
    return NextResponse.json({ message: "Token invalid or expired" }, { status: 400 })
  }

  const hashed = await bcrypt.hash(password, 10)

  await prisma.user.update({
    where: { id: record.userId },
    data: { password: hashed },
  })

  // Cleanup token after use
  await prisma.passwordResetToken.delete({ where: { token } })

  return NextResponse.json({ message: "Password updated" })
}
