//lado cliente
//funciones de DataInversiones desde firebase realtime database / firestore
//manejo plano , se lee todo el json y se trabaja con javascript 
//obs: -firestore mas potente a nivel de consultas se puede usar where etc...-
//escalable reemplazo de lectura plana por queries etc... 

//import { loadInversiones, addInversion } from '@/utils/dataInversionesFireStore';

import { loadInversiones, addInversion } from '@/utils/dataInversionesFireBase';




/**/    
/* consulta de Inversiones todas o con filtro */    
//const entrada = {q , localidad , areas , sustentable , tecnologias , contrato , avance , //inversion , verificado}; 
/**/   


export async function searchInversiones(entrada) {
    try  {
      console.log("uso de FireBase Function")    
      const res = await getInversiones(entrada) ;         
      return { res }; 
    }
    catch{
      return { res: [], error: 'Hubo un error al procesar los datos' };
    }
          
}
        
        

async function getInversiones(entrada) {
    
  // Lógica para obtener los inveriones (ejemplo: desde una base de datos)
  console.log("desde get Inverriones:" + JSON.stringify(entrada));    
  
    
  const DataInversiones = await loadInversiones();       
  console.log("dataInversiones:" , DataInversiones)
    
    
  var response = DataInversiones 
  
  
  
  
  //console.log("dataInversiones" + JSON.stringify(response));    
     
  if (entrada.q && entrada.q !=" ") {
    response = DataInversiones.filter(producto => producto.title === entrada.q);
  };
          
  if (entrada.localidad  && entrada.localidad !=" ") {
    response = response.filter(producto => producto.location === entrada.localidad);
  };  
    
  
  if (entrada.prmInversion != null && entrada.prmInversion !=="") {    
    console.log("inversiones2" , entrada.prmInversion)  
    response = response.filter(producto => producto.is_Asking === entrada.prmInversion);
  };  
   
    
 if (entrada.verificado && entrada.verificado !=" ") {
     console.log("busqueda por verificado")      
    response = response.filter(producto => producto.verify_level === entrada.verificado);
  };  
        
    
  
  //if (entrada.sustentable && entrada.sustentable!=" ") {    
  //    response = response.filter(producto => producto.tags2.sustainability === entrada.sustentable);
  //};      
  
    
  //if (entrada.contrato && entrada.contrato !=" ") {
  //    response = response.filter(producto => producto.tags2.contract === entrada.contrato);
  //};
      
  //if (entrada.avance && entrada.avance !=" ") {
  //    response = response.filter(producto => producto.tags2.devStage === entrada.avance);
  //};
  
    
  /*   
  if (entrada.sustentable && entrada.sustentable.trim() !== "") {
     
     const buscado = entrada.sustentable.trim().toLowerCase();
     console.log("busqueda por sustentable:" , buscado)    
     response = response.filter(producto => {
         return producto.tags.some(tag => tag.toLowerCase() === buscado );
   });
  }    
    
  if (entrada.contrato && entrada.contrato.trim() !== "") {    
     const buscado = entrada.contrato.trim().toLowerCase();
      console.log("busqueda por contrato:" , buscado)      
     response = response.filter(producto => {
         return producto.tags.some(tag => tag.toLowerCase() === buscado);
   });
  }   
  
  if (entrada.avance && entrada.avance.trim() !== "") {
      
     const buscado = entrada.avance.trim().toLowerCase();
     console.log("busqueda por avance:" , buscado)      
     response = response.filter(producto => {
         return producto.tags.some(tag => tag.toLowerCase() === buscado);
   });
  }            
  
  */
 
  if (entrada.sustentable && entrada.sustentable.trim() !== "") {
     const buscado = entrada.sustentable.trim().toLowerCase();
     response = response.filter(producto => {       
        return Array.isArray(producto.tags) &&
              producto.tags.some(tag => tag.toLowerCase() === buscado);
      });
    }

  
     
    
    
  if (entrada.contrato && entrada.contrato.trim() !== "") {
     const buscado = entrada.contrato.trim().toLowerCase();
     //console.log("busqueda por contrato:", buscado);
    response = response.filter(producto => {
        //console.log("producto.tags:", producto.tags);
        return Array.isArray(producto.tags) &&
              producto.tags.some(tag => tag.toLowerCase() === buscado);
      });
    }

  //console.log("response contrato:", JSON.stringify(response));    
    
  if (entrada.avance && entrada.avance.trim() !== "") {
     const buscado = entrada.avance.trim().toLowerCase();
    response = response.filter(producto => {
        return Array.isArray(producto.tags) &&
              producto.tags.some(tag => tag.toLowerCase() === buscado);
      });
    }    

     
    
  
    
  /* 
  console.log("technologies:" , entrada.tecnologias);  
  if (entrada.tecnologias && entrada.tecnologias.length > 0) {
  console.log("entro technologies");         
  response = response.filter(producto => {
    console.log("some Tecno:" + producto.tags2.technologies);                            
    return producto.tags2.technologies.some(area => entrada.tecnologias.includes(area));
  }); 
  }  
  */

   
   
  if (entrada.tecnologias && entrada.tecnologias.length > 0) {
    console.log("entre tecnologias:" , entrada.tecnologias.length)   
    response = response.filter(producto => {
    return Array.isArray(producto.tags) &&
         producto.tags.some(area => entrada.tecnologias.includes(area));
  }); 
  }      
    
   
 
    
  

  /*
  if (entrada.areas && entrada.areas.length > 0) {  
  response = response.filter(producto => {  
    return producto.tags2.areas.some(area => entrada.areas.includes(area));  }); 
  }      
 
  if (entrada.areas && entrada.areas.length > 0) {  
    response = response.filter(producto => {
    return producto.tags.some(x => entrada.areas.includes(x));  });   
  }          
 
   */      
 
    
  if (entrada.areas && entrada.areas.length > 0) {   
    response = response.filter(producto => {
    return Array.isArray(producto.tags) &&
         producto.tags.some(x => entrada.areas.includes(x));
   }); 
   }  
    
  return response ;  
}
    
    
    
/**/    
/* consulta de una Inversion */    
/**/   
 
export async function searchUnaInversion(entrada) {
    try  {
      console.log("uso de FireBase UnaInversion Function", )    
      const res = await getUnaInversion(entrada) ;         
      return { res }; 
    }
    catch{
      return { res: [], error: 'Hubo un error al procesar los datos' };
    }          
}
    
    
    
async function getUnaInversion(entrada) {  
  console.log("desde get Una Inverriones:" + JSON.stringify(entrada));        
    
  const DataInversiones = await loadInversiones();    
    
  //console.log("dataInversiones:" + JSON.stringify(DataInversiones));    
  //console.log("entrada.owner get:" + entrada.owner);        
  //console.log("entrada.titler get:"+ entrada.title);            
  
  //const inversion = DataInversiones.find(inversion => inversion.owner === entrada.owner && //inversion.title === entrada.title);
  
  
  const inversion = DataInversiones.find(inversion => 
  inversion.owner.trim() === entrada.owner.trim() &&
  inversion.title.trim() === entrada.title.trim()
  );    
    
  return inversion || null;      
    
}    
   
    
    
/**/    
/* Alta de Inversion */    
/**/   
    
export async function agregarInversion(entrada) {
  try {
    
    console.log("--agregar-----------function--------" ,  JSON.stringify(entrada))
    //console.log("owner        :"  + entrada.owner ) 
    //console.log("title        :"  + entrada.title )   
    //console.log("tags         :"  + entrada.tags )    
    //console.log("prmInversion :"  + entrada.prmInversion )    
    
      
   
    const owner        = entrada.owner
    const title        = entrada.title
    const verify_level = entrada.verificado
    const is_Asking    = entrada.prmInversion
    const summary      = entrada.summary 
    const location     = entrada.localidad
    let tags           = entrada.tags
    const description  = entrada.description
    const contactInfo  = entrada.contactInfo
    
     
    if (tags.length == 0) {
        tags = [""]
    }
    
    
    const imagen       = ""
        
    const inversion = {owner , title , summary , location , imagen ,   is_Asking , verify_level , tags ,  description , contactInfo};   
      
    //console.log("--inversion---------------------" ,  JSON.stringify(inversion))  
      
    await addInversion(inversion);  
    
    return { codRet: 0 , error: 'alta OK ' };
    
  } catch (error) {
     return { codRet: 999 , error: error };
  }
}

