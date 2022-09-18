import * as contentful from 'contentful';
import Post from './components/Post.js';
import { changeHeader, scrollFunctionDesktop, scrollFunctionMobile } from './animations.js';

const postsRoot = document.getElementById('posts-root');
const searchBar = document.getElementById('search-bar');
const noResultsMsg = document.getElementById('no-results');

async function getPosts() {
    const client = contentful.createClient({
        space: 'abg53jltd4yt',
        accessToken: 'EaC9gapKjDk-_yXqc30A2NBxRIxFNqje-1g-iyjdlXk'
    });

    const entries = await client.getEntries({
        content_type: 'pianoPost'
    });

    return entries.items.map(item => item.fields);
}

const postObjects = (await getPosts()).sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate));
const postElements = postObjects.map(post => new Post(post).render());
const reversedPostElements = [...postElements].reverse();
const postObjToElementMap = mapTwoArrays(postObjects, postElements);

function mapTwoArrays(keys, values) {
    const map = new Map();

    for (let i = 0; i < keys.length; i++) {
        map.set(keys[i], values[i]);
    }

    return map;
}

searchBar.addEventListener('keyup', e => { debounce(e.target.value.toLowerCase()); });

Object.prototype.hasValue = function(value) {
    return Object.values(this).toString().toLowerCase().includes(value);
}

let previousQuery = '';
let debounceTimeout;

function debounce(query, time = 300) {
    if (query.trim() === previousQuery.trim()) return;
    
    clearTimeout(debounceTimeout);

    debounceTimeout = setTimeout(() => {
        updateSearch(query);
    }, time);
}

function updateSearch(query) {
    let hiddenResultCount = 0;
    noResultsMsg.style.display = 'none';

    for (let i = 0; i < postElements.length; i++) {
        postElements[i].style.display = 'block';
    }

    for (let i = 0; i < postObjects.length; i++) {
        if (!postObjects[i].hasValue(query)) {
            postObjToElementMap.get(postObjects[i]).style.display = 'none';
            hiddenResultCount++;
        }
    }

    if (hiddenResultCount === postObjects.length) {
        noResultsMsg.style.display = 'block';
    }

    previousQuery = query;
}

const [newToOldBtn, oldToNewBtn] = document.querySelectorAll('.filter-btn');

let isNewToOld = JSON.parse(localStorage.getItem('isNewToOld')) ?? true;

newToOldBtn.addEventListener('click', () => {
    if (isNewToOld) return;
    renderPosts(true);
});

oldToNewBtn.addEventListener('click', () => {
    if (!isNewToOld) return;
    renderPosts(false);
});

function renderPosts(setToIsNewToOld) {
    (setToIsNewToOld ? postElements : reversedPostElements).forEach(post => {
        postsRoot.appendChild(post);
    });

    if (setToIsNewToOld) {
        newToOldBtn.classList.add('selected');
        oldToNewBtn.classList.remove('selected');
        localStorage.setItem('isNewToOld', JSON.stringify(true));
        isNewToOld = true;
    } else {
        oldToNewBtn.classList.add('selected');
        newToOldBtn.classList.remove('selected');
        localStorage.setItem('isNewToOld', JSON.stringify(false));
        isNewToOld = false;
    }
}

renderPosts(isNewToOld);

window.addEventListener('scroll', () => {
    scrollFunctionDesktop();
    scrollFunctionMobile();
    changeHeader();
});