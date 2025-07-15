"use server"

import { ref, set , push , update , get , query, orderByChild, equalTo, child } from           
'firebase-admin/database';

import { database , auth }  from '@/src/firebaseAdmin';


/*///////////////////////////////////////////////////////////////////*/


export async function getUsuarioRT(entrada , opcion) {  
    
    console.log("---Server getUsuarioRT----")
    const usuario = entrada.usuario
    console.log("usuario:", usuario)
        
    const owner = process.env.NEXT_PUBLIC_OWNER
    const jsonData = owner + 'dataUsuario'
    console.log("jsondata:" , jsonData   )
    const dbRef = database.ref(jsonData);
    
    
    let data = await dbRef.orderByChild('usuario').equalTo(usuario).once('value');
    //console.log('Salida getUsuarioRT:' , JSON.stringify(snapshot)    

    if (!data.exists()) {
        return null; 
    } 
        
    const id  = Object.keys(data.val())[0]; 
    const res = Object.values(data.val())[0];      
    data = {id , ...res};  
    
    console.log('Server Salida getUsuarioRT:' , JSON.stringify(data));
    
    return data;
}


