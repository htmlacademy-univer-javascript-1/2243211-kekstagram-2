const DEFAULT_COMMENTS = 5;

const allComments = document.querySelector('.social__comments');
const commentTemplate = document.querySelector('#social__comment')
  .content
  .querySelector('.social__comment');

const commentsCountElement = document.querySelector('.current-comments-count');
const commentsSumElement = document.querySelector('.comments-count');
const btnCommentsLoad = document.querySelector('.comments-loader');

let shownCommentsCount = 0;
let pictureComments = [];

const hideBtnCommentsLoad = () => {
  btnCommentsLoad.classList.add('visually-hidden');
};

const addComments = (comments) => {
  const commentsListFragment = document.createDocumentFragment();
  comments.forEach((comment) => {
    const commentElement = commentTemplate.cloneNode(true);
    commentElement.querySelector('.social__picture').src = comment.avatar;
    commentElement.querySelector('.social__text').textContent = comment.message;
    commentsListFragment.appendChild(commentElement);
  });
  allComments.appendChild(commentsListFragment);
};

const showAllComments = (comments) => {
  pictureComments = comments;

  const commentsSum = pictureComments.length;
  commentsSumElement.textContent = commentsSum.toString();

  if (commentsSum < DEFAULT_COMMENTS) {
    addComments(pictureComments.slice(shownCommentsCount, shownCommentsCount + commentsSum));
    commentsCountElement.textContent = (shownCommentsCount + commentsSum).toString();
    shownCommentsCount = shownCommentsCount + commentsSum;
    hideBtnCommentsLoad();
    return;
  }

  addComments(pictureComments.slice(shownCommentsCount, shownCommentsCount + DEFAULT_COMMENTS));
  commentsCountElement.textContent = (shownCommentsCount + DEFAULT_COMMENTS).toString();
  shownCommentsCount = shownCommentsCount + DEFAULT_COMMENTS;
};

const clearAllComments = () => {
  allComments.innerHTML = '';
  shownCommentsCount = 0;
  pictureComments = [];
  btnCommentsLoad.classList.remove('visually-hidden');
};

const onLoadCommentsClick = (evt) => {
  evt.preventDefault();

  if (shownCommentsCount + DEFAULT_COMMENTS >= pictureComments.length) {
    addComments(pictureComments.slice(shownCommentsCount));
    commentsCountElement.textContent = (pictureComments.length).toString();
    shownCommentsCount = pictureComments.length;
    hideBtnCommentsLoad();
    return;
  }

  addComments(pictureComments.slice(shownCommentsCount, shownCommentsCount + DEFAULT_COMMENTS));
  commentsCountElement.textContent = (shownCommentsCount + DEFAULT_COMMENTS).toString();
  shownCommentsCount = shownCommentsCount + DEFAULT_COMMENTS;
};

btnCommentsLoad.addEventListener('click', onLoadCommentsClick);

export { showAllComments, clearAllComments };
