// Ном серверлуу дуудаж авах функц
export const requestBooksData = async (category, query) => {
  console.log(
    `http://127.0.0.1:3000${query ? "?" + category + "&" + query : ""}`
  );
  const response = await fetch(
    `http://127.0.0.1:3000${query ? "?" + category + "=" + query : ""}`
  );
  const books = await response.json();
  return books;
};
