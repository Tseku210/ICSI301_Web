export class SpecialBook {
  constructor(book) {
    this.book = book;
  }
  render() {
    return `<div class="special">
    <div class="book-img">
      <img src="${this.book.image}" alt="зураг" />
    </div>
    <div class="special-detail">
      <h2 class="spark">Энэ сарын топ</h2>
      <h1>${this.book.title}</h1>
      <div class="special-desc">
        ${this.book.description}
      </div>
      <button class="special-continue">Цааш унших</button>
      <a href="#" class="btn btn-red">
        Дэлгэрэнгүй
        <span class="material-symbols-outlined"> chevron_right </span>
      </a>
    </div>
  </div>`;
  }
}
