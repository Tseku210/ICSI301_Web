const btn = document.getElementById("verify-btn");

btn.addEventListener("click", () => {
  // Хэрэглэгчийн оруулсан name, email, password
  const name = document.getElementById("name").innerHTML;
  const email = document.getElementById("email").innerHTML;
  const password = document.getElementById("password").innerHTML;
  // POST-оор серверлүү өгөгдлөө явуулж шалгана
  fetch("http://127.0.0.1/register", {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify({ name, email, password }),
  }).then((response) => {
    console.log(response.json());
  });
});
