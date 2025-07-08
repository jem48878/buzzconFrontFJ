import { useContext } from 'react';
import MyContext from '@/contexts/MyContext';

export default function useSetUsuarioLogueado() {
  const { setUsrLogueado } = useContext(MyContext);

  const guardarUsuario = (usuario) => {
    // 1. Actualiza el contexto
    setUsrLogueado(usuario);

    // 2. Guarda o elimina en localStorage
    if (usuario) {
      localStorage.setItem('userLogueadoLs', JSON.stringify(usuario));
    } else {
      localStorage.removeItem('userLogueadoLs');
    }

    // 3. Devuelve el valor actualizado
    return usuario;
  };

  return guardarUsuario;
}
