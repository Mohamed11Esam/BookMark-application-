var bookMarkNameInput = document.getElementById("bookMarkName");
var siteUrlInput = document.getElementById("siteUrl");
var close = document.getElementById("close");
var overlay = document.getElementById("overlay");
var bookMarkList = [];

if (localStorage.getItem("bookMarkContainer") !== null) {
  bookMarkList = JSON.parse(localStorage.getItem("bookMarkContainer"));
  displayBookMark();
}

function addBookMark() {
  if (isValidBookmarkName() && isValidUrl()) {
    var bookMark = {
      bookMark_name: bookMarkNameInput.value.trim(),
      bookMark_url: ensureUrlProtocol(siteUrlInput.value.trim()),
    };

    if (isBookmarkNameTaken(bookMark.bookMark_name)) {
      overlay.classList.remove("d-none");
      return;
    }

    bookMarkList.push(bookMark);

    localStorage.setItem("bookMarkContainer", JSON.stringify(bookMarkList));
    displayBookMark();
    clearForm();
  } else {
    overlay.classList.remove("d-none");
  }
}

function clearForm() {
  bookMarkNameInput.value = null;
  siteUrlInput.value = null;
}

function displayBookMark() {
  var cartona = "";
  for (let i = 0; i < bookMarkList.length; i++) {
    cartona += `
                <tr>
                    <th>${i + 1}</th>
                    <th>${bookMarkList[i].bookMark_name}</th>
                    <th>
                     <a href="${
                       bookMarkList[i].bookMark_url
                     }" target="_blank" class="btn btn1">
                        <i class="fa-solid fa-eye pe-1"></i> Visit
                      </a>
                    </th>
                    <th>
                      <button onclick="deleteBookMarkt(${i})" class="btn btn2">
                        <i class="fa-solid fa-trash-can pe-1"></i>Delete
                      </button>
                    </th>
                  </tr>
                `;
  }
  document.getElementById("tableContent").innerHTML = cartona;
}
function deleteBookMarkt(index) {
  bookMarkList.splice(index, 1);
  localStorage.setItem("bookMarkContainer", JSON.stringify(bookMarkList));
  displayBookMark();
}

function isValidBookmarkName() {
  var term = bookMarkNameInput.value;
  var nameRegex = /^[a-zA-Z][a-zA-Z0-9-_ ]{2,49}$/;
  if (nameRegex.test(term)) {
    bookMarkNameInput.classList.add("is-valid");
    bookMarkNameInput.classList.remove("is-invalid");
    return true;
  } else {
    bookMarkNameInput.classList.remove("is-valid");
    bookMarkNameInput.classList.add("is-invalid");
    return false;
  }
}

function isValidUrl() {
  var term = siteUrlInput.value;
  var urlRegex =
    /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]{1,63}\.)+[a-zA-Z]{2,6}(\/.*)?$/;
  if (urlRegex.test(term)) {
    siteUrlInput.classList.add("is-valid");
    siteUrlInput.classList.remove("is-invalid");
    return true;
  } else {
    siteUrlInput.classList.remove("is-valid");
    siteUrlInput.classList.add("is-invalid");
    return false;
  }
}

function closeOverlay() {
  overlay.classList.add("d-none");
}

function ensureUrlProtocol(url) {
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    return "https://" + url;
  }
  return url;
}

function isBookmarkNameTaken(name) {
  return bookMarkList.some(
    (bookmark) => bookmark.bookMark_name.toLowerCase() === name.toLowerCase()
  );
}
