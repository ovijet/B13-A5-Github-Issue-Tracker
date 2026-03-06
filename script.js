let btn = document.getElementById("btn");
btn.addEventListener("click", function () {
  let inputField = document.getElementById("input-field");
  let inputValue = inputField.value;
  // console.log(inputValue);
  let passwordField = document.getElementById("password-field");
  let passwordValue = passwordField.value;
  // console.log(passwordValue);

  if (inputValue === "admin" && passwordValue === "admin123") {
    alert("login-success");
    window.location = "main.html";
  } else {
    alert("tu gar mara bokacoda");
  }
});
// login done
