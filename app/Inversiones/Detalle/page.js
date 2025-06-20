
 
import DetalleClient from '@/components/Inversiones/DetalleComponents/DetalleClient';
import React, { Suspense } from 'react';

function Home() {   
  return (     
      <Suspense fallback={<div>Cargando...</div>}>
        <DetalleClient />  
      </Suspense>
  );
}

export default Home;



    