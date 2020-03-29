"use strict";

// Listen for form submit

document.getElementById("myForm").addEventListener("submit", saveBookmark);

function saveBookmark() {
  // placed all the form input fields into variables
  let siteName = document.getElementById("siteName").value;
  let siteURL = document.getElementById("siteURL").value;

  // if the form has been filled out execute. if not dont execute
  if (validateForm(siteName, siteURL)) {
    // Each bookmark(the website name and the website url) is going to be placed in an object bookMark

    // bookMark
    let bookMark = {
      websiteName: siteName,
      websiteURL: siteURL
    };

    // All the bookmarks are going to be placed in a bookmarks array

    // First I shall to have check if the bookmarks array exists in the local Storage, if it does not i will have to create a bookmarks array and push our bookmarks to it then save it to localStorage

    if (localStorage.getItem("bookMarks") === null) {
      // init the array
      let bookMarks = [];

      // add bookMark to the array
      bookMarks.push(bookMark);

      // save bookMarks to localStorage
      localStorage.setItem("bookMarks", JSON.stringify(bookMarks));
    } else {
      // get the bookmarks from localStorage
      let bookMarks = JSON.parse(localStorage.getItem("bookMarks"));

      // add bookMark to the array
      bookMarks.push(bookMark);

      // save bookMarks to localStorage
      localStorage.setItem("bookMarks", JSON.stringify(bookMarks));
    }
  }

  // form reset
  document.getElementById("myForm").reset();

  // prevent default
  e.preventDefault();
}

// fetch and output bookmarks
function outputBookMarks() {
  if (!(localStorage.getItem("bookMarks") === null)) {
    // get the bookmarks from local storage
    let bookMarks = JSON.parse(localStorage.getItem("bookMarks"));

    // bookMarks output
    let bookMarkerOutput = document.getElementById("bookMarkerResults");

    bookMarkerOutput.innerHTML = "";

    // looping through the array as we output them
    for (let i = 0; i < bookMarks.length; i++) {
      // bookmark
      let bookMark = bookMarks[i];

      // assigning the website name and url to variables
      let websiteName = bookMark.websiteName;
      let websiteURL = bookMark.websiteURL;

      // outputting the bookmarks on the UI
      bookMarkerOutput.innerHTML +=
        '<div class="card bg-gray mb-3">' +
        '<div class="card-body">' +
        '<h4 class="d-inline-block font-weight-light mr-3">' +
        websiteName +
        "</h4>" +
        "<a class='btn btn-sm mr-2' href=' " +
        websiteURL +
        " ' target='_blank'>" +
        "Visit" +
        "</a>" +
        "<button onclick='deleteBookMark(\"" +
        websiteURL +
        "\")' class='btn btn-sm bg-danger text-light'>" +
        "Delete" +
        "</button>" +
        "</div>";
    }
  }
}

// delete bookmark
function deleteBookMark(websiteURL) {
  // get bookmarks from localStorage
  let bookMarks = JSON.parse(localStorage.getItem("bookMarks"));

  // looping through the array to find the bookmark that has the url
  // that matches the url passed in
  for (let i = 0; i < bookMarks.length; i++) {
    let bookMark = bookMarks[i];

    // grabbing websiteUrl from the bookMark(object)
    let loopedsiteURL = bookMark.websiteURL;

    if (loopedsiteURL === websiteURL) {
      // deleting one item from the array
      bookMarks.splice(i, 1);

      // reset localStorage
      localStorage.setItem("bookMarks", JSON.stringify(bookMarks));
    }
  }

  // output bookmarks again
  outputBookMarks();
}

// validate form
function validateForm(siteName, siteURL) {
  // checking to see if the form has been filled out. if has not display an alert. if has return false
  if (!siteName || !siteURL) {
    alert("Please fill in the form");
    return false;
  }

  let expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;

  let regex = new RegExp(expression);

  if (!siteURL.match(regex)) {
    alert("Please use a valid URL");
    return false;
  }

  return true;
}
