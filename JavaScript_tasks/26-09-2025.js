// string

let str="Hello, World!";
console.log(str.length); 
console.log(str.charAt())
console.log(str.charCodeAt(3))
console.log(str.concat(' How are you?'))
console.log(str.at(1))

console.log(str.codePointAt(3))
console.log(str[10])
console.log(str.substring(0,5))
const str1='hello'
let str2=str1.trim()
console.log(str2)
console.log(str1.split(''))

let text = "Please locate where locate occurs!";
console.log(text.indexOf("l",10))
console.log(text.lastIndexOf("l"))
console.log(text.search("locate"))
let matchtext = text.match(/locate/g)
console.log(matchtext)
let reptext = text.matchAll(/locate/g)
console.log(Array.from(reptext))

console.log(text.includes("locate"))
console.log(text.startsWith("Please"))
console.log(text.endsWith("!"))

// promise

function fetchData() {
  return new Promise((resolve, reject) => {
setTimeout(()=>{
      let dataFetched = true ;
      if (dataFetched) {
        resolve("Data selected");
      } else {
        reject("Error loading data.");
      }
},2000)
  });
}

fetchData()
  .then(data => {console.log(data)
return "processing data"})
  .then(processedData => console.log(processedData))
  .catch(err => console.error(err))
  .finally(() => console.log("Done"));

  let p1 = Promise.reject("❌ Fail 1");
let p2 = Promise.resolve("✅ Success 2");
let p3 = Promise.resolve("❌ Fail 3");

Promise.any([p1, p2, p3])
  .then(result => console.log(result)) // ✅ Success 2
  .catch(error => console.error(error));
console.log(Number.isSafeInteger(1021453123654854))