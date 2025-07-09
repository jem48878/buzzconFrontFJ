//lado cliente
//Manejo de json de dataUsuarios firebase Realtime Databse 
//manejo plano , se lee todo el json y se trabaja con javascript desde dataUsuariosFunction
//escalable reemplazo de lectura plana por queries etc... 


//direccion de json en firebase
const FIREBASE_USUARIOS_URL = 'https://databuzzconfrontnx-default-rtdb.firebaseio.com/dataUsuario.json';

// Leer todas los usuarios desde Firebase
export async function loadUsuario() {
  try {
    console.log("--load usuario firebase--")  
    const res = await fetch(FIREBASE_USUARIOS_URL);
    const data = await res.json();
    // Convertir el objeto a array
    if (!data) return [];
    return Object.entries(data).map(([id, item]) => ({ id, ...item }));
  } catch (error) {
    console.error('Error al leer usuarios de Firebase:', error);
    return [];
  }
}


// Agregar 
export async function addUsuario(entrada) {
  try {
    const res = await fetch(FIREBASE_USUARIOS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entrada),
    });
    const result = await res.json();
    return result; // { name: "-idGenerado" }
  } catch (error) {
    console.error('Error al agregar usuario:', error);
  }
}



// Modificar un usuario existente
export async function updateInversion(id, nuevosDatos) {
  try {
      
    const url = FIREBASE_USUARIOS_URL.replace('.json', `/${id}.json`);
      
      
    const res = await fetch(url, {
      method: 'PATCH', // o PUT si querés reemplazar completamente
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevosDatos),
    });
    const result = await res.json();
    return result;
  } catch (error) {
    console.error('Error al modificar usuario en Firebase:', error);
  }
}
