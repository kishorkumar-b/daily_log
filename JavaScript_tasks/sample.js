const car=["mg",'kia',"bmw",]
car.push('mg')
console.log(car.includes("kia"))
console.log(typeof(car))
console.log(car.length)
console.log(car.sort())
console.log(car.toString())
console.log(typeof null);

console.log(car.at(3))
for(i=car.length-1;i>=0;i--){
    console.log(car[i])
}

console.log(car.join(" "))
car.pop()
console.log(car)
console.log(car.shift())
console.log(car.flat())


let position = car.indexOf("bmw") + 1;
console.log(position);
let lastposition = car.lastIndexOf("bmw") + 1;
console.log(lastposition);

const numbers = [4, 9, 16, 25, 29];
let first = numbers.find(myFunction);

function myFunction(value, index, array) {
  return value > 18;
}
console.log(first)

const lastnumbers = [4, 9, 16, 25, 29];
let lastindx = lastnumbers.findIndex(myFunction);

function myFunction(value, index, array) {
  return value > 18;
}
console.log(lastindx)

const temp = [27, 28, 30, 40, 42, 35, 30];
let high = temp.findLast(x => x > 30);
console.log(high)



