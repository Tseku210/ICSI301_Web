import { RenderHome } from "./utils/renderHome.js";
import { requestBooksData } from "./helper/requestBooks.js";

let main = document.querySelector(".main");

// nav bar хэсэг буюу категоруудад тохирсон номуудыг дуудаж рендерлэнэ.
document.querySelectorAll(".nav-btn").forEach((btn) => {
  btn.addEventListener("click", async (e) => {
    console.log(e.target.dataset.i);
    const result = await requestBooksData("category", e.target.dataset.i);
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
  try {
    const result = await requestBooksData();
    console.log(result);
    let specialBook =
      Object.keys(result).length > 1 ? result.special_book : null;
    console.log();
    main.insertAdjacentHTML(
      "beforeend",
      new RenderHome(
        specialBook ? result.categories : result,
        specialBook
      ).render()
    );
  } catch (e) {
    console.log("Сервер асаагүй юм биш биз? - ", e);
  }
  // continue reading logic
  // brief or more mode
  let readMore = false;
  document.querySelector(".special-continue").addEventListener("click", (e) => {
    e.target.previousElementSibling.classList.toggle("expand"); // expand класс нэмэх
    // цааш унших дээр дараагүй бол ...Цааш унших гэж гаргана эсрэг тохиолдолд Товчлох
    readMore
      ? (e.target.innerHTML = "...Цааш унших")
      : (e.target.innerHTML = "Товчлох");
    readMore = !readMore;
  });
});
