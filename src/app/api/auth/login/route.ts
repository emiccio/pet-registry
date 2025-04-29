import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email y contraseña son requeridos" }, { status: 400 });
    }

    // Buscar usuario en la base de datos
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      console.log("Usuario no encontrado");
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
    }

    // Comparar la contraseña hasheada
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return NextResponse.json({ error: "Contraseña incorrecta" }, { status: 401 });
    }

    // Generar token JWT
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });

    return NextResponse.json({ id: user.id, email: user.email, token });
  } catch (error) {
    console.error("Error en login:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
