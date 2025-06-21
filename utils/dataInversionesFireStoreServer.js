// utils/datainversionesFireStoreServer.js
import { db } from '@/src/firebaseAdmin'; 

// Leer todas las inversiones desde Firebase (Firestore Admin)
export async function loadInversiones() {
  try {
    console.log("load firestore - admin");

    const snapshot = await db.collection("dataInversionesFS").get();

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error al leer inversiones:", error);
    return [];
  }
}

// Agregar nueva inversión (Firestore Admin)
export async function addInversion(inversion) {
  try {
    console.log("add firestore - admin");

    const docRef = await db.collection("dataInversionesFS").add(inversion);

    return { id: docRef.id };
  } catch (error) {
    console.error("Error al agregar inversión:", error);
    return { error };
  }
}
