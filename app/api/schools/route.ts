import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/mysql';
import { RowDataPacket, ResultSetHeader } from 'mysql2';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function GET() {
  try {
    // Test database connection
    await db.execute('SELECT 1');

    // Check if schools table exists
    const [tables] = await db.execute('SHOW TABLES LIKE "schools"') as RowDataPacket[];

    if (tables.length === 0) {
      return NextResponse.json(
        { error: 'Schools table does not exist. Please create the table first.' },
        { status: 500 }
      );
    }

    // Fetch all schools
    const [rows] = await db.execute('SELECT * FROM schools ORDER BY id DESC') as RowDataPacket[];
    
    return NextResponse.json(rows, { status: 200 });
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    
    return NextResponse.json(
      { 
        error: 'Database error', 
        message: errorMessage
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const name = formData.get('name') as string;
    const address = formData.get('address') as string;
    const city = formData.get('city') as string;
    const state = formData.get('state') as string;
    const contact = formData.get('contact') as string;
    const email_id = formData.get('email_id') as string;
    const image = formData.get('image') as File;

    // Validate required fields
    if (!name || !address || !city || !state || !contact || !email_id) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      );
    }

    // Handle image upload
    let imagePath = '';
    if (image && image.size > 0) {
      // Validate image type
      if (!image.type.startsWith('image/')) {
        return NextResponse.json(
          { message: 'Please upload a valid image file' },
          { status: 400 }
        );
      }

      // Generate unique filename
      const timestamp = Date.now();
      const fileExtension = path.extname(image.name);
      const fileName = `school_${timestamp}${fileExtension}`;
      
      // Create schoolImages directory if it doesn't exist
      const uploadDir = path.join(process.cwd(), 'public', 'schoolImages');
      try {
        await mkdir(uploadDir, { recursive: true });
      } catch (error) {
        // Directory might already exist, which is fine
      }

      // Save file to public/schoolImages directory
      const filePath = path.join(uploadDir, fileName);
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      await writeFile(filePath, buffer);
      
      // Store the relative path for the database
      imagePath = `/schoolImages/${fileName}`;
    }

    // Insert school into database
    const [result] = await db.execute(
      'INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, address, city, state, contact, imagePath, email_id]
    ) as ResultSetHeader[];

    return NextResponse.json(
      { message: 'School added successfully', id: result.insertId },
      { status: 201 }
    );

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to add school';
    
    return NextResponse.json(
      { message: 'Failed to add school', error: errorMessage },
      { status: 500 }
    );
  }
}