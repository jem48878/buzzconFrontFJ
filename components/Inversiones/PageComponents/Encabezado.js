import { FaBars } from "react-icons/fa";
import { useRouter  } from 'next/navigation';
import MyContext from '@/contexts/MyContext';  
import { useState, useEffect , useContext } from 'react';

function Encabezado() {
   
  const {usrLogueado, setUsrLogueado} = useContext(MyContext);     
  console.log("Encabezado usrLogueado:" , usrLogueado)     
    
  const router = useRouter();        
    
  const volverMenu = () => {      
   router.push('/');      
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