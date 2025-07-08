import { useContext, useEffect, useState } from 'react';
import MyContext from '@/contexts/MyContext';

export default function useUsuarioLogueado() {
  const { usrLogueado, setUsrLogueado } = useContext(MyContext);
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const localStorageKey = 'userLogueadoLs';

    if (usrLogueado) {
      // Está en contexto → actualizar localStorage si no está
      setUsuario(usrLogueado);
      const existente = localStorage.getItem(localStorageKey);
      if (!existente) {
        localStorage.setItem(localStorageKey, JSON.stringify(usrLogueado));
      }
    } else {
      // Intentar recuperar del localStorage
      const usuarioLs = localStorage.getItem(localStorageKey);
      if (usuarioLs) {
        try {
          const parsed = JSON.parse(usuarioLs);
          setUsuario(parsed);
          setUsrLogueado(parsed); // sincronizar al contexto
        } catch (err) {
          console.error('Error parseando userLogueadoLs:', err);
        }
      }
    }
  }, [usrLogueado, setUsrLogueado]);

  return usuario;
}
