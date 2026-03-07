let allBtn = document.getElementById("all-btn");
let openBtn = document.getElementById("open-btn");
let closedBtn = document.getElementById("closed-btn");
const total = document.getElementById("total");
let allCard = document.getElementById("card");

let current = "all";

// all card er length

async function lodeData() {
  let cardContainer = document.getElementById("card");
  let res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
  let data = await res.json();
  // console.log(cardContainer);
  data.data.forEach((element) => {
    // console.log(element);
    let div = document.createElement("div");
    // card er border set if condition diya

    if (element.status === "open") {
      div.style.borderTop = "4px solid green";
      div.style.borderRadius = "5px";
    } else {
      div.style.borderTop = "4px solid purple";
      div.style.borderRadius = "5px";
    }
    div.innerHTML = `<div class="card bg-base-100 shadow-sm space-y-4 w-[250] h-[250]">
          <div class="card-body space-y-4">
            <div class="flex justify-between">
              <img src="./assets/Open-Status.png" alt="" />
              <span class="bg-red-200 px-5 py-1 rounded-full text-lg uppercase"
                >${element.priority}</span
              >
            </div>
            <h2 class="card-title">${element.title}</h2>
            <p class='line-clamp-2'>${element.description}</p>
            <div class="grid grid-cols-2 gap-2">
              <span class="uppercase bg-red-100 px-5 py-0.5 rounded-full"
                >${element.labels[0]}</span
              >
              <span
                class="rounded-full uppercase px-10 py-0.5 bg-yellow-100"
                >${element.labels[1]}</span
              >
            </div>
            <hr />
            <div class="gap-3 space-y-4">
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
  allBtn.classList.remove("bg-[#3B82F6]", "text-white");
  openBtn.classList.remove("bg-[#3B82F6]", "text-white");
  closedBtn.classList.remove("bg-[#3B82F6]", "text-white");

  allBtn.classList.add("bg-white", "text-[#64748B]");
  openBtn.classList.add("bg-white", "text-[#64748B]");
  closedBtn.classList.add("bg-white", "text-[#64748B]");

  const selected = document.getElementById(id);
  current = id;
  selected.classList.remove("bg-white", "text-[#64748B]");
  selected.classList.add("bg-[#3B82F6]", "text-white");
}
toggleStyle("all-btn");

lodeData();





// just

openBtn.addEventListener("click", function () {
  filterIssues("open");
});

async function filterIssues(status) {
  let res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
  let data = await res.json();

  let issues = data.data;

  if (status === "open") {
    issues = issues.filter((issue) => issue.status === "open");
  }

  if (status === "closed") {
    issues = issues.filter((issue) => issue.status === "closed");
  }

  displayData(issues);
}
function displayData(issues) {
  let cardContainer = document.getElementById("card");

  cardContainer.innerHTML = "";

  issues.forEach((issue) => {
    let div = document.createElement("div");
  div.innerHTML = `
      <div class="card bg-base-100 w-96 shadow-sm p-3 my-2">
        <h2 class="card-title">${issue.title}</h2>
        <p>Status: ${issue.status}</p>
        <p>Priority: ${issue.priority}</p>
        <p>Category: ${issue.category}</p>
      </div>
    `;

    cardContainer.append(div);
  });
}
