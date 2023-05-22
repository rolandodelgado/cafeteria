/**
 * Esta funcion suma el total de items dentro de la Orden
 * @param {Array} products ordersItems: Array of Objects
 * @returns {number} Total price
 */
export const totalPrice = (products) => {
    let sum = 0
    products.forEach(product => sum += product.precio)
    return sum
} 

let lastId = 0;

export function generateAutoId() {
  lastId++;
  return lastId;
}