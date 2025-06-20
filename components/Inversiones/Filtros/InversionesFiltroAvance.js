"use client"; 

import { useState } from 'react';
import MyContext from '@/contexts/MyContext';
import { useContext } from 'react';
import { useEffect } from 'react';


function InversionesFiltroAvance({valor, setValor }) {
       
  const opcionesAvance = ['DevStage0', 'DevStage10', 'DevStage20', 'DevStage30', 'DevStage40', 'DevStage50', 'DevStage60', 'DevStage70', 'DevStage80', 'DevStage90', 'DevStage100'];
  
  const handleChange = (e) => {
       setValor(e.target.value); 
  };
   
  return (
   <>    
      <strong>Nivel de Desarrollo</strong><br />
      <select
         className="select-filtros"
         value={valor}
         onChange={handleChange}
      >
         <option value="">Seleccionar Avance</option>
         {opcionesAvance.map((porcentaje) => (
           <option key={porcentaje} value={porcentaje}>
           {porcentaje} 
         </option>
         ))}
      </select>
   </>

  );
  
}
export default InversionesFiltroAvance;