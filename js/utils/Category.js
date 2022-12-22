import { Book } from "./Book.js";

export class Category {
  constructor(categories) {
    this.categories = categories;
  }

  render() {
    return this.categories.map(
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
    );
  }
}
