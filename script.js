"use strict";

const apiUrl = "http://localhost:4730/";
const books = [];

getBooksData();

function getBooksData() {
  fetch(apiUrl + "books")
    .then(function (response) {
      if (response.status === 200) {
        return response.json();
      } else {
        alert("API is down!");
      }
    })
    .then((booksFromApi) => {
      books.push(...booksFromApi);
      renderBooks();
    })
    .catch(function (error) {
      console.error(error);
    });
}

function renderBooks() {
  const booksTable = document.querySelector("#books-table");

  // Table Header
  const tableHeader = document.createElement("thead");
  const tableBody = document.createElement("tbody");

  const tableRow = document.createElement("tr");
  const tableHeaderTitle = document.createElement("th");
  tableHeaderTitle.classList.add("title");
  tableHeaderTitle.innerText = "Title";

  const tableHeaderAuthor = document.createElement("th");
  tableHeaderAuthor.classList.add("author");
  tableHeaderAuthor.innerText = "Author";

  const tableHeaderLink = document.createElement("th");
  tableHeaderLink.classList.add("link");
  tableHeaderLink.innerText = "Details";

  tableRow.append(tableHeaderTitle, tableHeaderAuthor, tableHeaderLink);
  tableHeader.append(tableRow);
  booksTable.append(tableHeader);

  // Table Content

  for (const book of books) {
    const tr = document.createElement("tr");

    const bookTitle = document.createElement("td");
    bookTitle.innerText = book.title;

    const bookAuthor = document.createElement("td");
    bookAuthor.innerText = book.author;

    const tdLink = document.createElement("td");
    const bookLink = document.createElement("a");
    bookLink.innerText = "more …";
    bookLink.setAttribute("title", "Read more about: " + book.title);
    bookLink.href = `/book.html?isbn=${book.isbn}`;

    tdLink.append(bookLink);
    tr.append(bookTitle, bookAuthor, tdLink);

    tableBody.append(tr);
    booksTable.append(tableBody);
  }
}
