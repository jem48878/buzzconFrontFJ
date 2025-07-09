
//archivo local en /Data no se puede usar desde vercell
//import { loadInversiones, addInversion } from '@/utils/dataInversionesManager';

//firebase json en la nube opcion FireStore desde el server 
//import { loadInversiones, addInversion } from '@/utils/dataInversionesFireStoreServer';

//firebase realtime database desde el cliente y servidor
import { loadInversiones, addInversion } from '@/utils/dataInversionesFireBase';

                                                       
//localhost:3000/api/ApiMockAgregar
//  owner:string
//	title:string
//  verified:enum
//  isAsking:bool
//	summary:string?
//	location:string?
//	tags:string[]?
//	description:string?
//	contactInfo:string?

export async function POST(request) {
  try {
      
    console.log("+++++ApiAgregarInversiones++++++");    
      
    // Obtener los datos del cuerpo de la solicitud
    const body = await request.json();
    
    const owner        = body.owner
    const title        = body.title
    const verify_level = body.verify_level
    const is_Asking    = body.is_Asking
    const summary      = body.summary 
    const location     = body.location
    let tags         = body.tags            //para firebase
    const description  = body.description
    const contactInfo  = body.contactInfo
    
    const imagen       = ""
    
    console.log("--agregar-------api------------")
    console.log("owner        :"  + owner ) 
    console.log("title        :"  + title )   
    console.log("tags         :"  + tags )    
     
    
      
    //para firebase  
    if (tags.length == 0) {
        tags = [""]
    }  
      
      
    
    const entrada = {owner , title , summary , location , imagen ,   is_Asking , verify_level , tags ,  description , contactInfo};   
        
    await addInversion(entrada);  
        
    // Responde con un código 200 y un mensaje
    return new Response(
     {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
     }
    );
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
  
  const inversion = 
         DataInversiones.find(empresa => empresa.owner === owner && empresa.title ===   title);
  return inversion?.imagen || '/sinFoto.png';
  
  
  
}
