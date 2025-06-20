
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "@/src/firebase";

// Leer todas las inversiones desde Firebase
export async function loadInversiones() {
  try {
    console.log("load firestore")  
    const querySnapshot = await getDocs(collection(db, "dataInversionesFS"));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error al leer inversiones:", error);
    return [];
  }
}



// Agregar nueva inversión
export async function addInversion(inversion) {
  try {
    console.log("add firestore")    
    const docRef = await addDoc(collection(db, "dataInversionesFS"), inversion);
    return { id: docRef.id };
  } catch (error) {
    console.error("Error al agregar inversión:", error);
    return { error };
  }
}
