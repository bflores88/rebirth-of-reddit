'use strict';

let lastSubreddit = '';

function getData(subreddit) {
  lastSubreddit = subreddit;
  let posts = '';

  function subRedditErrorHandler() {
    let updateDefaultError = document.querySelector('.errorNotice');
    updateDefaultError.style.display = 'block';
    return;
  }

  function subRedditReqListener() {
    content.innerHTML = '';

    const data = JSON.parse(this.responseText).data;

    if (!data) {
      let updateDefaultError = document.querySelector('.errorNotice');
      updateDefaultError.style.display = 'block';
      return;
    } else {
      posts = data.children;
    }

    let contentHolder = document.createElement('div');
    contentHolder.className = 'container';
    content.appendChild(contentHolder);

    posts.forEach((post) => {
      let subContent = document.createElement('div');
      subContent.className = 'subContent';
      contentHolder.appendChild(subContent);

      subContent.addEventListener('click', goToLink);

      function goToLink() {
        window.open(post.data.url, '_blank');
      }

      if (post.data.thumbnail !== 'self') {
        let subImg = document.createElement('div');
        subImg.className = 'subImg';
        subContent.appendChild(subImg);

        let imgHere = document.createElement('img');
        imgHere.className = 'redditImage';
        imgHere.src = post.data.thumbnail;
        imgHere.onerror = function() {
          imgHere.src = 'http://trifectaecosystems.com/wp-content/uploads/2015/04/snoo-300x208.jpg';
        };
        subImg.appendChild(imgHere);
      }

      let titleDiv = document.createElement('div');
      titleDiv.className = 'title';
      titleDiv.innerHTML = post.data.title;
      subContent.appendChild(titleDiv);

      let statsDiv = document.createElement('div');
      statsDiv.className = 'stats';
      subContent.appendChild(statsDiv);

      let author = document.createElement('div');
      author.className = 'author statsItem';
      author.innerHTML = post.data.author;
      statsDiv.appendChild(author);

      let dot = document.createElement('div');
      dot.className = 'statDot statsItem';
      dot.innerHTML = '&#8226';
      statsDiv.appendChild(dot);

      function timeSince(date) {
        return moment(date).fromNow();
      }

      let timelapse = document.createElement('div');
      timelapse.className = 'timelapse statsItem';
      timelapse.innerHTML = timeSince(post.data.created * 1000);
      statsDiv.appendChild(timelapse);

      let dot2 = document.createElement('div');
      dot2.className = 'statDot statsItem';
      dot2.innerHTML = '&#8226';
      statsDiv.appendChild(dot2);

      let score = document.createElement('div');
      score.className = 'score statsItem';
      score.innerHTML = `${post.data.score} upvotes`;
      statsDiv.appendChild(score);

      let selfText = document.createElement('div');
      selfText.className = 'selfText';
      selfText.innerHTML = post.data.selftext;
      subContent.appendChild(selfText);
    });
  }

  let subRedditReq = new XMLHttpRequest();
  subRedditReq.addEventListener('load', subRedditReqListener);
  subRedditReq.addEventListener('error', subRedditErrorHandler);
  subRedditReq.open('GET', `https://www.reddit.com/r/${subreddit}.json`);
  subRedditReq.send();
}

logo.addEventListener('click', refreshContent);

function refreshContent() {
  getData(lastSubreddit);
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

function goSearchReddit() {
  let getInput = document.querySelector('.searchInput');
  getData(getInput.value);
}
