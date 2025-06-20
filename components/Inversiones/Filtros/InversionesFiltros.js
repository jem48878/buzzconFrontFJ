"use client"; 

import { useState } from 'react';

import MyContext from '@/contexts/MyContext';
import { useContext } from 'react';


import InversionesFiltroAvance    from '@/components/Inversiones/Filtros/InversionesFiltroAvance';
import InversionesFiltroLocalidad from '@/components/Inversiones/Filtros/InversionesFiltroLocalidad';
import InversionesFiltroTecnologias from '@/components/Inversiones/Filtros/InversionesFiltroTecnologias';
import InversionesFiltroAreas from '@/components/Inversiones/Filtros/InversionesFiltroAreas';
import InversionesFiltroSustentable from '@/components/Inversiones/Filtros/InversionesFiltroSustentable';
import InversionesFiltroTipoInversion from '@/components/Inversiones/Filtros/InversionesFiltroTipoInversion';
import InversionesFiltroContrato from '@/components/Inversiones/Filtros/InversionesFiltroContrato';
import InversionesFiltroVerify from '@/components/Inversiones/Filtros/InversionesFiltroVerify';

function InversionesFiltros({
  areas,
  setAreas,
  tecnologias,
  setTecnologias,
  localidad,
  setLocalidad,
  sustentable,
  setSustentable,
  inversion,
  setInversion,
  contrato,
  setContrato,
  avance,
  setAvance,
  verificado,
  setVerificado,    
  opcion,    
}) {
  
    
  return (
    <>
      {/* Areas */}
      {areas !== undefined && setAreas && (
        <div>
          <InversionesFiltroAreas valores={areas} setValores={setAreas} />
        </div>
      )}

      {/* Tecnologías */}
      {tecnologias !== undefined && setTecnologias && (
        <div>
          <InversionesFiltroTecnologias valores={tecnologias} setValores={setTecnologias} />
        </div>
      )}

      {/* Localidad */}
      {localidad !== undefined && setLocalidad && (
        <div>
          <InversionesFiltroLocalidad valor={localidad} setValor={setLocalidad} />
        </div>
      )}

      {/* Sustentable */}
      {sustentable !== undefined && setSustentable && (
        <div>
          <InversionesFiltroSustentable valor={sustentable} setValor={setSustentable} />
        </div>
      )}

      {/* Inversión */}
      {inversion !== undefined && setInversion && (
        <div>
          <InversionesFiltroTipoInversion valor={inversion} setValor={setInversion} opcion={opcion} />
        </div>
      )}

      {/* Contrato */}
      {contrato !== undefined && setContrato && (
        <div>
          <InversionesFiltroContrato valor={contrato} setValor={setContrato} />
        </div>
      )}

      {/* Avance */}
      {avance !== undefined && setAvance && (
        <div>
          <InversionesFiltroAvance valor={avance} setValor={setAvance} />
        </div>
      )}

      {/* verify_level */}
      {verificado !== undefined && setVerificado && (
        <div>
          <InversionesFiltroVerify valor={verificado} setValor={setVerificado} />
        </div>
      )}

    </>
  );
}


export default InversionesFiltros;