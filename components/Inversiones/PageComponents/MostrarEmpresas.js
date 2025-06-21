
import MyContext from '@/contexts/MyContext';
import { useState, useEffect , useContext } from 'react';
import React from 'react';
import Link from 'next/link';
//import { useRouter } from 'next/navigation';
import { FaPlus } from "react-icons/fa";

import { FaCheck } from "react-icons/fa";

import TraerImagen from '@/components/Inversiones/PageComponents/TraerImagen';

import Image from 'next/image';  //nuevo

import { searchInversiones } from '@/utils/dataInversionesFunction';


function MostrarEmpresas() {

  const [data, setData] = useState([]); 
  const [loading, setLoading] = useState(true);   
  const [error, setError] = useState(null);        
    
  const {rsBsqEmpresas, setRsBsqEmpresas} = useContext(MyContext); 
  
  const rutaImagen = process.env.NEXT_PUBLIC_URL_IMAGENES   
    
  const entorno = process.env.NEXT_PUBLIC_ENTORNO;  //nuevo    
  
     
    
    
  useEffect(() => {
  const fetchData = async () => {
    try {  
        
      let dataEmpresas = null      //nuevo
      console.log("ENTORNO:" , entorno)        
      if ( entorno == 'local') {   //nuevo
          const entrada = "" ;
          dataEmpresas = await searchInversiones(entrada)
          
      }       
      else {
        
        //const response = await fetch('/api/ApiMockInversiones');  
        const url = process.env.NEXT_PUBLIC_API_BUSCAR_INVERSIONES;    
        const response = await fetch(url, {
            method: 'GET',
        });
        dataEmpresas = await response.json();
      }      
        
      setRsBsqEmpresas(null);
      setRsBsqEmpresas(dataEmpresas.res);

      setLoading(false);
      console.log('resp empresas Mostar empresas:', dataEmpresas.res);
    } catch (error) {
      console.error("Error al cargar empresas :", error);
      // setError(error);
    }
  };

  fetchData();
  }, []);    
       
    
    
  if (loading) { 
    return <p>Loading...</p>
  }          
    

  /*
  const handleClick = (owner, title) => {  
    router.push(`/Detalle?owner=${owner}&title=${title}`);
  };  
  */    

    
  return (
     <>
     <br/>
     
     <div className="container-empresas">
         {rsBsqEmpresas.map((item) => ( 
            <div key={item.owner + item.title} className={`container-emp ${item.is_Asking ? 'fondo-0' : 'fondo-1'}`}
               style={{ cursor: 'pointer'}}>
            <Link href={`/Inversiones/Detalle?owner=${item.owner}&title=${item.title}`}>

               {item.verify_level && item.verify_level !=='not_verified' && (
                  <FaCheck  className={`fa-check ${item.verify_level == 'verified' ? 'check-2' : 'check-1'  }` } />  
               )}          
               <div className="detalle-emp">
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <img
                      src={`${rutaImagen}/inversion-${item.owner}-${item.title}-0.jpg`}
                      className="img-emp"
                      alt={item.title}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/sinFoto.png';
                      }}
                      width={40}
                      height={40}
                      style={{ objectFit: 'contain' }}
                    />

                    <p style={{ 
                      fontSize: '14px', 
                      fontWeight: 'bold',  
                      color: '#000000', 
                      marginTop: '0.5rem', 
                      textAlign: 'center' 

                    }}>
                      {item.owner}
                    </p>
                  </div>
                <div className="descripcion-emp">
                    <p style={{ fontSize: '20px', fontWeight: 'bold' }}>
                    {item.title}
                    </p><br/>
                    {item.summary && (
                    <p style={{background : 'grey', borderRadius:'20px' , padding: '10px'}}>
                    {item.summary}
                    </p>
                    )}
                    <br/>
                    <p>
                    Localidad: {item.location !=='' ? item.location : 'No informada'}
                    </p>
                  </div>
                </div>
             </Link>
             </div>
          ))}
     </div> 

     <Link href='/Inversiones/Agregar'>
     <button className="icono-fijo">
       <FaPlus />
     </button>
     </Link>
     </>
  )  
}

export default MostrarEmpresas;