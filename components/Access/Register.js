"use client";
import StyleAccess   from '@/components/Access/StyleAccess.css';  
import Link          from 'next/link';
import MyContext from '@/contexts/MyContext';
import { crearCuenta }      from '@/utils/dataUsuariosFunction';  
import { validarNvaCuenta } from '@/utils/dataUsuariosFunction';  
import { validarPassword }  from '@/utils/dataUsuariosFunction'; 
import { esEmailValido }    from '@/utils/dataUsuariosFunction'; 
import { reEnviarCorreo }   from '@/utils/dataUsuariosFunction'; 

import Image from 'next/image';
import React, { useState , useContext , useEffect } from 'react';
import { useRouter  } from 'next/navigation';


import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { FaHourglassHalf } from 'react-icons/fa'; // u otro FaHourglassStart/End si preferís


function Register() {
    
  const {usrLogueado, setUsrLogueado} = useContext(MyContext); 
    
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);         
    
  const [passwordC, setPasswordC] = useState('');
  const [showPasswordC, setShowPasswordC] = useState(false);         
    
    
  const [email, setEmail] = useState('');    
 
  const [mensaje, setMensaje] = useState("");              
  const [validando, setValidando] = useState(false);                       
  const [timeout, setTimeout] = useState(0);                
  
  const espera  = 90
  
  const [countdown, setCountdown] = useState(espera);  
  const [resetId, setResetId] = useState(0);
    
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const router = useRouter();        
    
     
  useEffect(() => {
    let interval = null;
    if (validando || resetId > 0 ) {
      setCountdown(espera); // reinicia a n segundos cuando comienza
      interval = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
     }, 1000); // 1 segundo
   }
   return () => clearInterval(interval);
  }, [validando , resetId]);    
    
  
    
  useEffect(() => {
    if (!validando) return;
    if (Math.abs(countdown % 5) < 0.01 && countdown !== 0) {
        console.log(" Validación cada 5s:", countdown);   
        validarEstado()  
    }    
   }, [countdown, validando]);  
    
  
  
  const timeOutValidacion = async (accion) => {
    //console.log("errorvalidacion:" , accion)  
    if (accion === 'registrarse') {
       setValidando(false);   
    } 
    if (accion === 'reenviar') {
       const entrada = {usuario , email };       
       const data = await reEnviarCorreo(entrada)    
       setValidando(true);   
       setResetId((prev) => prev + 1);
    }
  };

      
  const validarEstado = async () => {
    try {  
      let data = null ;    
      
      const entrada = {usuario , password , email };   
      data = await validarNvaCuenta(entrada) 
      
      if (data.codRet != 0 )  throw new Error (data.message)        
      
      setUsrLogueado(usuario)      
      router.push(`/`);  
      
    }
    catch (err) {
      //setError(err.message);    
      console.log("mensaje Register ValidarEstado:" , err.message)    
    }
      
  };    
    
    
  const reglas = validarPassword(password)  
  const esPasswordValida = Object.values(reglas).every(Boolean);      
  const usuarioValido = usuario.length >= 8;
    
  /*registar usuario nuevo*/  
  const handleSubmit = async (e) => {
      
    e.preventDefault(); // evitar recarga de página
    setLoading(true);
    setError(null);
    try {
      let data = null ;    
      
      if (!usuarioValido) {
         throw new Error ('El nombre de usuario debe tener al menos 8 caracteres.');
      }
        
      if (!esPasswordValida) {
        throw new Error ('La contraseña no cumple con todos los requisitos.');
      }    
           
      if (!esEmailValido(email)) {      
        throw new Error ( "direccion de correo invalida" )
      }
       
      if (password !== passwordC) {      
        throw new Error ( "las password no coinciden" )
      }    
        
      const entrada = {usuario , password , email };   
      data = await crearCuenta(entrada) 
      
      //console.log("retorno:" , data.codRet)       
      //console.log("mensaje:" , data.message)
      
      if (data.codRet != 0 )  throw new Error (data.message)    
      
      setValidando(true) 
      setMensaje("Esperando validacion de correo, verifique su casilla")
      
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
        <h2 className="text-center mb-4 text-dark">REGISTRARSE</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label text-start w-100">Usuario</label>
            <input
              type="text"
              className="form-control"
              placeholder="Ingrese su nombre de usuario"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              required
            />
            <ul className="mt-2 mb-0 ps-3 small">
               <li className={usuario.length >= 8 ? 'text-success' : 'text-muted'}>
                 Mínimo 8 caracteres
               </li>
            </ul> 
          </div>

          <div className="mb-3">
            <label className="form-label text-start w-100">Email</label>  
            <input
              type="text"
              className="form-control"
              placeholder="Ingrese su e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>


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
            {loading ? 'Validando...' : 'Crear Cuenta'}
          </button>
        </form>

        {error && (
          <p className="mt-3 text-center text-danger" style={{ fontSize: '0.9rem' }}>
            {error}
          </p> 
        )}    
      </div>                 
     )}
     
     {validando && (
        <div className="text-center mt-2">
            <p className="text-white mensaje-pantalla  d-flex justify-content-center align-items-center gap-2">{mensaje}
               {countdown > 0 && (<FaHourglassHalf
                 style={{
                   animation: 'spin 1s linear infinite',
                   fontSize: '1.2rem',
                 }}
                />    
               )}
            </p>

            <div className="d-flex justify-content-center">-
               <div className="p-0"  
                    style={{
                      width: '100%',
                      maxWidth: '420px',
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      borderRadius: '15px',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                    }}
                >
                   {/*contenedor de dos columnas */}
                   <div className="d-flex" style={{ height: '100%' }}> 
                      {/* Columna izquierda */}
                      <div className="w-25 d-flex justify-content-center align-items-center py-2">  
                         < span className="mensaje-pantalla" style={{ fontFamily: 'monospace' }}>{countdown}</span>
                      </div>
                      {/* fin Columna izquierda */}

                      {/* Línea divisoria */}
                      <div style={{
                          width: '2px',                
                          backgroundColor: '#555',     
                          height: '100%',              
                        }}
                       >
                       </div>
                       {/* Línea divisoria */}

                       {/* Columna derecha */}
                       <div className="w-75 d-flex justify-content-center align-items-center py-2">  
                          <span className="mensaje-pantalla"
                             style={{
                                textDecoration: 'underline',
                                cursor: countdown === 0 ? 'pointer' : 'not-allowed',
                                color: countdown === 0 ? '#000' : '#999',
                                fontSize:  '1.0rem',      
                              }}
                              onClick={countdown === 0 ? () => timeOutValidacion('reenviar') : undefined}
                              aria-disabled={countdown !== 0}
                           >
                            Re-enviar correo
                          </span>
                       </div>  
                       {/* fin Columna derecha */}
                  </div> 
                  {/* fin contenedor de dos columnas */}
                </div>
             </div>


             {countdown === 0 && (              
               <p className="text-center mt-3 mb-0 text-white ">
                <span
                  style={{
                    textDecoration: 'underline',
                    cursor: 'pointer',
                    marginRight: '1rem',
                    fontSize:  '1.0rem', 
                  }}
                  onClick={() => timeOutValidacion('registrarse')}
                >
                  Registrarse
                </span>
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

export default Register;
