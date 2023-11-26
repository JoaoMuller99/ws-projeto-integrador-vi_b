import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, context: { params: { idEstabelecimento: number } }) {
  try {
    const id = +context.params.idEstabelecimento;
    const pratos = await prisma.pratos.findMany({ where: { id_estabelecimento: id } });
    return NextResponse.json(pratos);
  } catch (e) {
    return NextResponse.json({ error: "An error ocurred while trying to retrieve the available options" }, { status: 404 });
  }
}
