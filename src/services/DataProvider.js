import { Books } from './data/Books';

const books = Books();

const DataProvider = () => {
  const getAllBooks = () => {};

  const getBookByID = () => {};

  const updateBook = () => {};

  const putBook = () => {};

  const deleteBook = () => {};

  return {
    getAllBooks,
    getBookByID,
    updateBook,
    putBook,
    deleteBook,
  };
};
