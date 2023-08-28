const axios = require('axios');

const ip = 'localhost:5000';

getAllBooksUsingAsync()
searchByISBNUsingPromises();
searchByAuthorUsingPromises();
searchByTitleUsingPromises();


async function getAllBooksUsingAsync() {
    const response = await axios.get('http://localhost:5000/');
    console.log('All Books');
    console.log(response.data);
}
function searchByISBNUsingPromises() {
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
function searchByAuthorUsingPromises(){
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
function searchByTitleUsingPromises(){
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