class MenuScroll {
    constructor(menuMain, mainMenuWindow) {
        this.menuMain = document.querySelector(menuMain);
        this.mainMenuWindow = mainMenuWindow;
        this.styleCSSOne = "background-color: #FFF; box-shadow: 0 10px 15px rgba(0,0,0,.9);  transition: 1s";
        this.styleCSSTwo = "background-color: #FFF;";
        this.top = "";
        this.height = "";
        this.scrollMenuMain = this.scrollMenuMain.bind(this);
    }

    scrollMenuMain() {

        this.top = this.mainMenuWindow.scrollY;

        if (this.top > 100) {
            this.menuMain.style.cssText = this.styleCSSOne;
        } else {
            this.menuMain.style.cssText = this.styleCSSTwo;
        }

    }

    setListeners() {
        this.mainMenuWindow.addEventListener("scroll", this.scrollMenuMain);
    }


    init() {
        if (this.mainMenuWindow) this.setListeners();
    }

}

class ScrollTop {
    constructor(linkScroll) {
        this.linkScroll = document.querySelector(linkScroll);
        this.scrollToTop = this.scrollToTop.bind(this);
    }

    scrollToTop(e) {
        e.preventDefault();
        const href = this.linkScroll.getAttribute("href");
        const link = document.querySelector(href);

        link.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    };

    setListeners() {
        this.linkScroll.addEventListener("click", this.scrollToTop);
    }


    init() {
        if (this.linkScroll) this.setListeners();
    }
}
