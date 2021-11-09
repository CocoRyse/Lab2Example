import { Books } from './data/Books';

export class DataProvider {
  static books = Books();

  // Предикат для поиска книги по ID
  static findBookByIdPredicate = (book, id) => book.id === id;

  static getAllBooks = () =>
    Promise.resolve(
      this.books.map((book) => ({ id: book.id, title: book.title }))
    );

  static getBookByID = (id) =>
    new Promise((resolve, reject) => {
      const result = this.books.find((book) =>
        this.findBookByIdPredicate(book, id)
      );
      if (!result) {
        reject('Nothing found');
      }
      resolve(result);
    });

  static updateBook = (newBookData) =>
    new Promise((resolve, reject) => {
      const bookIndex = this.books.findIndex((book) =>
        this.findBookByIdPredicate(book, newBookData.id)
      );

      if (bookIndex < 0) {
        reject('Nothing found');
      }

      this.books[bookIndex] = newBookData;

      resolve(bookIndex);
    });

  static putBook = (newBook) => {
    const newBookIndex = this.books.push({
      id: this.books.length,
      ...newBook,
    });

    return Promise.resolve(newBookIndex);
  };

  static deleteBook = (id) =>
    new Promise((resolve, reject) => {
      const index = this.books.findIndex((book) =>
        this.findBookByIdPredicate(book, id)
      );

      if (index < 0) {
        return reject('Nothing Found');
      }

      this.books.splice(index, 1);

      resolve(this.books.length);
    });
}
