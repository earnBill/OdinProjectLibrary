const myLibrary = [];
const dialog = document.querySelector('dialog');
const showButton = document.querySelector('button');
const closeButton = document.querySelector('dialog button');
const container = document.querySelector('.container');
const submit = document.querySelector('.submit');
const dialogTitle = document.querySelector('#book-title');
const dialogAuthor = document.querySelector('#author');
const dialogPages = document.querySelector('#pages');
const checkBox = document.querySelector('#check');


showButton.addEventListener('click',() =>{
    dialogTitle.value = "";
    dialogAuthor.value = "";
    dialogPages.value = "";
    checkBox.checked = false;
    
    dialog.showModal();
})

closeButton.addEventListener('click',() => {
    dialog.close();
})

submit.addEventListener('click',(event)=> {
    event.preventDefault();
    console.log('submit');
    console.log(checkBox.checked);
    
    console.log(dialogTitle.value);
    let book = new Book(dialogTitle.value, dialogAuthor.value, dialogPages.value, checkBox.checked );
    myLibrary.push(book);
    createBook(myLibrary[myLibrary.length-1]);
    
})

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        return `The ${this.title} by ${this.author}, ${this.pages} pages, ${(this.pages === true)?"I haave read it!!":"not read it!!"}`
    }
}

function createBook(bookName, library) {
    const card = document.createElement('div');
    const title = document.createElement('div');
    const author = document.createElement('div');
    const year = document.createElement('div');
    const removeButton = document.createElement('button');
    const readButton = document.createElement('button');

    card.classList.add('card');
    container.appendChild(card);

    title.textContent = bookName.title;
    card.appendChild(title).classList.add('title');
    
    card.appendChild(author).classList.add('author');
    author.textContent = bookName.author;

    card.appendChild(year).classList.add('year');
    year.textContent = bookName.pages;

    card.appendChild(removeButton).classList.add('removeButton');
    removeButton.textContent = 'Remove';
    removeButton.dataset.index = bookName.title;

    card.appendChild(readButton).classList.add('readButton');
    readButtonText();
    
    function readButtonText() {
        if (bookName.read === true) {
            readButton.textContent = 'Read';
            readButton.style.backgroundColor = 'green';
        }
        else {
            readButton.textContent = 'Not read';
            readButton.style.backgroundColor = 'red';
        }
    }


    removeButton.addEventListener('click', ()=> {
        removeButton.parentNode.remove();
        let index = myLibrary.findIndex((element) => element === removeButton.dataset.index);
        myLibrary.splice(index, 1);
    })


    readButton.addEventListener('click',()=> {
        console.log('click')
        const card = document.querySelector('.card');
        if (readButton.textContent === 'Read') {
            bookName.read = false;
            console.log('red');
            readButton.textContent = 'Not read';
            readButton.style.backgroundColor = 'red';
        }
        else {
            bookName.read = true;
            console.log('green');
            readButton.textContent = 'Read';
            readButton.style.backgroundColor = 'green';
        }  
    })
}



function addBookToLibrary(library) {
    
}

function showLibrary(library) {
    for (let book of library) {      
        createBook(book, library);
        console.log(book);

    }
}

myLibrary[0] = new Book('Harry Potter', 'Tatsopoulos', 1992, true);
myLibrary[1] = new Book('Hobbit', 'Tolkin', 1000, false);

showLibrary(myLibrary);
