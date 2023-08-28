const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

//Function to check if the user exists
const doesExist = (username)=>{
  let samenamedusers = users.filter((user)=>{
    if (user.username === username){
      return true;
    }else{
      return false;
    }
  });
  if(samenamedusers.length > 0){
    return true;
  } else {
    return false;
  }
}
public_users.post("/register", (req,res) => {
  const username = req.query.username;
  const password = req.query.password;

  if (username && password) {
    if (!doesExist(username)) {
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "User successfully registered. Now you can login!"});
    } else {
      return res.status(404).json({message: "User already exists!"});
    }
  }
  return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  
  return res.status(200).json(books);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const thisISBN = req.params.isbn;
  if(books[thisISBN] === undefined) {
    return res.status(404).json({message: "ISBN unavailable in library"})
  }else {
    return res.status(200).json({message: books[thisISBN]});
  }
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {

  let resOutput = {};
  let x = 0;
  const thisAuthor = req.params.author;
    for(let i = 1; i < Object.keys(books).length; i++) {
      if(books[i].author === thisAuthor) {
        resOutput[x] = books[i];
        x++;
      }
      //console.log(books[i].author)
    }
    if(x === 0) {
        return res.status(300).json({message: "Author unavailable in library"})
    }else {
        return res.status(200).json({message: resOutput});
  }
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {

  let resOutput = {};
  let x = 0;
  const thisTitle = req.params.title;
  for(let i = 1; i < Object.keys(books).length; i++) {
    if(books[i].title === thisTitle) {
      resOutput[x] = books[i];
      x++;
    }
    //console.log(books[i].author)
  }
  if(x === 0) {
    return res.status(300).json({message: "Title unavailable in library"})
  }else {
    return res.status(200).json({message: resOutput});
  }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {

  const thisISBN = req.params.isbn;
  if(books[thisISBN] === undefined) {
    return res.status(404).json({message: "ISBN unavailable in library"})
  }else {
    return res.status(200).json({message: books[thisISBN].reviews});
  }
});

module.exports.general = public_users;
