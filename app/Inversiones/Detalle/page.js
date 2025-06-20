"use client";
import Link          from 'next/link';
import MyStyles      from  '@/components/MyStyles.css';    
import React from 'react';
import { ContextProvider } from '@/contexts/MyContext';
import { useSearchParams } from 'next/navigation';

import Encabezado from '@/components/Inversiones/PageComponents/Encabezado';

import {Suspense} from 'react' ;
import MostrarDetalle from '@/components/Inversiones/DetalleComponents/MostrarDetalleInversion';



function Home() { 
  const searchParams = useSearchParams();
  const owner = searchParams.get('owner');
  const title = searchParams.get('title');        
  
  return (
    <ContextProvider>   
    <Encabezado text="Encabezado"/> 

    <div className='body'>      
        <MostrarDetalle owner={owner} title={title} />  
        <br/>
    </div>
    </ContextProvider>  
  );
}

export default Home;


    