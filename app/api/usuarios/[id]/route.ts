import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, context: { params: { id: number } }) {
  try {
    const id = +context.params.id;
    return NextResponse.json(await prisma.usuarios.findUniqueOrThrow({ where: { id } }));
  } catch (e) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
}

export async function PATCH(request: NextRequest, context: { params: { id: number } }) {
  try {
    const id = +context.params.id;
    const user = await prisma.usuarios.findUniqueOrThrow({ where: { id } });

    const data = await request.json();

    const emailAlreadyInUse = await prisma.usuarios.findFirst({ where: { email: data.email } });

    if (emailAlreadyInUse && emailAlreadyInUse.id !== id) {
      return NextResponse.json(
        {
          error: "Email already in use",
        },
        { status: 404 }
      );
    }

    const updatedUser = await prisma.usuarios.update({
      data: {
        nome: data.nome || user.nome,
        email: data.email || user.email,
        telefone: data.telefone || user.telefone,
        cidade: data.cidade || user.cidade,
        logradouro: data.logradouro || user.cidade,
      },
      where: { id },
    });

    return NextResponse.json(updatedUser);
  } catch (e) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
}

export async function DELETE(request: NextRequest, context: { params: { id: number } }) {
  try {
    const id = +context.params.id;
    return NextResponse.json(await prisma.usuarios.delete({ where: { id } }), { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
}
