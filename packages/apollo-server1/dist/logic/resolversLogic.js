import { Books } from "../../database/books.js";
import { Authors } from "../../database/authors.js";
export class BooksLogic {
    getBookById(id) {
        return Books.find((book) => book.id === id);
    }
    getBooksWrittenBeforeYear(year) {
        return Books.filter((book) => book.year < year);
    }
    getBooksByAuthor(author) {
        return Books.filter((book) => book.author === author);
    }
    getBooksByAuthorsWithMoreBooksThan(minAmount) {
        console.log(minAmount);
        let popularAuthors = [];
        Authors.forEach((author) => {
            console.log(author.books.length, author.books.length > minAmount, ...author.books);
            if (author.books.length > minAmount) {
                popularAuthors.push(author.name);
            }
        });
        return Books.filter((book) => popularAuthors.includes(book.author));
    }
    getBooksBySameAuthor(id) {
        console.log("get books with id ", id);
        let targetAuthor = Books.find((book) => book.id === id).author;
        // let output = [];
        return Authors.find((author) => author.name === targetAuthor).books;
    }
}
// //books
// export function getBookById(booksFromDb: Book[], id: String): Book {
//   return booksFromDb.find((book) => book.id === id);
// }
// export function getBooksWrittenBeforeYear(
//   booksFromDb: Book[],
//   year: Number
// ): Book[] {
//   return booksFromDb.filter((book) => book.year < year);
// }
// export function getBooksByAuthor(booksFromDb: Book[], author: String): Book[] {
//   return booksFromDb.filter((book) => book.author === author);
// }
//author
export function getAuthorById(id) {
    return Authors.find((book) => book.id === id);
}
export function getLivingAuthors() {
    return Authors.filter((author) => author.alive.is_alive);
}
export function createBook(newBook) {
    Authors.push(newBook);
    return { ...newBook };
}
