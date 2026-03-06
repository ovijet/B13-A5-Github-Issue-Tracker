let btn = document.getElementById("btn");
btn.addEventListener("click", () => {
    let inputField=document.getElementById('input-field')
    let inputValue=inputField.value
    // console.log(inputValue);
    let passwordField=document.getElementById('password-field')
    let passwordValue=passwordField.value
    // console.log(passwordValue);

    if(inputValue==='admin'&& passwordValue==='admin123'){
        alert('login-success')
        window.location= "main.html"
    }else{
        alert('tu gar mara bokacoda')
    }
});
// login done 
let container = document.getElementById("card-container")

async function loadIssues(){

let res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")

let data = await res.json()

display(data.data)

}

loadIssues()
/////////////////


function display(issues){

container.innerHTML = ""

issues.forEach(issue => {

let div = document.createElement("div")

div.innerHTML = `

<h3>${issue.title}</h3>
<p>${issue.description}</p>

<p>Status : ${issue.status}</p>
<p>Category : ${issue.category}</p>
<p>Author : ${issue.author}</p>
<p>Priority : ${issue.priority}</p>
<p>Label : ${issue.label}</p>

<button onclick="singleIssue(${issue.id})">View</button>

`

container.appendChild(div)

})

}