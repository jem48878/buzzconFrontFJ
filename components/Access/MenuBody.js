// components/Access/MenuBody.js

import StyleAccess   from '@/components/Access/StyleAccess.css';   

function MenuBody({ onRegister}) {
 
  return (

      
  <div className="row  justify-content-between g-4 mt-5">
      
      
  {/* Columna izquierda */}
  
  <div className="col-md-4 d-flex flex-column justify-content-end" style={{ minHeight: "400px" , marginLeft: "2rem"}}>      
  <div  className="mt-auto">    
    <h1 className="fw-bold mb-4 text-white" style={{ fontSize: "3rem" }}>
      Es hora de <span style={{ color: "#1ca08c" }}>crear</span> tu propio negocio
    </h1>

    <p className="mb-4 text-white"  style= {{ fontSize: "1.2rem" }}>
      Descubrí la forma más rápida y sencilla de crear tu próximo negocio junto a Buzzcon,
      ofrecemos los mejores servicios relacionados a negocios, para <br />descubrir todo{" "}
      <a className="text-white text-decoration-underline"
       onClick={onRegister} 
      >
      crea tu cuenta</a>
    </p>

      
    <a className="btn mb-4 fw-semibold"
      style={{
        backgroundColor: "#1ca08c",
        color: "white",
         padding: "6px 46px",
         fontSize: "1.5rem", 
         borderRadius: "16px",         
      }}
      onClick={onRegister} 
      >
      Crea tu cuenta
    </a>
      
  </div>
  </div>      

  {/* Columna derecha: Imagen */}
  <div className="col-md-5 text-center" style={{ marginRight: "2rem" }}>
    <img
      src="/foto_menu.jpg"
      alt="Ilustración"
      className="img-fluid"
      
      style={{
            maxHeight: "400px",
            width: "100%",
            objectFit: "contain",
            borderRadius: "20px",
          }}
      
    />
  </div>

      
  {/* Bullets */}
  <div className="col-12 mt-4 d-flex flex-wrap gap-4 text-white small justify-content-center px-md-3">      
    <div className="d-flex flex-wrap gap-4 text-white small " style={{ marginTop: "8rem"  }}>
      <div className="d-flex align-items-center">
        <span className="me-2 rounded-circle" style={{ width: "20px", height: "20px", backgroundColor: "#38ef7d" }}></span>
        <span style= {{ fontSize: "1.2rem" , color: "#d3d3d3"}}>
          Crea tu cuenta&nbsp;
        </span>
        <span style= {{ fontSize: "1.2rem"  , color: "white", fontWeight: "600"}}>
          en segundos
        </span>
      </div>
      <div className="d-flex align-items-center" style={{ marginLeft: "2rem" }}>
        <span className="me-2 rounded-circle" style={{ width: "20px", height: "20px", backgroundColor: "#38ef7d" }}></span>
        <span style= {{ fontSize: "1.2rem" , color: "#d3d3d3" }}>
          Empezá a&nbsp; 
        </span> 
        <span style= {{ fontSize: "1.2rem" , color: "white", fontWeight: "600"}}>
          crear tu negocio
         </span>
      </div>
      <div className="d-flex align-items-center" style={{ marginLeft: "2rem" }}>
        <span className="me-2 rounded-circle" style={{ width: "20px", height: "20px", backgroundColor: "#38ef7d" }}></span>
        <span style= {{ fontSize: "1.2rem" , color: "#d3d3d3" }}>
           Tu negocio de&nbsp; 
        </span>
        <span style= {{ fontSize: "1.2rem"  , color: "white", fontWeight: "600"}}>
           la manera más completa
        </span>
      </div>
     </div>
    </div>  
      
    {/* fin Bullets */}  
    
        
   <hr
      style={{
        borderTop: "4px solid white",
        width: "100%", 
        opacity: 1,
        marginTop: "7rem"
     }}
    />
      
    </div>

  );
}


export default MenuBody ;

