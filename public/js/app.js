'use strict';


function getData(string) {

  function subRedditReqListener() {
    content.innerHTML = '';

    let object = JSON.parse(this.responseText).data.children;

    let contentHolder = document.createElement('div');
    contentHolder.className = 'container';
    content.appendChild(contentHolder);

    object.forEach((elem) => {
      let subContent = document.createElement('div');
      subContent.className = 'subContent';
      contentHolder.appendChild(subContent);

      subContent.addEventListener('click', goToLink);

      function goToLink() {
        window.open(elem.data.url, '_blank');
      }

      console.log(elem.data.thumbnail.onload)

      if (elem.data.thumbnail !== 'self') {
        let subImg = document.createElement('div');
        subImg.className = 'subImg';
        subContent.appendChild(subImg);

        let imgHere = document.createElement('img');
        imgHere.className = 'redditImage';
        imgHere.src = elem.data.thumbnail;
        imgHere.onerror = function (){
          imgHere.src = 'http://trifectaecosystems.com/wp-content/uploads/2015/04/snoo-300x208.jpg';
        }
        subImg.appendChild(imgHere);
      }

      let titleDiv = document.createElement('div');
      titleDiv.className = 'title';
      titleDiv.innerHTML = elem.data.title;
      subContent.appendChild(titleDiv);

      let statsDiv = document.createElement('div');
      statsDiv.className = 'stats';
      subContent.appendChild(statsDiv);

      let author = document.createElement('div');
      author.className = 'author statsItem';
      author.innerHTML = elem.data.author;
      statsDiv.appendChild(author);

      let dot = document.createElement('div');
      dot.className = 'dot2 statsItem';
      dot.innerHTML = '&#8226';
      statsDiv.appendChild(dot);

      function timeSince(date) {


        let seconds = Math.floor((new Date() - date) / 1000);
      
        let interval = Math.floor(seconds / 31536000);
      
        if (interval > 1) {
          return interval + " years";
        }
        interval = Math.floor(seconds / 2592000);
        if (interval > 1) {
          return interval + " months";
        }
        interval = Math.floor(seconds / 86400);
        if (interval > 1) {
          return interval + " days";
        }
        interval = Math.floor(seconds / 3600);
        if (interval > 1) {
          return interval + " hours";
        }
        interval = Math.floor(seconds / 60);
        if (interval > 1) {
          return interval + " minutes";
        }
        return Math.floor(seconds) + " seconds";
      }

      let timelapse = document.createElement('div');
      timelapse.className = 'timelapse statsItem';
      timelapse.innerHTML = timeSince(new Date(elem.data.created*1000))
      statsDiv.appendChild(timelapse);

      let dot2 = document.createElement('div');
      dot2.className = 'dot2 statsItem';
      dot2.innerHTML = '&#8226';
      statsDiv.appendChild(dot2);

      let score = document.createElement('div');
      score.className = 'score statsItem';
      score.innerHTML = `${elem.data.score} upvotes`;
      statsDiv.appendChild(score);

      let selfText = document.createElement('div');
      selfText.className = 'selfText';
      selfText.innerHTML = elem.data.selftext;
      subContent.appendChild(selfText);
    });
  }

  let subRedditReq = new XMLHttpRequest();
  subRedditReq.addEventListener('load', subRedditReqListener);
  subRedditReq.open('GET', `https://www.reddit.com/r/${string}.json`);
  subRedditReq.send();
}

let plusHover = document.getElementById('plus');
plusHover.addEventListener('mouseover', changeSign);

function changeSign(){
  if(plusHover.alt === 'plus'){
    plusHover.alt = 'minus';
    plusHover.src = 'assets/plus_hover.svg';
  } else {
    plusHover.alt = 'plus';
    plusHover.src = 'assets/plus_sign.svg';
  }
}

logo.addEventListener('click', refreshWindow);

function refreshWindow(){
  location.reload();
}

instantPot.addEventListener('mousedown', getIPdata);
function getIPdata() {
  getData('instantpot');
}

aww.addEventListener('mousedown', getAwwData);
function getAwwData() {
  getData('aww');
}

tippytaps.addEventListener('mousedown', getTippyTaps);
function getTippyTaps() {
  getData('tippytaps');
}

random.addEventListener('mousedown', getRandom);
function getRandom() {
  let topics = [
    'science',
    'Showerthoughts',
    'IAmA',
    'listentothis',
    'personalfinance',
    'todayilearned',
    'Documentaries',
    'cats',
  ];
  let randomIndex = Math.floor(Math.random() * 7);
  let pickTopic = topics[randomIndex];
  getData(pickTopic);
}

let searchReddit = document.querySelector('.submitSearch');
searchReddit.addEventListener('click', goSearchReddit);

function goSearchReddit(){
  let getInput = document.querySelector('.searchInput');
  getData(getInput.value);
  
  let updateDefaultError = document.querySelector('.errorNotice');
  updateDefaultError.style.display = 'block';
}

let getFooterLinks = document.querySelectorAll('.footerImg');
getFooterLinks[0].addEventListener('click', goFaceBook);

function goFaceBook() {
  window.open('https://www.facebook.com/', '_blank');
}

getFooterLinks[1].addEventListener('click', goInstagram);
function goInstagram() {
  window.open('https://www.instagram.com/', '_blank');
}