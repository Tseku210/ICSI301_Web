"use strict";

// const express = require("express");
// const { Pool } = require("pg");
// require("dotenv").config();
// const swaggerJSDoc = require("swagger-jsdoc");
// const swaggerUI = require("swagger-ui-express");

import express, { response } from "express";
import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import bcrypt from "bcrypt";
import cors from "cors";

const SALTROUNDS = 10;

dotenv.config();

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  database: process.env.DB,
  password: process.env.DB_PASSWORD,
});

// swagger тохируулга
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Bookstore api",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://127.0.0.1:3000",
        description: "Development server",
      },
    ],
  },
  apis: ["./index.js", "./pages/*.js"],
};

const openapiSpec = await swaggerJSDoc(options);

const uiOptions = {
  explorer: true,
};

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(openapiSpec, uiOptions));

/**
 * @swagger
 * /books:
 *   get:
 *    summary: Бүх номыг татаж авчрах
 *    description: Өгөгдлийн сангаас номуудыг дуудаж шиднэ
 *    responses:
 *     200:
 *      description: Амжилттай явууллаа
 *     500:
 *      description: Серверийн алдаа гарлаа
 */
app.get("/books", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  await pool
    .query(`SELECT * FROM "store"."books"`)
    .then((response) => {
      res.send(response.rows);
    })
    .catch((err) =>
      response.statusCode(500).send({
        status: "BAD",
        response: "Серверийн алдаа гарлаа",
      })
    );
  console.log("working: " + res);
});

/**
 * @swagger
 * /book/:id:
 *   get:
 *    summary: Нэг номны мэдээлэл
 *    description: Өгөгдлийн сангаас нэг номыг дуудаж шиднэ
 *    responses:
 *     200:
 *      description: Амжилттай явууллаа
 *     500:
 *      description: Серверийн алдаа гарлаа
 */
app.get("/book/:id", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  await pool
    .query(`SELECT * FROM "store"."books" where id = ${req.params.id}`)
    .then((response) => {
      res.send(response.rows);
    })
    .catch((err) =>
      response.statusCode(500).send({
        status: "BAD",
        response: "Серверийн алдаа гарлаа",
      })
    );
  console.log("working: " + res);
});

/**
 * @swagger
 * /addCart:
 *   post:
 *    summary: Сагсруу id-тай ном оруулна
 *    description: Request-ээр ирсэн номны id-г ашиглан cart хүснэгтэд оруулна
 *    responses:
 *     201:
 *      description: Амжилттай оруулсан
 *     500:
 *      description: Серверийн алдаа гарлаа
 */
app.post("/addCart", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  console.log(
    `INSERT INTO store.cart (book_id, type, status) 
VALUES ((select id from store.books where id = ${req.body.bookId}), '${req.body.type}', 'waiting')`,
    req.body
  );
  await pool
    .query(
      `INSERT INTO store.cart (book_id, type, status) 
              VALUES ((select id from store.books where id = ${req.body.bookId}), '${req.body.type}', 'waiting')`
    )
    .then(() => {
      res.status(201).send({
        status: "OK",
        response: "Book added to cart",
      });
    })
    .catch(() =>
      res.status(500).send({
        status: "BAD",
        response: "Серверийн алдаа гарлаа",
      })
    );
});

/**
 * @swagger
 * /cartBooks:
 *   get:
 *    summary: Сагсанд байгаа номуудыг буцаана
 *    description: Өгөгдлийн сангийн cart хүснэгтэд байгаа өгөгдлийг буцаана
 *    responses:
 *     200:
 *      description: Амжилттай явууллаа
 *     500:
 *      description: Серверийн алдаа гарлаа
 */
app.get("/cartBooks", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  await pool
    .query(
      `SELECT * FROM store.books AS b join store.cart AS c ON b.id = c.book_id;`
    )
    .then((response) => {
      res.status(200).send(response.rows);
    })
    .catch(() =>
      res.status(500).send({
        status: "BAD",
        response: "Серверийн алдаа гарлаа",
      })
    );
});

/**
 * @swagger
 * /cartBooksCount:
 *   get:
 *    summary: Сагсанд байгаа номуудын тоог буцаана
 *    description: Өгөгдлийн сангийн cart хүснэгтэд байгаа өгөгдлийн тоог буцаана
 *    responses:
 *     200:
 *      description: Амжилттай явууллаа
 *     500:
 *      description: Серверийн алдаа гарлаа
 */
app.get("/cartBooksCount", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  await pool
    .query(
      `SELECT count(b.id) FROM store.books AS b join store.cart AS c ON b.id = c.book_id;`
    )
    .then((response) => {
      res.status(200).send(response.rows[0]);
    })
    .catch(() =>
      res.status(500).send({
        status: "BAD",
        response: "Серверийн алдаа гарлаа",
      })
    );
});

// Хэрэглэгчийн нууц үгийг шалгах нэмэлт функц
const validateUser = (password, hash) => {
  return bcrypt.compare(password, hash);
};

/**
 * @swagger
 * login/:
 *   get:
 *    summary: Хэрэглэгчийг нэвтрүүлэх security
 *    description: Хэрэглэгчийн мэдээллийг өгөгдлийн санд байгаа эсэх болон нууц үгийг шалгаж тохирсон JSON response буцаана
 *    responses:
 *     200:
 *      description: Хэрэглэгч амжилттай нэвтэрлээ
 *     401:
 *      description: Бүртгэлтэй хэрэглэгч байхгүй
 *     500:
 *      description: Серверийн алдаа
 */
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log("email: " + email);
  console.log("password: " + password);

  await pool
    .query(
      `SELECT email, password FROM "store"."users" where email = '${email}'`
    )
    .then(async (response) => {
      if (response.rows.length == 0) {
        res.statusCode(401).send({
          status: "BAD",
          error: "User not found",
        });
        return;
      }
      const hash = response.rows[0].password;
      await validateUser(password, hash).then((response) => {
        console.log(response);
        if (response) {
          res.send({
            status: "OK",
          });
        } else {
          res.statusCode(401).send({
            status: "BAD",
          });
        }
      });
    })
    .catch((err) =>
      res.statusCode(500).send({
        status: "BAD",
        error: err,
      })
    );
});

/**
 * @swagger
 * register/:
 *   get:
 *    summary: Хэрэглэгчийг бүртгэх
 *    description: Хэрэглэгчийн мэдээллийг өгөгдлийн санд хадгалж тохирсон JSON response буцаана.
 *    responses:
 *     201:
 *      description: Хэрэглэгч амжилттай үүссэн
 *     500:
 *      description: Серверийн алдаа
 */

app.post("/register", async (req, res) => {
  const { name, email, password, address } = req.body;
  console.log(req.body);
  await bcrypt.hash(password, SALTROUNDS).then(async (hash) => {
    await pool
      .query(
        `INSERT INTO "store"."users" (name, email, address, password) VALUES ('${name}', '${email}', '${address}', '${hash}')`
      )
      .then((response) => {
        console.log(response);
        res.statusCode(201).send({
          status: "OK",
          response: "User created",
        });
      })
      .catch((e) => {
        console.log(e);
        res.statusCode(500).send({
          error: e,
          status: "BAD",
        });
      });
    res.end();
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
