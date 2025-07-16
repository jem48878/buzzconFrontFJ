"use server"


import { ref, set , push , update , get , query, orderByChild, equalTo, child } from           
'firebase-admin/database';

import { database , auth }  from '@/src/firebaseAdmin';


/*------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------*/

export async function getUsuarioRT(entrada , opcion) {  
    
    console.log("---Server getUsuarioRT----")
    const usuario = entrada.usuario
    console.log("usuario:", usuario)
        
    const owner = process.env.NEXT_PUBLIC_OWNER
    const jsonData = owner + 'dataUsuario'    
    const dbRef = database.ref(jsonData);
    
    
    let data = await dbRef.orderByChild('usuario').equalTo(usuario).once('value');
    
    if (!data.exists()) {
        return null; 
    } 
        
    const id  = Object.keys(data.val())[0]; 
    const res = Object.values(data.val())[0];      
    data = {id , ...res};  
    
    //console.log('Server Salida getUsuarioRT:' , JSON.stringify(data));
    return data;
}




export async function addUsuarioRT(entrada) {  
   console.log("-Server --addtUsuarioRT----")      
   console.log('entrada:' , JSON.stringify(entrada) ) 
   const owner = process.env.NEXT_PUBLIC_OWNER
   const jsonData = owner + 'dataUsuario'  
   const nuevaRef = database.ref(jsonData).push(); 
   await nuevaRef.set(entrada); 
}    
    

export async function updateUsuarioRT(idUsuario , usuario , entrada) {  
   console.log("- Server --updateUsuarioRT----")      
   console.log("idUsuario:" + idUsuario + " usuario:" + usuario + ' entrada:' + JSON.stringify(entrada) )    
    
   if (idUsuario == null ) {
       const entrada = {usuario}
       const res = await getUsuarioRT(entrada , 2 )
       idUsuario = res.id
       console.log("res.id:" , res.id)
   }   
  
   const owner = process.env.NEXT_PUBLIC_OWNER
   let jsonData = owner + 'dataUsuario'     
   jsonData     = `${jsonData}/${idUsuario}`;
   await database.ref(jsonData).update(entrada);    
}


/*------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------*/


/**/    
/* Register.js */    
/**/
export async function crearCuenta2(entrada) {
  try {
    
    console.log("--Server Register-2---function-----------" ,  JSON.stringify(entrada))    
    const usuario  = entrada.usuario
    const password = entrada.password    
    const email    = entrada.email
    console.log("usuario:" + usuario + "  psw:" + password + "  correo:" + email)  
      
    let retorno = 0
    let mensaje = "alta OK"
            
    const res = await getUsuarioRT(entrada , 2)    
      
    let url =""
    
    let userCredential = null;
    let user = null ;    
    
    //console.log('Server Salida getUsuarioRT:' , JSON.stringify(res));   
    if ( res == null || res.estado != 2) {
         
       const ahora           = new Date();
       const fechaAlta       = ahora.toLocaleDateString('es-AR'); 
       const horaAlta        = ahora.toLocaleTimeString('es-AR'); 
       const estado          = 0  ;
       let  codVerificacion  = "" ;
       
       const fechaChgPass    = ahora.toLocaleDateString('es-AR');
       const horaChgPass     = ahora.toLocaleTimeString('es-AR'); 
       const codVerificacionPass = "" ;
       
       const dominio = process.env.NEXT_PUBLIC_DOMINIO      
               
       let emailAuth = `${usuario}@buzzcon.com` 
       
        
       if (res !== null) {    
           try {                              
            await auth.getUserByEmail(emailAuth); 
            console.log("Usuario ya registrado pero no validado")    
               
           } catch (error) {             
             retorno = 999
             mensaje = "Error al procesar la validacion de usuario existente" 
             return { codRet: retorno, message: mensaje };   
           }  
       }
       else {
         try {   
            console.log("Nuevo Cliente");   
            const userCredential = await auth.createUser({
                                 email: emailAuth,
                                 password: password,
                                 displayName: usuario
                            }); 
          }
          catch (error) {
            console.error("Error al crear usuario:", error);
            retorno = 999;
            mensaje = "Error al crear usuario";
            return { codRet: retorno, message: mensaje }; 
          } 
       }   
        
       //1 genera url y codigo para vincualar a url propia //
       /*
       const resApi = await fetch('/api/ApiObtenerCodigoVerificacion', {
             method: 'POST',
            headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify({ emailAuth }),
       });

       const dataApi = await resApi.json();
       if (!dataApi.success) throw new Error(dataApi.error);
       
       console.log("oobCode verificacion FB :" , dataApi.oobCode)  
       codVerificacion = dataApi.oobCode
       */        
       //genera url 
           
      
       const actionCodeSettings = {
          url: `${dominio}/Access/VerifyRegistration/${usuario}`,
          handleCodeInApp: true,
       };
    
       try {    
         //console.log("admin.auth().generateEmailVerificationLink");        
         const verificationLink = await auth.generateEmailVerificationLink(emailAuth, actionCodeSettings);
         //console.log("sali admin.auth().generateEmailVerificationLink");            
         codVerificacion = new URL(verificationLink).searchParams.get('oobCode');    
         console.log("oobCode verificacion FB :" , codVerificacion)  
       }
       catch (error) {
         console.error("Error al generar verification link:", error);
         retorno = 999;
         mensaje = "Error al generar link de verificación";
         return { codRet: retorno, message: mensaje };
       }    
        
       
       url = `${dominio}/Access/VerifyRegistration/${usuario}/${codVerificacion}`   
       const nvoUsuario = {usuario , password , email , fechaAlta , horaAlta , estado , codVerificacion , fechaChgPass , horaChgPass , codVerificacionPass }; 
        
       if (res == null) {       
          await addUsuarioRT(nvoUsuario)   
       }
       else{
          await updateUsuarioRT(res.id , null, nvoUsuario);
       }  
       
    }    
    else {
        retorno = 999    
        mensaje = "Usuario ya registrado"; 
    }  
             
   console.log("Url correo verificacion cuenta:" , url)          
   /*  sirve     
   if (retorno === 0) {
      await enviarEmailLink({        
        email: email,
        time: new Date().toLocaleTimeString('es-AR'),
        link: url,
      });
    }  
    */    
    return { codRet: retorno , message: mensaje };    
    
  } catch (error) {
     return { codRet: 999 , message: error };     
  }
}



/**/    
/* Register.js
/* Validar Nva Cuenta mientras se esta esperando despues de la registracion */    
/**/   
export async function validarNvaCuenta2(entrada) {
  try {
    
    console.log("--Server validar Nueva Cuenta2----function-----------" ,  JSON.stringify(entrada))    
    const usuario   = entrada.usuario
    const password  = entrada.password    
    const email     = entrada.email
   
    console.log("usuario:" + usuario + "  psw:" + password + "  correo:" + email)  
    
    let retorno = 0
    let mensaje = ""
    
    const res = await getUsuarioRT(entrada , 2 ) ;   
    if ( res !== null) {
        if (res.estado == 2 ) {
           retorno = 0    
           mensaje = "Usuario validdo";         
        }
        else{
           retorno = 999   
           mensaje = "Usuario no validdo";             
        }
    }    
    else {
       retorno = 999    
       mensaje = "usuario no validado";           
    } 
    
    return { codRet: retorno , message: mensaje };
    
  } catch (error) {
    return { codRet: 999 , message: error };
     
  }
}




/**/ 
/* Re-enviar Correo */ 
/* Register.js
/**/ 
export async function reEnviarCorreo2(entrada) {
  try {
    
    console.log("--Server ReEnviarCorreo--function2-----------" ,  JSON.stringify(entrada))    
    const usuario   = entrada.usuario
    const email     = entrada.email
    
    let retorno = 0
    let mensaje = ""
    
    const dominio = process.env.NEXT_PUBLIC_DOMINIO  
    
    const res = await getUsuarioRT(entrada , 2 ) ;  
      
    console.log("usuario:" + usuario +  " correo:" + email) 
               
    let emailAuth = `${usuario}@buzzcon.com` 
    let codVerificacion  = "" ; 
    let url =""; 
      
    if (res !== null) {    
       try {                              
          await auth.getUserByEmail(emailAuth); 
          console.log("Usuario ya registrado no validado")    
           
          const actionCodeSettings = {
              url: `${dominio}/Access/VerifyRegistration/${usuario}`,
              handleCodeInApp: true,
          };
    
         //console.log("admin.auth().generateEmailVerificationLink");        
         const verificationLink = await auth.generateEmailVerificationLink(emailAuth, actionCodeSettings);
         //console.log("sali admin.auth().generateEmailVerificationLink");            
         codVerificacion = new URL(verificationLink).searchParams.get('oobCode');    
         console.log("oobCode verificacion FB :" , codVerificacion)  
           
       } catch (error) {
         console.error("Error en la generacion del link de re-envio de correo :", error);
         retorno = 999;
         mensaje = "Error al generar el  link de re-envio de correo";
         return { codRet: retorno, message: mensaje };
       }    
        
       
       url = `${dominio}/Access/VerifyRegistration/${usuario}/${codVerificacion}`   
       
       const ahora           = new Date();
       const fechaAlta       = ahora.toLocaleDateString('es-AR'); 
       const horaAlta        = ahora.toLocaleTimeString('es-AR'); 
       
       const nvoLink = {fechaAlta , horaAlta , codVerificacion }; 
       await updateUsuarioRT(res.id , null, nvoLink);
    
             
       console.log("Url correo re-envio verificacion cuenta:" , url)
       /*  sirve     
       if (retorno === 0) {
           await enviarEmailLink({        
             email: email,
             time: new Date().toLocaleTimeString('es-AR'),
             link: url,
          });
       }  
       */              
          
    }    
    else {
        retorno = 999;
        mensaje = "Usuario no existe"
    }     
      
    return { codRet: retorno , message: mensaje };    
  } catch (error) {
    console.log ("error update/envio correo datos de generacion link:" , error.message)  
    return { codRet: 999 , message: error.message };
     
  }
}





/**/   
/* VerifyRegistratatio.js
/* Validar la url de registracion */    
/**/   
export async function validarCodigo2(entrada) {
  try {
    
    console.log("--SERVER validar Codigo2----function-----------" ,  JSON.stringify(entrada))    
    const usuario          = entrada.user
    const codVerificacion  = entrada.code        
    console.log("usuario:" + usuario + "  codigo:" + codVerificacion)  
    
    let retorno = 0
    let mensaje = "Usuario validado";
    
    entrada = {usuario , codVerificacion}; 
    const res = await getUsuarioRT(entrada , 2 ) ;   
      
    if ( res !== null) {
       if (res.estado == 0 ) {
           const ahora           = new Date();
           const fechaAlta       = ahora.toLocaleDateString('es-AR'); 
           const horaAlta        = ahora.toLocaleTimeString('es-AR'); 
           
           if (fechaAlta == res.fechaAlta)  {
               const hoy = new Date().toISOString().split('T')[0]; // "2025-06-25"
               const fechaHoraAlta = new Date(`${hoy}T${res.horaAlta}`);
               const diferenciaSegundos = (ahora - fechaHoraAlta) / 1000;
               /*
               if (diferenciaSegundos > 60) {
                  retorno = 999    
                  mensaje = "Verificacion caducada";    
               }
               */
           }               
           else {
               retorno = 999    
               mensaje = "Verificacion caducada"; 
           }
       }                    
       else {
         retorno = 0    
         mensaje = "Usuario validado";    
       } 
    }    
    else {
        retorno = 999    
        mensaje = "No se encontradron los datos a verificar"; 
    } 
        
    console.log("retorno:" + retorno + " mensaje:" + mensaje)  
      
    return { codRet: retorno , message: mensaje };
    
  } catch (error) {
     return { codRet: 999 , message: error.message };
  }
}





/**/    
/* Recuperar Contraseña */ 
/* RecoverPass.js
/**/   
export async function recuperarPass2(entrada) {
  try {
    
    console.log("--Server Recuperar Contraseña--function2-----------" ,  JSON.stringify(entrada))    
    const usuario   = entrada.usuario
    
    let retorno = 0
    let mensaje = ""
        
    const dominio = process.env.NEXT_PUBLIC_DOMINIO      
      
    const res = await getUsuarioRT(entrada , 2 ) ;  
      
    let emailAuth = `${usuario}@buzzcon.com` 
    let codVerificacion  = "" ; 
    let url ="";     
      
      
    if ( res !== null && res.estado == 2) {                 
        const ahora              = new Date();        
        const fechaChgPass        = ahora.toLocaleDateString('es-AR');
        const horaChgPass         = ahora.toLocaleTimeString('es-AR'); 
        const codVerificacionPass = "" ;
       
        
        try {                              
          await auth.getUserByEmail(emailAuth); 
          console.log("Usuario ya registrado no validado")    
           
          const actionCodeSettings = {
              url: `${dominio}/Access/VerifyRegistration/${usuario}`,
              handleCodeInApp: true,
          };
    
         //console.log("admin.auth().generatePasswordResetLink");        
         const verificationLink = await auth.generatePasswordResetLink(emailAuth, actionCodeSettings);
         //console.log("sali admin.auth().generatePasswordResetLink");            
            
         codVerificacionPass = new URL(verificationLink).searchParams.get('oobCode');    
         console.log("oobCode verificacion reset passFB :" , codVerificacion)  
           
       } catch (error) {
         console.error("Error en la generacion del link de re-envio de correo :", error);
         retorno = 999;
         mensaje = "Error al generar el  link de re-envio de correo";
         return { codRet: retorno, message: mensaje };
       }    
        
        
        
        const cambioPass = { fechaChgPass , horaChgPass , codVerificacionPass }; 
        await updateUsuarioRT(res.id, cambioPass);
        
        const url = `${dominio}/Access/ChangePass/${usuario}/${codVerificacionPass}`   
        console.log("Url cambio pass correo:" , url)
        /*  para correo con url cambiar contraseña */
        /*
        await enviarEmailLink({        
          email: res.email,
          time: new Date().toLocaleTimeString('es-AR'),
          link: url,
        });
        */    
        
        
    }
    else {
        retorno = 999;
        mensaje = "Usuario no existe"
    }     
    return { codRet: retorno , message: mensaje };    
  } catch (error) {
    return { codRet: 999 , message: error };
     
  }
}




