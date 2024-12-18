import { NextResponse } from 'next/server';

// Mock success response
const MOCK_RESPONSE = {
  message: 'Login successful',
  status: 'success',
};

export async function POST(request: Request) {
  try {
    // Parse the JSON body from the incoming request
    const { username, encryptedPassword } = await request.json();

    // Validate the inputs (add any custom validation logic here)
    if (!username || !encryptedPassword) {
      return NextResponse.json(
        { message: 'Invalid username or password', status: 'error' },
        { status: 400 }
      );
    }

    // Simulate processing of the login (mock API logic)
    console.log('Username:', username);
    console.log('Encrypted Password:', encryptedPassword);

    // Respond with success (or perform actual backend logic if needed)
    return NextResponse.json(MOCK_RESPONSE);
  } catch (error) {
    console.error('Error processing login request:', error);
    return NextResponse.json(
      { message: 'Internal server error', status: 'error' },
      { status: 500 }
    );
  }
}
