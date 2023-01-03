class CartComponent extends HTMLElement {
  constructor() {
    super();
    this.books = 0;
    this.render();
  }

  render() {
    this.getCartBooksCount();
    this.innerHTML = `
      <span class="material-symbols-outlined"> shopping_cart </span><span>${this.books}</span>
    `;
  }

  connectedCallback() {}

  disconnectedCallback() {}

  attributeChangedCallback(attrName, oldVal, newVal) {}

  async getCartBooks() {
    await fetch("http://127.0.0.1:3000/cartBooks")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }

  async getCartBooksCount() {
    await fetch("http://127.0.0.1:3000/cartBooksCount")
      .then((res) => res.json())
      .then((data) => {
        this.books = data.count;
        this.render();
      });
  }

  async addToCart(bookId, type = "paper_back") {
    await fetch("http://127.0.0.1:3000/addCart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bookId,
        type,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
    this.getCartBooksCount().then(() => {
      this.render();
    });
  }
}

window.customElements.define("store-cart", CartComponent);
