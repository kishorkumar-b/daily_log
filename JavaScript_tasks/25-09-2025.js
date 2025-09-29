const { object } = require("prop-types")

const d= new Date("January 05, 2025")

d.setFullYear(2020)
console.log(d)
// class
class car{
    constructor(Name,year){
        this.Name=Name
        this.year=year
    }
    age(x){
        return x - this.year
    }
}
let date =new Date()
year=date.getFullYear() 
const mycar = new car("MG",2019)
console.log(mycar.Name,mycar.year,mycar.age(year))

// inheritance
class Car1{
    constructor(brand){
        this.brand=brand;
    }
    present(){
        return 'i have a '+this.brand
    }
}
class Model extends Car1{
    constructor(brand,mod){
        super(brand)
        this.Model=mod

    }
    show(){
        return this.present() +', its a Mustang'
       
    }
}

const myCar= new Model("BMW","M5")
console.log(myCar.show())

// getter and setter

class cars{
    constructor(name){
        this.name=name
    }
    get cname(){
        return this.name
    }
    set cname(x){
        return this.name=x
    }
}
const mycar1=new cars('bmw')
console.log(mycar1.cname)

mycar1.cname="ford"

console.log(mycar1.cname)
// static

class car2{
    constructor(brand){
        this.brand=brand
    }
    static greating(){
        return 'hello'

    }
}
console.log(car2.greating())
const obj = new car2("ford")
console.log(obj.greating())
// maps

const fruits=new Map([["banana",300]])

fruits.set("apple",500)
fruits.set("mango",200)
fruits.set("apple",400)
console.log(fruits)
console.log(fruits.get("apple"))

console.log(fruits.size)
fruits.delete("apple")
console.log(fruits.has("mango"))

fruits.forEach(function(value,key){
    console.log(key,"=",value)
})

console.log(fruits.entries())
console.log(fruits.keys())
console.log(fruits.values())

const grapes ={name:"garpes"}
const pineapple={name:"pineapple"}

fruits.set(grapes,500)
fruits.set(pineapple,150)
console.log(fruits)
console.log(fruits.get(grapes))


const array =  [
  {name:"apples", quantity:300},
  {name:"bananas", quantity:500},
  {name:"oranges", quantity:200},
  {name:"kiwi", quantity:150}
];
function filter({quantity}){
    return quantity>200?"ok":"low"
}
const result = Map.groupBy(array,filter)
console.log(result)

const myobj = {name:"kishor",name:"ravi"}

const weakmap = new WeakMap()
weakmap.set(myobj,'player')
console.log(weakmap.get(myobj))
 