async function lodeData() {
  let cardContainer = document.getElementById("card");
  let res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
  let data = await res.json();
  console.log(cardContainer);
  data.data.forEach((element) => {
    console.log(element);
    let div = document.createElement("div");
    div.innerHTML = `<div class="card bg-base-100 shadow-sm ">
          <div class="card-body">
            <h2 class="card-title">Card title!</h2>
            <p>
              A card component has a figure, a body part, and inside body there
              are title and actions parts
            </p>
            <div class="card-actions justify-end">
              <button class="btn btn-primary">Buy Now</button>
            </div>
          </div>
        </div>`;
    cardContainer.append(div);
  });
}
lodeData();
