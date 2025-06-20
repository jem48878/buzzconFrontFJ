import { loadInversiones, addInversion } from '@/utils/dataInversionesManager';
//import DataInversiones from '@/data/DataInversiones';

export async function GET(request) {
  try {
    
    const { searchParams } = new URL(request.url);

    const owner     = searchParams.get('owner');  
    const title     = searchParams.get('title');
    
    
      
    console.log("owner       :" , owner);
    console.log("title       :" , title);
         
          
    const entrada = {owner , title};   
    
    console.log("entrada:" + entrada.owner + ' ' + entrada.title)  
    const res = await getInversion(entrada) ;         
    console.log ("detalle Respuesta:" , res )
      
    if (res == null) {
    return new Response(JSON.stringify({ message: 'Datos no encontrados' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
     });
    }  
      
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



async function getInversion(entrada) {  
    
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


