import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const random = searchParams.get('random');
  const computerNumber = searchParams.get('computerNumber');
  const number = searchParams.get('number');
  const result = searchParams.get('result');

 
  try {
    if (!random || !computerNumber || !number || !result) throw new Error('All values required');
    await sql`INSERT INTO guesses(randomnumber, computerguess, playerguess, result) VALUES(${random}, ${computerNumber}, ${number}, ${result})`
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
 
  const guesses = await sql`SELECT * FROM guesses;`;
  return NextResponse.json({ guesses }, { status: 200 });
}