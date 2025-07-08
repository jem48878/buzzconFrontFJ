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

import useSetUsrLogueado from '@/hooks/useSetUsrLogueado';  //fj-1


function MenuPage() {

 const guardarUsuario = useSetUsrLogueado();               //fj-1        
 const {usrLogueado, setUsrLogueado} = useContext(MyContext); 
    
 const [mensaje, setMensaje] = useState(null);           

 const [menuVisible, setMenuVisible] = useState(false);
 const nombreRef = useRef(null);

 const router = useRouter();          
    
 const paginaEnDesarrollo = () => {      
    //setMensaje("Funcion no desarrollada" )
    //console.log("Funcion no desarrollada" )  
 };    
    
 const paginaLogin = () => {      
   router.push(`/Access/Login`); 
 };        
    
 const paginaRegister = () => {      
   router.push(`/Access/Register`);  
 };            

const paginasInversiones  = () => {      
   window.location.href = '/Inversiones/Lista';      
 };            


console.log("Menu usrLogueado:" , usrLogueado)    
    
 return (
    <>
      {/* NAVBAR FIXED CON ABEJA Y BUZZCON */}
      <nav className="navbar navbar-expand-lg fixed-top" style={{ marginTop: "2rem" , backgroundColor: "#087571", zIndex: 1000 }} >
        <div className="container-fluid d-flex align-items-center">
     
          {/* Logo con abeja y texto */}
          <div className="d-flex align-items-center">
            <Image src="/abeja.png" alt="abeja" width={40} height={40} className="me-2" />
            <span className="text-white" style={{ fontSize: "2.8rem", fontWeight: "bold" }}>buzzcon</span>
          </div>

          {/*opciones menu */}     
          <div className="collapse navbar-collapse justify-content-between">
            {/* Menú izquierdo */}
            <ul className="navbar-nav">
              <li className="nav-item" style={{ marginLeft: "4rem"}}>
                <span className="nav-link" onClick={() => window.location.href = '/Inversiones/Lista'}>Inversiones</span>
              </li>
              <li className="nav-item" style={{ marginLeft: "2rem"}}>                
                  <span className="nav-link"  onClick={paginaEnDesarrollo}>Función 2</span>
              </li>
              <li className="nav-item" style={{ marginLeft: "2rem"}}>
                   <span  className="nav-link" onClick={paginaEnDesarrollo}>Función 3</span>
              </li>
            </ul>

            {/* Menú derecho */}
            {!usrLogueado && (
             
            <ul className="navbar-nav d-flex flex-row gap-3 align-items-center">
               <li className="nav-item" style={{ marginRight: "2rem"}}>
                 <button
                   className="btn fw-semibold text-black"
                   style={{
                       backgroundColor: "white",
                       color: "#087571",
                       borderRadius: "16px",
                       padding: "2px 46px",
                       fontSize: "1.5rem",
                       minWidth: "160px",
                   }}
                   onClick={paginaLogin}
                  >
                    iniciar sesión
                  </button>
              </li>
              <li className="nav-item" style={{ marginRight: "4rem"}}>
                <button
                  className="btn fw-semibold text-black"
                  style={{
                       backgroundColor: "white",
                       color: "#087571",
                       borderRadius: "16px",
                       padding: "2px 46px",
                       fontSize: "1.5rem",
                       minWidth: "160px",
                   }}
                  onClick={paginaRegister}
                 >
                 ingresar
                </button>
              </li>
            </ul>
     
     
     
            )}

            {/* Menú derecho user logueado */}
            {usrLogueado && (
             <div className="position-relative">
               <ul className="navbar-nav">
                  <li className="nav-item" style={{ marginRight: "4rem"}}>
                    <span
                      className="nav-link"
                      ref={nombreRef}
                      onClick={() => setMenuVisible(!menuVisible)}
                      style={{ cursor: 'pointer' ,
                               color: "white",
                               fontSize: "1.5rem",
                               fontWeight: "600",}}
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
                  setUsrLogueado(null); // o lo que uses
                  guardarUsuario(null)     //fj-1             
                }}
               />
              </div>
            )}
            
            
          </div> 
          {/*fin opciones menu */}            

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

