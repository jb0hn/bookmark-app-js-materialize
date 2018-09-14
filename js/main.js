function saveBookmark(event) {
  /* method getElementsByName returns a collection (i.e. a set of multiple elements) instead of a single DOM element (as, for example, getElementById does). That's why we need to pass [0] before .value */

  // get form values
  var siteName = document.getElementsByName('siteName')[0].value;
  var siteURL = document.getElementsByName('siteURL')[0].value;

 // create bookmark object
  var bookmark  = {
    name: siteName,
    url: siteURL
  }

  // test if there's sth in local storage
  if (localStorage.getItem('bookmarks') === null) {
    // the local storage is empty

    // init empty array to store bookmarks
    var bookmarks = [];

    // add submited bookmark to array
    bookmarks.push(bookmark);

    /* When storing data, the data has to be a certain format, and regardless of where you choose to store it, text is always one of the legal formats.
    JSON makes it possible to store JavaScript objects as text. */

    // set bookmarks  to local storage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  } else {
    // there is sth in local STORAGE

    // retrive bookmarks from the local storage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    // add submited bookmark to array
    bookmarks.push(bookmark);

    // set bookmarks back to local storage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  }

  // clear the form fields after the sending
  document.getElementById('bookmark-form').reset();

  // required to work properly in Chrome
  // prevent form from submiting
  event.preventDefault();

  // reload element displaying bookmarks
  displayBookmarks();
}


function clearBookmarks() {
  // retrive bookmarks from the local storage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

  // test if local storage is empty
  if (Array.isArray(bookmarks) && bookmarks.length) {
    // there is sth in local storage
    // ask user to confirm action
     if (window.confirm("Do you really want to delete all bookmarks?")) {
       // delete all bookmarks
       localStorage.removeItem('bookmarks');
     }
  } else {
    window.alert('There\'s nothing to delete');
  }

  // reload element displaying bookmarks
  displayBookmarks();
}


function deleteBookmark(name) {
  // retrive bookmarks from the local storage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

  // loop through the bookmarks looking for the bookmark with desirable name to delete
  for (var i = 0; i < bookmarks.length; i++) {
    if (bookmarks[i].name === name) {
      // bookmark is found

      // delete the bookmark form the bookmarks array
      bookmarks.splice(i, 1);
      break;
    }
  }
  // set bookmarks back to local storage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  // reload element displaying bookmarks
  displayBookmarks();
}


function displayBookmarks() {
  // retrive bookmarks from the local storage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

  // element in which the bookmarks will be displayed
  var bookmarksResults = document.getElementById('bookmarks-results');

  bookmarksResults.innerHTML = '';

  for (var i = 0; i < bookmarks.length; i++) {
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;

    bookmarksResults.innerHTML += '<div class="collection-item center">' +
    '<a class="deep-purple-text text-darken-3" href=' +
    url +
    ' target="_blank">' +
    '<h5>' +
    name +
    '</h5>' +
    '</a>' +
    '<a class="btn-small waves-effect waves-light deep-purple darken-3" href=' +
    url +
    ' target="_blank"><i class="material-icons small">open_in_new</i></a>' +
    '</a>' +
    '<a id="clear-bookmarks" class="btn-small waves-effect waves-light red" onclick="deleteBookmark(\'' +
    name +
    '\')"><i class="material-icons small">delete</i></a>' +
    '</div>'
    ;
  }
}



// the saveBookmark function shouldn't have curly brackets int this case
// because it will turn it immediately after the page is load
document.getElementById('bookmark-form').addEventListener('submit', saveBookmark);

document.getElementById('clear-bookmarks').addEventListener('click', clearBookmarks);
