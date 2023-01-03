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
      this.categories.map((item, i) => {
        return `
                  <article>
                    <h2>БЕСТЕЛЛЕР</h2>
                    <div class="books">
                      ${
                        item.category == "БЕСТЕЛЛЕР"
                          ? new Book(item).render()
                          : ""
                      }
                    </div>
                  </article>
                  <article>
                    <h2>Уран зохиол</h2>
                    <div class="books">
                      ${
                        item.category == "Уран зохиол"
                          ? new Book(item).render()
                          : ""
                      }
                    </div>
                  </article>
              `;
      })
    );
  }
}
