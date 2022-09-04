const logo = document.getElementById("logo");

export function changeHeader() {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        logo.style.height = "40px";
    } else {
        if (window.innerWidth < 1200) {
            logo.style.height = "60px";
        } else {
            logo.style.height = "70px";
        }
    }
}

const toTopBtnDesktop = document.getElementById("to-top-btn-desktop");

toTopBtnDesktop.style.display = "none";

toTopBtnDesktop.addEventListener("click", () => {
    window.scrollTo({top: 0, behavior: 'smooth'});
});

export function scrollFunctionDesktop() {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        toTopBtnDesktop.style.display = "block";
    } else {
        toTopBtnDesktop.style.display = "none";
    }
}

const toTopBtnMobile = document.getElementById("to-top-btn-mobile");

toTopBtnMobile.style.display = "none";

toTopBtnMobile.addEventListener("click", () => {
    window.scrollTo({top: 0, behavior: "smooth"});
});

export function scrollFunctionMobile() {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        toTopBtnMobile.style.display = "block";
    } else {
        toTopBtnMobile.style.display = "none";
    }
}