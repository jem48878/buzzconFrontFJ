"use client";
 
import MyStyles   from '@/components/MyStyles.css';   
import React from 'react';
import InversionesFiltros from '@/components/Inversiones/Filtros/InversionesFiltros'; 
import MostrarDetalle from '@/components/Inversiones/DetalleComponents/MostrarDetalleInversion'; 
import { FaFileUpload } from "react-icons/fa";

import ModalAlerta   from '@/components/ModalAlerta.js';   

import { useState, useEffect , useContext } from 'react';

import { agregarInversion } from '@/utils/dataInversionesFunction'; //nuevo


function AgregarInversion() {
  
   //variables de control     
   const [modalAbierto, setModalAbierto] = useState(false);        
   const [altaOK, setAltaOK]             = useState(false);  
    
    
   const [owner, setOwner]             = useState("");         
   const [title, setTitle]             = useState("");         
   const [summary, setSummary]         = useState(""); 
   //const [verifyLevel, setVerifylevel] = useState(0);   
   const [contactInfo, setContactInfo] = useState("");       
    
    
   const [areas, setAreas] = useState([]);         
   const [tecnologias, setTecnologias] = useState([]);     
   const [localidad, setLocalidad] = useState("")
   const [sustentable, setSustentable] = useState("");    
   const [inversion, setInversion] = useState(""); 
   const [contrato, setContrato] = useState("");   
   const [avance, setAvance] = useState("")   
   const [verificado, setVerificado] = useState("");        
   
    
   const [description, setDescription] = useState('');
    
   const [file, setFile] = useState(null);
   const [preview, setPreview] = useState(null);
   const [message, setMessage] = useState('');

    
   const handleChangeOwner = (event) => {
        setOwner(event.target.value);
    };
    
   const handleChangeTitle = (event) => {
        setTitle(event.target.value);        
    };
   
   const handleChangeSummary = (event) => {
        setSummary(event.target.value);
    };
   
   const handleChangeContactInfo = (event) => {
        setContactInfo(event.target.value);
    };   
    
    
   const handleChangeDescription = (event) => {
        setDescription(event.target.value);
    };
    
   const handleChangeImagen = (e) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
        setFile(selectedFile);
        setPreview(URL.createObjectURL(selectedFile));
        }
    };

    
   const armarTags = (tecnologias, areas , sustentable , contrato , avance) =>{
        
        let tags = [];
        
        // Agregar tecnologías y áreas si existen
        if (Array.isArray(tecnologias)) {
            tags = tags.concat(tecnologias);
        }

        if (Array.isArray(areas)) {
            tags = tags.concat(areas);
        }

        // Agregar otros campos si no están vacíos
        if (sustentable && sustentable.trim() !== "") {
            tags.push(sustentable.trim());
        }

        if (contrato && contrato.trim() !== "") {
            tags.push(contrato.trim());
        }

        if (avance && avance.trim() !== "") {
             tags.push(avance.trim());
        }

        console.log("nuevo tags:", tags);
        
        return  tags
    }    
        
   const armarTags2 = (tecnologias, areas , sustentable , contrato , avance) =>{
        return  {technologies   :tecnologias,
                 areas          :areas ,
                 sustainability :sustentable,
                 contract       :contrato ,
                 devStage       :avance }
    }        

   const entorno = process.env.NEXT_PUBLIC_ENTORNO;       //nuevo   

   const handleAgregar = async () => {
        
       console.log("click submit form")
        
       console.log("owner:"   , owner)
       console.log("title:"   , title)        
       console.log("summary  :" , summary)
        
        
       console.log("Areas:" , areas)
       console.log("Tecnologias" , tecnologias)
       console.log("localidad:" , localidad)
       console.log("sustentable:" , sustentable)
       console.log("inversion:" , inversion )
        
       console.log("contrato:" , contrato )
       console.log("avance:" , avance )
       console.log("description:" , description )
       
       let respuesta = null   //nuevo
       try {  
        
        setMessage(null); 
        setAltaOK(false)   
        const camposObligatorios = [title, inversion];
        const estanCompletos = camposObligatorios.every((campo) => campo.trim() !== "");
        
  //    owner:string   
  //	title:string
  //    verify_level:enum
  //    is_Asking:bool
  //	summary:string?
  //	location:string?
  //	tags:string[]?
  //	description:string?
  //	contactInfo:string?
        
        
        if (estanCompletos ) {
            console.log("entre campos obligatorios:" , entorno )
             
                
              //is_Asking
              var prmInversion = inversion
              if (inversion && inversion!=" ") {
                 if (inversion == "Ofrece Inversion")  
                    prmInversion = true
                 else 
                    prmInversion = false;
              }
        
            
             if ( entorno == 'local') {    //nuevo
                 
                let tags =  armarTags(tecnologias, areas , sustentable , contrato , avance)  
                console.log ('tags en pagina:', tags) 
                
                const entrada = {owner , title , verificado , prmInversion , summary , localidad , tags ,  description , contactInfo};   
                 
                console.log("tags en pagina entrada:" , entrada.tags)  
                 
                respuesta = await agregarInversion(entrada)
                console.log("respuesta.codRet:" , respuesta.codRet )  
                console.log("respuesta.error:" , respuesta.error)  
                if (respuesta.codRet !== 0 )  
                   throw new Error(respuesta.error); 
             }
             else {   //nuevo
            
            
             
              const response = await fetch('/api/ApiMockAgregarInversion', {
                 method: 'POST',
                 headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({owner       : owner
                                , title         : title
                                , verify_level  : verificado
                                , is_Asking     : prmInversion
                                , summary    : summary
                                , location   : localidad
                                , tags       : armarTags(tecnologias, 
                                                         areas , 
                                                         sustentable , 
                                                         contrato ,
                                                         avance)                                 
                                , description: description
                                , contactInfo: contactInfo                                    
                                 }),
         
              });
        
             } //nuevo fin else api local
            
            
             setAltaOK(true)  
             setModalAbierto(true)
                 
             if (file) {
               console.log("fileViejo:" , file.name )
        
               const formData = new FormData();
               formData.append('file', file);  
        
               const nvoNombre = 'inversion-' + owner + '-' + title + '-0' + '.jpg'         
               console.log("fileNuevo:" , nvoNombre )
               //formData.append('filename', 'nuevo-nombre.jpg'); // nombre deseado
               formData.append('filename', nvoNombre); // nombre deseado
          
               //const res = await fetch('/api/ApiMockSubirImagen', {
               const res = await fetch('/api/ApiSubirImagenSupaBase', {            
                   method: 'POST',
                   body: formData,
                });
                const data = await res.json();
             }
             
          } //fin se ingresaon campos obligatorios
          else {
             setMessage('Faltan informar campo Obligatorio'); 
          }
         } 
         catch (error) {
           console.log('Error al agregar inversion :', error);
           setMessage('Error al agregar inversion' , error);
         }
 };
        
    


    

    
 
return (
  <> 
  {!altaOK && (
      <div>   
       
        <div className="container-agregar"> 
    
          {/*cabecera*/}
          <div className="cabecera-container-agregar">  
    
             <div className="cabecera-imagen-agregar"> 
                    
                <label style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}>
                    {!preview && (<span><FaFileUpload style={{ fontSize: '82px' }}/></span>)}
                     <input
                          type="file"
                          accept="image/*"
                          onChange={handleChangeImagen}                          
                          style={{ display: 'none' }}
                    />
                    {preview && (
                      <div style={{ marginTop: 20 }}>
                        <img src={preview} alt="Preview" style={{ maxWidth: 300, border: '1px solid #ccc' }} />
                     </div>
                     )}
                 </label>
             </div>              

             
             <div className="cabecera-summary-agregar">  
                <label> Owner de la inversion <span className="required-asterisk">*</span>
                </label>
                <input type="search"  className="input-agregar" value={owner} onChange= {handleChangeOwner}
                  onBlur={() => setOwner(owner.trim())}   
                  placeholder="Ingrese Owner ..." > 
                </input>  
                  
                
                <label> Titulo de la inversion <span className="required-asterisk">*</span>
                </label>
                <input type="search"  className="input-agregar" value={title} onChange= {handleChangeTitle} 
                  onBlur={() => setTitle(title.trim())}      
                  placeholder="Ingrese Titulo de la Inversion..." > 
                </input>

                <label> Informacion de Contacto </label>
                <input type="search"  className="input-agregar" value={contactInfo} onChange= {handleChangeContactInfo}
                  placeholder="Ingrese informacion de contacto..." > 
                </input>               


                <label> Pequeño resumen </label>
                {/* 
                <input type="search"  className="input-bsq" value={summary} onChange=    {handleChangeSummary}
                  placeholder="Ingrese Descripcion Corta de la Inversion.." > 
                </input>
                */}  
                <textarea
                  className="input-agregar"
                  value={summary}
                  onChange={handleChangeSummary}
                  placeholder="Ingrese Descripción Corta ..."
                  rows={3} // puedes ajustar la altura con esto
                />
                </div>
          </div>
          {/* fin cabecera */}

          {/* tag  */}  
          
          <div className="filtros-container-agregar">    
               <InversionesFiltros 
                  areas={areas} setAreas={setAreas}
                  tecnologias={tecnologias} setTecnologias={setTecnologias}
                  localidad={localidad} setLocalidad={setLocalidad}
                  sustentable={sustentable} setSustentable={setSustentable}
                  inversion={inversion} setInversion={setInversion}
                  contrato={contrato} setContrato={setContrato}
                  avance={avance} setAvance={setAvance}
                  verificado={verificado} setVerificado={setVerificado}
                  opcion="agregar"
                /> 
          </div>          

          {/* Descripcion  */}   
          <div className="descripcion-container-inv">
              <textarea
                  className="input-textArea-agregar"
                  value={description}
                  onChange={handleChangeDescription}
                  placeholder="Ingrese Descripción de la Inversión ..."
                  rows={8} // puedes ajustar la altura con esto
              />
           </div>

          <br/> 
          <div className="btn-container-agregar">               
             <button className="btn-agregar" type="button" onClick={handleAgregar}>Agregar Inversion
             </button>                
          </div>
          <br/> 
            <p>Campos Obligatorios&nbsp;     
             <span className="required-asterisk">*</span>   
            </p>

          <br/>
       
       {message && (<> <p style={{ marginTop: 20 }}>{message}</p> <br/> </> ) }             
       
       </div>   {/*fin container-detalle-inv */}
       
       
        
        
            
      </div> 
    )}
    
    <ModalAlerta
        isOpen={modalAbierto}
        onClose={() => setModalAbierto(false)}
        title="Atención"        
        message={
           <>
              Inversión dada de alta.
              <br />
              Agregue fotos a su publicación.
           </>
         }
    />
    
    
    
    
    {altaOK  && (
        <div className='body'>      
          <MostrarDetalle owner={owner} title={title} opcion="agregar" />  
          <br/>
        </div>        
     )} 



       
    </>

  );

 
 
  
}

 
export default AgregarInversion;