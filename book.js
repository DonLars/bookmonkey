"use strict";

const apiUrl = "http://localhost:4730/";
const book = [];

getBookData();

function getBookData() {
  fetch(apiUrl + "books/" + getISBN())
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        alert("API is down!");
      }
    })
    .then((bookFromApi) => {
      book.push(bookFromApi);
      renderBook();
    })
    .catch((error) => {
      console.error(error);
    });
}

function renderBook() {
  const labels = [
    "Title",
    "Subtitle",
    "ISBN",
    "Abstract",
    "Author",
    "Publisher",
    "Price",
  ];
  const table = document.querySelector("#book-table");

  const headlineTitle = document.querySelector("h1.title");
  const pageTitle = document.querySelector("title");
  pageTitle.innerText = book[0].title;
  headlineTitle.innerText = book[0].title;

  for (const label of labels) {
    const tr = document.createElement("tr");
    const tdLabel = document.createElement("th");
    const tdValue = document.createElement("td");

    tdLabel.innerText = label;
    tdValue.innerText = book[0][label.toLowerCase()];

    tr.append(tdLabel, tdValue);
    table.appendChild(tr);
  }

  const trCover = document.createElement("tr");
  const tdCoverLabel = document.createElement("th");
  const tdCover = document.createElement("td");
  const imgCover = document.createElement("img");

  tdCoverLabel.innerText = "Cover";
  imgCover.src = book[0].cover;
  imgCover.classList.add("image");
  imgCover.setAttribute("alt", "An image about " + book[0].title);
  imgCover.style.width = "500px";

  tdCover.append(imgCover);
  trCover.append(tdCoverLabel, tdCover);
  table.appendChild(trCover);
}

function getISBN() {
  const params = new URLSearchParams(document.location.search);
  return params.get("isbn");
}
