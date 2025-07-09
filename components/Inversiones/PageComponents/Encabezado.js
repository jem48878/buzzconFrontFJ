import { FaBars } from "react-icons/fa";
import { useRouter  } from 'next/navigation';
import MyContext from '@/contexts/MyContext';  
import { useState, useEffect , useContext } from 'react';

import useUsrLogueado from '@/hooks/useUsrLogueado';  //fj-1

function Encabezado() {
   
  //const {usrLogueado, setUsrLogueado} = useContext(MyContext);       //fj-1
  const usuario = useUsrLogueado();                                    //fj-1       
  console.log("Encabezado usrLogueado:" , usuario)     
    
  const router = useRouter();        
    
  const volverMenu = () => {      
   //router.push('/');      
   window.location.href = '/'          
  };
    
  return (
    <>
      {/* Botón fijo por fuera del flujo */}
      <button className="icono-fijo-Menu" onClick={volverMenu}>
        <FaBars />
      </button>

      {/* Logo u otros elementos */}
      <div style={{ display: 'flex', alignItems: 'center', paddingLeft: '110px' }}>
        <img
          src="/nombre.png"
          alt="Logo"
          onClick={volverMenu}   
          style={{
            height: '100px',
            objectFit: 'cover' ,
            cursor: 'pointer'
          }}
        />
      </div>
    </>
  );
}


export default Encabezado;