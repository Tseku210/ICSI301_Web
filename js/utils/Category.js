import { Book } from "./Book.js";
import { SpecialBook } from "./SpecialBook.js";

export class Category {
  constructor(categories, specialBook) {
    this.categories = categories;
    this.specialBook = specialBook;
  }

  renderAll() {
    return (
      `${this.specialBook ? new SpecialBook(this.specialBook).render() : ""}` +
      `
                  <article>
                    <h2>БЕСТСЕЛЛЕР</h2>
                    <div class="books">
                      ${this.categories
                        .map((item) =>
                          item.category == "БЕСТЕЛЛЕР"
                            ? new Book(item).render()
                            : ""
                        )
                        .join("")}
                    </div>
                  </article>
                  <article>
                    <h2>Уран зохиол</h2>
                    <div class="books">
                      ${this.categories
                        .map((item) =>
                          item.category == "Уран зохиол"
                            ? new Book(item).render()
                            : ""
                        )
                        .join("")}
                    </div>
                  </article>
              `
    );
  }
}
