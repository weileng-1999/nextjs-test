import { NextResponse } from 'next/server';

// Mock success response
const MOCK_RESPONSE = {
  message: 'Login successful',
  status: 'success',
};

export async function POST(request: Request) {
  try {
    const { username, encryptedPassword } = await request.json();

    if (!username || !encryptedPassword) {
      return NextResponse.json(
        { message: 'Invalid username or password', status: 'error' },
        { status: 400 }
      );
    }

    console.log('Username:', username);
    console.log('Encrypted Password:', encryptedPassword);

    return NextResponse.json(MOCK_RESPONSE);
  } catch (error) {
    console.error('Error processing login request:', error);
    return NextResponse.json(
      { message: 'Internal server error', status: 'error' },
      { status: 500 }
    );
  }
}
