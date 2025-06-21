'use client'; // Necesario para usar hooks en App Router

import { useState, useEffect , useContext } from 'react';
import React from 'react';

import MyStyles      from  '@/components/MyStyles.css';   
import TraerImagen   from  '@/components/Inversiones/PageComponents/TraerImagen';
import MostrarFotos  from  '@/components/Inversiones/DetalleComponents/MostrarFotos';

import { FaCheck } from "react-icons/fa";
import { CheckBadgeIcon } from '@heroicons/react/24/solid'  
import ModalAlerta   from '@/components/ModalAlerta.js';   

import { searchUnaInversion } from '@/utils/dataInversionesFunction';

function DetalleInversion({ owner , title , opcion}) {
    
   const [modalAbierto, setModalAbierto] = useState(false);       
    
   const [loading, setLoading] = useState(true);       
   const [data, setData] = useState([]);     
   const [mensaje, setMensaje] = useState(null);       
   
   console.log("Detalle owner:" , owner)    
   console.log("Detalle title:" , title)        
    
   //para Habilitar boton volver    
   //const router = useRouter(); 
    
   //Para poder detectar la vuelta desde Mostrar Imagen
   useEffect(() => {
     localStorage.setItem('volviendoDesdeDetalle', 'true');
   }, []);
    
    
   const entorno    = process.env.NEXT_PUBLIC_ENTORNO;     
   const rutaImagen = process.env.NEXT_PUBLIC_URL_IMAGENES       
    
   useEffect(() => {
   const fetchData = async () => {
    try {
      
      let dataRes = null    //nuevo
       
      if ( entorno == 'local') {    //nuevo
           
          const entrada = {owner , title };   
          dataRes = await searchUnaInversion(entrada)
      }
      else {  //nuevo
        
        const url = process.env.NEXT_PUBLIC_API_DETALLE_INVERSION;    
        
        const queryParams = new URLSearchParams({ owner: owner ,
                                                title: title 
                                              });      
        //const response = await fetch(`/api/ApiMockDetalleInversion?${queryParams.toString()}`, {  
        const response = await fetch(`${url}?${queryParams.toString()}`, {
             method: 'GET',
        });
        dataRes = await response.json(); //nuevo
       }   // fin nuevo else    
      
      setData(dataRes.res);  //nuevo

      setLoading(false);
      console.log('resp empresas2:', dataRes.res);  //nuevo
    } catch (error) {
      console.error("Error al cargar empresas:", error);
      // setError(error);
    }
  };

  fetchData();
  }, []);    
       
    
    
  if (loading) { 
    return <p>Loading...</p>
  }          
        
    
      
   
  return (
    <>   
      
      <form>
        <div className="container-detalle-inv"> 
          {/*cabecera*/}
          <div className="cabecera-container-inv">       
            <div className="cabecera-imagen-inv" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: '20px', fontWeight: 'bold'}}>               
              <img
                    src={'${rutaImagen}/inversion-' + data.owner + '-' + data.title + '-0.jpg'}
                    alt={data.title}
                    onError={(e) => {
                      e.target.onerror = null; 
                      e.target.src = '/sinFoto.png';
                    }}
              />
            <p>{data.owner}</p>
            </div>              
            <div className="cabecera-summary-inv">               
                {data.verified > 0 && (
                  <FaCheck  className={`fa-check-badge  ${data.verified ==1 ? 'check-1' : 'check-2' }` } />
                )}
                {data.verify_level && data.verify_level !=='not_verified' && (
                  <FaCheck  className={`fa-check ${data.verify_level == 'verified' ? 'check-2' : 'check-1'  }` } />  
              )}
                <div>             
                    <p style={{ fontSize: '20px', fontWeight: 'bold' }}>
                    {data.title}
                    </p>
                    <span>{data.is_Asking ? "Ofrece Inversion" : "Buscar Inversion"}</span>       
                    <p style={{background : 'white', color:'black', borderRadius:'20px' , padding: '10px'}}>
                    {data.summary}
                    </p>
                    <p>
                    Localidad:{data.location}
                    </p>                 
                </div>
              </div>   
          </div> 
          {/* {fin cabecera */}
          <br/>
          {/*tag sin descripciones*/} 
          <p className="tag-titulo-inv">Caracteristicas</p>  
          <div className="tag-container-inv">                    
            {data.tags.map((item, i) => ( 
            <div key={i} className="tag-inv">                              
            {item}  
            </div>
            ))}
          </div>
          <div className="descripcion-container-inv">
              <div className="descripcion-box">                   
                  {data.description}
              </div>
          </div>      

          {/*FOTOS*/} 
          <div className="fotos-container-inv">            
          <MostrarFotos owner={owner} title={title} opcion={opcion} />     
          </div>            

          {/*<p>{mensaje}</p>*/}
          <br/>
      
              
       </div>   {/*fin container-detalle-inv */}

      </form>
      {/*
      <br/>
      <button type="button" onClick={() => router.back()}>
        ← Volver
      </button>
      <br/>
      */} 
    </>

  );



  
}
export default DetalleInversion;