import { useState } from 'react';

function InversionesFiltroContrato({valor, setValor}) {
      
   const toggle = () => {
    setValor((prev) => {
      if (prev === "") return "Acciones";
      if (prev === "Acciones") return "Prestamos";
      return "";
    });
   };    
    
  return (
   <>    
     <strong>Tipo de contrato</strong><br />
     <button className="btn-toggle" onClick={toggle}>
        {valor}
     </button>            
   </>    

 );
  
  
}
export default InversionesFiltroContrato;