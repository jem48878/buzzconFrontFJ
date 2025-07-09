
//desde el cliente
//funciones de DataUsuarios desde firebase realtime database
//manejo plano , se lee todo el json y se trabaja con javascript 
//escalable reemplazo de lectura plana puntulaes / queries etc... 

import { addUsuario , loadUsuario , updateInversion } from '@/utils/dataUsuariosFireBase';

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
    //return { mensaje };  
    
  } catch (error) {     
     return { codRet: 999 , message: error };
     //throw new Error (error);   
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
          await updateInversion(res.id, nvoUsuario);
       }    
    }    
    else {
        retorno = 999    
        mensaje = "Usuario ya registrado"; 
    }  
   
      
    /*
    if (res == null ) {
        const res2 = await fetch('/api/ApiSendEmail', {
        method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
            to: 'estebanjaime01@yahoo.com.ar',
            subject: 'Hola desde Next.js',
            message: 'Este es un correo de prueba',
       }),
      });
        
      const result = await res2.json();
      if (result.success) {
         console.log('Correo enviado con éxito');
       } else {
         console.log('Error al enviar: ' + result.error);
       } 
    }  
    */
    /*
    if (res == null ) {  
      const res2 = await fetch('/api/ApiSendEmail', {
        method: 'POST',
        headers: {
         'Content-Type': 'application/json',
         },
        body: JSON.stringify({
        to: 'estebanjaime01@yahoo.com.ar',
        subject: '¡Hola!',
        message: 'Este es un correo de prueba desde Resend.',
      }),
   });

   const data = await res2.json();
   console.log(data);
   }
   */ 
    
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
export async function validarNvaCuenta(entrada) {
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
export async function reEnviarCorreo(entrada) {
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
export async function validarCodigo(entrada) {
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
                   await updateInversion(res.id, {                     
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
export async function recuperarPass(entrada) {
  try {
    
    console.log("--Recuperar Contraseña--function-----------" ,  JSON.stringify(entrada))    
    const usuario   = entrada.usuario
    
    let retorno = 0
    let mensaje = ""
        
    const dominio = process.env.NEXT_PUBLIC_DOMINIO      
      
    const res = await getUsuario(entrada , 2 ) ;   
    console.log("usuario:" + usuario +  " correo:" + res.email) 
      
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
        await updateInversion(res.id, cambioPass);
                
        const url = `${dominio}/Access/ChangePass/${usuario}/${codVerificacionPass}`   
        console.log("Url cambio pass correo:" , url)
        /*  para correo con url cambiar contraseña
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
export async function cambiarContraseña(entrada) {
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
        await updateInversion(res.id, nvaPass);
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
export async function validarCodigoPass(entrada) {
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

    console.log('✅ Correo enviado Msg:', result.text);
  } catch (error) {
    console.error('❌ Error al enviar Msg:', error);
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

    console.log('✅ Correo enviado Link:', result.text);
  } catch (error) {
    console.error('❌ Error al enviar Link:', error);
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




/***********************************************************************************************/
/***********************************************************************************************/
/***********************************************************************************************/
//fj-3

import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { signInWithEmailAndPassword , signOut } from 'firebase/auth';
import { getDatabase, ref, query, orderByChild, equalTo, get , child } from 'firebase/database';
import { database , auth }  from '@/src/firebase';


export async function crearCuenta(entrada) {
    const entorno = process.env.NEXT_PUBLIC_ENTORNO;     
    
    const opcion = 1 
    if ( opcion == 1 ) 
        return await crearCuenta1(entrada)
    else {
        return await crearCuenta2(entrada)
    }    
}


export async function loginUsuario(entrada) {
    const entorno = process.env.NEXT_PUBLIC_ENTORNO;     
    const opcion = 1 
    if ( opcion == 1 ) 
        return loginUsuario1(entrada)
    else 
        return loginUsuario2(entrada)
}






/**/    
/* Register.js */    
/**/
export async function crearCuenta2(entrada) {
  try {
    
    console.log("--Register-2---function-----------" ,  JSON.stringify(entrada))    
    const usuario  = entrada.usuario
    const password = entrada.password    
    const email    = entrada.email
    console.log("usuario:" + usuario + "  psw:" + password + "  correo:" + email)  
      
    let retorno = 0
    let mensaje = "alta OK"
    
    
    const res = await getUsuario(entrada , 2 ) ;  
    
    let url =""
    
    let userCredential = null;
    let user = null ;    
    
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
        
         
       //1 genera url y codigo para vincualar a url propia
       console.log("Nuevo Cliente");   
       userCredential = await createUserWithEmailAndPassword(auth, email, password);  
       console.log("Nuevo Cliente2");   
       const res2 = await fetch('/api/ApiObtenerCodigoVerificacion', {
             method: 'POST',
            headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify({ email }),
       });

       const data = await res2.json();
       if (!data.success) throw new Error(data.error);
       console.log("oobCode verificacion FB :" , data.oobCode)  
          
       //genera url 
        
       
       //2 crea un usuario en la base de usuarios de firebase auth 
       //hay que autorizar el dominio para usar actionCodeSetting y https para produccion    
          
       /* 
       let url = `${dominio}/Access/VerifyRegistration/${usuario}/` 
       
       console.log("url para actionCodeSetting:" , url )
       
       const userCredential = await createUserWithEmailAndPassword(auth, email, password);       
        
        
       const actionCodeSettings = {
             url: url, // Firebase agregará ?oobCode=...
             handleCodeInApp: false,
        };
       await sendEmailVerification(userCredential.user, actionCodeSettings);    
       console.log("Url verificacion FB :" , actionCodeSettings)  
       */
        
       
        
        
       url = `${dominio}/Access/VerifyRegistration/${usuario}/${codVerificacion}`   
       const nvoUsuario = {usuario , password , email , fechaAlta , horaAlta , estado , codVerificacion , fechaChgPass , horaChgPass , codVerificacionPass }; 
       if (res == null) {
          await addUsuario(nvoUsuario);
       }
       else{
          await updateInversion(res.id, nvoUsuario);
       }  
       
        
       
       
       if (res !== null) {    
           try {
             userCredential = await signInWithEmailAndPassword(auth, email, password);
             //user = userCredential.user;
             //await signOut(auth); // lo deslogueás si no querés que siga autenticado
             console.log("re-enviar")    
               
           } catch (error) {
            
             console.log("Re-enviar con cambio de correo");
             userCredential = await createUserWithEmailAndPassword(auth, email, password);      
           }  
       }
       else {
          console.log("Nuevo Cliente");   
          userCredential = await createUserWithEmailAndPassword(auth, email, password);               
       }
       
       console.log("nueva opcion")           
           
       user = userCredential.user;    
    
       /*    
       const actionCodeSettings = {
          url: url, // Firebase agregará ?oobCode=... al final
          handleCodeInApp: false,
       };    
       await sendEmailVerification(user, actionCodeSettings);
       */
        
       await sendEmailVerification(user, {
             url: url,
             handleCodeInApp: false
        });    
        
       console.log("nueva opcion fin ")        
       
           
       //3 manda correo directamente desde firebase url no propia
       //const userCredential = await createUserWithEmailAndPassword(auth, email, password);    
       //await sendEmailVerification(userCredential.user);    
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
    
    /* 
    console.log("acceso a firebase getUsuario local ");   
    const res = await getUsuario(entrada , 2 ) ;    
    if (res == null) {         
        mensaje = "Los datos ingresado no son valido"; 
        retorno = 999
    } 
    */         
    
    console.log("acceso a firebase");   
    let res = null;  
    let id  = null   
    const dbRef = ref(database, 'dataUsuario');
    const q = query(dbRef, orderByChild('usuario'), equalTo(usuario));
    const data = await get(q);  
    if (!data.exists()) {
        mensaje = "Los datos ingresado no son valido"; 
        retorno = 999
    } 
    else
    {  
      id  = Object.keys(data.val())[0]; 
      res = Object.values(data.val())[0];
      /*    
      console.log("salida funcion query FB:" + JSON.stringify(data));     
      console.log("salida funcion query FB:" + JSON.stringify(res));              
      console.log("id:" , id) 
      console.log("correo:" , res.email)     
      */    
    }
      
    if (retorno == 0 ) {
       console.log("emj1")
       try {    
         const userCredential = await signInWithEmailAndPassword(auth, res.email, password);
         console.log("emj2")
         if (!userCredential.user.emailVerified) {
             mensaje =  'Correo no verificado';
             retorno = 999  
         }       
       }    
       catch (error){           
          mensaje = "Los datos ingresado no son valido2"; 
          retorno = 999
        }    
         
           
    }   
      
    return { codRet: retorno , message: mensaje };
    
  } catch (error) {     
     return { codRet: 999 , message: error };
  }
}







