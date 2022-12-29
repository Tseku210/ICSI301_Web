import { Book } from "./Book.js";
import { SpecialBook } from "./SpecialBook.js";

export class Category {
  constructor(categories, specialBook) {
    this.categories = categories;
    this.specialBook = specialBook;
  }

  render() {
    return (
      `${this.specialBook ? new SpecialBook(this.specialBook).render() : ""}` +
      this.categories
        .map(
          (item, i) =>
            `
      <article>
        <h2>${item.category_name}</h2>
        <div class="books">
          ${item.books
            .map((el) => {
              return new Book(el).render();
            })
            .join("")}
        </div>
      </article>
      `
        )
        .join("")
    );
  }
}
