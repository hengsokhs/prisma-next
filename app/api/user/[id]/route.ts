import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Get User by ID
export async function GET(
    req: Request,
    { params }: { params: { id: string } }
) {
    const user = await prisma.user.findUnique({
        where: { id: Number(params.id) },
    });
    return NextResponse.json(user);
}

// Update User
export async function POST(
    req: Request,
    { params }: { params: { id: string } }
) {
    const body = await req.json();

    const updateUser = await prisma.user.update({
        where: { id: Number(params.id) },
        data: {
            name: body.name,
            email: body.email,
        },
    });

    return NextResponse.json(updateUser);
}