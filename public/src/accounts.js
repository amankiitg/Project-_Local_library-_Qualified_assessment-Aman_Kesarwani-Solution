function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id)
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((accountA, accountB) =>  accountA.name.last.toLowerCase() > accountB.name.last.toLowerCase() ? 1 : -1);
}

function getTotalNumberOfBorrows(account, books) {
  
  return (books.filter((book) => book.borrows.some((borrow) => (borrow.id === account.id)) === true)).length;
}

//HELPER FUNCTION
function possessedBookByAccount(books, account) {
  
  return books.filter((book) => book.borrows.filter((borrower) => (borrower.id === account.id)&&(borrower.returned === false)).length > 0);
  
}
function getBooksPossessedByAccount(account, books, authors) {
    
  const booksPossessed  = possessedBookByAccount(books, account);
    
  return booksPossessed.reduce((result, book) => {
    const author = authors.find((author) => (author.id === book.authorId));
    //Destructuring
    const {id, title, genre, authorId, borrows} = book;
    //object shorthand
    const finalObject = {id, title, genre, authorId, author, borrows};
    result.push(finalObject);
    return result;
  },[]);
  
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
