// app/api/ApiObtenerCodigoVerificacion/route.js
export const runtime = 'nodejs';

import { readFile, writeFile } from 'fs/promises';
import { NextResponse } from 'next/server';
import { admin } from '@/src/firebaseAdmin';

// Inicializar Firebase Admin (una sola vez)


export async function POST(req) {
  const { email } = await req.json();

  // El url puede ser cualquiera porque no vas a usar el enlace como redirección automática
  const actionCodeSettings = {
    url: 'https://dummyurl.com/', 
    handleCodeInApp: true,
  };

  try {
      
    /*   
    const fs = require('fs');
                                                   
    const json = JSON.parse(fs.readFileSync('./src/firebaseServiceAccount.json', 'utf8'));

    // Escapá el private_key
    json.private_key = json.private_key.replace(/\n/g, '\\n');

    // String final
    const envVar = JSON.stringify(json);

    console.log("serviceAccount:" , envVar);  
    */      
      
      
      
      
      
    //console.log("admin?", admin);  
    console.log("admin.auth().generateEmailVerificationLink");    
      
    const link = await admin.auth().generateEmailVerificationLink(email, actionCodeSettings);

    console.log("sali de admin.auth().generateEmailVerificationLink");     
    // Extraer el oobCode desde el link
    const urlObj = new URL(link);
    const oobCode = urlObj.searchParams.get('oobCode');

    return NextResponse.json({ success: true, link, oobCode });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
