"use strict";

const apiUrl = "http://localhost:4730/";
const book = [];

getBooksData();
getISBN();

function getBooksData() {
  fetch(apiUrl + "books/" + book)
    .then(function (response) {
      if (response.status === 200) {
        return response.json();
      } else {
        alert("API is down!");
      }
    })
    .then((booksFromApi) => {
      book.push(...booksFromApi);
      renderBook();
    })
    .catch(function (error) {
      console.error(error);
    });
}

/*
{
  "id": "9781787125421",
  "title": "Progressive Web Application Development by Example",
  "subtitle": "Develop Fast, Reliable, and Engaging User Experiences for the Web",
  "isbn": "9781787125421",
  "abstract": "Are you a developer that wants to create truly cross-platform user experiences with a minimal footprint, free of store restrictions and features customers want? Then you need to get to grips with Progressive Web Applications (PWAs), a perfect amalgamation of web and mobile applications with a blazin...",
  "author": "Chris Love",
  "publisher": "Packt Publishing",
  "price": "$31.02",
  "numPages": 354,
  "cover": "http://localhost:4730/covers/9781787125421.png",
  "userId": 1
}*/

/** Wenn apiUrl + "books/" + book === params.get("isbn") dann ausgabe oder über filter / map */

function renderBook() {
  for (const entries of book) {
    const list = document.querySelector("#book-list");
    const li = document.createElement("li");
    li.innerText = entries.isbn;
    list.append(li);
  }
}

function getISBN() {
  let params = new URLSearchParams(document.location.search);
  const book = params.get("isbn");
  console.log(book);
  return book;
}
