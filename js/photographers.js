

let likes = {};

function loadLikes() {
    likes = JSON.parse(localStorage.getItem("likes")) || {};
    for (let id in likes){
        if (likes[id]){
            const element= document.querySelector("[data-id=" + id + "]");
            const likeButton = element.querySelector(".like-button");
            likeItem(likeButton);
        }
    }
}
loadLikes();

// mark the liked item
function likeItem (item) {
    let id = item.parentElement.getAttribute("data-id");
    item.classList.toggle("fa-solid");
    if (item.classList.contains("fa-solid")){
        likes[id] = true;
    } else {
        likes[id] = false;
    }
    localStorage.setItem("likes", JSON.stringify(likes));
}

let comments = {};

function loadComments () {
    comments = JSON.parse(localStorage.getItem('comments')) || {}; 
}

// when "Post comment" button is clicked, the content is pushed into an <ul> below the textarea
function addComment () {
    let newComment = document.getElementById('comment-text').value;
    if (currentCommentId) {
        if (!(currentCommentId in comments)) {
            comments[currentCommentId] = [];
        }
        // push every comment for the same "article" in the comments object
        comments[currentCommentId].push({
            content: newComment,
            date: new Date()
        });
    }
    localStorage.setItem('comments', JSON.stringify(comments));
    createCommentSection(currentCommentId);
    updateCommentCount();
    // empty the textarea after the comment is published
    document.getElementById('comment-text').value = "";
}

function createCommentSection (comment) {
    loadComments();
    const commentSection = document.getElementById('comment-section');
    commentSection.innerHTML = "";
    const ul = document.createElement('ul');
    const commentsToShow = comments[comment] || [];
    console.log(comments);
    for (comment of commentsToShow) {
        const li = document.createElement('li');
        li.innerText = "Commented on " + (new Date(comment.date)).toLocaleDateString() + ": " + comment.content;
        ul.appendChild(li);
    }
    commentSection.appendChild(ul);
}

let currentCommentId = null;

// display modal with textarea for comments
function showCommentModal (comment) {
    currentCommentId = comment.parentElement.getAttribute('data-id');
    createCommentSection(currentCommentId);
    $('#comment-modal').modal({});
}

// count the number of the comments 
function updateCommentCount () {
    loadComments();
    for (article in comments) {
        const commentCount = comments[article].length;
        const element = document.querySelector("[data-id=" + article + "]");
        const countSpan = element.querySelector(".comment-count");
        const commentButton = element.querySelector(".comment-button");
        // show the number only if at least 1 comment exists
        if (commentCount > 0) {
            countSpan.innerText = commentCount;
            commentButton.classList.add("fa-solid");
        }
    }
}
updateCommentCount();

let bookmarks = {};

function loadBookmarks() {
    bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || {};
    for (let id in bookmarks){
        if (bookmarks[id]){
            const element= document.querySelector("[data-id=" + id + "]");
            const saveButton = element.querySelector(".save-button");
            saveButton.classList.add("fa-solid");
        }
    }
}
loadBookmarks();

// mark items as saved and save the status to local storage
function markSavedItem (save) {
    let id = save.parentElement.getAttribute("data-id");
    save.classList.toggle("fa-solid");
    if (save.classList.contains("fa-solid")){
        bookmarks[id] = true;
    } else {
        bookmarks[id] = false;
    }
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    // display modal with the number of saved articles
    showBookmarkModal(save);
}

// count the number of bookmarks
function countSavedItems () {
    let count = 0;
    for (let id in bookmarks) {
        if (bookmarks[id]) {
            count++;
        }
    }
    return count;
}

// display modal with the number of saved articles
function showBookmarkModal (save) {
    // show the modal only when the user wants to save an article for later
    if (save.classList.contains("fa-solid")){
        const count = countSavedItems();
        const paragraph = document.getElementById("number-of-bookmarks");
        paragraph.innerHTML = `You have ${count} article(s) saved for later.<br> <a href="./bookmarks.html">See your saved articles</a>`;
        $('#bookmark-modal').modal({});
    }
}