
let bookmarks = {};

function loadBookmarks() {
    bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || {};
}
loadBookmarks();

function showArticles() {
    let shouldHidePlaceholder = false;
    for (let id in bookmarks) {
        if (bookmarks[id]) {
            $("[data-id=" + id + "]").show();
            shouldHidePlaceholder = true;
        }
    }
    if (shouldHidePlaceholder) {
        $("#placeholder").hide();
    }
}
showArticles();