const bookList = document.getElementById('book-list');
const addBookBtn = document.getElementById('add-book-btn');
const addBookModal = document.getElementById('add-book-modal');
const closeBtn = document.querySelector('.close');
const addBookForm = document.getElementById('add-book-form');

let myLibrary = [];

class Book {
    constructor(title, author) {
        this.title = title;
        this.author = author;
    }
}

function render() {
    bookList.innerHTML = '';

    myLibrary.forEach((book, index) => {
        const div = document.createElement('div');
        div.classList.add('book');
        div.dataset.index = index;

        const title = document.createElement('h2');
        title.textContent = book.title;

        const author = document.createElement('p');
        author.textContent = book.author;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.classList.add('remove-btn');

        div.appendChild(title);
        div.appendChild(author);
        div.appendChild(removeBtn);

        bookList.appendChild(div);
    });
}

function toggleModal() {
    addBookModal.classList.toggle('show-modal');
}

function addBookToLibrary() {
    const title = addBookForm.elements.title.value;
    const author = addBookForm.elements.author.value;
    const book = new Book(title, author);
    myLibrary.push(book);
    toggleModal();
    render();
    addBookForm.reset();
}

function removeBookFromLibrary(index) {
    myLibrary.splice(index, 1);
    render();
}

bookList.addEventListener('click', (event) => {
    if (event.target.classList.contains('remove-btn')) {
        const bookDiv = event.target.closest('.book');
        const index = bookDiv.dataset.index;
        removeBookFromLibrary(index);
    }
});

addBookBtn.addEventListener('click', toggleModal);
closeBtn.addEventListener('click', toggleModal);
addBookForm.addEventListener('submit', (event) => {
    event.preventDefault();
    addBookToLibrary();
});
