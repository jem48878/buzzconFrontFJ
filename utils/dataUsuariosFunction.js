
//desde el cliente
//funciones de DataUsuarios desde firebase realtime database
//manejo plano , se lee todo el json y se trabaja con javascript 
//escalable reemplazo de lectura plana puntulaes / queries etc... 

import { addUsuario , loadUsuario , updateUsuario } from '@/utils/dataUsuariosFireBase';

import emailjs from 'emailjs-com';
 


/**/    
/* Login.js */    
/**/ 
export async function loginUsuario1(entrada) {
  try {
    
    const entorno = process.env.NEXT_PUBLIC_ENTORNO;             
    
    console.log("--login------function--------------" ,  JSON.stringify(entrada))    
    
    const usuario  = entrada.usuario
    const password = entrada.password    
    console.log("entorno:" + entorno + " usuario:" + usuario + "  psw:" + password)  
    
    let retorno = 0
    let mensaje = "Login OK"
        
    const res = await getUsuario(entrada , 1 ) ;   
    //console.log("salida funcion getUsuario:" + JSON.stringify(res));          
      
    if (res == null) {         
        mensaje = "Los datos ingresado no son valido"; 
        retorno = 999
    } 
        
    return { codRet: retorno , message: mensaje };
    
  } catch (error) {     
     return { codRet: 999 , message: error };
    
  }
}
    
    
async function getUsuario(entrada , opcion) {  
  console.log("desde getUsuario:" + JSON.stringify(entrada));        
  console.log("desde getUsuario opcion:" + opcion);            
  const DataUsuarios = await loadUsuario(); 
    
  //console.log("desde get dataUsuario:" + JSON.stringify(DataUsuarios));          
      
  let usuario = null ;    
    
  switch (opcion) {
    case 1:
       usuario = DataUsuarios.find(x => 
       x.usuario.trim()  === entrada.usuario.trim() &&
       x.password.trim() === entrada.password.trim() &&      
       x.estado === 2
      );
      break;
    case 2:
      usuario = DataUsuarios.find(inversion => 
      inversion.usuario.trim() === entrada.usuario.trim() 
      );
      break;
    case 3:
       usuario = DataUsuarios.find(x => 
       x.usuario.trim() === entrada.usuario.trim() &&
       x.codVerificacion.trim() === entrada.codVerificacion.trim()
      );
      break;  
    
    case 4:
       usuario = DataUsuarios.find(x => 
       x.usuario.trim() === entrada.usuario.trim() &&
       x.codVerificacionPass.trim() === entrada.codVerificacion.trim()
      );
      break;        
          
          
    default:
      break;
  } 
  //console.log('Salida getUsuario:' , JSON.stringify(usuario) )
  return usuario || null;      
}    


/*******************************************************************************************/
/*******************************************************************************************/

/**/    
/* Register.js */    
/**/
export async function crearCuenta1(entrada) {
  try {
    
    console.log("--Register----function-----------" ,  JSON.stringify(entrada))    
    const usuario  = entrada.usuario
    const password = entrada.password    
    const email  = entrada.email
    console.log("usuario:" + usuario + "  psw:" + password + "  correo:" + email)  
      
    let retorno = 0
    let mensaje = "alta OK"
    
    const res = await getUsuario(entrada , 2 ) ;  
    
    let url =""
    
    if ( res == null || res.estado != 2) {
       const ahora           = new Date();
       const fechaAlta       = ahora.toLocaleDateString('es-AR'); 
       const horaAlta        = ahora.toLocaleTimeString('es-AR'); 
       const estado          = 0  ;
       const codVerificacion = generarIdUnico() ;
       
       const fechaChgPass    = ahora.toLocaleDateString('es-AR');
       const horaChgPass     = ahora.toLocaleTimeString('es-AR'); 
       const codVerificacionPass = "" ;
       
       const dominio = process.env.NEXT_PUBLIC_DOMINIO      
         
       url = `${dominio}/Access/VerifyRegistration/${usuario}/${codVerificacion}`   
       const nvoUsuario = {usuario , password , email , fechaAlta , horaAlta , estado , codVerificacion , fechaChgPass , horaChgPass , codVerificacionPass }; 
       if (res == null) {
          await addUsuario(nvoUsuario);
       }
       else{
          await updateUsuario(res.id, nvoUsuario);
       }    
    }    
    else {
        retorno = 999    
        mensaje = "Usuario ya registrado"; 
    }  
    
    
   console.log("Url correo verificacion cuenta:" , url)          
   /*   
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



function generarIdUnico(longitud = 10) {
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let resultado = '';
  for (let i = 0; i < longitud; i++) {
    resultado += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
  }
  return resultado;
}



/**/    
/* Register.js
/* Validar Nva Cuenta mientras se esta esperando despues de la registracion */    
/**/   
export async function validarNvaCuenta1(entrada) {
  try {
    
    console.log("--validar Nueva Cuenta----function-----------" ,  JSON.stringify(entrada))    
    const usuario   = entrada.usuario
    const password  = entrada.password    
    const email     = entrada.email
   
    console.log("usuario:" + usuario + "  psw:" + password + "  correo:" + email)  
    
    let retorno = 0
    let mensaje = ""
    
    const res = await getUsuario(entrada , 2 ) ;   
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
export async function reEnviarCorreo1(entrada) {
  try {
    
    console.log("--Re Enviar Correo--function-----------" ,  JSON.stringify(entrada))    
    const usuario   = entrada.usuario
    const email     = entrada.email
    
    let retorno = 0
    let mensaje = ""
    
    const dominio = process.env.NEXT_PUBLIC_DOMINIO  
    
    const res = await getUsuario(entrada , 2 ) ;  
      
    console.log("usuario:" + usuario +  " correo:" + email) 
      
    if ( res !== null) {  
        console.log("re-envio correo:" , res.codVerificacion)
        const url = `${dominio}/Access/VerifyRegistration/${usuario}/${res.codVerificacion}`   
        console.log("correo verificaicon re-envio url:" , url)
        /*  
        await enviarEmailLink({        
           email: email,
           time: new Date().toLocaleTimeString('es-AR') ,
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



/**/   
/* VerifyRegistratatio.js
/* Validar la url de registracion */    
/**/   
export async function validarCodigo1(entrada) {
  try {
    
    console.log("--validar Codigo----function-----------" ,  JSON.stringify(entrada))    
    const usuario          = entrada.user
    const codVerificacion  = entrada.code        
    console.log("usuario:" + usuario + "  codigo:" + codVerificacion)  
    
    let retorno = 0
    let mensaje = ""
    
    entrada = {usuario , codVerificacion}; 
    const res = await getUsuario(entrada , 3 ) ;   
      
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
               else {
               */
                   await updateUsuario(res.id, {                     
                   estado: 2,
                   });
               //}
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
      
    return { codRet: retorno , message: mensaje };
    
  } catch (error) {
     return { codRet: 999 , message: error };
  }
}



/*******************************************************************************************/
/*******************************************************************************************/

/**/    
/* Recuperar Contraseña */ 
/* RecoverPass.js
/**/   
export async function recuperarPass1(entrada) {
  try {
    
    console.log("--Recuperar Contraseña--function-----------" ,  JSON.stringify(entrada))    
    const usuario   = entrada.usuario
    
    let retorno = 0
    let mensaje = ""
        
    const dominio = process.env.NEXT_PUBLIC_DOMINIO      
      
    const res = await getUsuario(entrada , 2 ) ;   
    //console.log("usuario:" + usuario +  " correo:" + res.email) 
      
    if ( res !== null && res.estado == 2) {         
        let mensaje = `Le informamos su password registrado en BuzzconFJ: ${res.password}`
        console.log("Mensaje correo:" , mensaje)
        /* para correo con pass    
        await enviarEmailMsg({        
           title: "BuzzconFJ  Recupero de Contraseña",    
           name: res.usuario,    
           email: res.email,
           message : mensaje    
        });   
        */
        const ahora              = new Date();        
        const fechaChgPass        = ahora.toLocaleDateString('es-AR');
        const horaChgPass         = ahora.toLocaleTimeString('es-AR'); 
        const codVerificacionPass = generarIdUnico() ;
        const cambioPass = { fechaChgPass , horaChgPass , codVerificacionPass }; 
        await updateUsuario(res.id, cambioPass);
                
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


/************************************************************************************************/
/************************************************************************************************/

/**/    
/* Cambiar Contraseña ChangePass.js*/    
/**/   
export async function cambiarContraseña1(entrada) {
  try {
    
    console.log("--Cambiar Contraseña--function-----------" ,  JSON.stringify(entrada))    
    const usuario    = entrada.usuario
    const password   = entrada.password
    
    let retorno = 0
    let mensaje = ""
    
    const res = await getUsuario(entrada , 2 ) ;   
    
    if ( res !== null && res.estado == 2) {        
        console.log("usuario:" + usuario +  " pass:" + res.password) 
   
        const nvaPass = {password}
        await updateUsuario(res.id, nvaPass);
        console.log("Ok modificacion contraseña")
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


/**/    
/* Cambiar Contraseña */   
/* Validar codigo ChangePass.js */
/**/ 
export async function validarCodigoPass1(entrada) {
  try {
    
    console.log("--validar Codigo Pass----function-----------" ,  JSON.stringify(entrada))    
    const usuario          = entrada.user
    const codVerificacion  = entrada.code        
    console.log("usuario:" + usuario + "  codigo:" + codVerificacion)  
    
    let retorno = 0
    let mensaje = ""
    //await sleep(2000);   //solo para ver el efecto de espera 
    
    entrada = {usuario , codVerificacion}; 
    const res = await getUsuario(entrada , 4 ) ;   
      
    if ( res !== null && res.estado == 2) {       
       const ahora           = new Date();
       const fechaAlta       = ahora.toLocaleDateString('es-AR'); 
       const horaAlta        = ahora.toLocaleTimeString('es-AR'); 
        
       console.log ("fecha:" + fechaAlta  + " fecha chgPass:" + res.fechaChgPass)    
        
       if (fechaAlta == res.fechaChgPass)  {
            const hoy = new Date().toISOString().split('T')[0]; // formato  "2025-06-25"
            const fechaHoraAlta = new Date(`${hoy}T${res.horaChgPass}`);
            const diferenciaSegundos = (ahora - fechaHoraAlta) / 1000;
            /*
            if (diferenciaSegundos > 60) {
               retorno = 999    
               mensaje = "Verificacion caducada";    
            }
            */
        }               
        else {  //otra fecha 
           retorno = 999    
           mensaje = "Verificacion caducada"; 
        }
    }    
    else {
        retorno = 999    
        mensaje = "No se encontradron los datos a verificar"; 
    } 
      
    return { codRet: retorno , message: mensaje };
    
  } catch (error) {
     return { codRet: 999 , message: error };
  }
}



/************************************************************************************************/
/************************************************************************************************/
/**/    
/* Enviar Correo 2 Template */    
/**/   
export async function enviarEmailMsg({ name, email, title, message }) {
  try {
    const result = await emailjs.send(
      'service_uhiry3n',         // tu service ID
      'template_luyvw0n',        // tu template ID
      {
      title,
      name,
      email,
      message,
       },
      'Cr46Wdhz3tydtaB4W'        // tu PUBLIC KEY (user ID)
    );

    console.log('Correo enviado Msg:', result.text);
  } catch (error) {
    console.error('Error al enviar Msg:', error);
  }
}


export async function enviarEmailLink({ email, link, time }) {
  try {
    const result = await emailjs.send(
      'service_uhiry3n',         // tu service ID
      'template_k3w94sh',        // tu template ID
      {
      email,
      link,
      time      
       },
      'Cr46Wdhz3tydtaB4W'        // tu PUBLIC KEY (user ID)
    );

    console.log('Correo enviado Link:', result.text);
  } catch (error) {
    console.error('Error al enviar Link:', error);
  }
}



/************************************************************************************************/
/************************************************************************************************/
/**/    
/* Validaciones de Registracion */    
/**/   

export function esEmailValido(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}



export function validarPassword(password) {
  return {
    longitud: password.length >= 8,
    mayuscula: /[A-Z]/.test(password),
    minuscula: /[a-z]/.test(password),
    numero: /\d/.test(password),
    especial: /[!@#$%^&*(),.?":{}|<>+-]/.test(password),
  };
}





// FUNCIONES DESDE VERCEL DATOS SENSIBLES EN EL SERVER //
/***********************************************************************************************/
/***********************************************************************************************/
/***********************************************************************************************/
//fj-3 Para usar desde Vercel integrando con Firebase Authenticaion 
//ejecutar en el server procesos sensibles 

import { confirmPasswordReset , applyActionCode , createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { signInWithEmailAndPassword , signOut } from 'firebase/auth';
import { getDatabase, ref, set , push , update , query, orderByChild, equalTo, get , child } from 'firebase/database';
import { database , auth }  from '@/src/firebase';

import * as srvFn from '@/utils/dataUsuariosFunctionSrv';


export async function loginUsuario(entrada) {
    const entorno = process.env.NEXT_PUBLIC_ENTORNO;     
     
    if ( entorno == 'local' ) 
        return await loginUsuario1(entrada)
    else 
        return await loginUsuario2(entrada)
}


export async function crearCuenta(entrada) {
    const entorno = process.env.NEXT_PUBLIC_ENTORNO;     
        
    if ( entorno == 'local' ) 
        return await crearCuenta1(entrada)
    else {
        return await srvFn.crearCuenta2(entrada)
    }    
}


export async function validarNvaCuenta(entrada) {
    const entorno = process.env.NEXT_PUBLIC_ENTORNO;     
        
    if ( entorno == 'local' ) 
        return await validarNvaCuenta1(entrada)
    else {
        return await validarNvaCuenta2(entrada)
    }    
}




export async function reEnviarCorreo(entrada) {
    const entorno = process.env.NEXT_PUBLIC_ENTORNO;     
        
    if ( entorno == 'local' ) 
        return await reEnviarCorreo1(entrada)
    else {
        return await srvFn.reEnviarCorreo2(entrada)
    }    
}




export async function validarCodigo(entrada) {
    const entorno = process.env.NEXT_PUBLIC_ENTORNO;     
        
    if ( entorno == 'local' ) 
        return await validarCodigo1(entrada)
    else {
        return await validarCodigo2(entrada)
    }    
}
 

export async function recuperarPass(entrada) {
    const entorno = process.env.NEXT_PUBLIC_ENTORNO;     
        
    if ( entorno == 'local' ) 
        return await recuperarPass1(entrada)
    else {
        return await srvFn.recuperarPass2(entrada)
    }    
}


export async function validarCodigoPass(entrada) {
    const entorno = process.env.NEXT_PUBLIC_ENTORNO;     
        
    if ( entorno == 'local' ) 
        return await validarCodigoPass1(entrada)
    else {
        return await srvFn.validarCodigoPass2(entrada)
    }    
}



export async function cambiarContraseña(entrada) {
    const entorno = process.env.NEXT_PUBLIC_ENTORNO;     
        
    if ( entorno == 'local' ) 
        return await cambiarContraseña1(entrada)
    else {
        return await cambiarContraseña2(entrada)
    }    
}





/******************************************************************************************/



/**/    
/* Login.js */  
/**/ 
export async function loginUsuario2(entrada) {
  try {
    
    console.log("--login-2-----function--------------" ,  JSON.stringify(entrada))      
      
    const entorno = process.env.NEXT_PUBLIC_ENTORNO;             
    
    const usuario  = entrada.usuario
    const password = entrada.password    
    console.log("entorno:" + entorno + " usuario:" + usuario + "  psw:" + password)  
      
    let retorno = 0
    let mensaje = "Login OK"
    
    const res = await srvFn.getUsuarioRT(entrada , 2)  
      
    if (res == null) {
        mensaje = "Los datos ingresado no son valido"; 
        retorno = 999
    } 
      
    if (retorno == 0 ) {
       try {    
         let emailAuth = `${usuario}@buzzcon.com` 
         
         let aux = await srvFn.getUserFBA(usuario)
         console.log("user FBA" , aux )  
           
         const userCredential = await signInWithEmailAndPassword(auth, emailAuth, password);         
         if (!userCredential.user.emailVerified) {
             mensaje =  'Usuario no verificado';
             retorno = 999  
         }       
       }    
       catch (error){           
          console.log("error firebase Auth:" , error.message)   
          mensaje = "Los datos ingresado no son valido2" ;  
          retorno = 999
        }    

    }   
      
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
    
    console.log("--validar Nueva Cuenta-2---function-----------" ,  JSON.stringify(entrada))    
    const usuario   = entrada.usuario
    const password  = entrada.password    
    const email     = entrada.email
   
    console.log("usuario:" + usuario + "  psw:" + password + "  correo:" + email)  
    
    /* se valida a nivel base propia */
    const res = await srvFn.validarNvaCuenta2(entrada)    
                      
    let retorno = res.codRet
    let mensaje = res.message  
    
      
    if ( retorno == 0) {
        try{
           let emailAuth = `${usuario}@buzzcon.com`  
           let aux = await srvFn.getUserFBA(usuario)
           console.log("user FBA" , aux)  
      
           const userCredential = await signInWithEmailAndPassword(auth, emailAuth, password);         
           if (!userCredential.user.emailVerified) {
              mensaje =  'Usuario no verificado';
              retorno = 999  
           }       
        } catch (error) {
          retorno = 999
          mensaje = error.message    
        }
    }    
    
    return { codRet: retorno , message: mensaje };
    
  } catch (error) {
    return { codRet: 999 , message: error };
     
  }
}




/**/   
/* VerifyRegistratatio.js
/* Validar la url de registracion */    
/**/   
export async function validarCodigo2(entrada) {
  try {
    
    console.log("--validar Codigo2----function-----------" ,  JSON.stringify(entrada)) 
    const usuario          = entrada.user
    const codVerificacion  = entrada.code.substring(10);  
    
    let aux = await  srvFn.getCodeFBA(entrada.code)  
    console.log("codigo FBA" , aux )  
      
    console.log("usuario:" + usuario + "  codigo:" + codVerificacion)  
    
    /* se valida a nivel base propia */  
    const res = await srvFn.validarCodigo2(entrada)  
      
    let retorno = res.codRet
    let mensaje = res.message
    
    console.log ("salida de srvFn.ValidarCodigo2")
      
    if (retorno == 0 )  {
        try {
          console.log("applyActionCode") 
          await applyActionCode(auth, codVerificacion);    
            
          console.log("updateUsuarioRT")        
          await srvFn.updateUsuarioRT(null, usuario , {estado: 2,})    
            
        } catch (error) {
          retorno = 999
          mensaje = error.message    
        }
    }
      
    return { codRet: retorno , message: mensaje };
    
  } catch (error) {
     return { codRet: 999 , message: error.message };
  }
}



/**/    
/* Cambiar Contraseña ChangePass.js*/    
/**/   
export async function cambiarContraseña2(entrada) {
  try {
    
    console.log("--Server Cambiar Contraseña2--function-----------" ,  JSON.stringify(entrada))    
    const usuario          = entrada.usuario
    const password         = entrada.password
    const codVerificacion  = entrada.code.substring(10);  
    console.log("codigo FBA" , srvFn.getCodeFBA(entrada.code))  
      
    let retorno = 0
    let mensaje = ""
    
    try {     
        await confirmPasswordReset(auth, codVerificacion, password);
        //solo para probar se debe sacar la actualizacion en base propia 
         await srvFn.updateUsuarioRT(null, usuario , {password: password})    
        
    } catch (error) {
        retorno = 999
        mensaje = error.message    
    }
    
    return { codRet: retorno , message: mensaje };    
      
  } catch (error) {
    return { codRet: 999 , message: error };
  }
}











