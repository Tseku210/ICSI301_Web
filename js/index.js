import { RenderHome } from "./utils/renderHome.js";

let main = document.querySelector(".main");

// Ном серверлуу дуудаж авах функц
const requestBookData = async (category, query) => {
  const response = await fetch(`http://127.0.0.1:3000/books`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const books = await response.json();
  return books;
};

// nav bar хэсэг буюу категоруудад тохирсон номуудыг дуудаж рендерлэнэ.
document.querySelectorAll(".nav-btn").forEach((btn) => {
  btn.addEventListener("click", async (e) => {
    console.log(e.target.dataset.i);
    const result = await requestBookData("category", e.target.dataset.i);
    console.log(result);
    main.innerHTML = "";
    let specialBook =
      Object.keys(result).length > 1 ? result.special_book : null;
    main.insertAdjacentHTML(
      "beforeend",
      new RenderHome(
        specialBook ? result.categories : result,
        specialBook
      ).render()
    );
  });
});

// DOM уншиж дууссаны дараа номны датагаа дуудаж рэндэрлэнэ, мөн бусад жижиг логикийг оруулна
document.addEventListener("DOMContentLoaded", async () => {
  const result = await requestBookData();
  console.log(result);
  let specialBook = result[0];
  main.insertAdjacentHTML(
    "beforeend",
    new RenderHome(result, specialBook).render()
  );
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
