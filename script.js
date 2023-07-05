const dayE1 = document.getElementById("day");
const monthE1 = document.getElementById("month");
const yearE1 = document.getElementById("year");

const today = new Date();
dayE1.addEventListener("keyup", (e) => {
  console.log(e.target.value);
});
monthE1.addEventListener("keyup", (e) => {
  console.log(e.target.value);
  if (e.target.value < 1 || e.target.value > 12) {
    let pError = document.createElement("p");
    pError.textContent = "Must be a valid month";
    if (document.getElementById("month-error")) {
      //do nothing
    } else {
      pError.setAttribute("id", "month-error");
      e.target.parentElement.append(pError);
    }
  } else if (yearE1.value == 2023 && e.target.value > today.getMonth()) {
    let pError = document.createElement("p")
    pError.textContent = " Must be in the past"
    if (document.getElementById("month-error")) {
      
    }
  }
});
yearE1.addEventListener("keyup", (e) => {
  // console.log(e.target.value);
  // console.log(today.getFullYear());
  // console.log(e.target.parentElement.children);
  if (e.target.value > 4) {
    e.target.value = e.target.value.substr(0, 4);
  }
  if (e.target.value > today.getFullYear()) {
    let pError = document.createElement("p");
    pError.textContent = "Must be in the past";
    if (document.getElementById("year-error")) {
      //do nothing
    } else {
      pError.setAttribute("id", "year-error");
      e.target.parentElement.append(pError);
    }
  } else {
    if (document.getElementById("year-error")) {
      document.getElementById("year-error").remove();
    }
  }
});
