import { useState } from 'react';
import MyContext from '@/contexts/MyContext';
import { useContext } from 'react';
import { useEffect } from 'react';


function InversionesFiltroTecnologias({valores, setValores}) {
       
  const tecnologiasArray = ["Tecno-1", "Tecno-2", "Tecno-3", "Tecno-4", "Inteligencia Artificial"];
  
  const handleCheckbox = (event) => {
  const { value, checked } = event.target;
     if (checked) {
         setValores((prev) => [...prev, value]);
      } else {
         setValores((prev) => prev.filter((tecno) => tecno !== value));
      }
  }; 
    
    
   
  return (
   <>    
    <strong>Tecnologias</strong><br />
   
    {tecnologiasArray.map((tecno) => (
       <label key={tecno} className="checkbox-label">
       <input
         type="checkbox"
         value={tecno}
         onChange={handleCheckbox}
         checked={valores.includes(tecno)}
        />
       <div className="checkbox-text">{tecno}</div>
       </label>
    ))}
   
   </>    
 );
  
  
}
export default InversionesFiltroTecnologias;