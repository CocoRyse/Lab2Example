import { Books } from './data/Books';

export class DataProvider {
  static books = Books();

  static findBookByIdPredicate = (book, id) => book.id === id;

  static getAllBooksShortInfo = () =>
    Promise.resolve(
      this.books.map((book) => ({ id: book.id, title: book.title }))
    );

  static getBookByID = (id) =>
    new Promise((resolve, reject) => {
      const result = this.books.find((book) =>
        this.findBookByIdPredicate(book, id)
      );

      if (!result) {
        reject(`Книги с id ${id} не найдено`);
      }

      resolve(result);
    });

  static getBookByAuthor = (author) => {
    return new Promise((resolve, reject) => {
      const result = this.books.filter((book) => book.author === author);

      if (result.length === 0) {
        reject(`Для авторва ${author} не найдено книг`);
      }

      resolve(result);
    });
  };

  // Обновить данные о старой книге
  static updateBook = (newBookData) => {
    return new Promise((resolve, reject) => {
      const bookIndex = this.books.findIndex((book) =>
        this.findBookByIdPredicate(book, newBookData.id)
      );

      if (bookIndex < 0) {
        reject(`Книги с id ${id} не найдено`);
      }

      this.books[bookIndex] = newBookData;
      resolve(bookIndex);
    });
  };

  // Добавить новую книгу
  static putBook = (newBook) => {
    const newBookIndex = this.books.push({
      id: this.books.length,
      ...newBook,
    });

    return Promise.resolve(newBookIndex);
  };

  static deleteBook = (id) => {
    return new Promise((resolve, reject) => {
      const index = this.books.findIndex((book) =>
        this.findBookByIdPredicate(book, id)
      );

      if (index < 0) {
        reject(`Книги с id ${id} не найдено`);
      }

      this.books.splice(index, 1);
      resolve(this.books.length);
    });
  };
}
