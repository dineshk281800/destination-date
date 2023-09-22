// -------data's---------
const route = [
  ["tirunelveli", "madurai", "salem", "bangalore", "mumbai"],
  ["mumbai", "bangalore", "salem", "madurai", "tirunelveli"],
  ["tirunelveli", "madurai", "trichy", "chennai"],
  ["chennai", "trichy", "madurai", "tirunelveli"],
  ["tirunelveli", "madurai", "coimbatore"],
  ["coimbatore", "madurai", "tirunelveli"],
  ["chennai", "bangalore", "mumbai"],
  ["mumbai", "bangalore", "chennai"],
  ["coimbatore", "chennai"],
  ["chennai", "coimbatore"],
  ["coimbatore", "bangalore"],
  ["bangalore", "coimbatore"],
];

const pairing = [
  {
    "tirunelveli-madurai": 2,
    "madurai-salem": 3,
    "salem-bangalore": 2,
    "bangalore-mumbai": 3,
    "madurai-trichy": 2,
    "trichy-chennai": 3,
    "madurai-coimbatore": 3,
    "chennai-bangalore": 2,
    "coimbatore-chennai": 3,
    "coimbatore-bangalore": 3,
  },
  {
    "madurai-tirunelveli": 2,
    "salem-madurai": 3,
    "bangalore-salem": 2,
    "mumbai-bangalore": 3,
    "trichy-madurai": 2,
    "chennai-trichy": 3,
    "coimbatore-madurai": 3,
    "bangalore-chennai": 2,
    "chennai-coimbatore": 3,
    "bangalore-coimbatore": 3,
  },
];

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// ------variable initializtion------
const displayView = document.querySelector(".display");
const resultView = document.querySelector(".result");
const errorMsg = document.querySelector(".error-msg");
const resetBtn = document.querySelector(".btn-2");
let markUp;

//-------collect no of days ------
const countdays = (s) => {
  const dayList = [];
  for (let i = 0; i < s.length - 1; i++) {
    pairing.forEach((_, j) => {
      for (let loc in pairing[j]) {
        let original = `${s[i]}-${s[i + 1]}`;
        if (original === loc) {
          dayList.push(pairing[j][loc]);
        }
      }
    });
  }
  return dayList;
};

const power = (num) => {
  return num > 0
    ? ["th", "st", "nd", "rd"][
        (num > 3 && num < 21) || num % 10 > 3 ? 0 : num % 10
      ]
    : "";
};

// -------start date -> arrival date--------
const holiday = (dateInput, days) => {
  let date = new Date(dateInput);
  let startDa = `${date.getDate()}<sup>${power(date.getDate())}</sup> ${
    months[date.getMonth()]
  } Start`;
  let arrivalDa;
  while (days > 0) {
    if (date.getDay() !== 6) {
      if (date.getDay() !== 0) {
        arrivalDa = `Arrive on ${date.getDate()}<sup>${power(
          date.getDate()
        )}</sup> ${months[date.getMonth()]}`;
        days--;
      }
    }
    date.setDate(date.getDate() + 1);
  }
  return [startDa, arrivalDa];
};

const init = () => {
  const starting = document.querySelector(".start").value.toLowerCase();
  const ending = document.querySelector(".end").value.toLowerCase();
  const dateInput = document.querySelector(".date").value;
  let find = false;
  resultView.innerHTML = "";
  errorMsg.innerHTML = "";
  let r = "";

  if (dateInput === "") {
    errorMsg.innerHTML = "Please Enter the Date...";
    resultView.innerHTML = "";
    return;
  }
  for (let i = 0; i < route.length; i++) {
    const from = route[i].indexOf(starting);
    const to = route[i].indexOf(ending);
    const s = route[i].slice(from, to + 1);

    let days = 0;
    let counts;
    if (starting === ending) {
      errorMsg.innerHTML = "Route not found";
      break;
    }
    if (s[0] === starting && s[s.length - 1] === ending) {
      displayView.style.border = "1px solid #000";
      s.forEach((item) => (r += `${item}->`));
      const pathWay = r.slice(0, r.length - 2);
      counts = countdays(s);
      for (let x of counts) {
        days += x;
      }

      const [startDate, arrivalDate] = holiday(dateInput, days);
      markUp = `<p class="route para">Route: <br> ${pathWay}</p>
      <p class="no_days para">Number of days:${days}</p>
      <p class="arrival_date para">${startDate} -> ${arrivalDate}</p>`;
      resultView.insertAdjacentHTML("afterbegin", markUp);
      find = true;
      break;
    }
  }
  if (!find) {
    errorMsg.innerHTML = "Route not found";
  }
};

resetBtn.addEventListener("click", () => {
  errorMsg.innerHTML = "";
  resultView.innerHTML = "";
});
