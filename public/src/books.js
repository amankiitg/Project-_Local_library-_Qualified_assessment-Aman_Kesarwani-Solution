function findAuthorById(authors, id) {
  
  return authors.find((author) => (author.id === id));
  
}

function findBookById(books, id) {
  
  return books.find((book) => (book.id === id));
}

function partitionBooksByBorrowedStatus(books) {

  //filter() usage
  const booksOut  = books.filter((book) => book.borrows.filter((borrower) => (borrower.returned === false)).length > 0);

  const booksIn  = books.filter((book) => book.borrows.filter((borrower) => (borrower.returned === false)).length == 0);

  return [booksOut, booksIn];
}


function getBorrowersForBook(book, accounts) {
  
  //find() and reduce() usage
  return book.borrows.reduce((result, borrower) =>    {
    const borrowers = accounts.find((account) => (account.id === borrower.id));
    const returned = borrower.returned;
    const finalObject = {...borrowers, returned};
    result.push(finalObject);
    return result;
  },[]).slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
