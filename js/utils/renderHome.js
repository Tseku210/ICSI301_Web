import { Category } from "./Category.js";
export class RenderHome {
  constructor(url, specialBook) {
    this.url = url;
    this.specialBook = specialBook;
  }
  render() {
    return new Category(this.url, this.specialBook).render();
  }

  // async downloadAndRender() {
  //   fetch(this.url + "/latest")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       const filteredCategory = data.record.categories.filter(
  //         (categor) => categor.category_name === this.category
  //       );
  //       // Филтерлэсэн категорыг оруулна
  //       if (filteredCategory.length > 0) {
  //         gebi(this.id).insertAdjacentHTML(
  //           "beforeend",
  //           filteredCategory
  //             .map((categor) => new Category(categor).render())
  //             .reduce((prevVal, curVal) => prevVal + curVal, "")
  //         );
  //       } else {
  //         // Бүх категоруудыг оруулна
  //         gebi(this.id).insertAdjacentHTML(
  //           "beforeend",
  //           this.data.record.categories
  //             .map((categor) => new Category(categor).render())
  //             .reduce((prevVal, curVal) => prevVal + curVal, "")
  //         );
  //       }
  //     });
  // }
}

const gebi = (id) => document.getElementById(id);
