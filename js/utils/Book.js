export class Book {
  constructor(book) {
    this.book = book;
  }
  render() {
    return `<div>
    <a href="./detail.html?id=${this.book.id}">
      <div class="book-img">
        <img src=${this.book.image} alt="ном" />
      </div>
    </a>
      <div class="book-img-btns">
        <a class="btn-book btn-red fav">
          <span class="material-symbols-outlined">
          favorite
          </span>
        </a>
        <a class="btn-book btn-green cart" data-i="${this.book.id}">
          <span class="material-symbols-outlined">
          shopping_cart
          </span>
        </a>
      </div>
      <div class="tag">
        <p class="book-title">${this.book.title}</p>
        <p class="book-price">${this.book.price}</p>
      </div>
    </a>
  </div>`;
  }
}
