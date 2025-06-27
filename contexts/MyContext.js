'use client';
import { useState, createContext } from 'react';

const MyContext = createContext();

export function ContextProvider(props) {
  const [rsBsqEmpresas, setRsBsqEmpresas] = useState([]);    
  const [ctxFiltros, setCtxFiltros] = useState([]);    
  const [usrLogueado, setUsrLogueado] = useState(null);        
    
    
  return (
    <MyContext.Provider value={{rsBsqEmpresas, setRsBsqEmpresas , ctxFiltros, setCtxFiltros , usrLogueado, setUsrLogueado}}>
      {props.children}
    </MyContext.Provider>
  );
}

export default MyContext;
