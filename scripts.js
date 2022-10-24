let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

function addBookToLibrary() {
    const newBook = new Book(
        bookTitle.value,
        bookAuthor.value,
        bookPages.value,
        bookRead.checked,
    )
    myLibrary.push(newBook);
    newBook.id = myLibrary.length - 1;
    createCard(newBook);
    console.log(newBook);
    closeModal();
    resetForm();
}

function createCard(book) {
    const newBook = document.createElement("div");
    newBook.className = "book";
    const newCard = document.createElement("div");
    newCard.className = "card";
    const newMark = document.createElement('div');
    newMark.className = "bookmark";

    // title
    const title = document.createElement('p');
    title.textContent = `${book.title}`;
    newCard.appendChild(title);
    // author
    const author = document.createElement('p');
    author.textContent = `by ${book.author}`;
    newCard.appendChild(author);
    // pages
    const pages = document.createElement('p');
    pages.textContent = `${book.pages} pages`;
    newCard.appendChild(pages);
    // read status
    const readStatus = document.createElement('div');
    readStatus.className = 'read-status';
    const readCheck = document.createElement('input');
    readCheck.type = 'checkbox';
    readCheck.setAttribute('id', 'read-status');
    readCheck.setAttribute('name', 'read-status');
    readCheck.checked = book.read;
    readCheck.addEventListener('change', () => changeBookmark(newMark, book));
    const readLabel = document.createElement('label');
    readLabel.setAttribute('for', 'read-status');
    readLabel.textContent = `Read?`;
    readStatus.append(readCheck, readLabel);
    newCard.appendChild(readStatus);
    // delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete';
    deleteBtn.textContent = `remove`;
    deleteBtn.addEventListener('click', () => removeBook(book));
    newCard.appendChild(deleteBtn);

    newBook.append(newCard, newMark);
    if (book.read) newMark.classList.add('read');

    bookGrid.appendChild(newBook);
}

function removeBook(removedBook) {
    // find book on page
    let books = document.querySelectorAll(".book");
    let index = removedBook.id;
    let removedCard = books.item(index);
    removedCard.remove();
    // remove element
    myLibrary.splice(index, 1);
    // update library
    myLibrary.forEach(book => book.id = myLibrary.indexOf(book));
}

function openModal() {
    addModal.classList.add('active');
    overlay.classList.add('active');
}

function closeModal() {
    addModal.classList.remove('active');
    overlay.classList.remove('active');
}

function resetForm() {
    bookTitle.value = '';
    bookAuthor.value = '';
    bookPages.value = '';
    bookRead.checked = false;
}

function changeBookmark(newMark, book) {
    newMark.classList.toggle("read");
    book.read = !book.read;
}

const bookGrid = document.querySelector('.books');
const addBtn = document.querySelector('.add');
const addModal = document.querySelector('.new-book');
const overlay = document.querySelector('.overlay');
const submitBtn = document.querySelector('.submit');
const bookTitle = document.getElementById("book-title");
const bookAuthor = document.getElementById("book-author");
const bookPages = document.getElementById("book-pages");
const bookRead = document.getElementById("read-check");

addBtn.addEventListener('click', () => openModal());

overlay.addEventListener('click', () => closeModal())

submitBtn.addEventListener('click', () => addBookToLibrary());
