//manejos de firebase desde el Server 
//para escalar a usar firebase Authentication
//para modo local agregar en src/firebaseServiceAccount.json, se debe borrar para subir a vercel porque da //error al subir a git por exponer claves privadas

//src/firebaseAdmin
import admin from "firebase-admin";

let serviceAccount = {};

try {
    
  if (process.env.NEXT_PUBLIC_DOMINIO === 'http://localhost:3000') {
     serviceAccount = require('./firebaseServiceAccount.json');
      
     //console.log("inicializado desde archivo json:" , serviceAccount.private_key)  
     //console.log("inicializado desde archivo json:" , serviceAccount.private_key?.replace(/\\n/g, '\n'))    
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
  console.log("FIREBASE_SERVICE_ACCOUNT_KEY cargada con project_id:", serviceAccount.project_id);
  console.log("FORMATO FINAL de private_key:", JSON.stringify(serviceAccount.private_key));          
} catch (e) {
  console.error("Error al parsear FIREBASE_SERVICE_ACCOUNT_KEY", e);
}

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: process.env.FIREBASE_DATABASE_URL,              //fj-3 
      //storageBucket: 'databuzzconfrontnx.appspot.com',
    });
    console.log('Firebase Admin inicializado');
    //console.log('Storage Bucket:', admin.storage().bucket()?.name);
  } catch (err) {
    console.error('Error en admin.initializeApp:', err);
  }
}

console.log('Firebase Admin inicializado');
//console.log('Storage Bucket:', admin.storage().bucket()?.name);


//const bucket = admin.storage().bucket();   //no se usa por ser pago , se usa SupraBase gratis

const fsdb     = admin.firestore();          //firestore   fj-3    

const database = admin.database();           //realtime    fj-3

const auth     = admin.auth();               //Auth        fj-3


export {admin , fsdb , database , auth};

        


