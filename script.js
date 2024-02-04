const apiUrl = "http://localhost:4730/";
const books =
  (await getBooksData()) || JSON.parse(localStorage.getItem("books")) || [];

renderBooks();

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
    })
    .catch(function (error) {
      console.error(error);
    });

  /* async function getBooksData() {
  try {
    const response = await fetch(apiUrl + "books");
    const booksFromApi = await response.json();
    localStorage.setItem("books", JSON.stringify(booksFromApi));

    return booksFromApi;
  } catch (error) {
    console.log(error);
  }
} */
}

function renderBooks() {
  const booksTable = document.querySelector("#books-table");

  for (const book of books) {
    const tr = document.createElement("tr");

    const bookTitle = document.createElement("td");
    bookTitle.innerText = book.title;

    const bookAuthor = document.createElement("td");
    bookAuthor.innerText = book.author;

    const tdLink = document.createElement("td");
    const bookLink = document.createElement("a");
    bookLink.innerText = "More";
    bookLink.href = `/book.html?isbn=${book.isbn}`;

    tdLink.append(bookLink);
    tr.append(bookTitle, bookAuthor, tdLink);

    booksTable.append(tr);
  }
}
