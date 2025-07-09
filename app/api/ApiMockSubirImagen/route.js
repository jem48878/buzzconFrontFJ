
//local grabar en /Public no sirve desde vercel

import path from 'path';
import fs from 'fs/promises';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get('file');
  const customName = formData.get('filename'); // ← nombre opcional    
    
  console.log("+++++ApiMockSubirImage++++++" , file , 'nuevo nombre:' , customName)    

  if (!file) {
    return NextResponse.json({ message: 'No file provided' }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const fileNameOriginal = file.name.replace(/\s/g, '_');
  const fileNameFinal = customName
    ? customName
    : fileNameOriginal;
    
  //const filePath = path.join(process.cwd(), 'public', 'uploads', fileName);
  const filePath = path.join(process.cwd(), 'public',   fileNameFinal);
    
  try {
    await fs.writeFile(filePath, buffer);
    return NextResponse.json({ message: 'Archivo subido correctamente'});
  } catch (error) {
    console.error('Error al guardar el archivo:', error);
    return NextResponse.json({ message: 'Error al guardar el archivo' }, { status: 500 });
  }
}

