import http from "http";
import url from "url";
import fs from "fs";
import queryString from "querystring";
// const express = require("express");
// const path = require("path");
// const url = require("url");

// const app = express();
// const router = express.Router();

// console.log(__dirname);

// router.get("/", (req, res) => {
//   console.log(__dirname);
//   res.sendFile(path.join(__dirname + "/pages/index.html"));
//   fetch("https://api.jsonbin.io/v3/b/63a2867601a72b59f235c2b7/latest")
//     .then((res) => res.json())
//     .then((data) => res.send(data));
// });

// app.use("/", router);
// app.listen(3000);

// const hostname = "127.0.0.1";
// const port = 3000;

// const server = http.createServer(async (req, res) => {
//   const urlObj = url.parse(req.url); // url parse хийж хэрэгтэй мэдээллүүдийг обжект хэлбэрээр хадгална
//   const query = queryString.parse(urlObj.query); // {category: '1'}
//   const path = Object.keys(query)[0]; // path name

//   // Номоо дуудна
//   const result = await fetch(
//     "https://api.jsonbin.io/v3/b/63a2867601a72b59f235c2b7/latest"
//   );
//   // JSON руу хөрвүүлнэ
//   const data = await result.json();

//   // хэрвээ категори гэсэн зам орж ирвэл тохирох үйлдлийг хийнэ. Байхгүй бол дээр дуудаж авчирсан номыг бүгдийг нь буцаана.
//   if (path === "category") {
//     let filteredCategory;
//     switch (query.category) {
//       case "0": // Бүх ном
//         res.statusCode = 200;
//         res.setHeader("Content-Type", "application/json");
//         res.setHeader("Access-Control-Allow-Origin", "*");
//         res.write(JSON.stringify(data.record));
//         break;
//       case "1": // Bestseller
//         res.statusCode = 200;
//         res.setHeader("Content-Type", "application/json");
//         res.setHeader("Access-Control-Allow-Origin", "*");
//         filteredCategory = data.record.categories.filter(
//           (categor) => categor.category_name === "БЭСТСЕЛЛЕР"
//         );
//         console.log(filteredCategory);
//         res.write(JSON.stringify(filteredCategory));
//         break;
//       case "2": // Уран зохиол
//         res.statusCode = 200;
//         res.setHeader("Content-Type", "application/json");
//         res.setHeader("Access-Control-Allow-Origin", "*");
//         filteredCategory = data.record.categories.filter(
//           (categor) => categor.category_name === "УРАН ЗОХИОЛ"
//         );
//         console.log(filteredCategory);
//         res.write(JSON.stringify(filteredCategory));
//         break;
//       case "3": // Уран зохиол
//         res.statusCode = 200;
//         res.setHeader("Content-Type", "application/json");
//         res.setHeader("Access-Control-Allow-Origin", "*");
//         filteredCategory = data.record.categories.filter(
//           (categor) => categor.category_name === "MАНЛАЙЛАЛ"
//         );
//         console.log(filteredCategory);
//         res.write(JSON.stringify(filteredCategory));
//         break;
//       case "4": // Уран зохиол
//         res.statusCode = 200;
//         res.setHeader("Content-Type", "application/json");
//         res.setHeader("Access-Control-Allow-Origin", "*");
//         filteredCategory = data.record.categories.filter(
//           (categor) => categor.category_name === "ХУУЧИН"
//         );
//         console.log(filteredCategory);
//         res.write(JSON.stringify(filteredCategory));
//         break;
//       default: // Эд нараас өөр тоо байвал 404 буюу алдаа буцаана
//         res.statusCode = 404;
//         res.setHeader("Content-Type", "text/plain");
//         res.write("Error: category олдсонгүй");
//         break;
//     }
//     res.end(); // дуусгах ёстой
//   } else {
//     res.statusCode = 200;
//     res.setHeader("Content-Type", "application/json");
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     console.log(data.record.categories);
//     res.write(JSON.stringify(data.record));
//     res.end();
//   }
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}`);
// });
