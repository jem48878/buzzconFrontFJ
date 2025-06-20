
"use client"; 
import { FaSearch } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { useState } from 'react';
import MyContext from '@/contexts/MyContext';
import { useContext } from 'react';
import { useEffect } from 'react';


import InversionesFiltros from '@/components/Inversiones/Filtros/InversionesFiltros';

function BuscarEmpresas({ text }) {
    
      
   const {rsBsqEmpresas, setRsBsqEmpresas} = useContext(MyContext);    
   
   const [valorInput, setValorInput] = useState(''); // Estado inicial vacío    
   
   const [error, setError] = useState(null);       
     
   const [mostrarFiltros, setMostrarFiltros] = useState(false);
   
   const toggleFiltros = () => {
      setMostrarFiltros(!mostrarFiltros);
   };    
    
   
   const [areas, setAreas] = useState([]);     
    
   const [tecnologias, setTecnologias] = useState([]);     
    
   const [localidad, setLocalidad] = useState("")
   
   const [avance, setAvance] = useState("")   
    
   const [sustentable, setSustentable] = useState("");
    
   const [inversion, setInversion] = useState("");     
    
   const [contrato, setContrato] = useState("");    
    
   const [verificado, setVerificado] = useState("");        
    
    
   //Detectar la vuelta a la pagina desde el browser o desde el boton volver 
   //En desarrollo 
   //agregar variable de contexto con el ultimo filtro        
   const {ctxFiltros, setCtxFiltros} = useContext(MyContext);     
   useEffect(() => {
     const volver = localStorage.getItem('volviendoDesdeDetalle');
     if (volver === 'true') {
       console.log('Volvés desde DetalleInversion;');
       //setRetorno(true);

       // Limpiás el flag para no repetirlo
       localStorage.removeItem('volviendoDesdeDetalle');

       // Restaurar scroll, filtros, etc.
     }
   }, []);
    
    
   const [filtroAnt, setFiltroAnt] = useState('');
    
   useEffect(() => {
    const filtro = {valorInput , localidad , areas , sustentable , tecnologias , contrato , avance , inversion , verificado}; 
    setFiltroAnt(filtro)   
    console.log("Filtro anterior:" , filtro)    
   }, []);         
        
   
   const handleLimpiarFiltros = () => {
     setAreas([]);             // Array de checkboxes Areas
     setTecnologias([]);       // Array de checkboxes Techs
     setLocalidad("");         // Select de Location
     setSustentable("");       // Botón de Sustainability
     setInversion("");         // Campo is_Asking
     setContrato("");          // Campo contract
     setAvance("");            // Select DevStage
     setVerificado("");            // campo verify_level   
     setError(null)     
     const filtro = {valorInput , localidad , areas , sustentable , tecnologias , contrato , avance , inversion , verificado}; 
     setFiltroAnt(filtro)      
   };    
    
    
    
   const handleInputChange = (event) => {
        setValorInput(event.target.value);
      };
   
    
   const handleButtonClick = async () => {
      console.log('Valor del input:', valorInput);
      console.log('areas' , areas) 
      console.log('tecnologias' , tecnologias) 
       
      
       
      try {
        /*
        q:string? (input de barra de búsqueda)
        location:string? (ubicación)
        area:string[]? (rubro)
        devStage:string? (qué tan avanzado está el producto)
        sustainability:string? (nivel de sustentabilidad)
        technologies:string[]? (qué tecnologías usa)
        contract:string? (si es un contrato de acciones o préstamo)
        is_Asking:bool?
        verify_level:enum?
        */
        
        const filtroNvo = {valorInput , localidad , areas , sustentable , tecnologias , contrato , avance , inversion , verificado};   
       //cambio el filtro 
       if (JSON.stringify(filtroNvo) !== JSON.stringify(filtroAnt)) {
           console.log("cambio el filtro")  
           console.log("ant:" , filtroAnt)    
           console.log("Nvo:" , filtroNvo)        
           setFiltroAnt(filtroNvo)  
           
           var prmInversion = inversion
           if (inversion && inversion!=" ") {
             if (inversion == "Ofrece Inversion")  
                prmInversion = true
             else 
                prmInversion = false;
           }
          
           
           const queryParams = new URLSearchParams({ q:valorInput ,
                                                  location: localidad ,
                                                  area: areas ,
                                                  devStage: avance ,
                                                  sustainability: sustentable ,     
                                                  technologies:tecnologias ,
                                                  contract: contrato ,
                                                  is_Asking:prmInversion ,
                                                  verify_level:verificado    
                                                });  
        // Hacer la llamada GET
        const url = process.env.NEXT_PUBLIC_API_BUSCAR_INVERSIONES;    
        //const response = await fetch(`/api/ApiMockInversiones?${queryParams.toString()}`, {
        const response = await fetch(`${url}?${queryParams.toString()}`, {
             method: 'GET',
        });
        
        /*Hacer la llamada POST
        const response = await fetch('/api/ApiMockPostEmpresas', {
          method: 'POST',
          headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({localidad: valorInput}),
         
        });
        */
          
        setError(null)  
        const dataEmpresas = await response.json();
        if (dataEmpresas.res.length > 0 ) { 
           setRsBsqEmpresas(null);
           setRsBsqEmpresas(dataEmpresas.res);
           setError('Se encontraron ' + dataEmpresas.res.length + ' INVERSION/ES para las condiciones de buesqueda')    
        }
        else {
            setError('No hay INVERSIONES para las condiciones de buesqueda')
         }  
      } //fin cambio el filtro 
      else {      
        //setError('No se modificaron las condiciones de busqueda')  
      }      
     } catch (error) {
        console.error('Error al buscar empresas:', error);
        setError(error)      
     }
  };

    
    
  return (
    <>  
     <div className="search-container"> 
       <input type="search"  className="input-bsq" value={valorInput} onChange={handleInputChange}
       placeholder="Ingrese Titulo de la Inversion..." > 
       </input>
       <button type="button" className="btn-default-bsq" onClick={handleButtonClick}>          
        {text}
       </button>
      
       {/* Menú desplegable */}
       <button type="button" className="btn-filtros" onClick={toggleFiltros}>          
         Buscar por.... <FaChevronDown />
       </button>
      
     
     </div>  {/* fin search-Container */}
      
     <div className="filtros-container">  
       
       {mostrarFiltros && (
        <div style={{ border: '2px solid #000000', marginTop: '20px', padding: '10px', display: 'flex', gap: '30px' , position: 'relative', borderRadius: '30px'}}>
     
      
         <InversionesFiltros 
           areas={areas} setAreas={setAreas}
           tecnologias={tecnologias} setTecnologias={setTecnologias}
           localidad={localidad} setLocalidad={setLocalidad}
           sustentable={sustentable} setSustentable={setSustentable}
           inversion={inversion} setInversion={setInversion}
           contrato={contrato} setContrato={setContrato}
           avance={avance} setAvance={setAvance}
           verificado={verificado} setVerificado={setVerificado}
         />    
     
      
         <br/>
         {/* BORRAR Filtros */}
         {/*<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',  marginTop: '10px' }}>*/}
         <div style={{ position: 'absolute', bottom: '5px', right: '5px', zIndex: 1 }} >  
      
             {/* Botón de limpiar */}
           <button
             onClick={handleLimpiarFiltros}
                style={{
                  backgroundColor: 'white',
                  background: 'none',
                  color: 'black',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '20px',
                  marginLeft: '5px'
             }}
            title="Limpiar filtros"
           >
           <FaTrash />
           </button>
          </div>   


        </div> 
      )}  {/* fin mostrarFiltros */} 

     </div>    {/* fin Filtros-container */} 
      
     <br/>
     <p>{error}</p>
 
     

    </>  
  ) ;
                        
}

export default BuscarEmpresas;