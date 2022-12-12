import { BooksFromDb } from "../../database/books.js";
import { AuthorsFromDb } from "../../database/authorsTemp.js";
const Books = [...BooksFromDb];
const Authors = [...AuthorsFromDb];
export class BooksLogic {
    getBooks() {
        return Books;
    }
    getBookById(requiredBookId) {
        return Books.find((book) => {
            return book.id === requiredBookId;
        });
    }
    getBooksWrittenBeforeYear(maxYearAllowed) {
        return Books.filter((book) => book.year < maxYearAllowed);
    }
    getBooksByAuthor(requiredAuthor) {
        return Books.filter((book) => book.author === requiredAuthor);
    }
    getBooksByAuthorsWithMoreBooksThan(minAmountInBooks) {
        let popularAuthors = [];
        Authors.forEach((author) => {
            if (author.books.length > minAmountInBooks) {
                popularAuthors.push(author.name);
            }
        });
        return Books.filter((book) => popularAuthors.includes(book.author));
    }
    getBooksWithSameAuthorOfBookId(id) {
        console.log("get book with id ", id);
        let targetAuthor = Books.find((book) => book.id === id).author;
        return Authors.find((author) => author.name === targetAuthor).books;
    }
}
export class AuthorsLogic {
    getAuthors() {
        return Authors;
    }
    getAuthorByName(requiredName) {
        return Authors.find((author) => author.name === requiredName);
    }
    getAuthorById(id) {
        return Authors.find((author) => author.id === id);
    }
    getLivingAuthors() {
        return Authors.filter((author) => author.alive.isAlive);
    }
}
export function createBook(newBook) {
    console.log(Books.length);
    console.log(newBook);
    Books.push(newBook);
    console.log(Books.length);
    return { ...newBook };
}
export function createAuthor(newAuthor) {
    Authors.push({ ...newAuthor });
    return { ...Authors[Authors.length - 1] };
}
export function addBookToAuthorByName(name, title) {
    console.log("Name:", name, "Title:", title);
    return Authors.find((author) => {
        if (author.name === name) {
            author.books.push(title);
            return author;
        }
    });
}
