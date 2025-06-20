import { readFile, writeFile } from 'fs/promises';
import path from 'path';

// Ruta al archivo de texto
const DATA_PATH = path.join(process.cwd(), 'data', 'dataInversiones.txt');
                                                    
// Leer el archivo
export async function loadInversiones() {
  try {
    const json = await readFile(DATA_PATH, 'utf8');
    return JSON.parse(json);
  } catch (error) {
    console.error('Error al leer inversiones:', error);
    return [];
  }
}

// Agregar nueva inversión al archivo
export async function addInversion(inversion) {
  try {
    const data = await loadInversiones();
    data.push(inversion);
    await writeFile(DATA_PATH, JSON.stringify(data, null, 2), 'utf8');
  } catch (error) {
    console.error('Error al guardar inversión:', error);
  }
}
