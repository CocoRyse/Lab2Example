import { Books } from './data/Books';

export const CreateDataProvider = () => {
  const books = Books();

  // Предикат для поиска книги по ID
  const findBookByIdPredicate = (book, id) => book.id === id;

  const getAllBooks = () => Promise.resolve(books);

  const getBookByID = (id) =>
    new Promise((resolve, reject) => {
      const result = books.find((book) => findBookByIdPredicate(book, id));
      if (!result) {
        reject('Nothing found');
      }
      resolve(result);
    });

  const updateBook = (newBookData) =>
    new Promise((resolve, reject) => {
      const bookIndex = books.findIndex((book) =>
        findBookByIdPredicate(book, id)
      );

      if (bookIndex < 0) {
        reject('Nothing found');
      }

      books[bookIndex] = newBookData;

      resolve(bookIndex);
    });

  const putBook = (newBook) => {
    const newBookIndex = books.push({
      id: books.length,
      ...newBook,
    });

    return Promise.resolve(newBookIndex);
  };

  const deleteBook = (id) =>
    new Promise((resolve, reject) => {
      const index = books.findIndex((book) => findBookByIdPredicate(book, id));

      if (index < 0) {
        return reject('Nothing Found');
      }

      books.splice(index, 1);

      resolve(books.length);
    });

  return {
    getAllBooks,
    getBookByID,
    updateBook,
    putBook,
    deleteBook,
  };
};
