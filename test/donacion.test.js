function validarDonacion(donacion) {
  if (!donacion.titulo || !donacion.categoria || !donacion.cantidad || !donacion.donante) {
    return false;
  }
  if (typeof donacion.cantidad !== 'number' || donacion.cantidad <= 0) {
    return false;
  }
  return true;
}

// Ejecución de Pruebas
console.log("==========================================");
console.log("    PRUEBAS UNITARIAS: MÓDULO DONACIONES  ");
console.log("==========================================");

const prueba1 = validarDonacion({ titulo: "Ropa de invierno", categoria: "Textil", cantidad: 10, donante: "test@donafacil.org" });
console.log("Prueba 1 (Objeto Válido):", prueba1 === true ? "✅ PASÓ (PASS)" : "❌ FALLÓ (FAIL)");

const prueba2 = validarDonacion({ titulo: "Calzado", categoria: "Calzado", cantidad: -2, donante: "test@donafacil.org" });
console.log("Prueba 2 (Cantidad Negativa Inválida):", prueba2 === false ? "✅ PASÓ (PASS)" : "❌ FALLÓ (FAIL)");

const prueba3 = validarDonacion({ titulo: "", categoria: "Alimentos", cantidad: 5, donante: "test@donafacil.org" });
console.log("Prueba 3 (Título Vacío Inválido):", prueba3 === false ? "✅ PASÓ (PASS)" : "❌ FALLÓ (FAIL)");
console.log("==========================================");
