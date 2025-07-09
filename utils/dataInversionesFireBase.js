//- Lado Cliente -
//leer y grabar el json en la nube firebase realtime databse 
//Manejo de json de dataInversiones 
//manejo plano , se lee todo el json y se trabaja con javascript desde dataUsuariosFunction
//escalable a manejo eficiente de busquedas con query etc....

//direccion de json en firebase
const FIREBASE_URL = 'https://databuzzconfrontnx-default-rtdb.firebaseio.com/dataInversiones.json';

// Leer todas las inversiones desde Firebase
export async function loadInversiones() {
  try {
    console.log("load fireBase")    
    const res = await fetch(FIREBASE_URL);
    const data = await res.json();
    // Convertir el objeto a array
    if (!data) return [];
    return Object.entries(data).map(([id, item]) => ({ id, ...item }));
  } catch (error) {
    console.error('Error al leer inversiones de Firebase:', error);
    return [];
  }
}

// Agregar nueva inversión
export async function addInversion(inversion) {
  try {
    console.log("add fireBase")     
    const res = await fetch(FIREBASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(inversion),
    });
    const result = await res.json();
    return result; // result.name contiene el ID generado
  } catch (error) {
    console.error('Error al agregar inversión en Firebase:', error);
  }
}
