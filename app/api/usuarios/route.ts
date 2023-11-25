import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    if (!data.nome || !data.email || !data.senha || !data.telefone)
      return NextResponse.json(
        {
          error: "Missing properties: to create a user you need to provide the following properties - 'nome', 'email', 'senha' and 'telefone'",
        },
        { status: 404 }
      );

    const emailAlreadyInUse = await prisma.usuarios.findFirst({ where: { email: data.email } });

    if (emailAlreadyInUse) {
      return NextResponse.json(
        {
          error: "Email already in use",
        },
        { status: 404 }
      );
    }

    const newUser = await prisma.usuarios.create({
      data: {
        nome: data.nome,
        email: data.email,
        senha: data.senha,
        logradouro: "",
        cidade: "",
        telefone: data.telefone,
      },
    });

    return NextResponse.json(newUser);
  } catch (e) {
    return NextResponse.json({ error: String(e) || "An error ocurred while trying to create a user" }, { status: 404 });
  }
}
