"use strict";


instantPot.addEventListener('mousedown', getIPdata);
function getIPdata () { getData('instantpot')};


function getData(string){

  console.log(string);

  function subRedditReqListener () {
    let object = JSON.parse(this.responseText).data.children;
    

    object.forEach(elem => {
      console.log(elem.data.title);

      let subContent = document.createElement('div');
      subContent.className = 'subContent';
      content.appendChild(subContent);

      if(elem.data.thumbnail !== 'self'){

        let subImg = document.createElement('div');
        subImg.className = 'subImg';
        subContent.appendChild(subImg);

        let imgHere = document.createElement('img');
        imgHere.className = 'redditImage';
        imgHere.src = elem.data.thumbnail;
        subImg.appendChild(imgHere);

      }

      let titleDiv = document.createElement('div');
      titleDiv.className = 'title';
      titleDiv.innerHTML = elem.data.title;
      subContent.appendChild(titleDiv);


    })

  }

  let subRedditReq = new XMLHttpRequest();
  subRedditReq.addEventListener('load', subRedditReqListener);
  subRedditReq.open('GET', `https://www.reddit.com/r/${string}.json`);
  subRedditReq.send();



}




