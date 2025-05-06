import { NextResponse } from "next/server"
import { resend } from "@/lib/resend"
import { prisma } from "@/lib/prisma";
import crypto from "crypto"
import { config } from "@/lib/config"

export async function POST(req: Request) {
  const { email } = await req.json()
  const user = await prisma.user.findUnique({ where: { email } })

  if (!user) {
    return NextResponse.json({ message: "Email not found" }, { status: 404 })
  }

  const token = crypto.randomBytes(32).toString("hex")
  const expires = new Date(Date.now() + 1000 * 60 * 60) // 1h

  await prisma.passwordResetToken.create({
    data: {
      userId: user.id,
      token,
      expires,
    },
  })

  const resetLink = `${config.resetPasswordUrl}?token=${token}`

  try {
    const { data, error } = await resend.emails.send({
      from: "PetCare <petcare@resend.dev>",
      to: email,
      subject: "Reset your password",
      html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
    })

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ message: "Email sent" })
  } catch (error) {
    console.error("Error sending email:", error)
    return NextResponse.json({ message: "Failed to send email" }, { status: 500 })
  }
}
