"use strict";

const apiUrl = "http://localhost:4730/";
const book = [];

getBookData();

function getBookData() {
  fetch(apiUrl + "books/" + getISBN())
    .then(function (response) {
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
    .catch(function (error) {
      console.error(error);
    });
}

function renderBook() {
  const labelTitle = "Titel";

  for (const entries of book) {
    const headlineTitle = document.querySelector("h1.title");
    const table = document.querySelector("#book-table");

    const trTitle = document.createElement("tr");
    const trSubtitle = document.createElement("tr");
    const trIsbn = document.createElement("tr");
    const trAbstract = document.createElement("tr");
    const trAuthor = document.createElement("tr");
    const trPublisher = document.createElement("tr");
    const trPrice = document.createElement("tr");
    const trCover = document.createElement("tr");

    const tdTitle = document.createElement("td");
    const tdSubtitle = document.createElement("td");
    const tdIsbn = document.createElement("td");
    const tdAbstract = document.createElement("td");
    const tdAuthor = document.createElement("td");
    const tdPublisher = document.createElement("td");
    const tdPrice = document.createElement("td");
    const tdCover = document.createElement("td");

    const tdTitleLabel = document.createElement("th");
    const tdSubtitleLabel = document.createElement("th");
    const tdIsbnLabel = document.createElement("th");
    const tdAbstractLabel = document.createElement("th");
    const tdAuthorLabel = document.createElement("th");
    const tdPublisherLabel = document.createElement("th");
    const tdPriceLabel = document.createElement("th");
    const tdCoverLabel = document.createElement("th");

    const imgCover = document.createElement("img");

    headlineTitle.innerText = entries.title;
    const pageTitle = document.querySelector("title");
    pageTitle.innerText = entries.title;

    tdTitleLabel.innerText = "Title";
    tdSubtitleLabel.innerText = "Subtitle";
    tdIsbnLabel.innerText = "ISBN";
    tdAbstractLabel.innerText = "Abstract";
    tdAuthorLabel.innerText = "Author";
    tdPublisherLabel.innerText = "Publisher";
    tdPriceLabel.innerText = "Price";

    tdTitle.innerText = entries.title;
    tdSubtitle.innerText = entries.subtitle;
    tdIsbn.innerText = entries.isbn;
    tdAbstract.innerText = entries.abstract;
    tdAuthor.innerText = entries.author;
    tdPublisher.innerText = entries.publisher;
    tdPrice.innerText = entries.price;

    imgCover.src = entries.cover;
    imgCover.classList.add("image");
    imgCover.setAttribute("alt", "An image about " + entries.title);
    imgCover.style.width = "500px";

    tdCover.append(imgCover);

    trTitle.append(tdTitleLabel, tdTitle);
    trSubtitle.append(tdSubtitleLabel, tdSubtitle);
    trIsbn.append(tdIsbnLabel, tdIsbn);
    trAbstract.append(tdAbstractLabel, tdAbstract);
    trAuthor.append(tdAuthorLabel, tdAuthor);
    trPublisher.append(tdPublisherLabel, tdPublisher);
    trPrice.append(tdPriceLabel, tdPrice);
    trCover.append(tdCoverLabel, tdCover);

    table.append(
      trTitle,
      trSubtitle,
      trIsbn,
      trAbstract,
      trAuthor,
      trPublisher,
      trPrice,
      trCover
    );
  }
}

function getISBN() {
  let params = new URLSearchParams(document.location.search);
  const getParamBook = params.get("isbn");
  //console.log(getParamBook);
  return getParamBook;
}
