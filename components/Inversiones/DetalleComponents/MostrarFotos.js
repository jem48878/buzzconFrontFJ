'use client'; // Necesario para usar hooks en App Router


import MyStyles      from  '@/components/MyStyles.css';   

import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

//import { useRouter } from 'next/navigation';
//import { useSearchParams } from 'next/navigation';

import { useState, useEffect , useContext } from 'react';
import React from 'react';

import { FaFileUpload } from "react-icons/fa";  
 

function MostrarFotos({ owner , title , opcion}) {
    
  const [mensaje, setMensaje] = useState(null);       
   
  const [nroFoto, setNroFoto] = useState(1);           
   
    
  const [arrayFotos , setArrayFotos] = useState( []); 
  const [loading, setLoading] = useState(true);         
  const [cargaFoto, setCargaFoto] = useState(0);   
  const [nroCarga, setNroCarga]   = useState(0);   
  const [idxFoto, setIdxFoto]   = useState(0);       

  //agregar Fotos    
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null); 
  const [nroNvaFoto, setNroNvaFoto] = useState(0);           
    
   
  //cargar fotos    
  useEffect(() => {
      if (nroCarga > 0 && opcion != "agregar" ) {
         const nextSrc = `/inversion-${owner}-${title}-${nroCarga}.jpg`;
         const img = new Image();
         img.onload = () => {
             setArrayFotos(prev => [...new Set([...prev, nroCarga])].sort((a, b) => a - b));
             setCargaFoto( cargaFoto + 1)
         };
         img.onerror = () => {
             setCargaFoto( cargaFoto + 1)
         };
         img.src = nextSrc;      
     } 
  }, [nroCarga]);
    
  
    
  useEffect(() => {
     const maxFotos = 50  
     if (nroCarga < maxFotos )
        setNroCarga(nroCarga + 1)
        if (arrayFotos.length > 2) setLoading(false) 
            
     else {
        console.log(arrayFotos)      
        setLoading(false)         
        if (arrayFotos.length > 0) {                 
           setNroFoto(arrayFotos[0])
           setIdxFoto(0)
        }            
        else {
           if (opcion = "agregar") {   
              setNroFoto(-1)    
              setIdxFoto(-1)    
           }
           else {
              setNroFoto(1)    
              setIdxFoto(0)       
           }    
               
        }    
     }
  }, [cargaFoto ]);        
    
    
   
    
    
  //Agregar Fotos    
  const handleAgregarFoto = async () => {
    try  {  
         console.log("agregar foto")
         if (!file) {
            setMensaje("No hay foto Seleccionada")
            
         }
         else {
             setMensaje(null)
             console.log("fileViejo:" , file.name )
        
             const formData = new FormData();
             formData.append('file', file);  
             
             const nuevoNroFoto = nroNvaFoto + 1
        
             //const nvoNombre = 'inversion-' + owner + '-' + title + '-' + nuevoNroFoto + '.jpg'   
             const nvoNombre = `inversion-${owner}-${title}-${nuevoNroFoto}.jpg`;
             console.log("fileNuevo:" , nvoNombre )
             //formData.append('filename', 'nuevo-nombre.jpg'); // nombre deseado
             formData.append('filename', nvoNombre); // nombre deseado
          
             const res = await fetch('/api/ApiMockSubirImagen', {
                 method: 'POST',
                 body: formData,
             });
             const data = await res.json();
            
             setNroNvaFoto(nuevoNroFoto);
             setArrayFotos((prev) =>[...new Set([...prev, nuevoNroFoto])].sort((a, b) => a - b));
             setNroFoto(nuevoNroFoto); 
             setPreview(null)
             setFile(null) 
             setIdxFoto(nuevoNroFoto - 1)
             
         }
      }
    catch (error)  {        
        setMensaje('Error al agregar Foto' , error);
   }  
  } 
    
  const handleChangeImagen = (e) => {
        setMensaje(null)
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
        setFile(selectedFile);
        setPreview(URL.createObjectURL(selectedFile));
        }
    };
    
  
        
        
   //paginado de Fotos        
   const avanzoFoto = () => {            
      setMensaje(null);   
      console.log(" entro idxFoto" + idxFoto + " nroFoto" + nroFoto + " cant fotos:" + arrayFotos.length )  
       
      const nuevoIdx = idxFoto + 1;
      if (nuevoIdx < arrayFotos.length) {
         setIdxFoto(nuevoIdx);
         setNroFoto(arrayFotos[nuevoIdx]);
       } else {
         //setMensaje("No hay más Fotos");
       }
       console.log(" salgo idxFoto" + idxFoto + " nroFoto" + nroFoto)
   };    
    
    
   const retrocedoFoto = () => {      
      setMensaje(null);   
       const nuevoIdx = idxFoto - 1;   
      if (nuevoIdx >= 0)  {         
         setIdxFoto(nuevoIdx)
         setNroFoto(arrayFotos[nuevoIdx])  
      }      
      else {    
        //setMensaje("No hay más Fotos")    
      } 
   };    
        

  //const router = useRouter(); 
    
   
  if (loading) { 
    return <p>Cargando Fotos..</p>
  }          
         
    
      
   
  return (
    <>
        
 
      {/*FOTOS*/}             
 
      <div className="fotos-wrapper"> 
         <div className="fotos-navegacion">
          <button type="button" className="arrow"  onClick={retrocedoFoto}>          
               <FaArrowLeft />
          </button>

          <div className="fotos-box">
                 <img
                    src={`/inversion-${owner}-${title}-${nroFoto}.jpg`}
                    alt="NO hay fotos Cargadas"
                    
                />
          </div>  
          <button type="button" className="arrow" onClick={avanzoFoto}>          
               <FaArrowRight />
          </button>
         </div>
      </div> 


      
      {opcion == "agregar" && (
          <>
             <div className="btn-container-foto-agregar"> 
                    
                <label style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}>
                    {!preview && (<span><FaFileUpload style={{ fontSize: '82px' }}/></span>)}
                     <input
                          type="file"
                          accept="image/*"
                          onChange={handleChangeImagen}
                          style={{ display: 'none' }}
                    />
                    {preview && (
                      <div style={{ marginTop: 20 }}>
                        <img src={preview} alt="Preview" style={{ maxWidth: 300, border: '1px solid #ccc' }} />
                     </div>
                     )}
                 </label>
              </div>      

              {file && (<div className="btn-container-foto-agregar"> 
                 <button className="btn-agregar" 
                       type="button" 
                       onClick={handleAgregarFoto}>Agregar Fotos
                 </button>
             </div> 
             )}

             <div className="btn-container-foto-agregar"> 
                 <br/>
                 <p>{mensaje}</p>
                 <br/>
             </div>              
          </>
      )}  




   

      {/*
      <br/>
      <p>{mensaje}</p>
      <br/>
      */}         
    </>

  );

 
 
  
}
export default MostrarFotos;