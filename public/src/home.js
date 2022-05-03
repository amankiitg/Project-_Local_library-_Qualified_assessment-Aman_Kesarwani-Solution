function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  return books.filter((book) => book.borrows.filter((borrower) => (borrower.returned === false)).length >0).length;
}

function getMostCommonGenres(books) {
  
  const booksGenre = books.reduce((result,book) => {
    if(book.genre in result){
      result[book.genre] = result[book.genre]+1;
    }
    else{
      result[book.genre] = 1;
    }
    return result;
  },{});
 
  //map() function usage
  const booksGenreObject = Object.keys(booksGenre).map((key) => ({name : key, count: booksGenre[key]}));
  
//   const booksGenreObject = Object.keys(booksGenre).reduce((result, key) => {
//     result.push({name : key, count: booksGenre[key]});
//     return result;
//   },[]);
  
  booksGenreObject.sort((genreA,genreB) => genreB.count - genreA.count);                           
  return booksGenreObject.slice(0, 5);
}

function getMostPopularBooks(books) {
  
  const booksBorrowCount = books.reduce((result,book) => {
    result.push({name : book.title, count: book.borrows.length});
    return result;
  },[]);
  
  booksBorrowCount.sort((bookA,bookB) => bookB.count - bookA.count);                           
  return booksBorrowCount.slice(0, 5);
}

function getMostPopularAuthors(books, authors) {
  
  let authorBooksCount = authors.reduce((result,author) => {
    const authorBooks = books.filter((book) => book.authorId === author.id);
    const borrowCount = authorBooks.reduce((total,borrower) => {
     return total + borrower.borrows.length;
    },0);
    result.push({name : `${author.name.first} ${author.name.last}`, count: borrowCount});
    return result;
  },[]);
  
  authorBooksCount.sort((authorA,authorB) => authorB.count - authorA.count);                           
  return authorBooksCount.slice(0, 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
