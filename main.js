let allBtn = document.getElementById("all-btn");
let openBtn = document.getElementById("open-btn");
let closedBtn = document.getElementById("closed-btn");
const total = document.getElementById("total");
let allCard = document.getElementById("card");
// let openRadio = document.getElementById("open-radio");
// let closeRadio = document.getElementById("close-radio");
let cardModal = document.getElementById("cardModal");
let title = document.getElementById("title");
let statas = document.getElementById("status");
let description = document.getElementById("description");
let priority = document.getElementById("priority");
let nam = document.getElementById("name");
let time = document.getElementById("time");
let cardContainer = document.getElementById("card");
let assignee = document.getElementById("assignee");
const labels = document.getElementById("labels");
const label2 = document.getElementById("label2");
const loading = document.getElementById("loading-spner");
// console.log(loading);
// let updatedAt = document.getElementById("updatedAt");
// let createdAt = document.getElementById("createdAt");

let current = "all";
// all card er length

async function lodeData() {
  loading.classList.remove("hidden");
  let res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
  loading.classList.add("hidden");
  let data = await res.json();
  // console.log(cardContainer);
  data.data.forEach((element) => {
    // console.log(element);
    let div = document.createElement("div");
    // card er border set if condition diya

    if (element.status === "open") {
      div.style.borderTop = "4px solid #00A96E";
      div.style.borderRadius = "5px";
    } else {
      div.style.borderTop = "4px solid #A855F7";
      div.style.borderRadius = "5px";
    }
    div.innerHTML = `<div class="card bg-base-100 shadow-sm space-y-4 h-full">
          <div class="card-body space-y-4" onclick="openModel(${element.id})">
            <div class="flex justify-between">
              <img src="./assets/Open-Status.png" alt="" />
              <span class="bg-red-200 px-5 py-1 rounded-full text-lg uppercase"
                >${element.priority}</span
              >
            </div>
            <h2 class="card-title">${element.title}</h2>
            <p class='line-clamp-2'>${element.description}</p>
            <div class="p-0 flex-wrap gap-2">
              <span class="uppercase bg-red-100 px-2 py-0.5 rounded-full"
                >${element.labels[0]}</span
              >
              <span
                class="rounded-full uppercase px-1 py-0.5 bg-yellow-100"
                >${element.labels[1] ? element.labels[1] : "no entry"}</span
              >
            </div>
            <hr class='text-gray-300'/>
            <div class="gap-3 space-y-4 text-gray-400">
              <p>${element.createdAt}</p>
              <p>${element.updatedAt}</p>
            </div>
          </div>
        </div>`;
    cardContainer.append(div);
  });
  total.innerText = allCard.children.length;
}
// all open btn

function toggleStyle(id) {
  allBtn.classList.remove("bg-[#4a00ff]", "text-white");
  openBtn.classList.remove("bg-[#4a00ff]", "text-white");
  closedBtn.classList.remove("bg-[#4a00ff]", "text-white");

  allBtn.classList.add("bg-white", "text-[#64748B]");
  openBtn.classList.add("bg-white", "text-[#64748B]");
  closedBtn.classList.add("bg-white", "text-[#64748B]");

  const selected = document.getElementById(id);
  current = id;
  selected.classList.remove("bg-white", "text-[#64748B]");
  selected.classList.add("bg-[#4a00ff]", "text-white");
}
toggleStyle("all-btn");

// All / Open / Closed buttons event listener
allBtn.addEventListener("click", () => filterIssues("all"));
openBtn.addEventListener("click", () => filterIssues("open"));
closedBtn.addEventListener("click", () => filterIssues("closed"));

// Filter issues based on button clicked
async function filterIssues(type) {
  let res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
  let data = await res.json();
  let issues = data.data;

  if (type === "open") {
    issues = issues.filter((issue) => issue.status.toLowerCase() === "open");
    // issues = issues.filter((issue) => issue.priority.toLowerCase() === "medium");
  } else if (type === "closed") {
    issues = issues.filter((issue) => issue.status.toLowerCase() === "closed");
  }

  displayData(issues);
}

// Display filtered data
function displayData(issues) {
  // let cardContainer = document.getElementById("card");
  cardContainer.innerHTML = "";
  issues.forEach((issue) => {
    let div = document.createElement("div");

    let borderColor = issue.status === "open" ? "green" : "purple";
    //  let borderColor =
    //   issue.priority.toLowerCase() === "low" ? "purple" : "green";

    div.innerHTML = `
      <div class="card bg-base-100 shadow-sm space-y-4" style="border-top: 4px solid ${borderColor}; border-radius: 5px;">
        <div class="card-body space-y-4">
          <div class="flex justify-between">
            <img src="./assets/Open-Status.png" alt="" />
            <span class="bg-red-200 px-2 py-1 rounded-full text-lg uppercase">${issue.priority}</span>
          </div>
          <h2 class="card-title">${issue.title}</h2>
          <p class='line-clamp-2'>${issue.description}</p>
          <div class="gap-2">
            <span class="uppercase bg-red-100 px-2 py-0.5 rounded-full">${issue.labels[0]}</span>
            <span class="rounded-full uppercase px-1 py-0.5 bg-yellow-100">${issue.labels[1]}</span>
          </div>
          <hr />
          <div class=" text-gray-400">
            <p>${issue.createdAt}</p>
            <p>${issue.updatedAt}</p>
          </div>
        </div>
      </div>
    `;
    cardContainer.append(div);
  });

  total.innerText = cardContainer.children.length;
}

//radio
// openRadio.addEventListener("click", () => {
//   document.body.style.color = "green";
// });
// closeRadio.addEventListener("click", () => {
//   document.body.style.color = "purple";
// });

//modal set
async function openModel(elementId) {
  console.log(elementId);
  let res = await fetch(
    `https://phi-lab-server.vercel.app/api/v1/lab/issue/${elementId}`,
  );
  let data = await res.json();
  let dataDetails = data.data;
  title.textContent = dataDetails.title;
  description.textContent = dataDetails.description;
  statas.innerText = dataDetails.status;
  priority.textContent = dataDetails.priority;
  nam.textContent = dataDetails.author;
  time.textContent = dataDetails.updatedAt;
  assignee.textContent = dataDetails.assignee || "no assignee";
  labels.innerText = dataDetails.labels[0];
  label2.innerText = dataDetails.labels[1] || "no labels";

  cardModal.showModal();
}

// input
let searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", () => {
  let text = document.getElementById("searchInput").value;

  searchIssues(text);
});
async function searchIssues(text) {
  let url = `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${text}`;

  let res = await fetch(url);
  let data = await res.json();

  displayIssues(data.data);
}
function displayIssues(issues) {
  let card = document.getElementById("card");
  card.innerHTML = "";

  issues.forEach((element) => {
    let div = document.createElement("div");
    if (element.status === "open") {
      div.style.borderTop = "4px solid #00A96E";
      div.style.borderRadius = "5px";
    } else {
      div.style.borderTop = "4px solid #A855F7";
      div.style.borderRadius = "5px";
    }

    div.innerHTML = `<div class="card bg-base-100 shadow-sm space-y-4 h-full">
          <div class="card-body space-y-4" onclick="openModel(${element.id})">
            <div class="flex justify-between">
              <img src="./assets/Open-Status.png" alt="" />
              <span class="bg-red-200 px-5 py-1 rounded-full text-lg uppercase"
                >${element.priority}</span
              >
            </div>
            <h2 class="card-title">${element.title}</h2>
            <p class='line-clamp-2'>${element.description}</p>
            <div class="p-0 flex-wrap gap-2">
              <span class="uppercase bg-red-100 px-2 py-0.5 rounded-full"
                >${element.labels[0]}</span
              >
              <span
                class="rounded-full uppercase px-1 py-0.5 bg-yellow-100"
                >${element.labels[1] ? element.labels[1] : "no entry"}</span
              >
            </div>
            <hr class='text-gray-300'/>
            <div class="gap-3 space-y-4 text-gray-400">
              <p>${element.createdAt}</p>
              <p>${element.updatedAt}</p>
            </div>
          </div>
        </div>`;
    card.appendChild(div);
  });
  total.innerText = card.children.length;
}

lodeData();
