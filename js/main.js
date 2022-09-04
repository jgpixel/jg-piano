import posts from "./posts.js";
import * as Animations from "./animations.js";

const postsEl = document.getElementById("posts");
const searchBar = document.getElementById("search-bar");

let order = 1; // 0 === old to new, 1 === new to old

const oldToNewBtn = document.getElementById("old-to-new");
const newToOldBtn = document.getElementById("new-to-old");

oldToNewBtn.addEventListener("click", () => {
    if (order === 0) return;

    filterButton(0);
});

newToOldBtn.addEventListener("click", () => {
    if (order === 1) return;

    filterButton(1);
});

function filterButton(type) {
    order = type;
    localStorage.setItem("order", JSON.stringify(order));

    if (order === 0) {
        selectOldToNewButton();
    } else {
        selectedNewToOldButton();
    }

    if (!searchBar.value) {
        loadPosts(posts, order);
    } else {
        updateResults(searchBar.value.toLowerCase());
    }
}

const orderFromLocalStorage = JSON.parse(localStorage.getItem("order"));

if (orderFromLocalStorage === 0 || orderFromLocalStorage === 1) {
    order = orderFromLocalStorage;
    if (order === 0) {
        selectOldToNewButton();
    } else {
        selectedNewToOldButton();
    }
} else {
    order = 1;
    newToOldBtn.classList.add("selected");
}

function selectedNewToOldButton() {
    newToOldBtn.classList.add("selected");
    oldToNewBtn.classList.remove("selected");
}

function selectOldToNewButton() {
    oldToNewBtn.classList.add("selected");
    newToOldBtn.classList.remove("selected");
}

let isNewPost = false;

loadPosts(posts, order);

function loadPosts(arr, order) {
    postsEl.innerHTML = "";
    if (order === 0) {
        for (let i = 0; i < arr.length; i++) {
            createPost(arr, i);
        }
    } else {
        for (let i = arr.length - 1; i >= 0; i--) {
            createPost(arr, i);
        }
    }
}

function createPost(arr, i) {
    let unix = dateToUnix(arr[i].uploadDate);
    if (Math.round((new Date()).getTime() / 1000) - unix <= 1209600) { // 1209600 seconds === 14 days -> if a post was uploaded within 14 days, it is marked as new
        isNewPost = true;
    } else {
        isNewPost = false;
    }

    const titleText = document.createElement("h2");
    const artistText = document.createElement("h3");
    const iframeContainer = document.createElement("div");
    const iframe = document.createElement("iframe");
    const dateText = document.createElement("p");

    postsEl.appendChild(titleText);
        titleText.textContent = arr[i].title;
    postsEl.appendChild(artistText);
        artistText.textContent = arr[i].artist;
    postsEl.appendChild(iframeContainer);
        iframeContainer.classList.add("iframe-container");
    iframeContainer.appendChild(iframe);
        iframeAttributes(iframe, arr[i].link);
    

    // postsEl.innerHTML += (
    //     `<h2>${arr[i].title}</h2>
    //     <h3>${arr[i].artist}</h3>
    //     <div class="iframe-container">
    //         <iframe width="560" height="315" src=${arr[i].link} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    //     </div>
    //     `
    // );

    let date = formatDate(arr[i].uploadDate);

    postsEl.appendChild(dateText);
    dateText.textContent = `Posted on ${date} `;

    if (isNewPost) {
        const newPostSpan = document.createElement("span");

            dateText.classList.add("date-container");
        dateText.appendChild(newPostSpan);
            newPostSpan.classList.add("new-post");
            newPostSpan.textContent = "NEW!";
    }

    // if (isNewPost) {
    //     postsEl.innerHTML += `<p class="date-container">Posted on ${date} <span class="new-post">NEW!</span></p>`;
    // } else {
    //     postsEl.innerHTML += `<p>Posted on ${date}</p>`;
    // }
}

function iframeAttributes(frame, link) {
    const attributes = {"width": "560", "height": "315", "src": link, "title": "YouTube video player",
                        "frameborder": "0", "allow": "accelerometer", "autoplay": "", "clipboard-write": "",
                        "encrypted-media": "", "gyroscope": "", "picture-in-picture": "", "allowfullscreen": ""
                        }
    
                        for (const key in attributes) {
        frame.setAttribute(key, attributes[key]);
    }
}

function formatDate(date) {
    let year = date.substring(0, 4);
    let month = parseInt(date.substring(5, 7));
    let day = parseInt(date.substring(8, 10));

    let newMonth = formatMonth(month);

    let newDay;

    if (day % 10 === 1 && day !== 11) {
        newDay = day + "st";
    } else if (day % 10 === 2 && day !== 12) {
        newDay = day +  "nd";
    } else if (day % 10 === 3 && day !== 13) {
        newDay = day + "rd";
    } else {
        newDay = day +  "th";
    }

    return `${newMonth} ${newDay}, ${year}`;
}

function formatMonth(month) {
    switch (month) {
        case 1:
            return "January";
        case 2:
            return "February";
        case 3:
            return "March";
        case 4:
            return "April";
        case 5:
            return "May";
        case 6:
            return "June";
        case 7:
            return "July";
        case 8:
            return "August";
        case 9:
            return "September";
        case 10:
            return "October";
        case 11:
            return "November";
        default:
            return "December";                     
    }
}

function dateToUnix(date) {
    return Math.floor(new Date(date).getTime() / 1000);
}

const noResults = document.getElementById("no-results");
noResults.style.display = "none";

let enteredText = "";

searchBar.addEventListener("keyup", (e) => {
    if (isInvalidKey(e.key)) return;
    enteredText = searchBar.value.toLowerCase();
    updateResults(enteredText);
});

function isInvalidKey(key) {
    const invalidKeys = ["Enter", "Tab", "ControlLeft", "ControlRight", "Shift", "ShiftRight",
                         "ShiftLeft", "Control", "ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft",
                         "AltLeft", "AltRight", "CapsLock", "Escape", "PageUp", "PageDown"];
    return invalidKeys.includes(key);
}

function mapIndexToDates() {
    const indexToDate = new Map();

    for (let i = 0; i < posts.length; i++) {
        indexToDate.set(i, formatDate(posts[i].uploadDate));
    }

    return indexToDate;
}

function updateResults(text) {
    noResults.style.display = "none";

    const indexToDate = mapIndexToDates();

    let matchedResults = [];
    for (let i = 0; i < posts.length; i++) {
        if (posts[i].title.toLowerCase().includes(text) || posts[i].artist.toLowerCase().includes(text) ||
            inlcudesTag(text, i) || indexToDate.get(i).toLowerCase().includes(text)) {
            matchedResults.push(posts[i]);
        }
    }

    loadPosts(matchedResults, order);

    if (matchedResults.length === 0) {
        noResults.style.display = "block";
    }
}

function inlcudesTag(text, postIndex) {
    for (let i = 0; i < posts[postIndex].tags.length; i++) {
        if (posts[postIndex].tags[i].includes(text)) return true;
    }
}

window.onscroll = () => {
    Animations.scrollFunctionDesktop();
    Animations.scrollFunctionMobile();
    Animations.changeHeader();
}

// TODO: optimize search bar
// TODO: make transition on back to top button