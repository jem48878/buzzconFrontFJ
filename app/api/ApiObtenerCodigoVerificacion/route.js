// app/api/ApiObtenerCodigoVerificacion/route.js
//export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { admin } from '@/src/firebaseAdmin';


export async function POST(req) {
  const { email } = await req.json();

  // El url puede ser cualquiera porque no vas a usar el enlace como redirección automática
  const actionCodeSettings = {
    url: 'https://dummyurl.com/', 
    handleCodeInApp: true,
  };

  try {
    
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
