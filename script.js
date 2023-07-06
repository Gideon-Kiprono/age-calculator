//const moment = require("./moment");

const dayE1 = document.getElementById("day");
const monthEl = document.getElementById("month");
const yearE1 = document.getElementById("year");

const today = new Date();

function validateDay(day, elem, max) {
  let pError = document.createElement("p");
  if (day < 1 || day > max) {
    pError.textContent = "Must be a valid date";
    pError.setAttribute("id", "day-error");
    if (!document.getElementById("day-error")) {
      elem.parentElement.append(pError);
    }
  } else {
    if (document.getElementById("day-error")) {
      document.getElementById("day-error").remove();
    } else {
      
    }
  }
}
dayE1.addEventListener("keyup", (e) => {
  if (e.target.value.length > 2) {
    e.target.value = e.target.value.substr(0, 2);
  }
  // console.log(e.target.value);
  validateDay(document.getElementById("day"), e.target, 31);
});
monthEl.addEventListener("keyup", (e) => {
  if (e.target.value > 2) {
    e.target.value = e.target.value.substr(0, 2);
  }
  //feb days error
  if (e.target.value == 2 && document.getElementById("day").value > 28) {
    console.log("feb-condition");
    validateDay(document.getElementById("day").value, dayE1, 28);
  } else {
    validateDay(document.getElementById("day").value, dayE1, 31);
  }

  //month ending day 30
  if (
    e.target.value == 4 ||
    e.target.value == 6 ||
    e.target.value == 9 ||
    (e.target.value == 11 && document.getElementById("day").value > 30)
  ) {
    console.log("30 days month condition");
    validateDay(document.getElementById("day").value, dayE1, 30);
  } else {
    validateDay(document.getElementById("day").value, dayE1, 31);
  }

  if (e.target.value < 1 || e.target.value > 12) {
    let pError = document.createElement("p");
    pError.textContent = "Must be a valid month";
    if (document.getElementById("month-error")) {
      // do nothing
    } else {
      pError.setAttribute("id", "month-error");
      e.target.parentElement.append(pError);
    }
  } else if (yearE1.value == 2023 && e.target.value > today.getMonth()) {
    let pError = document.createElement("p");
    pError.textContent = "Must be in the past";
    if (document.getElementById("month-error")) {
      document.getElementById("month-error").textContent =
        "Must be in the past";
    } else {
      pError.setAttribute("id", "month-error");
      e.target.parentElement.append(pError);
    }
  } else {
    if (document.getElementById("month-error")) {
      document.getElementById("month-error").remove();
    }
  }
});
//monthE1.addEventListener("keyup", (e) => {
//   console.log(e.target.value);
//   let pError = document.createElement("p");
//   if (e.target.value < 1 || e.target.value > 12) {
//     pError.textContent = "Must be a valid month";
//     if (document.getElementById("month-error")) {
//       //do nothing
//     } else {
//       pError.setAttribute("id", "month-error");
//       e.target.parentElement.append(pError);
//     }
//   } else if (yearE1.value == 2023 && e.target.value > today.getMonth()) {
//     let pError = document.createElement("p")
//     pError.textContent = " Must be in the past"
//     if (document.getElementById("month-error")) {

//     }
//   }
// });

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

document.getElementById("get-result").addEventListener("click", () => {
  let daySelected = document.getElementById("day").value;
  let monthSelected = document.getElementById("month").value;
  let yearSelected = document.getElementById("year").value;
  console.log(checkForErrors());
  if (
    daySelected > 0 &&
    yearSelected > 0 &&
    monthSelected > 0 &&
    !checkForErrors()
  ) {
    console.log("proper dates and no errors");
    let selectedDate = new Date(yearSelected, monthSelected - 1, daySelected);
    let moment1 = moment(today.toLocaleString());
    let moment2 = moment(selectedDate.toLocaleString());

    let diffDuration = moment.duration(moment1.diff(moment2));
    let years = diffDuration.years();
    let months = diffDuration.months();
    let days = diffDuration.days();
    console.log(years + "Years. " + months + "Months. " + days + "Days. ");
    document.getElementById("years").textContent = years;
    document.getElementById("months").textContent = months;
    document.getElementById("days").textContent = days;
  } else {
    console.log("improper dates");
  }
});
//checking for errors
function checkForErrors() {
  let pCount = 0;
  document.querySelectorAll(".input").forEach((el) => {
    if (
      Array.prototype.slice.call(el.children).some((el) => el.tagName === "P")
    ) {
      pCount++;
    } else {
    }
  });
  if (pCount > 0) {
    return true;
  } else {
    return false;
  }
}

//moment("20120620", "YYYYMMDD").fromNow();
