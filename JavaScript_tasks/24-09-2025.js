const { string } = require("yargs")

const person={name:'kishor'}
const object = Object.create(person)
console.log(Object.getPrototypeOf(object)===person)
console.log(Object.isExtensible(person))

Object.preventExtensions(person)

console.log(Object.isExtensible(person))

person.age=18
console.log(person)

console.log(person.valueOf())// returns the key values

console.log(person.toString())// it 

const inventory = [
  { name: "asparagus", type: "vegetables", quantity: 9 },
  { name: "bananas", type: "fruit", quantity: 5 },
  { name: "goat", type: "meat", quantity: 23 },
  { name: "cherries", type: "fruit", quantity: 12 },
  { name: "fish", type: "meat", quantity: 22 },
];

const result=Object.groupBy(inventory,({quantity})=>
    quantity<6 ? 'Restock':'sufficient',
)
console.log(result.sufficient)


// set

const letter = new Set();
letter.add('a')
letter.add('b')
letter.add('b')
console.log(letter)

// listing the element

for(i of letter){
    console.log(i)
}
console.log(typeof letter)

console.log(letter.size)

console.log(letter.has('b'))

letter.forEach(function(a){
    console.log(a)
})

const val=letter.values()// it returns the iterable object
for (i of val){
    console.log(i)
}

const key= letter.keys()
console.log(...key)

const entry = letter.entries()
console.log(entry)

const a= new Set(['a','b','c','d'])
const b= new Set(['b','f','s','c'])

console.log(a.union(b))
console.log(a.intersection(b))
console.log(a.difference(b))

const A = new Set(['a','b','c']);
const B = new Set(['b','c','d']);

const C = A.symmetricDifference(B);
console.log(C)

const sub=A.isSubsetOf(B)
console.log(sub)

const superset = A.isSupersetOf(B)
console.log(superset)

const disjoin = A.isDisjointFrom(B)
console.log('dis'+disjoin)

let myset=new WeakSet()

let myobj={name:"kishor",age:"20"}

myset.add(myobj)

console.log(myset.has(myobj))

//dates
const y= new Date(2025,9,24,15,32,15,0)
const x= new Date(10000000000000)


console.log(x.toString())