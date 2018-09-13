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


  // required to work properly in Chrome
  // prevent form from submiting
  event.preventDefault();
}


function clearBookmark() {
  // test if local storage is empty
  if (!(localStorage.getItem('bookmarks') === null)) {
    // there is sth in local storage

    // delete all bookmarks
    localStorage.removeItem('bookmarks');
  }
  // probably required to work properly in Chrome - not tested
  event.preventDefault();
}



// the saveBookmark function shouldn't have curly brackets int this case
// because it will turn it immediately after the page is load
document.getElementById('bookmark-form').addEventListener('submit', saveBookmark);

document.getElementById('clear-bookmarks').addEventListener('click', clearBookmark);
