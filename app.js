/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
 */

/**
 * Define Global Variables
 *
 */
const sections = document.getElementsByTagName("section");
const ul = document.getElementById("navbar__list");
let anchors = ul.getElementsByClassName("menu__link");
const MIN_HEIGHT = -(sections[0].clientHeight / 2);
const MAX_HEIGHT = sections[0].clientHeight / 2;
const tXt1 =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod.";
const txt2 =
  "Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam. Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum consectetur porttitor. Suspendisse imperdiet porttitor tortor, eget elementum tortor mollis non.";
let menuOpen = false;
let hideMenuTitle = false;

/**
 *
 * End Global Variables
 * Begin Main Functions
 *
 */

// Build menu
// build the nav
const fragment = document.createDocumentFragment();
for (const section of sections) {
  const link = document.createElement("li");
  const anchor = document.createElement("a");
  anchor.textContent = section.getAttribute("data-nav");
  anchor.href = `#${section.id}`;
  anchor.classList.add("menu__link");
  anchor.addEventListener("click", (e) => {
    if (menuOpen) {
      ul.style.height = MAX_H + "px";
      hideMenuTitle = hideMenuSection(hideMenuTitle);
      menuOpen = false;
    }
  });
  link.appendChild(anchor);
  fragment.appendChild(link);
}
ul.appendChild(fragment);
scrollSmooth();

const MAX_H = ul.getElementsByTagName("li")[0].offsetHeight;
// Scroll to anchor ID using scrollTO event

/**
 *
 * End Main Functions
 * Start Helper Functions
 *
 */

function heightMenu() {
  const links = document.getElementsByTagName("li");
  return `${(1 + links.length) * MAX_H}px`;
}

function hideMenuSection(hide) {
  const links = ul.getElementsByTagName("li");
  if (hide) {
    for (let i = 0; i < links.length; i++) {
      setTimeout(() => {
        links[i].style.opacity = "0";
      }, 0);
    }
    return false;
  } else {
    for (let i = 0; i < links.length; i++) {
      setTimeout(() => {
        links[i].style.opacity = "1";
      }, 1000);
    }
    return true;
  }
}

function menu() {
  if (menuOpen) {
    ul.style.height = MAX_H + "px";
    hideMenuTitle = hideMenuSection(hideMenuTitle);
    menuOpen = false;
  } else {
    ul.style.height = heightMenu();
    hideMenuTitle = hideMenuSection(hideMenuTitle);
    menuOpen = true;
  }
}

/**
 *
 * End Helper Functions
 * Begin Events
 *
 */

// Scroll to section on link click
function scrollSmooth() {
  anchors = ul.getElementsByClassName("menu__link");
  for (let i = 0; i < anchors.length; i++) {
    anchors[i].addEventListener("click", (e) => {
      e.preventDefault();
      sections[i].scrollIntoView({ behavior: "smooth" });
    });
  }
}
// Add class 'active' to section when near top of viewport
// Set sections as active
window.addEventListener("scroll", (e) => {
  for (let i = 0; i < sections.length; i++) {
    const top = sections[i].getBoundingClientRect().top;
    if (top < MAX_HEIGHT && top >= MIN_HEIGHT) {
      sections[i].classList.add("your-active-class");
      anchors[i].classList.add("active-link");
    } else {
      sections[i].classList.remove("your-active-class");
      anchors[i].classList.remove("active-link");
    }
  }
  const top = document.body.getBoundingClientRect().top;
  const btn = document.getElementById("btn__back");

  if (top <= -100) {
    btn.style.animationName = "btnBackShow";
  } else if (btn.style.animationName === "btnBackShow") {
    btn.style.animationName = "btnBackHide";
  }
});

// button for open main for section on mobile
const btnMain = document.getElementsByClassName("menu__section")[0];
btnMain.innerHTML = '<i class="fas fa-bars"></i>';
btnMain.addEventListener("click", (e) => {
  menu();
});

// button for add new section
const text = document.createElement("p");
text.innerHTML = '<i class="fas fa-plus"></i>';
const btn = document.getElementsByClassName("create__section")[0];
btn.addEventListener("click", function () {
  if (
    ul.clientWidth < document.body.clientWidth * (2 / 3) &&
    ul.getElementsByTagName("li").length < 10
  ) {
    // to create setion with h2 and div and two paragraph
    const section = document.createElement("section");
    section.id = `section${sections.length + 1}`;
    section.appendChild(document.createElement("div"));
    section.firstElementChild.appendChild(document.createElement("h2"));
    section.firstElementChild.appendChild(document.createElement("p"));
    section.firstElementChild.appendChild(document.createElement("p"));
    section.firstElementChild.firstElementChild.textContent = `Section ${
      sections.length + 1
    }`;
    section.firstElementChild.classList.add("landing__container");
    section.firstElementChild.getElementsByTagName("p")[0].textContent = tXt1;
    section.firstElementChild.getElementsByTagName("p")[1].textContent = txt2;

    // to create list and anchor in nav
    const link = document.createElement("li");
    const anchor = document.createElement("a");
    anchor.textContent = `Section ${sections.length + 1}`;
    anchor.href = `#${section.id}`;
    anchor.classList.add("menu__link");
    anchor.addEventListener("click", (e) => {
      if (menuOpen) {
        ul.style.height = MAX_H + "px";
        hideMenuTitle = hideMenuSection(hideMenuTitle);
        menuOpen = false;
      }
    });
    link.appendChild(anchor);
    ul.appendChild(link);
    if (menuOpen) {
      ul.style.height = heightMenu();
      setTimeout(() => {
        link.style.opacity = "1";
      }, 500);
    }
    scrollSmooth();

    //  get element that contanier sections
    const main = document.getElementsByTagName("main")[0];
    main.appendChild(section);
  }
});
btn.appendChild(text);

// make btn to return to start page
const backBTN = document.getElementById("btn__back");
backBTN.addEventListener("click", (e) => {
  e.preventDefault();
  document.body.scrollIntoView({ behavior: "smooth" });
});
