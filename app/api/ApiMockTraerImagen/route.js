//import DataInversiones from '@/data/DataInversiones';
import { loadInversiones, addInversion } from '@/utils/dataInversionesManager';

//localhost:3000/api/ApiMockTraerImagen
//{"owner":owner-1 , "title":"title%201"}

export async function POST(request) {
  try {
    // Obtener los datos del cuerpo de la solicitud
    const body = await request.json();
    
    const owner = body.owner
    const title = body.title
    //console.log("------------------------")
    //console.log("owner1:" + owner + " " + title)
    
    const data = await getImagen(owner , title ) ;    
    
    // Responde con un código 200 y un mensaje
    return new Response(JSON.stringify({ data }), {
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



async function getImagen(owner , title) {
  const DataInversiones = await loadInversiones();    
  const inversion = 
         DataInversiones.find(empresa => empresa.owner === owner && empresa.title ===   title);
  return inversion?.imagen || '/sinFoto.png';
  
  
  
}
