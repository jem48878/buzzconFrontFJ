'use client';
import { useRef, useEffect } from 'react';
import { FaUser, FaSignOutAlt } from 'react-icons/fa';

function MenuUser({ visible, onClose, anchorRef, onLogout , onMiCuenta }) {
  const menuRef = useRef(null);

  // Cierra el menú si se hace clic fuera
  useEffect(() => {
    function handleClickOutside(e) {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        !anchorRef.current.contains(e.target)
      ) {
        onClose();
      }
    }
    if (visible) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [visible, onClose, anchorRef]);

  if (!visible) return null;

  return (
    <ul
      className="dropdown-menu dropdown-menu-end show mt-2"
      ref={menuRef}
      style={{ position: 'absolute', right: 0 }}
    >
      <li>
        <button className="dropdown-item d-flex align-items-center gap-2" 
           onClick={onMiCuenta} >
          <FaUser /> Mi cuenta
        </button>
      </li>
      <li>
        <button
          className="dropdown-item d-flex align-items-center gap-2"
          onClick={onLogout} 
         >
          <FaSignOutAlt /> Cerrar sesión
        </button>
      </li>
    </ul>
  );
}

export default MenuUser;