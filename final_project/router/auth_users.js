const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();
const session = require('express-session')

regd_users.use(express.json());
regd_users.use(session({secret:"fingerprint_customer"}))


let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
    let samenamedusers = users.filter((user)=>{
        if(user.username === username){
            return true;
        } else {
            return false;
        }
    });
    if(samenamedusers.length > 0){
        return true;
    } else {
        return false;
    }
}

//Function to check if the user is authenticated
const authenticatedUser = (username,password)=>{
  let validusers = users.filter((user)=>{
    if (user.username === username && user.password === password){
        return true;
    } else {
        return false;
    }
  });
  if(validusers.length > 0){
    return true;
  } else {
    return false;
  }
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  
    // Use JWT to verify token
  const username = req.query.username;
  const password = req.query.password;

  if (!username || !password) {
    return res.status(404).json({message: "Error logging in, please check the username or password"});
  }

  if (authenticatedUser(username,password)) {
    let accessToken = jwt.sign({
      data: password
    }, 'access', { expiresIn: 60 * 60 });

    req.session.authorization = {
      accessToken,username
    }
    return res.status(200).send("User logged in!");
  } else {
    return res.status(208).json({message: "Invalid credentials, please check the username or password"});
  }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  const user = req.session.authorization.username;
  const review = req.query.review;
  let resStatus = "";

  
  //Logic:
  //If any review for this isbn exist
    //If the current user matches an existing review's user
      //Update the review
  if(books[req.params.isbn].reviews.length > 0){
    let found = false;
    for(let i=0; i<books[req.params.isbn].reviews.length; i++){
      if(books[req.params.isbn].reviews[i][0] === user){
        books[req.params.isbn].reviews[i][1] = review; //update review
        found = true;
        resStatus = "Existing review updated"
        break;
      }
    }
    if(!found){ //if 1 or mroe reviews for this isbn exist but we didn't find a review for this user, add a new review
      books[req.params.isbn].reviews.push([user, review]);
      resStatus = "Added a review"
    }
    return res.status(200).json({message: resStatus});
  }
    const isbn = req.params.isbn;
    books[isbn].reviews.push( [user, review] );
    resStatus = "Added a review"
    return res.status(200).json({message: resStatus});

});

regd_users.delete("/auth/review/:isbn", (req, res) => {
    const user = req.session.authorization.username;
    let resStatus = "";
    //Logic:
    //If any review for this isbn exist
        //If the current user matches an existing review's user
        //Delete the review
    if(books[req.params.isbn].reviews.length > 0){
        let found = false;
        for(let i=0; i<books[req.params.isbn].reviews.length; i++){
          if(books[req.params.isbn].reviews[i][0] === user){
              books[req.params.isbn].reviews.splice(i, 1); //delete review
              found = true;
              resStatus = "Existing review deleted"
              break;
          }
        }
        if(!found){
        resStatus = "Review not found"
        }
        return res.status(200).json({message: resStatus});
    }
    resStatus = "Review not found"
    return res.status(200).json({message: resStatus});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
