import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const cacheBuster = searchParams.get('cacheBuster');
    let data;
    try {
        const res = await sql `SELECT * FROM guesses LIMIT ${cacheBuster}`;
        data = res.rows;
        console.log(data.length);
        return NextResponse.json(data)

    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }

    
}
