"use client";
import StyleAccess   from '@/components/Access/StyleAccess.css';  
import Link          from 'next/link';
import MyContext from '@/contexts/MyContext';
import { validarCodigo } from '@/utils/dataUsuariosFunction';  
import Image from 'next/image';
import React, { useState , useContext , useEffect } from 'react';
import { use } from 'react';

import { FaHourglassHalf } from 'react-icons/fa'; 
import { FaCheck } from "react-icons/fa";
import { FaTimesCircle } from "react-icons/fa";


function VerifyRegistration({ params }) {
    
 
  const [mensaje, setMensaje] = useState("");              
  const [validando, setValidando] = useState(true);                       
    
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const entorno = process.env.NEXT_PUBLIC_ENTORNO;       //nuevo       
 
  const { user, code } = use(params);     
    
  useEffect(() => {  
     console.log(" validar user:", user , "code: ", code  );   
     setMensaje("Procesando validacion aguarde")  
     validar()       
  }, []);  
  
    
  const validar = async () => {
    
    try {
      let data = null ;        
      const entrada = { user , code };   
      data = await validarCodigo(entrada) 
           
      //console.log("retorno:" , data.codRet)       
      //console.log("mensaje:" , data.message)    
        
       if (data.codRet != 0 )  throw new Error (data.message)        
      
      //if (data.codRet == 0) { 
         setMensaje("Verificado")    
         setError(null)  
      //}
      //else {
      //   setMensaje("NO Verificado")             
      //     setError(data.message)  
      //}
      //setValidando(false)
     
    } catch (err) {
      setMensaje("NO Verificado")           
      setError('Error:' + err.message ) ;      
    } finally {
      setValidando(false);
    }   
  };    
  
      
  return (
  <div className="d-flex vh-100">
      
    {/* Columna izquierda con el formulario */}
    <div className="w-100 w-md-50 d-flex align-items-center justify-content-center">     
     {validando && (
        <div className="text-center mt-2">
            <p className="text-white mensaje-pantalla  d-flex justify-content-center align-items-center gap-2">{mensaje}
            <FaHourglassHalf
                 style={{
                   animation: 'spin 1s linear infinite',
                   fontSize: '1.2rem',
                 }}
            />
            </p>
        </div>
      )}      
      {!validando && (
        <div className="text-center mt-2">
         <p className="text-white mensaje-pantalla d-flex justify-content-center align-items-center gap-2">
         {mensaje}
         {!error ? (
            <FaCheck style={{ color: 'limegreen', fontSize: '3.5rem' }} />
            ) : (
            <FaTimesCircle style={{ color: 'red', fontSize: '3.5rem' }} />                
         )}
         </p>
         <p className="text-white mensaje-pantalla d-flex justify-content-center align-items-center gap-2">
         {error}         
         </p>
        </div>
        

      )}
    </div>
    
    {/* Columna derecha con la abeja */}
    <div className="w-50 d-none d-md-flex align-items-center justify-content-start">     
      <img
        src="/abeja.png"
        alt="abeja"
        style={{
          width: '80%',
          maxWidth: '450px',
          objectFit: 'contain',
        }}
      />
    </div> 

  </div>
);
}

export default VerifyRegistration;
