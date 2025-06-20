import { useState } from 'react';
import MyContext from '@/contexts/MyContext';
import { useContext } from 'react';
import { useEffect } from 'react';


function InversionesFiltroLocalidad({valor, setValor}) {
       
  const ubicaciones = ["Buenos-Aires", "CABA", "Cordoba", "Rosario"];
  
  const handleChange = (e) => {
       setValor(e.target.value);        
  };
   
  return (
   <>    
    <strong>Localidad</strong><br />
    <select
          className="select-filtros"
          value={valor}
          onChange={handleChange}
    >
       <option value="">Seleccionar ubicación</option>
        {ubicaciones.map((ubicacion) => (
        <option key={ubicacion} value={ubicacion}>
        {ubicacion.replace('-', ' ')}
       </option>
       ))}
     </select>
   </>

  );
  
}
export default InversionesFiltroLocalidad;