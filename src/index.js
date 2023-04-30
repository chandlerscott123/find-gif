import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

//API call structure
function getResults(searchText){
  let request = new XMLHttpRequest();
  const url = `http://api.giphy.com/v1/gifs/search?q=${searchText}&api_key=${process.env.API_KEY}&limit=5`;
  
  request.addEventListener('loadend', function(){
    const response = JSON.parse(this.responseText);
    if(this.status === 200){
      printResults(response);
    }
    else{
      printError(this, response, searchText);
    }
  });
  
  request.open('GET', url, true);
  request.send();
}


//User Interface Logic
function printResults(response) {
  const resultList = document.createElement('ul');

  //store array of MP4 link from Gif obj
  const resultsSource = response.data.map(function(gif){
    return gif.images.original.webp;
  });

  //display a list of results
  resultsSource.forEach(function(gif){
    
    let resultElem = document.createElement('li');
    let resultImg = document.createElement('img');
    resultImg.setAttribute('src', gif);
    resultElem.append(resultImg);
    resultList.append(resultElem);
  });

  document.querySelector('#show-response').append(resultList);
}


function printError(request, response, searchText){
  document.querySelector('#show-response').innerText = `There was an error accessing the data for ${searchText}: ${request.status} ${request.statusText}: ${response.message}`;
}

function handleFormSubmission(event){
  event.preventDefault();
  const searchText = document.querySelector('#search').value;
  document.querySelector('#search').value = null;
  getResults(searchText);
}

window.addEventListener('load', function(){
  document.querySelector('form').addEventListener('submit', handleFormSubmission);
});
