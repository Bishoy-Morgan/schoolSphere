// app/api/schools/route.ts - Enhanced with debugging
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/mysql'; // Adjust path based on your setup
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export async function GET() {
  console.log('🔍 GET /api/schools called');
  
  try {
    // Test database connection first
    console.log('📡 Testing database connection...');
    await db.execute('SELECT 1');
    console.log('✅ Database connection successful');

    // Check if schools table exists
    console.log('🏗️ Checking if schools table exists...');
    const [tables] = await db.execute('SHOW TABLES LIKE "schools"') as RowDataPacket[];
    console.log('📊 Tables found:', tables);

    if (tables.length === 0) {
      console.log('❌ Schools table does not exist');
      return NextResponse.json(
        { error: 'Schools table does not exist. Please create the table first.' },
        { status: 500 }
      );
    }

    // Check table structure
    console.log('📋 Checking table structure...');
    const [columns] = await db.execute('DESCRIBE schools') as RowDataPacket[];
    console.log('📝 Table structure:', columns);

    // Count total records
    const [countResult] = await db.execute('SELECT COUNT(*) as total FROM schools') as RowDataPacket[];
    const totalSchools = countResult[0].total;
    console.log(`📊 Total schools in database: ${totalSchools}`);

    // Fetch all schools
    console.log('🎯 Fetching all schools...');
    const [rows] = await db.execute('SELECT * FROM schools ORDER BY id DESC') as RowDataPacket[];
    console.log('📋 Raw database result:', rows);
    console.log(`✅ Found ${rows.length} schools`);
    
    return NextResponse.json(rows, { status: 200 });
    
  } catch (error) {
    console.error('💥 Error in GET /api/schools:', error);
    
    // More detailed error information
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
      
      return NextResponse.json(
        { 
          error: 'Database error', 
          message: error.message,
          details: 'Check server console for full error details'
        },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { error: 'Unknown error occurred' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  console.log('📝 POST /api/schools called');
  
  try {
    const formData = await request.formData();
    console.log('📋 Form data received:', Array.from(formData.entries()));
    
    const name = formData.get('name') as string;
    const address = formData.get('address') as string;
    const city = formData.get('city') as string;
    const state = formData.get('state') as string;
    const contact = formData.get('contact') as string;
    const email_id = formData.get('email_id') as string;
    const image = formData.get('image') as File;

    console.log('📊 Parsed data:', { name, address, city, state, contact, email_id, imageSize: image?.size });

    // Validate required fields
    if (!name || !address || !city || !state || !contact || !email_id) {
      console.log('❌ Missing required fields');
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      );
    }

    // Handle image
    let imagePath = '';
    if (image && image.size > 0) {
      if (!image.type.startsWith('image/')) {
        return NextResponse.json(
          { message: 'Please upload a valid image file' },
          { status: 400 }
        );
      }
      imagePath = image.name; // For now, just store the name
    }

    console.log('💾 Inserting school into database...');
    
    // Insert school into database
    const [result] = await db.execute(
      'INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, address, city, state, contact, imagePath, email_id]
    ) as ResultSetHeader[];

    console.log('✅ School inserted successfully:', result);

    return NextResponse.json(
      { message: 'School added successfully', id: result.insertId },
      { status: 201 }
    );

  } catch (error) {
    console.error('💥 Error in POST /api/schools:', error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        { message: 'Failed to add school', error: error.message },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { message: 'Failed to add school' },
      { status: 500 }
    );
  }
}