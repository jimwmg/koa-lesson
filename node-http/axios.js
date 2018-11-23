const axios = require('axios');

axios.get('http://localhost:8080/index.html')
  .then(response => {
    console.log('this is axios',response.data);
  })
  .catch(error => {
    console.log(error);
  });