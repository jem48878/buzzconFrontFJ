"use client";
import Link          from 'next/link';
import MyContext from '@/contexts/MyContext';
import { recuperarPass } from '@/utils/dataUsuariosFunction';  
import Image from 'next/image';
import React, { useState , useContext } from 'react';
import { useRouter } from 'next/navigation';


function RecoverPass() {
    
  const [usuario, setUsuario] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();        
  const [enviado, setEnviado] = useState(false);            
  const [mensaje, setMensaje] = useState("");  
    
  
  const handleSubmit = async (e) => {
    e.preventDefault(); // evitar recarga de página
    setLoading(true);
    setError(null);

    try {
      let data = null ;    
      
      const entrada = {usuario };   
      data = await recuperarPass(entrada) 
      
      if (data.codRet != 0 )  throw new Error (data.message)    
      
      setEnviado(true) 
      setMensaje("Se ha enviado un correo  verifique su casilla")
      
    } catch (err) {       
      setError('Error:' + err.message);
    } finally {
      setLoading(false);
    }
  };
    
    
      

  return (      
    <div className="d-flex vh-100">
      {/* Columna izquierda con la abeja */}
      <div className="w-50 d-none d-md-flex align-items-center justify-content-center">
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

      {/* Columna derecha con formulario */}
      <div className="w-100 w-md-50 d-flex align-items-center justify-content-center">
        {!enviado && (
        <div
          className="p-4"
          style={{
            width: '90%',
            maxWidth: '360px',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '15px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
          }}
        >
          <h2 className="text-center mb-4 text-dark">Recuperar Contraseña</h2>
    
      
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Ingrese su nombre de usuario"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                required
              />
             </div>

             
             <button
              type="submit"
              className="btn w-100"
              style={{
                background: 'linear-gradient(to bottom, #333, #000)',
                color: '#fff',
              }}
              disabled={loading}
            >
              {loading ? 'Validando...' : 'ENVIAR CORREO'}
            </button>
          </form>
          
          {error && (            
            <p className="mt-3 text-center text-danger" style={{ fontSize: '0.9rem' }}>
              {error}
            </p>
              
          )}

          <p className="text-center mt-3 mb-0" style={{ fontSize: '0.9rem', color: '#333' }}>            
            <a href="./Login" className="fw-bold text-primary">
              Login
            </a>
          </p>
        </div>
      )}
      
      {enviado && (
        <div
          className="p-4"
          style={{
            width: '90%',
            maxWidth: '360px',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '15px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
          }}
         >
          <h2 className="text-center mb-4 text-dark">Recuperar Contraseña</h2>
                   
          <p className="mt-3 text-center text-success" style={{ fontSize: '1.5rem' }}>
              {mensaje}
          </p>
          <p className="text-center mt-3 mb-0" style={{ fontSize: '0.9rem', color: '#333' }}>            
            <a href="./Login" className="fw-bold text-primary">
              Login
            </a>
          </p>
        </div>
      )}
      
      
      </div>
      {/*  fin formulario */}
            
            
    </div>
            
  );
}


export default RecoverPass;
