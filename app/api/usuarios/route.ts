import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    if (!data.nome || !data.email || !data.senha || !data.logradouro || !data.cidade || !data.telefone)
      return NextResponse.json(
        {
          error:
            "Missing properties: to create a user you need to provide the following properties - 'nome', 'email', 'senha', 'logradouro', 'cidade' and 'telefone'",
        },
        { status: 404 }
      );

    const newUser = await prisma.usuarios.create({
      data: {
        nome: data.nome,
        email: data.email,
        senha: data.senha,
        logradouro: data.logradouro,
        cidade: data.cidade,
        telefone: data.telefone,
      },
    });

    return NextResponse.json(newUser);
  } catch (e) {
    return NextResponse.json({ error: "An error ocurred while trying to create a user" }, { status: 404 });
  }
}
