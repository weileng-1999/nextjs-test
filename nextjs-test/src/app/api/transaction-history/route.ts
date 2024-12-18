// app/api/transaction-history/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
   
  try {
    const transactions = [
      { id: 1, date: '2024-12-18', amount: 100, description: 'Payment for service' },
      { id: 2, date: '2024-12-17', amount: 50, description: 'Payment for product' },
    ];

    return NextResponse.json({ transactions });
  } catch (error) {
    console.error('Error:', error);  
    return NextResponse.json({ error: error.message }, { status: 500 }); 
  }
}
