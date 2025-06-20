import { useState, createContext } from 'react';

const MyContext = createContext();

export function ContextProvider(props) {
  const [rsBsqEmpresas, setRsBsqEmpresas] = useState([]);    
  const [ctxFiltros, setCtxFiltros] = useState([]);    
  return (
    <MyContext.Provider value={{rsBsqEmpresas, setRsBsqEmpresas , ctxFiltros, setCtxFiltros }}>
      {props.children}
    </MyContext.Provider>
  );
}

export default MyContext;
