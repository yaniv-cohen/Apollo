import { Book, BooksList, AuthorInput } from "../types/types";
import { Author } from "../types/types";

import { BooksFromDb } from "../../database/books.js";
import { AuthorsFromDb } from "../../database/authorsTemp.js";
const Books = [...BooksFromDb];
const Authors = [...AuthorsFromDb];
export class BooksLogic {
  public getBooks(): Book[] {
    return Books;
  }
  public getBookById(requiredBookId: String): Book {
    return Books.find((book) => {
      return book.id === requiredBookId;
    });
  }

  public getBooksWrittenBeforeYear(maxYearAllowed: Number): Book[] {
    return Books.filter((book) => book.year < maxYearAllowed);
  }

  public getBooksByAuthor(requiredAuthor: String): Book[] {
    return Books.filter((book) => book.author === requiredAuthor);
  }

  public getBooksByAuthorsWithMoreBooksThan(minAmountInBooks: Number): Book[] {
    let popularAuthors = [];
    Authors.forEach((author) => {
      if (author.books.length > minAmountInBooks) {
        popularAuthors.push(author.name);
      }
    });
    return Books.filter((book) => popularAuthors.includes(book.author));
  }

  public getBooksWithSameAuthorOfBookId(id: String): any {
    console.log("get book with id ", id);
    let targetAuthor = Books.find((book) => book.id === id).author;
    return Authors.find((author) => author.name === targetAuthor).books;
  }
}

export class AuthorsLogic {
  public getAuthors(): Author[] {
    return Authors;
  }
  public getAuthorByName(requiredName: String): Author {
    return Authors.find((author) => author.name === requiredName);
  }
  public getAuthorById(id: String): Author {
    return Authors.find((author) => author.id === id);
  }
  public getLivingAuthors(): Author[] {
    return Authors.filter((author) => author.alive.isAlive);
  }
}

export function createBook(newBook: Book) {
  console.log(Books.length);
  console.log(newBook);
  Books.push(newBook);
  console.log(Books.length);
  return { ...newBook };
}

export function createAuthor(newAuthor: AuthorInput) {
  Authors.push({ ...newAuthor });
  return { ...Authors[Authors.length - 1] };
}

export function addBookToAuthorByName(name: String, title: string): Author {
  console.log("Name:", name, "Title:", title);

  return Authors.find((author) => {
    if (author.name === name) {
      author.books.push(title);
      return author;
    }
  });
}
