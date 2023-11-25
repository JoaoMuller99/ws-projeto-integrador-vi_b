import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, context: { params: { id_usuario: number } }) {
  try {
    const idUsuario = +context.params.id_usuario;
    return NextResponse.json(await prisma.pedidos.findMany({ where: { id_usuario: idUsuario } }));
  } catch (e) {
    return NextResponse.json({ error: String(e) || "An error ocurred while trying to filter the orders" }, { status: 404 });
  }
}
