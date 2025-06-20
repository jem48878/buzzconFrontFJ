import { useState } from 'react';
import MyContext from '@/contexts/MyContext';
import { useContext } from 'react';
import { useEffect } from 'react';


function InversionesFiltroSustentable({valor, setValor}) {
   
  const toggle = () => {
    setValor((prev) => {
      if (prev === "") return "sustentable";
      if (prev === "sustentable") return "no sustentable";
      return "";
    });
  };    
  
    
  return (
   <>    
     <strong>Sustentabilidad</strong><br />
     <button className="btn-toggle" onClick={toggle}>
        {valor}
     </button>
   </>    

 );
  
  
}
export default InversionesFiltroSustentable;