import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const user = await prisma.usuarios.findFirst({ where: { email: data.email } });

    if (!user || user.senha !== data.senha) {
      return NextResponse.json(
        {
          error: "Invalid Credentials",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(user);
  } catch (e) {
    return NextResponse.json({ error: String(e) || "An error ocurred while trying to login" }, { status: 404 });
  }
}
