"use client";
import StyleAccess   from '@/components/Access/StyleAccess.css';  
import Link          from 'next/link';
import MyContext from '@/contexts/MyContext';

import { cambiarContraseña }  from '@/utils/dataUsuariosFunction';  
import { validarCodigoPass }  from '@/utils/dataUsuariosFunction'; 
import { validarPassword }    from '@/utils/dataUsuariosFunction'; 

import Image from 'next/image';
import React, { useState , useContext , useEffect } from 'react';
import { use } from 'react';

import { useRouter  } from 'next/navigation';

import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { FaHourglassHalf } from 'react-icons/fa'; 
import { FaCheck } from "react-icons/fa";
import { FaTimesCircle } from "react-icons/fa";


function ChangePass({ params }) {
    
  const { user, code } = use(params);       
  console.log("Pagina change pass:" + user + " codigo:" + code )    
    
  const {usrLogueado, setUsrLogueado} = useContext(MyContext); 
  
  const [usuario, setUsuario] = useState('');  
   
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);         
    
  const [passwordC, setPasswordC] = useState('');
  const [showPasswordC, setShowPasswordC] = useState(false);         
  
  const [mensaje, setMensaje] = useState("");                
  const [validando, setValidando] = useState(true);      
    
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const router = useRouter();        
    
    
  const reglas = validarPassword(password)  
  const esPasswordValida = Object.values(reglas).every(Boolean);      
  
  const [colorTexto, setColorTexto] = useState('text-danger');  
 
  useEffect(() => {
    console.log("Usuario actual:", usrLogueado);
    if (usrLogueado == null) {
       setValidando(true)    
       console.log("Validar Codigo")         
       setMensaje("Procesando validacion aguarde")      
       validar()          
       setUsuario(user)    
    }
    else {
       setValidando(false)        
       setUsrLogueado(usrLogueado)
    }  
   }, []);    
    
    
   const validar = async () => {
    try {
      let data = null ;        
      const entrada = { user , code };   
      data = await validarCodigoPass(entrada) 
        
      if (data.codRet != 0 )  throw new Error (data.message)        
      
      setError(null);  
      setValidando(false);
        
    } catch (err) {
      console.log("error de verificacion codigo pass:" , err.message)    
      setMensaje("NO Verificado")           
      setError('Error:' + err.message ) ;      
    } finally {      
    }   
  };    
    
    
  /*registar usuario nuevo*/  
  const handleSubmit = async (e) => {
      
    e.preventDefault(); // evitar recarga de página
    setLoading(true);
    setError(null);
    try {
      let data = null ;    
      if (!esPasswordValida) {
        throw new Error ('La contraseña no cumple con todos los requisitos.');
      }    
    
      if (password !== passwordC) {      
        throw new Error ( "las password no coinciden" )
      }    
      const entrada = {usuario , password};   
      data = await cambiarContraseña(entrada) 
        
      if (data.codRet != 0 )  throw new Error (data.message)    
     
      setColorTexto('text-success')  
      setError("Su contraseña se ha modificado")
      
        
    } catch (err) {
      setError('Error:' + err.message ) ;           
    } finally {
      setLoading(false);
    }
  };
    
    
  return (
  <div className="d-flex vh-100">
      
    {/* Columna izquierda con el formulario */}
    <div className="w-100 w-md-50 d-flex align-items-center justify-content-center">
      {validando && (
        <div className="text-center mt-2">
      
          {!error && (
            <p className="text-white mensaje-pantalla  d-flex justify-content-center align-items-center gap-2">{mensaje}
            <FaHourglassHalf
                 style={{
                   animation: 'spin 1s linear infinite',
                   fontSize: '1.2rem',
                 }}
            />
            </p>
          )} 
          {error && (
           <>  
            <p className="text-white mensaje-pantalla d-flex justify-content-center align-items-center 
            gap-2">{mensaje}            
            <FaTimesCircle style={{ color: 'red', fontSize: '3.5rem' }} />
            </p>
            <p className="text-white mensaje-pantalla d-flex justify-content-center align-items-center 
            gap-2">{error}         
            </p>           
           </>      
          )}
        </div>
      )}
      
      {!validando && ( 
      <div
        className="p-4"
        style={{
          width: '100%',
          maxWidth: '420px',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '15px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
        }}
      >
        <h2 className="text-center mb-4 text-dark">CAMBIAR CONTRASEÑA</h2>
        <form onSubmit={handleSubmit}>
          
          <div className="mb-3">
            <div className="input-group">
              <label className="form-label text-start w-100">Contraseña</label>    
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

            <ul className="mt-2 mb-0 ps-3 small">
              <li className={reglas.longitud ? 'text-success' : 'text-muted'}>
               Mínimo 8 caracteres
              </li>
              <li className={reglas.mayuscula ? 'text-success' : 'text-muted'}>
               Al menos una letra mayúscula
              </li>
              <li className={reglas.minuscula ? 'text-success' : 'text-muted'}>
               Al menos una letra minúscula
              </li>
              <li className={reglas.numero ? 'text-success' : 'text-muted'}>
               Al menos un número
              </li>
              <li className={reglas.especial ? 'text-success' : 'text-muted'}>
               Al menos un carácter especial (!@#$...)
              </li>
             </ul>
          </div>

          
          <div className="mb-3">
            <div className="input-group">
              <label className="form-label text-start w-100">Confirmar Contraseña</label>    
              <input
                type={showPasswordC ? 'text' : 'password'}
                className="form-control"
                placeholder="Confirmne su contraseña"
                value={passwordC}
                onChange={(e) => setPasswordC(e.target.value)}
                required
              />
              <span
                className="input-group-text"
                style={{ cursor: 'pointer', userSelect: 'none' }}
                onClick={() => setShowPasswordC(!showPasswordC)}
              >
                {showPasswordC ? <FaEyeSlash/> : <FaEye/>}
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
            {loading ? 'Validando...' : 'Cambiar Password'}
          </button>
        </form>

        {error && (
          <p className={'mt-3 text-center ' + colorTexto}  style={{ fontSize: '0.9rem' }}>
            {error}
          </p> 
        )}    
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

export default ChangePass;
