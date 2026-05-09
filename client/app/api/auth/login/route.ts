import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Validation
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
    }

    // In production, you would validate credentials against a database
    // This is a stub that always succeeds
    const token = Buffer.from(`${email}:${Date.now()}`).toString('base64');

    return NextResponse.json({ token, email });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
