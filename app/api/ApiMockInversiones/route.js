
//ApiMockInversiones
//import DataInversiones from '@/data/DataInversiones';
//import { loadInversiones, addInversion } from '@/utils/dataInversionesManager';

import { loadInversiones, addInversion } from '@/utils/datainversionesFireStoreServer';

export async function GET(request) {
  try {
    // Obtener los datos del cuerpo de la solicitud
    /*
    q:valorInput ,
    location: localidad ,
    area: areasSeleccionadas ,
    sustainability: sustentable ,     
    technologies:tecnologiasSeleccionadas ,
    contract: contrato
    */
    const { searchParams } = new URL(request.url);

    const q             = searchParams.get('q');  
    const localidad     = searchParams.get('location');
    const areas         = searchParams.get('area')  
    const sustentable   = searchParams.get('sustainability')  
    const tecnologias   = searchParams.get('technologies')  
    const contrato      = searchParams.get('contract')  
    const avance        = searchParams.get('devStage')  
    const inversion     = searchParams.get('is_Asking')
    const verificado    = searchParams.get('verify_level')
    
    console.log("q           :" , q);
    console.log("localidad   :" , localidad);
    console.log("areas       :" , areas );  
    console.log("sustentable :" , sustentable );
    console.log("tecnologias :" , tecnologias);
    console.log("contrato    :" , contrato );    
    console.log("avance      :" , avance );       
    console.log("inversion   :" , inversion );         
    console.log("verificado  :" , verificado );            
      
      
    //const page = parseInt(searchParams.get('page')) || 1;
    //const limit = parseInt(searchParams.get('limit')) || 10;   
      
    // Realiza la lógica que necesites con los datos recibidos
      
    const entrada = {q , localidad , areas , sustentable , tecnologias , contrato , avance , inversion , verificado};   
    
    const res = await getInversiones(entrada) ;         
    
    // Responde con un código 200 y un mensaje
    return new Response(JSON.stringify({ res }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: 'Hubo un error al procesar los datos' + error }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}


//para file local 
async function getInversiones2(entrada) {
    
  // Lógica para obtener los inveriones (ejemplo: desde una base de datos)
  console.log("desde get:" + JSON.stringify(entrada));    
    
  const DataInversiones = await loadInversiones();       
    
  var response = DataInversiones 
     
  if (entrada.q && entrada.q !=" ") {
    response = DataInversiones.filter(producto => producto.title === entrada.q);
  };
          
  if (entrada.localidad && entrada.localidad !=" ") {
    response = response.filter(producto => producto.location === entrada.localidad);
  };  
    
  
  if (entrada.inversion && entrada.inversion!=" ") {
      
    if (entrada.inversion == "true")  
        entrada.inversion = true 
    else 
        entrada.inversion = false
      
    console.log("inversiones2" , entrada.inversion)  
    response = response.filter(producto => producto.is_Asking === entrada.inversion);
  };  
   
    
 if (entrada.verificado && entrada.verificado !=" ") {
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
  
    

  if (entrada.sustentable && entrada.sustentable.trim() !== "") {
     const buscado = entrada.sustentable.trim().toLowerCase();
     response = response.filter(producto => {
         return producto.tags.some(tag => tag.toLowerCase() === buscado);
   });
  }    
    
  if (entrada.contrato && entrada.contrato.trim() !== "") {
     const buscado = entrada.contrato.trim().toLowerCase();
     response = response.filter(producto => {
         return producto.tags.some(tag => tag.toLowerCase() === buscado);
   });
  }        

  if (entrada.avance && entrada.avance.trim() !== "") {
     const buscado = entrada.avance.trim().toLowerCase();
     response = response.filter(producto => {
         return producto.tags.some(tag => tag.toLowerCase() === buscado);
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
    response = response.filter(producto => {
    return producto.tags.some(area => entrada.tecnologias.includes(area));
  }); 
  }      
    
    
  

  /*
  if (entrada.areas && entrada.areas.length > 0) {  
  response = response.filter(producto => {  
    return producto.tags2.areas.some(area => entrada.areas.includes(area));  }); 
  }      
  */      
 
  if (entrada.areas && entrada.areas.length > 0) {  
    response = response.filter(producto => {
    return producto.tags.some(area => entrada.areas.includes(area));  });   
  }          
   
    
    
  return response ;  
  
}


//para firebase
async function getInversiones(entrada) {
    
  // Lógica para obtener los inveriones (ejemplo: desde una base de datos)
  console.log("desde get Inverriones2:" + JSON.stringify(entrada));    
  
    
  const DataInversiones = await loadInversiones();       
  //console.log("dataInversiones:" , DataInversiones)
    
    
  var response = DataInversiones 
 
     
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
   
  
   
  if (entrada.inversion && entrada.inversion!=" ") {
      
    if (entrada.inversion == "true")  
        entrada.inversion = true 
    else 
        entrada.inversion = false
      
    console.log("inversiones2" , entrada.inversion)  
    response = response.filter(producto => producto.is_Asking === entrada.inversion);
  };  
       
    
    
    
    
 if (entrada.verificado && entrada.verificado !=" ") {
     console.log("busqueda por verificado")      
    response = response.filter(producto => producto.verify_level === entrada.verificado);
  };  
        
 
  if (entrada.sustentable && entrada.sustentable.trim() !== "") {
     const buscado = entrada.sustentable.trim().toLowerCase();
     response = response.filter(producto => {       
        return Array.isArray(producto.tags) &&
              producto.tags.some(tag => tag.toLowerCase() === buscado);
      });
    }

    
    
  if (entrada.contrato && entrada.contrato.trim() !== "") {
     const buscado = entrada.contrato.trim().toLowerCase(); 
    response = response.filter(producto => { 
        return Array.isArray(producto.tags) &&
              producto.tags.some(tag => tag.toLowerCase() === buscado);
      });
    }
  
    
  if (entrada.avance && entrada.avance.trim() !== "") {
     const buscado = entrada.avance.trim().toLowerCase();
    response = response.filter(producto => {
        return Array.isArray(producto.tags) &&
              producto.tags.some(tag => tag.toLowerCase() === buscado);
      });
    }    

  
   
  if (entrada.tecnologias && entrada.tecnologias.length > 0) {
    console.log("entre tecnologias:" , entrada.tecnologias.length)   
    response = response.filter(producto => {
    return Array.isArray(producto.tags) &&
         producto.tags.some(area => entrada.tecnologias.includes(area));
  }); 
  }      
    
  
  
    
  if (entrada.areas && entrada.areas.length > 0) {   
    response = response.filter(producto => {
    return Array.isArray(producto.tags) &&
         producto.tags.some(x => entrada.areas.includes(x));
   }); 
   }  
    
  return response ;  
}
    


