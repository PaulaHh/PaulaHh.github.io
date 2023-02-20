
let bookmarks = {};

function loadBookmarks() {
    bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || {};
}
loadBookmarks();

function showArticles() {
    for (let id in bookmarks) {
        if (bookmarks[id]) {
            $("[data-id=" + id + "]").show();
        }
    }
}
showArticles();