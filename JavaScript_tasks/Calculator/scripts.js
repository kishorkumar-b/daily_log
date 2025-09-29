let display = document.getElementById('display');

function appendValue(value) {
      display.value += value;
    }

function cleardisplay() {
      display.value = '';
    }

function deletelast() {
      display.value = display.value.slice(0, -1);
    }

function calculateresult() {
  try{
    if (display.value===""){
      display.value=0
    }else{
        display.value = eval(display.value);
    }
  }catch(error){
    cleardisplay();
    }}
function numbers(event) {
  if (
    event.key === "Backspace" ||event.key === "ArrowLeft" ||event.key === "ArrowRight" || 
    event.key==="+"||event.key==="-"||event.key==="/"||event.key==="*"||
    (event.key >= '0' && event.key <= '9')
  ) {
    return true;
  }
  return false;
}

document.getElementById('display').addEventListener('keydown', function (event) {
  const allowedKeys = ["Backspace", "ArrowLeft", "ArrowRight", "+", "-", "/", "*", "."];

  if (!(allowedKeys.includes(event.key) || (event.key >= '0' && event.key <= '9'))) {
    event.preventDefault();
  }
  if (event.key === "Delete") {
    cleardisplay();
    event.preventDefault();
  }

  if (event.key === "Enter") {
    calculateresult();
    event.preventDefault();
  }
});

