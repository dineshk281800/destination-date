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

// const days = [[2, 3, 2, 3]];
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
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const displayView = document.querySelector(".display");
const resultView = document.querySelector(".result");
const errorMsg = document.querySelector(".error-msg");
const resetBtn = document.querySelector(".btn-2");
let markUp;
let count = 0;

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

const holiday = (dateInput, days) => {
  let da = new Date(dateInput);
  let rough = da.getDate();
  for (let i = 0; i < days; i++) {
    da.setDate(rough);
    // rough = da.getDate() + 1;
    console.log(da);
    rough = da.getDate() + 1;
    if (da.getDay() === 6) {
      count += 1;
    }
    console.log(count);
  }
  return count;
};

const arrivalDay = (dateInput, days) => {
  const da = new Date(dateInput);
  const startDa = `${da.getDate()} ${months[da.getMonth()]} Start`;
  console.log(startDa);
  da.setDate(da.getDate() + days);
  const arrivalDa = `Arrive on ${da.getDate()} ${months[da.getMonth()]}`;
  console.log(arrivalDa);
  return [startDa, arrivalDa];
};

const init = () => {
  const starting = document.querySelector(".start").value.toLowerCase();
  const ending = document.querySelector(".end").value.toLowerCase();
  const dateInput = document.querySelector(".date").value;
  let find = false;
  // displayView.style.border = none;
  resultView.innerHTML = "";
  errorMsg.innerHTML = "";
  let r = "";
  let d = "";
  console.log(dateInput);
  for (let i = 0; i < route.length; i++) {
    const from = route[i].indexOf(starting);
    const to = route[i].indexOf(ending);
    // console.log(from, to);
    const s = route[i].slice(from, to + 1);
    // console.log(s);
    // console.log(s[0], s[s.length - 1]);
    let days = 0;
    let counts;
    if (starting === ending) {
      errorMsg.innerHTML = "Route not found";
      break;
    }
    if (s[0] === starting && s[s.length - 1] === ending) {
      // displayView.style.border = "1px solid #000";
      console.log(s);
      s.forEach((item) => (r += `${item}->`));
      // for (let i = 0; i < s.length; i++) {
      //   r = r + `${s[i]}->`;
      // }
      console.log(r.slice(0, r.length - 2));
      const pathWay = r.slice(0, r.length - 2);
      counts = countdays(s);
      for (let x of counts) {
        days += x;
        // d = d + `${x}+`;
      }
      // d = d.slice(0, d.length - 1);
      // console.log(`${d}=${days}`);
      // console.log(days);
      // days = days >= 7 ? days + 2 * Math.floor(days / 7) : days;
      const holidayWith = holiday(dateInput, days - 1) + days;
      console.log(holidayWith);
      console.log(`number of days: ${days}`);
      const [startDate, arrivalDate] = arrivalDay(dateInput, holidayWith);
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
  // displayView.style.border = none;
});

// const m = 6;
// console.log(m > 5 ? m + 2 * Math.floor(m / 5) : m);
// const d = new Date();
// console.log(d);
// d.setDate(d.getDate() + 5);
// console.log(d);
// const init = () => {
//   // const starting = document.querySelector(".start").value;
//   // console.log(starting);
//   console.log("hi");
// };

// const data = [
//   {
//     route: 1,
//     start: "tirunelveli",
//     end: "madurai",
//     days: 2,
//   },

//   {
//     route: 2,
//     start: "madurai",
//     end: "tirunelveli",
//     days: 2,
//   },
//   {
//     route: 3,
//     start: "madurai",
//     end: "trichy",
//     days: 2,
//   },
//   {
//     route: 4,
//     start: "trichy",
//     end: "chennai",
//     days: 3,
//   },
//   {
//     route: 5,
//     start: "madurai",
//     end: "coimbatore",
//     days: 3,
//   },
//   {
//     route: 6,
//     start: "coimbatore",
//     end: "chennai",
//     days: 3,
//   },
//   {
//     route: 7,
//     start: "madurai",
//     end: "salem",
//     days: 3,
//   },
//   {
//     route: 8,
//     start: "salem",
//     end: "bangalore",
//     days: 2,
//   },
//   {
//     route: 9,
//     start: "chennai",
//     end: "bangalore",
//     days: 2,
//   },
//   {
//     route: 10,
//     start: "bangalore",
//     end: "mumbai",
//     days: 3,
//   },
//   {
//     route: 11,
//     start: "chennai",
//     end: "mumbai",
//     days: 5,
//   },
//   {
//     route: 12,
//     start: "coimbatore",
//     end: "bangalore",
//     days: 3,
//   },
// ];

// const starting = document.querySelector(".start").value;
// const ending = document.querySelector(".end").value;
// const starting = "tirunelveli";
// const ending = "bangalore";

// let arr = [];
// let from;
// data.forEach((item, index) => {
//   if (item.start === starting && item.end === ending) {
//     arr.push(item.start);
//     arr.push(item.end);
//     return;
//   } else if (item.start === starting) {
//     arr.push(item.start);
//     // arr.push(item.end);
//     from = item.end;
//   } else if (item.start === from) {
//     arr.push(item.start);
//     data.slice;
//   }
// });
