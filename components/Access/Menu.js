'use client';

import StyleAccess   from '@/components/Access/StyleAccess.css';   
import MyContext from '@/contexts/MyContext';

import React from 'react';
import Image from 'next/image';
import { FaUserCircle } from "react-icons/fa";
import { useRef , useState, useContext } from 'react';
import MenuUser from '@/components/Access/MenuUser';  
import MenuBody from '@/components/Access/MenuBody';

import { useRouter  } from 'next/navigation';
import useSetUsrLogueado from '@/hooks/useSetUsrLogueado';          //fj-1
import useUsrLogueado from '@/hooks/useUsrLogueado';                //fj-1-1


function MenuPage() {

 const guardarUsuario = useSetUsrLogueado();                        //fj-1       
 const {usrLogueado, setUsrLogueado} = useContext(MyContext); 
 const usuario = useUsrLogueado();                                   //fj-1-1
    
 const [mensaje, setMensaje] = useState(null);           

 const [menuVisible, setMenuVisible] = useState(false);
 const nombreRef = useRef(null);

 const router = useRouter();          
    
 const paginaEnDesarrollo = () => {      
    setMensaje("Funcion no desarrollada" )
    console.log("Funcion no desarrollada" )  
 };    
    
 const paginaLogin = () => {      
   router.push(`/Access/Login`);      
 };        
    
 const paginaRegister = () => {      
   router.push(`/Access/Register`);      
 };            




console.log("Menu usrLogueado:" , usrLogueado)    
    
 return (
    <>
      {/* NAVBAR FIXED CON ABEJA Y BUZZCON */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container-fluid d-flex align-items-center">
          {/* Logo con abeja y texto */}
          <div className="d-flex align-items-center navbar-brand">
            <Image src="/abeja.png" alt="abeja" width={40} height={40} className="me-2" />
            <span>BuzzCon</span>
          </div>

          <div className="collapse navbar-collapse justify-content-between">
            {/* Menú izquierdo */}
            <ul className="navbar-nav">
              <li className="nav-item">
                <span className="nav-link" onClick={() => window.location.href = '/Inversiones/Lista'}>Inversiones</span>
              </li>
              <li className="nav-item">
                <span className="nav-link"  onClick={paginaEnDesarrollo}>Función 2</span>
              </li>
              <li className="nav-item">
                <span  className="nav-link" onClick={paginaEnDesarrollo}>Función 3</span>
              </li>
            </ul>

            {/* Menú derecho */}
            {!usrLogueado && (
             <ul className="navbar-nav">
               <li className="nav-item">
                <span className="nav-link"  onClick={paginaLogin}>Iniciar sesión</span>
               </li>
               <li className="nav-item">
                <span className="nav-link"  onClick={paginaRegister}>Registrarse</span>
               </li>
             </ul>
            )}
            
            {usrLogueado && (
             <div className="position-relative">
               <ul className="navbar-nav">
                  <li className="nav-item">
                    <span
                      className="nav-link"
                      ref={nombreRef}
                      onClick={() => setMenuVisible(!menuVisible)}
                      style={{ cursor: 'pointer' }}
                     >
                     <FaUserCircle />&nbsp;{usrLogueado}
                    </span>
                  </li>
                </ul>

              <MenuUser
                visible={menuVisible}
                anchorRef={nombreRef}
                onClose={() => setMenuVisible(false)}
                onMiCuenta={paginaEnDesarrollo}                
                onLogout={() => {
                  setMenuVisible(false);
                  setMensaje("");          
                  setUsrLogueado(null); 
                  guardarUsuario(null)   //fj-1                
                }}
               />
              </div>
            )}
            
          </div>
        </div>
      </nav>

      {/* CONTENIDO DEBAJO DEL MENÚ   */} 
      <div className="menu-content" style={{ marginTop: '80px'}}>
        <MenuBody onRegister={paginaRegister}      />
      </div>

    </>
  );
}


export default MenuPage ;

