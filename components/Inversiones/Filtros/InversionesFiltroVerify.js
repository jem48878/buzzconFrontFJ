import { useState } from 'react';

function InversionesFiltroVerify({valor, setValor}) {
      
   const toggle = () => {
    setValor((prev) => {
      if (prev === "") return "verified";
      if (prev === "verified") return "not_verified";
      return "";
    });
   };    
    
  return (
   <>    
     <strong>Verificado</strong><br />
     <button className="btn-toggle" onClick={toggle}>
        {valor}
     </button>            
   </>    

 );
  
  
}
export default InversionesFiltroVerify;