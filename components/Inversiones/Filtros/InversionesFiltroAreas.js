import { useState } from 'react';
import MyContext from '@/contexts/MyContext';
import { useContext } from 'react';
import { useEffect } from 'react';


function InversionesFiltroAreas({valores, setValores}) {
       
  const areasArray = ["Finanzas", "Marketing", "Ventas de otros productos"]; 
  

  const handleCheckbox = (event) => {
      const { value, checked } = event.target;
      if (checked) {
         setValores((prev) => [...prev, value]);
      } else {
         setValores((prev) => prev.filter((area) => area !== value));
      }
  }; 
        
   
  return (
   <>    
     <strong>Rubros</strong><br />
     {areasArray.map((area) => (
       <label key={area} className="checkbox-label">
       <input
         type="checkbox"
         value={area}
         onChange={handleCheckbox}
         checked={valores.includes(area)}
       />
       <span className="checkbox-text">{area}</span>
       </label>
      ))}
   </>    

 );
  
  
}
export default InversionesFiltroAreas;