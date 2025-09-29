
const sales = [
  { product: "A", amount: 120 },
  { product: "B", amount: 300 },
  { product: "C", amount: 150 },
  { product: "D", amount: 200 }
];


const sortedsales = sales.slice().sort((a, b) => b.amount - a.amount);
console.log("Sorted Sales descending:", sortedsales);


const highsalesproducts = sales
  .filter(item => item.amount > 150)
  .map(item => item.product);
console.log("products with amount > 150:", highsalesproducts);

const totalsales = sales.reduce((total, item) => total + item.amount, 0);
console.log("Total Sales:", totalsales);


const amounts = sales.map(item => item.amount);
const typedArray = new Uint16Array(amounts);
for (let i = 0; i < typedArray.length; i++) {
  typedArray[i] = Math.round(typedArray[i] * 1.1); 
}
console.log("Typed array with 10% increase:", typedArray);
