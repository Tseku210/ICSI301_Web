export class RenderHome {
  constructor(data) {
    this.data = data;
  }
  render() {
    const dom = this.data.map((item, i) => (
      `
      <article>
        <h2>${item.category}</h2>
        <div class="books">
          ${item.books.map((el, i) => (
            `<div>
              <a href="./detail.html">
                <div class="book-img">
                  <img src=${el.image} alt="ном" />
                  <div class="book-img-btns">
                    <button class="btn circle-btn"><i class="far fa-heart"></i></button>
                    <button class="btn circle-btn"><i class="fas fa-cart-arrow-down"></i></button>
                  </div>
                </div>
                <div class="tag">
                  <p class="book-title">${el.title}</p>
                  <p class="book-price">${el.price}</p>
                </div>
              </a>
            </div>`
          )).join('')}
        </div>
      </article>
      `
    ))
    return dom;
  }
}