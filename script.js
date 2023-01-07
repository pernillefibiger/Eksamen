(() => {
  // Skift farve på burger og X
  const menuColor = "#4d4b4b";
  // Skift farve på kassen rundt om
  const boxColor = "#F0F0EF";
  // Hvornår skal den komme frem f.eks. 600 eller der under
  const mediaQuery = "1000";
  // Hvordan skal menupunkter være align'et (left center right)
  const alignMenu = "center";
  // Hvor meget margin i top af den menu der kommer frem f.eks. 1rem
  const marginTopMenu = "1rem";

  const nav = document.querySelector("nav:where(header *)");
  if (!nav) return;
  const breakpoint = nav.dataset.showBtnBelow || mediaQuery;
  const mobileMQ = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
  const iconClose = "M18 6L6 18M6 6l12 12";
  const iconMenu = "M4 12h16M4 6h16M4 18h16";

  const svg = (d) => `<svg viewBox="0 0 24 24" width="24" height="24">
      <path fill="none" stroke="${menuColor}" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="${d}"></path>
    </svg>`;

  const btn = document.createElement("button");
  btn.setAttribute("aria-expanded", false);
  btn.setAttribute("aria-label", "Vis menu");
  btn.innerHTML = svg(iconMenu);
  nav.prepend(btn);

  btn.addEventListener("click", clickHandler);

  function clickHandler() {
    let expanded = this.getAttribute("aria-expanded") === "true" || false;

    this.setAttribute("aria-expanded", !expanded);
    this.setAttribute("aria-label", !expanded ? "Skjul menu" : "Vis menu");

    this.innerHTML = svg(!expanded ? iconClose : iconMenu);
  }

  const handleMobileChange = ({ matches }) => {
    btn.hidden = matches ? false : true;
    nav.dataset.menuBtnShown = matches ? true : false;
  };

  mobileMQ.addListener(handleMobileChange);

  handleMobileChange(mobileMQ);

  const injectCSS = (css) => {
    const style = document.createElement("style");
    style.innerText = css;
    document.head.appendChild(style);
    return style;
  };
  injectCSS(`\
      [hidden] {display: none !important;}\
      [aria-expanded="false"]:not([hidden]) + ul { display: none; }\
      header { flex-wrap: wrap; }\
      nav[data-menu-btn-shown="true"] { display: contents; }\
      nav:only-child, nav:only-child button { margin-inline-start: auto; }\
      [aria-expanded="true"]:not([hidden]) + ul { flex-flow: column; flex-basis: 100%; margin-top: ${marginTopMenu}}\
      li { text-align: ${alignMenu}; }\
      button[aria-expanded] {\
        background: unset;\
        border: 2px solid ${boxColor};\
        box-sizing: border-box;\
        border-radius: 6px;\
        inline-size: 36px;\
        block-size: 36px;\
        padding: .25rem;\
        cursor: pointer;\
      }\
      svg {\
        display: block;\
        inline-size: 100%;\
        block-size: 100%;\
      }\
    `);
})();
