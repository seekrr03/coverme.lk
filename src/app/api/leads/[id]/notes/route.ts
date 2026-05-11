import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const result = await query(
      'SELECT * FROM lead_notes WHERE lead_id = $1 ORDER BY created_at DESC',
      [id]
    );
    return NextResponse.json(result.rows, { status: 200 });
  } catch (error) {
    console.error('Error fetching lead notes:', error);
    return NextResponse.json({ message: 'Error fetching lead notes', error }, { status: 500 });
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { noteText } = body;

    if (!noteText) {
      return NextResponse.json({ message: 'Note text is required' }, { status: 400 });
    }

    const result = await query(
      'INSERT INTO lead_notes (lead_id, note_text) VALUES ($1, $2) RETURNING *',
      [id, noteText]
    );

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error('Error adding lead note:', error);
    return NextResponse.json({ message: 'Error adding lead note', error }, { status: 500 });
  }
}
