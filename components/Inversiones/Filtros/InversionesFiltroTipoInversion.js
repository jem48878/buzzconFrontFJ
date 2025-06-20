import { useState } from 'react';

function InversionesFiltroTipoInversion({valor, setValor , opcion}) {
  
  const toggle = () => {
    setValor((prev) => {
      if (prev === "") return "Ofrece Inversion";
      if (prev === "Ofrece Inversion") return "Busca Inversion";
      return "";
    });
   };             
    
    
    
  return (
   <>    
     <strong>Tipo de inversion {opcion == "agregar" && (<span className="required-asterisk">*</span>)}  
     </strong><br/>
     <button className="btn-toggle" onClick={toggle}>
        {valor}
     </button>      
   </>    

 );
  
  
}
export default InversionesFiltroTipoInversion;