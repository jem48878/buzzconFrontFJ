import { addUsuario , loadUsuario , updateInversion } from '@/utils/dataUsuariosFireBase';
import emailjs from 'emailjs-com';
    
/**/    
/* Login */    
/**/   
    
export async function loginUsuario(entrada) {
  try {
    
    const entorno = process.env.NEXT_PUBLIC_ENTORNO;             
    
    console.log("--login------function--------------" ,  JSON.stringify(entrada))    
    
    const usuario  = entrada.usuario
    const password = entrada.password    
    console.log("entorno:" + entorno + " usuario:" + usuario + "  psw:" + password)  
    
    let retorno = 0
    let mensaje = "Login OK"
    
    /*  para subir 
    if (usuario == "fj111269" ) {
        if (password !== "prueba") {
           retorno = 999
           mensaje = "los datos ingresado no son valido";            
        }  
    }    
    else{       
       retorno = 998
       mensaje = "Los datos ingresado no son validos";     
    }    
    */
    const res = await getUsuario(entrada , 1 ) ;   
    console.log("salida funcion getUsuario:" + JSON.stringify(res));          
      
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
          
          
    default:
      break;
  }
    
  console.log('Salida getUsuario:' , JSON.stringify(usuario) )
  return usuario || null;      
}    



/**/    
/* Register */    
/**/   
    
export async function crearCuenta(entrada) {
  try {
    
    console.log("--Register----function-----------" ,  JSON.stringify(entrada))    
    const usuario  = entrada.usuario
    const password = entrada.password    
    const email  = entrada.email
    console.log("usuario:" + usuario + "  psw:" + password + "  correo:" + email)  
      
    let retorno = 0
    let mensaje = "alta OK"
    
    /*  para subir
    if (usuario == "fj111269" ) {                 
        mensaje = "Usuario ya registrado"; 
        retorno = 999
    }        
    */
    
    const res = await getUsuario(entrada , 2 ) ;  
    
    let url =""
    
    if ( res == null || res.estado != 2) {
       const ahora           = new Date();
       const fechaAlta       = ahora.toLocaleDateString('es-AR'); 
       const horaAlta        = ahora.toLocaleTimeString('es-AR'); 
       const estado          = 0  ;
       const codVerificacion = generarIdUnico() ;
       const dominio = process.env.NEXT_PUBLIC_DOMINIO  
         
       url = `${dominio}/Access/VerifyRegistration/${usuario}/${codVerificacion}`   
       const nvoUsuario = {usuario , password , email , fechaAlta , horaAlta , estado , codVerificacion }; 
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
      
   if (retorno === 0) {
      await enviarEmailLink({        
        email: email,
        time: new Date(),
        link: url,
      });
    }  
        
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
    
    /*
    if (usuario == "fj111269" ) {        
        retorno = 0    
        mensaje = "Usuario validdo"; 
    }    
    else{
       retorno = 999    
       mensaje = "usuario no validado";     
    }    
    */
    
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
      
    /* para subir*/  
    /*  
    if (entrada.usuario == "fj111269") {        
        retorno = 0
        mensaje = "Usuario Validado"
    } 
    */
    /*fin para dubir */  
      
    return { codRet: retorno , message: mensaje };
    
  } catch (error) {
     return { codRet: 999 , message: error };
  }
}

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

/**/    
/* Validaciones Registracion */    
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


/**/    
/* Recuperar Contraseña */    
/**/   
export async function recuperarPass(entrada) {
  try {
    
    console.log("--Recuperar Contraseña--function-----------" ,  JSON.stringify(entrada))    
    const usuario   = entrada.usuario
    
    let retorno = 0
    let mensaje = ""
    
    const res = await getUsuario(entrada , 2 ) ;   
    console.log("usuario:" + usuario +  " correo:" + res.email) 
    if ( res !== null) {        
        let mensaje = `Le informamos su password registrado en BuzzconFJ: ${res.password}`         
        await enviarEmailMsg({        
        title: "BuzzconFJ  Recupero de Contraseña",    
        name: res.usuario,    
        email: res.email,
        message : mensaje    
      });   
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
        console.log("url:" , url)
        await enviarEmailLink({        
        email: email,
        time: new Date().toLocaleTimeString('es-AR') ,
        link: url,
      });
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


