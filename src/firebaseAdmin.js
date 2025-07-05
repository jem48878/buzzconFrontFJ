// src/firebaseAdmin.js
/*
import admin from 'firebase-admin';
import serviceAccount from './firebaseServiceAccount.json';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();
export { db };
*/


// src/firebaseAdmin.js
import admin from "firebase-admin";

let serviceAccount = {};

try {
    
  if (process.env.NEXT_PUBLIC_DOMINIO === 'http://localhost:3000') {
     serviceAccount = require('./firebaseServiceAccount.json');
     console.log("inicializado desde archivo json")  
  } else {
     //serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY || '{}');
     //console.log("🔍 Contenido recibido en FIREBASE_SERVICE_ACCOUNT_KEY:");
     //console.log(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);  
     //serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY.replace(/\\n/g, '\n'));  
     console.log("inicializado desde variable de ambiente")   
      
     serviceAccount = {
        type                       : process.env.FIREBASE_SERVICE_TYPE,
        project_id                 : process.env.FIREBASE_SERVICE_PROJECT_ID,
        private_key_id             : process.env.FIREBASE_SERVICE_PRIVATE_KEY_id,
        private_key                : process.env.FIREBASE_SERVICE_PRIVATE_KEY?.replace(/\\n/g, '\n'), 
        client_email               : process.env.FIREBASE_SERVICE_CLIENT_EMAIL,
        client_id                  : process.env.FIREBASE_SERVICE_CLIENT_ID,
        auth_uri                   : process.env.FIREBASE_SERVICE_AUTH_URI,
        token_uri                  : process.env.FIREBASE_SERVICE_TOKEN_URI,
        auth_provider_x509_cert_url: process.env.FIREBASE_SERVICE_AUTH_PROVIDERr_X509_CERT_URL,
        client_x509_cert_url       : process.env.FIREBASE_SERVICE_CLIENT_X509_CERT_URL,       
     }    
      
      
      
      
      
      
      
      
      
      
      
  } 
  console.log("✅ FIREBASE_SERVICE_ACCOUNT_KEY cargada con project_id:", serviceAccount.project_id);
  console.log("🔍 FORMATO FINAL de private_key:", JSON.stringify(serviceAccount.private_key));          
} catch (e) {
  console.error("❌ Error al parsear FIREBASE_SERVICE_ACCOUNT_KEY", e);
}

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      //storageBucket: 'databuzzconfrontnx.appspot.com',
    });
    console.log('✅ Firebase Admin inicializado');
    //console.log('Storage Bucket:', admin.storage().bucket()?.name);
  } catch (err) {
    console.error('❌ Error en admin.initializeApp:', err);
  }
}

console.log('Firebase Admin inicializado');
//console.log('Storage Bucket:', admin.storage().bucket()?.name);



const db = admin.firestore();

//const bucket = admin.storage().bucket();

            
export {admin , db};

