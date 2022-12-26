export class Book {
  constructor(book) {
    this.book = book;
  }
  render() {
    return `<div>
    <a href="./detail.html">
      <div class="book-img">
        <img src=${this.book.image} alt="ном" />
      </div>
      <div class="book-img-btns">
        <button class="btn-book btn-red"><i class="far fa-heart"></i></button>
        <button class="btn-book btn-green"><i class="fas fa-cart-arrow-down"></i></button>
      </div>
      <div class="tag">
        <p class="book-title">${this.book.title}</p>
        <p class="book-price">${this.book.price}</p>
      </div>
    </a>
  </div>`;
  }
}
