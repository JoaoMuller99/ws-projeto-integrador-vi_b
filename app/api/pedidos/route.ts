import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const newOrder = await prisma.pedidos.create({
      data: {
        id_usuario: data.id_usuario,
        id_estabelecimento: data.id_estabelecimento,
        tipo_pagamento: data.tipo_pagamento,
        comentarios: data.comentarios,
        valor: data.valor,
        status: data.status,
        prato: {
          create: data.pratos.map((prato: number) => ({ prato: { connect: { id: prato } } })),
        },
      },
    });

    return NextResponse.json(newOrder);
  } catch (e) {
    return NextResponse.json({ error: String(e) || "An error ocurred while trying to create a order" }, { status: 404 });
  }
}
