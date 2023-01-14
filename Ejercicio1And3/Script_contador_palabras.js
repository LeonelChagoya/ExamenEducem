/*3. Desarrolla un SCRIPT en código el algoritmo para obtener el siguiente resultado, dada una
secuencia de caracteres, encontrar el número de veces que aparece cada palabra del texto, a lo
largo del mismo texto.
Resultado esperado: Lista de palabras únicas en el texto, indicando cuantas veces aparecen
dentro de la secuencia de caracteres
Dos ejemplos de Texto para aplicar tu algoritmo
"NO ME MIRES QUE MIRAN QUE NOS MIRAMOS. MIREMOS LA MANERA DE NO MIRARNOS.
MIRA: NO NOS MIREMOS. Y CUANDO NO NOS MIREN, NOS MIRAREMOS."
"El hipopótamo Hipo está con hipo. Y su hipopotamito con hipito. ¿Quién les quita el hipo a los
hipopótamos Hipo?"*/

function contarPalabras(texto) {
  // Crear un objeto vacío para almacenar las palabras y sus contadores
  let contadores = {};
  // Convertir el texto a minúsculas
  texto = texto.toLowerCase();
  // Remover signos de puntuación
  texto = texto.replace(/[.,;:!?]/g, "");
  // Separar el texto en una lista de palabras
  let palabras = texto.split(" ");
  // Recorrer cada palabra en la lista
  for (let i = 0; i < palabras.length; i++) {
    let palabra = palabras[i];
    // Si la palabra está en el objeto, aumentar el contador
    if (palabra in contadores) {
      contadores[palabra]++;
    } else {
      // Si no está en el objeto, agregar la palabra con contador 1
      contadores[palabra] = 1;
    }
  }
  // Devolver el objeto de contadores
  return contadores;
}

// Ejemplo de uso
var texto1 =
  "NO ME MIRES QUE MIRAN QUE NOS MIRAMOS. MIREMOS LA MANERA DE NO MIRARNOS. MIRA: NO NOS MIREMOS. Y CUANDO NO NOS MIREN, NOS MIRAREMOS.";
console.log(contarPalabras(texto1));

var texto2 =
  "El hipopótamo Hipo está con hipo. Y su hipopotamito con hipito. ¿Quién les quita el hipo a los hipopótamos Hipo?";
console.log(contarPalabras(texto2));
