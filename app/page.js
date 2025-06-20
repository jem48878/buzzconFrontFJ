"use client";
import Link          from 'next/link';
import MyStyles      from  '../components/MyStyles.css';   
import { FaSearch } from "react-icons/fa";
import React from 'react';
import { ContextProvider } from '@/contexts/MyContext';
import MostrarEmpresas from '@/components/Inversiones/PageComponents/MostrarEmpresas';
import BuscarEmpresas from '@/components/Inversiones/PageComponents/BuscarEmpresas';
import Encabezado from '@/components/Inversiones/PageComponents/Encabezado';



const busqueda = <FaSearch/> 
//const busqueda = 'buscar' 

function Home() { 
  
  return (
    <ContextProvider>   
    <div className='body'>
      <Encabezado text="Encabezado"/> 
      <br/>    
      <BuscarEmpresas text={busqueda}  />  
      <br/>
      <MostrarEmpresas  />    
      <br/>             
    </div>
    </ContextProvider>  
  );
}

export default Home;