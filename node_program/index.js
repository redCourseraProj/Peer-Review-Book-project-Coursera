const axios = require('axios');

const ip = 'localhost:5000';

getAllBooksUsingAsync()
searchByISBNUsingPromises(1);
searchByAuthorUsingPromises("Chinua Achebe");
searchByTitleUsingPromises("Things Fall Apart");


async function getAllBooksUsingAsync() {
    const response = await axios.get('http://localhost:5000/');
    console.log('All Books');
    console.log(response.data);
}
function searchByISBNUsingPromises(isbn) {
    axios.get('http://localhost:5000/isbn/1')
        .then(response => {
            // Handle response
            console.log(response.data);
        })
        .catch(err => {
            // Handle errors
            console.log(err);
        });
}
function searchByAuthorUsingPromises(author){
     axios.get('http://localhost:5000/author/Chinua Achebe')
        .then(response => {
            // Handle response
            console.log(response.data);
        })
        .catch(err => {
            // Handle errors
            console.log(err);
        });
}
function searchByTitleUsingPromises(title){
     axios.get('http://localhost:5000/title/Things Fall Apart')
        .then(response => {
            // Handle response
            console.log(response.data);
        })
        .catch(err => {
            // Handle errors
            console.log(err);
        });
}