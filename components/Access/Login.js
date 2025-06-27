"use client";
import Link          from 'next/link';
import MyContext from '@/contexts/MyContext';
import { loginUsuario } from '@/utils/dataUsuariosFunction';  
import Image from 'next/image';
import React, { useState , useContext } from 'react';
import { useRouter } from 'next/navigation';

import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";


function Login() {
    
  const {usrLogueado, setUsrLogueado} = useContext(MyContext); 
    
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const router = useRouter();        
  
    
  
  const handleSubmit = async (e) => {
    e.preventDefault(); // evitar recarga de página
    setLoading(true);
    setError(null);

    try {
      let data = null ;    
      
      const entrada = {usuario , password };   
      data = await loginUsuario(entrada) 
        
      if (data.codRet == 0) {    
        setUsrLogueado(usuario) 
        console.log("Login usrLogueado:" , usrLogueado)    
        console.log("Login usuario:" , usuario)      
        router.push(`/`);         
      } 
      else {          
          throw new Error (data.message)
      }
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
          <h2 className="text-center mb-4 text-dark">LOGIN</h2>
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

             <div className="mb-3">
               <div className="input-group">
                 <input
                   type={showPassword ? 'text' : 'password'}
                   className="form-control"
                   placeholder="Ingrese su contraseña"
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                   required
                />
                <span
                   className="input-group-text"
                   style={{ cursor: 'pointer', userSelect: 'none' }}
                   onClick={() => setShowPassword(!showPassword)}
                 >
                  {showPassword ? <FaEyeSlash/> : <FaEye/>}
                 </span>
               </div>
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
              {loading ? 'Validando...' : 'ENTRAR'}
            </button>
          </form>

          {error && (            
            <p className="mt-3 text-center text-danger" style={{ fontSize: '0.9rem' }}>
              {error}
            </p>
              
          )}

          <p className="text-center mt-3 mb-0" style={{ fontSize: '0.9rem', color: '#333' }}>
            ¿No tenés cuenta?{' '}
            <a href="./Register" className="fw-bold text-primary">
              Crear cuenta
            </a>
          </p>
          <p className="text-center mt-3 mb-0" style={{ fontSize: '0.9rem', color: '#333' }}>           
            <a href="./Register" className="fw-bold text-primary">
              Recuperar Contraseña
            </a>
          </p>    
        </div>
            
      </div>
            
            
    </div>
            
  );
}


export default Login;
