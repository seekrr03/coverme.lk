import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    let sql = 'SELECT * FROM leads';
    const params: any[] = [];
    const conditions: string[] = [];

    if (status && status !== 'all') {
      params.push(status);
      conditions.push(`status = $${params.length}`);
    }

    if (search) {
      params.push(`%${search}%`);
      conditions.push(`(full_name ILIKE $${params.length} OR phone ILIKE $${params.length} OR email ILIKE $${params.length} OR city ILIKE $${params.length})`);
    }

    if (conditions.length > 0) {
      sql += ' WHERE ' + conditions.join(' AND ');
    }

    sql += ' ORDER BY created_at DESC';

    const result = await query(sql, params);
    return NextResponse.json(result.rows, { status: 200 });
  } catch (error) {
    console.error('Error fetching leads:', error);
    return NextResponse.json({ message: 'Error fetching leads', error }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      fullName,
      phone,
      email,
      addressLine1,
      addressLine2,
      city,
      civilStatus,
      occupation,
      monthlyIncome,
      familyPlan,
      spouseName,
      spouseDob,
      spouseNic,
      spouseOccupation,
      childCount,
      childrenDetails,
      selectedBenefits,
      additionalNotes,
    } = body;

    const result = await query(`
      INSERT INTO leads (
        full_name, phone, email, address_line1, address_line2, city, 
        civil_status, spouse_name, spouse_dob, spouse_nic, spouse_occupation, 
        child_count, children_details, family_plan, occupation, 
        monthly_income, selected_benefits, additional_notes
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)
      RETURNING *
    `, [
      fullName,
      phone,
      email || null,
      addressLine1 || null,
      addressLine2 || null,
      city || null,
      civilStatus || null,
      spouseName || null,
      spouseDob || null,
      spouseNic || null,
      spouseOccupation || null,
      childCount ? parseInt(childCount, 10) : 0,
      JSON.stringify(childrenDetails || []),
      familyPlan || false,
      occupation || null,
      monthlyIncome || null,
      JSON.stringify(selectedBenefits || []),
      additionalNotes || null,
    ]);

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error('Error creating lead:', error);
    return NextResponse.json({ message: 'Error creating lead', error }, { status: 500 });
  }
}
