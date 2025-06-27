import { addUsuario , loadUsuario , updateInversion } from '@/utils/dataUsuariosFireBase';

    
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
  console.log("desde get login usuario:" + JSON.stringify(entrada));        
  console.log("desde get login opcion:" + opcion);            
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
    
  //console.log('Salida :' , JSON.stringify(usuario) )
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
    if ( res == null || res.estado != 2) {
       const ahora           = new Date();
       const fechaAlta       = ahora.toLocaleDateString('es-AR'); 
       const horaAlta        = ahora.toLocaleTimeString('es-AR'); 
       const estado          = 0  ;
       const codVerificacion =  generarIdUnico() ;
    
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
    
    if (res == null ) {  
      /*    
      const res2 = await fetch('/api/ApiSendEmail', {
        method: 'POST',
        headers: {
         'Content-Type': 'application/json',
         },
        body: JSON.stringify({
        to: 'jem48878@hotmail.com',
        subject: '¡Hola!',
        message: 'Este es un correo de prueba desde Resend.',
       }),
     }); 
     */
     const res2= await fetch('/api/ApiSendEmail', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({
         title: 'Consulta desde el sitio',
         name: 'Esteban Jaime',
         email: 'estebanjaime01@yahoo.com.ar',
         message: 'Hola, esto es una prueba desde EmailJS usando backend.',
         }),
     });    
        
        
     const data = await res2.json();
     console.log("Respuesta completa de Resend:", data);
     if (data.data?.error) {
        console.log("❌ Error de envío:", data.data.error);
     } else {
        console.log("✅ Envío exitoso:", data.data);
     }
    
        
        
        
        
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












