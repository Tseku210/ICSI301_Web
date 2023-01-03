import BookDetail from "../utils/BookDetail.js";

const main = document.querySelector(".main");

// DOM уншиж дууссаны дараа номны датагаа дуудаж рэндэрлэнэ, мөн бусад жижиг логикийг оруулна
document.addEventListener("DOMContentLoaded", async () => {
  const bookId = window.location.search.split("=")[1];
  await fetch(`http://127.0.0.1:3000/book/${bookId}`)
    .then((res) => res.json())
    .then((data) => {
      main.insertAdjacentHTML("afterbegin", new BookDetail(data[0]).render());
    });

  // continue reading logic
  // brief or more mode
  let readMore = false;
  document.querySelector(".special-continue").addEventListener("click", (e) => {
    e.target.previousElementSibling.classList.toggle("expand"); // expand класс нэмэх
    readMore // цааш унших дээр дараагүй бол ...Цааш унших гэж гаргана эсрэг тохиолдолд Товчлох
      ? (e.target.innerHTML = "...Цааш унших")
      : (e.target.innerHTML = "Товчлох");
    readMore = !readMore;
  });
});
