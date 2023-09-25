const INF = 2147483647;
const places = [
  "tirunelveli",
  "madurai",
  "trichy",
  "chennai",
  "coimbatore",
  "salem",
  "bangalore",
  "mumbai",
];

// if you want adding the route, add route in pairing array and also add the districts in places array
const pairing = [
  {
    "tirunelveli-madurai": 2,
    "madurai-tirunelveli": 2,
    "madurai-trichy": 2,
    "trichy-chennai": 3,
    "madurai-coimbatore": 3,
    "coimbatore-chennai": 3,
    "madurai-salem": 3,
    "salem-bangalore": 2,
    "chennai-bangalore": 2,
    "bangalore-mumbai": 3,
    "chennai-mumbai": 5,
    "coimbatore-bangalore": 3,
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
// const displayView = document.querySelector(".display");
const resultView = document.querySelector(".result");
const errorMsg = document.querySelector(".error-msg");
const resetBtn = document.querySelector(".btn-2");
let markUp;

let arr = [];
let collection = [];

for (let i in pairing) {
  for (let j in pairing[i]) {
    let split = j.split("-");
    split.push(pairing[i][j]);
    arr.push([split]);
  }
}

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
  resultView.innerHTML = "";
  errorMsg.innerHTML = "";
  let r = "";

  if (starting === ending) {
    errorMsg.innerHTML = "Route not found";
    return;
  }
  if (dateInput === "") {
    errorMsg.innerHTML = "Please Enter the Date...";
    resultView.innerHTML = "";
    return;
  }
  if (starting === "" || ending === "") {
    errorMsg.innerHTML = "Please Enter the route...";
    resultView.innerHTML = "";
    return;
  }

  class Graph {
    constructor(V) {
      this.V = V;

      this.adj = new Array(V);
      for (let i = 0; i < V; i++) {
        this.adj[i] = new Array();
      }
    }

    countDays(u, v, w) {
      this.adj[u].push([v, w]);
      this.adj[v].push([u, w]);
    }

    shortestPath(src) {
      let pq = [];
      let dist = new Array(V).fill(INF);

      pq.push([0, src]);
      dist[src] = 0;

      while (pq.length > 0) {
        let u = pq[0][1];
        pq.shift();

        for (let i = 0; i < this.adj[u].length; i++) {
          let v = this.adj[u][i][0];
          let weight = this.adj[u][i][1];

          if (dist[v] > dist[u] + weight) {
            dist[v] = dist[u] + weight;
            collection.push([places[u], places[v], dist[v]]);
            pq.push([dist[v], v]);

            pq.sort((a, b) => {
              if (a[0] == b[0]) return a[1] - b[1];
              return a[0] - b[0];
            });
          }
        }
      }

      let result;

      for (let i = 0; i < V; ++i) {
        // console.log(i, " ", dist[i]); //result
        if (places[i] === ending) {
          // console.log(`no of days(${starting}-${ending}):${dist[i]}`); //result
          result = dist[i];
        }
      }
      return result;
    }

    extractShortestPath(predecessors, source, target) {
      const path = [target];
      let current = target;

      while (current !== source) {
        current = predecessors[current];
        path.unshift(current);
      }

      return path;
    }
  }

  let V = places.length;
  let g = new Graph(V);

  for (let i = 0; i < arr.length; i++) {
    for (let j of arr[i]) {
      g.countDays(places.indexOf(j[0]), places.indexOf(j[1]), j[2]);
    }
  }

  // Function call
  let days = g.shortestPath(places.indexOf(`${starting}`));
  console.log(days);
  const set = {};
  for (let i = 0; i < collection.length; i++) {
    set[collection[i][1]] = collection[i][0];
  }

  const shortestPathWay = g.extractShortestPath(set, starting, ending);

  shortestPathWay.forEach((item) => (r += `${item}->`));
  const pathWay = r.slice(0, r.length - 2);
  console.log(pathWay);
  const [startDate, arrivalDate] = holiday(dateInput, days);
  markUp = `<p class="route para">Route: <br> ${pathWay}</p>
      <p class="no_days para">Number of days:${days}</p>
      <p class="arrival_date para">${startDate} -> ${arrivalDate}</p>`;
  resultView.insertAdjacentHTML("afterbegin", markUp);
};

resetBtn.addEventListener("click", () => {
  errorMsg.innerHTML = "";
  resultView.innerHTML = "";
});
