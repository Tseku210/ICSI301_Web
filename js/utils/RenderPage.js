import { Category } from "./Category.js";
import { RenderHome } from "./renderHome.js";

export default class RenderPage {
  constructor(url, category, id = ".main", active) {
    this.url = url;
    this.category = category;
    this.id = id;
    this.active = active;
  }

  prepareDom() {
    return `
    <!DOCTYPE html>
    <html lang="mn">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Put your description here." />
        <link rel="stylesheet" href="../../css/style.css" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
        <script type="module" src="../../js/index.js"></script>
        <title>Home</title>
      </head>
      <body>
        <div class="container">
          <header class="header">
            <div class="top_header">
              <button class="btn tooltip" aria-label="Горим солих">
                <span class="tooltiptext">Горим солих</span>
                <span class="material-symbols-outlined"> light_mode </span>
              </button>
              <button class="btn tooltip" aria-label="Хэл солих">Мон/Eng</button>
              <a href="./login.html">Нэвтрэх</a>
              <a href="./signup.html">Бүртгүүлэх</a>
            </div>
            <section class="header_main">
              <img src="../images/LogoBlack.svg" alt="Logo" width="194px" />
              <div class="search_bar">
                <input
                  type="search"
                  placeholder="Хайж буй ном эсвэл зохиолчоо энэдээс хайгаарай"
                />
                <span class="material-symbols-outlined"> search </span>
              </div>
              <div class="links">
                <a href="./cart.html" class="tooltip" aria-label="Сагс">
                  <span class="tooltiptext">Гэр</span>
                  <span class="material-symbols-outlined"> home </span>
                </a>
                <a href="./cart.html" class="tooltip">
                  <span class="tooltiptext">Сагс</span>
                  <span class="material-symbols-outlined"> shopping_cart </span>
                </a>
                <a href="./fav.html" class="tooltip" aria-label="Дуртай">
                  <span class="tooltiptext">Дуртай</span>
                  <span class="material-symbols-outlined"> favorite </span>
                </a>
                <a href="./profile.html" class="tooltip" aria-label="Профайл">
                  <span class="tooltiptext">Профайл</span>
                  <span class="material-symbols-outlined"> person </span>
                </a>
              </div>
            </section>
            <div class="nav_container">
              <nav class="nav">
                <a href="#book" class=${
                  this.active === 1 ? "active" : ""
                } >БЭСТСЕЛЛЕР</a>
                <a href="#book" class=${
                  this.active === 2 ? "active" : ""
                }>УРАН ЗОХИОЛ</a>
                <a href="#book" class=${
                  this.active === 3 ? "active" : ""
                }>MАНЛАЙЛАЛ</a>
                <a href="#book" class=${
                  this.active === 4 ? "active" : ""
                }>ХУУЧИН</a>
              </nav>
            </div>
          </header>
          <main>
            <div>
              <!-- <img
                height="auto"
                width="auto"
                src="../images/reklam.jpg"
                alt="реклам зураг"
              /> -->
              <!-- <h1 class="header_h1">Англи номны цуглуулга</h1> -->
            </div>
            <div class="main">
              <div class="special">
                <div class="book-img">
                  <img src="../images/book2.jpg" alt="зураг" />
                </div>
                <div class="special-detail">
                  <h2 class="spark">Энэ сарын топ</h2>
                  <h1>A PROMISED LAND</h1>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam
                    dolorem dolorum, nulla modi quos, illo error autem laborum sunt
                    sit eveniet tempora excepturi exercitationem, dicta fugiat
                    consequatur! Iste, eum dolorem?
                  </p>
                  <a href="#" class="btn btn-red">
                    Дэлгэрэнгүй
                    <span class="material-symbols-outlined"> chevron_right </span>
                  </a>
                </div>
              </div>
              ${new Category(this.url).render()}
            </div>
          </main>
          <footer>
            <address>
              Байршил: <span>Монгол, Улаанбаатар, Монгол Улсын Их Сургууль</span>
              <br />Утас: <span>80170737</span>
            </address>
            Хөгжүүлсэн: Тунгалаггэгээ, Оюунцолмон, Цэнгүүн &copy;TOT
          </footer>
        </div>
      </body>
    </html>
    `;
  }

  async render() {
    await fetch(this.url + "/latest")
      .then((res) => res.json())
      .then((data) => {
        const filteredCategory = data.record.categories.filter(
          (categor) => categor.category_name === this.category
        );
        // Филтерлэсэн категорыг оруулна
        if (filteredCategory.length > 0) {
          // gebi(this.id).insertAdjacentHTML(
          //   "beforeend",
          //   filteredCategory
          //     .map((categor) => new Category(categor).render())
          //     .reduce((prevVal, curVal) => prevVal + curVal, "")
          // );
          return this.prepareDom(filteredCategory, this.category);
        } else {
          // Бүх категоруудыг оруулна
          return this.prepareDom(data.record.categories);
          // gebi(this.id).insertAdjacentHTML(
          //   "beforeend",
          //   this.data.record.categories
          //     .map((categor) => new Category(categor).render())
          //     .reduce((prevVal, curVal) => prevVal + curVal, "")
          // );
        }
      });
  }
}
