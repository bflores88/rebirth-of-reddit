'use strict';

function getData(string) {
  function subRedditReqListener() {
    let object = JSON.parse(this.responseText).data.children;

    object.forEach((elem) => {
      let subContent = document.createElement('div');
      subContent.className = 'subContent';
      content.appendChild(subContent);

      subContent.addEventListener('click', goToLink);

      function goToLink() {
        window.open(elem.data.url, '_blank');
      }

      if (elem.data.thumbnail !== 'self') {
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

      let timelapse = document.createElement('div');
      timelapse.className = 'timelapse statsItem';
      timelapse.innerHTML = 'TBD';
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

instantPot.addEventListener('mousedown', getIPdata);
function getIPdata() {
  content.innerHTML = '';
  getData('instantpot');
}

aww.addEventListener('mousedown', getAwwData);
function getAwwData() {
  content.innerHTML = '';
  getData('aww');
}

tippytaps.addEventListener('mousedown', getTippyTaps);
function getTippyTaps() {
  content.innerHTML = '';
  getData('tippytaps');
}

random.addEventListener('mousedown', getRandom);
function getRandom() {
  content.innerHTML = '';
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
