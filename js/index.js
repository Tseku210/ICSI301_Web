import { RenderHome } from "./utils/renderHome.js";

let main = document.querySelector(".main");

await fetch("https://api.jsonbin.io/v3/b/63a2867601a72b59f235c2b7")
  .then((res) => res.json())
  .then((data) =>
    main.insertAdjacentHTML(
      "beforeend",
      new RenderHome(data.record.categories).render()
    )
  );
