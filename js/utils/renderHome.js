import { Category } from "./Category.js";

export class RenderHome {
  constructor(data) {
    this.data = data;
  }
  render() {
    return new Category(this.data).render();
  }
}
