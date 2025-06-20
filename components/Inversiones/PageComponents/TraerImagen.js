import MyContext from '@/contexts/MyContext';
import { useState, useEffect , useContext } from 'react';
import React from 'react';



function TraerImagen({ prmOwner , prmTitle }) {

  
  const [imagen, setImagen] = useState([]);   
      
  useEffect(() => {
    const fetchData = async () => {
      try {
      const response = await fetch('/api/ApiMockTraerImagen', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            owner: prmOwner, 
            title: prmTitle            
        }),
      });        
        const res = await response.json();  
        setImagen(res.data)  
        //console.log('resp Traer Imagen:' + JSON.stringify(res.data))       
      } catch (error) {
        setImagen('/fabrica.jpg')
      } finally {
      }
    };        
    fetchData();    
  }, []);        
  
  
  
    
  
    
  return (
     <img src={imagen} className="img-emp"/>
  )  
}

export default TraerImagen;