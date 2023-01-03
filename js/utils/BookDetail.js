export default class BookDetail {
  constructor(book) {
    this.book = book;
  }
  render() {
    return `
    <div class="special">
    <div class="book-img">
      <img src=${this.book.image} alt="ном" />
    </div>
    <div class="special-detail">
      <div class="detail-header">
        <h1>${this.book.title}</h1>
        <p class="author">${this.book.author_id}</p>
        <div class="rating">
          <span class="material-symbols-outlined"> star </span>
          <span class="material-symbols-outlined"> star </span>
          <span class="material-symbols-outlined"> star </span>
          <span class="material-symbols-outlined"> star </span>
          <span class="material-symbols-outlined unfill"> star </span>
        </div>
      </div>
      <hr />
      <div class="book-types">
        <div class="paperback active">
          <p>Зөөлөн хавтастай</p>
          <p class="type-price">${this.book.paper_price}₮</p>
        </div>
        <div class="hardback">
          <p>Хатуу хавтастай</p>
          <p class="type-price">${this.book.price}₮</p>
        </div>
        <div class="ebook">
          <p>Ebook</p>
          <p class="type-price">${this.book.ebook_price}₮</p>
        </div>
      </div>
      <div class="special-desc">
        ${this.book.description}
      </div>
      <button class="special-continue">Цааш унших</button>
    </div>
    <div class="buybar">
      <div class="price">
        <p>Үнэ</p>
        <p>99,000T</p>
      </div>
      <div class="instock">20 ширхэг үлдсэн</div>
      <div class="buycount">
        <input type="number" value="1" min="1" />
      </div>
      <button class="btn btn-green">
        <span class="material-symbols-outlined"> shopping_cart </span>
        Сагсанд нэмэх
      </button>
      <button class="btn btn-lightgreen">
        <span class="material-symbols-outlined"> local_shipping </span>
        Шууд захиалах
      </button>
      <hr />
      <button class="btn btn-red">
        <span class="material-symbols-outlined"> favorite </span>
        Дуртай
      </button>
    </div>
  </div>
  <div class="book-other-details">
    <div class="pages">
      <p>Хуудас</p>
      <span class="material-symbols-outlined"> auto_stories </span>
      <p>247</p>
    </div>
    <div class="category">
      <p>Категори</p>
      <span class="material-symbols-outlined"> category </span>
      <p>${this.book.category}</p>
    </div>
    <div class="publisher">
      <p>Нэвтрүүлэгч</p>
      <span class="material-symbols-outlined"> apartment </span>
      <p>хэннэгэн</p>
    </div>
    <div class="date">
      <p>Худалдаанд</p>
      <span class="material-symbols-outlined"> calendar_month </span>
      <p>${this.book.publication_date}</p>
    </div>
    <div class="isbn">
      <p>ISBN</p>
      <span class="material-symbols-outlined"> barcode </span>
      <p>4567890</p>
    </div>
  </div>`;
  }
}
