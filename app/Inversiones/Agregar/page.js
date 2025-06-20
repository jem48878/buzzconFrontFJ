"use client";
import Link          from 'next/link';
import MyStyles      from  '@/components/MyStyles.css';    
import React from 'react';
import { ContextProvider } from '@/contexts/MyContext';

import {Suspense} from 'react' ;
import AgregarInversion from '@/components/Inversiones/AgregarComponents/AgregarInversion';



function Home() { 
  
  return (
    <ContextProvider>   
     <div className='body'>      
        <AgregarInversion/>  
        <br/>        
     </div>
    </ContextProvider>  
  );
}

export default Home;
