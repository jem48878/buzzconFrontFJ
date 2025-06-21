// app/api/ApiSubirImagenSupaBase/route.js
import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// Inicializar Supabase (solo del lado servidor)
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // ⚠️ solo usar del lado del servidor
);

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get('file');
  const customName = formData.get('filename'); // nombre personalizado

  console.log("+++++ApiSubirImageSubaBase++++++", file, 'nuevo nombre supabase:', customName);

  if (!file) {
    return NextResponse.json({ message: 'No file provided' }, { status: 400 });
  }

  // Convertir el archivo a blob
  const bytes = await file.arrayBuffer();
  const blob = new Blob([bytes], { type: file.type });

  const fileNameOriginal = file.name.replace(/\s/g, '_');
  const fileNameFinal = customName ?? fileNameOriginal;

  const filePath = `inversiones/${fileNameFinal}`; // ruta en Supabase

  try {
    // Subir al bucket "inversiones"
    const { error: uploadError } = await supabase.storage
      .from('imagenesbuzzconfj')
      .upload(filePath, blob, {
        contentType: file.type,
        upsert: true, // sobrescribe si ya existe
      });

    if (uploadError) {
      console.error('Error al subir archivo:', uploadError);
      return NextResponse.json({ message: 'Error al subir archivo' }, { status: 500 });
    }

    // Obtener la URL pública
    const { data } = supabase
      .storage
      .from('imagenesbuzzconfj')
      .getPublicUrl(filePath);

    console.log ("Url generada para supabase:" , data.publicUrl)  ;
      
    return NextResponse.json({ message: 'Archivo subido correctamente', url: data.publicUrl });
  } catch (error) {
    console.error('Error al guardar archivo:', error);
    return NextResponse.json({ message: 'Error inesperado' }, { status: 500 });
  }
}
