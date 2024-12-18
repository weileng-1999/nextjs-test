// app/api/transaction-history/route.ts
import { NextResponse } from 'next/server';
export const dynamic = 'force-static';
export const revalidate = 60;

export async function GET() {
   
  try {
    const transactions = [
      { id: 1, date: '24 Aug 2023', refId: '#213214324', to: 'Bloom Enterprise Sdn Bhd', type: 'DuitNow Payment', amount: 1200 },
      { id: 2, date: '24 Aug 2023', refId: '#213214324', to: 'Bloom Enterprise Sdn Bhd', type: 'DuitNow Payment', amount: 1200 },
      { id: 3, date: '24 Aug 2023', refId: '#213214324', to: 'Bloom Enterprise Sdn Bhd', type: 'DuitNow Payment', amount: 1200 },
    ];

    return NextResponse.json({ transactions });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 }); 
  }
}
