import { NextResponse } from 'next/server';

import prismaClient from '@/libs/prismadb';
import bcrypt from 'bcrypt';

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    const hashedPassword = await bcrypt.hash(password, 12);

    const userExists = await prismaClient.user.findUnique({ where: { email } });

    if (userExists) throw new Error('User already exists');

    const user = await prismaClient.user.create({
      data: { email, name, hashedPassword }
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json(error.message, { status: 400 });
  }
}
