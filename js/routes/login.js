const btn = document.getElementById("verify-btn");

btn.addEventListener("click", () => {
  // Хэрэглэгчийн оруулсан email, password
  const email = document.getElementById("email").innerHTML;
  const password = document.getElementById("password").innerHTML;
  // POST-оор серверлүү өгөгдлөө явуулж шалгана
  fetch("http://127.0.0.1/login", {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => response.json())
    .then((data) => {});
});
