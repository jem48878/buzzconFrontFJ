import { FaBars } from "react-icons/fa";

function Encabezado() {
  return (
    <>
      {/* Botón fijo por fuera del flujo */}
      <button className="icono-fijo-Menu">
        <FaBars />
      </button>

      {/* Logo u otros elementos */}
      <div style={{ display: 'flex', alignItems: 'center', paddingLeft: '110px' }}>
        <img
          src="/nombre.png"
          alt="Logo"
          style={{
            height: '100px',
            objectFit: 'cover'
          }}
        />
      </div>
    </>
  );
}


export default Encabezado;