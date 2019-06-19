import { request } from 'graphql-request';
import * as psl from 'psl';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

const query = `{
    hn {
      topStories(limit: 30) {
        id
        type,
        by {
          id
          created
          about
        },
        time,
        timeISO,
        text,
        dead,
        url,
        score,
        title,
        descendants
      }
    }
  }`

request('https://www.graphqlhub.com/graphql', query).then((data) => {
  let container = document.getElementById('main-stories');
  TimeAgo.addLocale(en);
  const timeAgo = new TimeAgo('en-ZA');
  data.hn.topStories.forEach((element,index) => {
    let parsedUrl = new URL(element.url);
    let domain = psl.get(parsedUrl.hostname);
    let date = new Date(element.timeISO);
    let story = document.createElement('div');
    story.classList = 'story';
    story.innerHTML = `
        <div class="sn muted">
            <span>${index+1}.</span>
            <span class="caret small">▲</span>
        </div>
        <div class="content">
            <div class="title">
                <a href="javascript:void(0)">${element.title}</a> 
                <span class="muted small">(<a href="javascript:void(0)">${domain}</a>)</span>
            </div>
            <div class="desc muted small">
            ${element.score} points by <a href="javascript:void(0)">${element.by.id}</a> <a href="javascript:void(0)">${timeAgo.format(date)}</a> | <a href="javascript:void(0)">hide</a> | <a href="javascript:void(0)">${parseInt(element.descendants)} comments</a>
            </div>
        </div>
    `;

    container.appendChild(story);
  });
  let lastStory = document.createElement('div');
  lastStory.classList = 'story';
  lastStory.innerHTML = `
      <div class="sn muted">
      </div>
      <div class="content">
          <div class="title">
              <a href="javascript:void(0)">More</a>
          </div>
      </div>
  `;
  container.appendChild(lastStory);

});