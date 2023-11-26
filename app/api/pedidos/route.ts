import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const newOrder = await prisma.pedidos.create({
      data,
    });

    return NextResponse.json(newOrder);
  } catch (e) {
    return NextResponse.json({ error: String(e) || "An error ocurred while trying to create a order" }, { status: 404 });
  }
}
