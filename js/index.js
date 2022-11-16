import  {RenderHome}  from "./renderHome.js";
import { data } from "../datas/homePageData.js";

let main = document.querySelector(".main");

const home_data = new RenderHome(data);

const home_dom = home_data.render();

home_dom.forEach((item) => {
  main.insertAdjacentHTML('beforeend', item);  
})