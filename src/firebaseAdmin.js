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
     console.log("🔍 Contenido recibido en FIREBASE_SERVICE_ACCOUNT_KEY:");
     console.log(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);  
      
      
      
      
     //serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY.replace(/\\n/g, '\n'));  
     //console.log("inicializado desde variable de ambiente")   
      
     let serviceAccountRaw = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

// ✅ Deserializar doblemente si es necesario
if (serviceAccountRaw.startsWith('"')) {
  try {
    serviceAccountRaw = JSON.parse(serviceAccountRaw);
  } catch (err) {
    console.error("❌ Primera deserialización falló:", err);
  }
}

try {
  const serviceAccount = JSON.parse(serviceAccountRaw.replace(/\\n/g, '\n'));
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  console.log("✅ Firebase Admin inicializado");
} catch (err) {
  console.error("❌ Error al parsear finalmente:", err);
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

