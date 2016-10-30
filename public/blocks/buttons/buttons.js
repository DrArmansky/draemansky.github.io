function Buttons() {
    this.el = {
        likes: document.querySelectorAll('.heart-like'),
        arrow: document.querySelector('.arrow-button'),
        cancel: document.querySelector('.cancel-button'),
        menu: document.querySelector('.menu-button'),
        player: document.querySelector('.player'),
        playerItem: document.querySelectorAll('.player__item'),
        playerControl: document.querySelector('.player-header__main-header'),
        playerNav: document.querySelector('.player-nav'),
        navItemEl: document.querySelector('.player-nav__item--elects'),
        playerLogin: document.querySelector('.player-header__login-header'),
        login: document.querySelector('.login-button'),
        popup: document.querySelector('.popup'),
        field: document.querySelector('.search-field'),
        cancelSearch: document.querySelector('.cancel-button--search'),
        cancelPopup: document.querySelector('.cancel-button--popup'),
        panelSearch: document.querySelector('.search-panel'),
        search: document.querySelector('.search-button'),
        header: document.querySelector('.player-header'),
    }

    this.__proto__.like = function() {
        builder.each(this.el.likes, (item) => {
            item.addEventListener('click', (e) => {
                e.target.closest('.heart-like').classList.toggle("appearance");

                let playerItem = item.parentNode.parentNode;
                let itemName = playerItem.querySelector('.player__item-name span');

                if (playerItem.matches("[elect]")) {
                    playerItem.removeAttribute('elect');
                    localStorage.removeItem(itemName.innerHTML, 'elect');
                } else {
                    playerItem.setAttribute('elect', '');
                    localStorage.setItem(itemName.innerHTML, 'elect');
                }

                let count = 0;
                builder.each(this.el.playerItem, (item) => {
                    if (item.matches('[elect]')) {
                        count++;
                        return count;
                    }
                })
                if (count > 0) {
                    this.el.navItemEl.style.display = "flex";
                } else {
                    this.el.navItemEl.style.display = "none";
                }
            })
        })
    }

    this.__proto__.arrow = function () {


        this.el.arrow.addEventListener('click', (e) => {
            this.el.player.classList.remove("show");
            this.el.playerControl.classList.remove("show");
            this.el.playerNav.classList.remove("trip");
            this.el.playerLogin.classList.remove("trip");
        })
    }

    this.__proto__.menu = function() {
        this.el.menu.addEventListener('click', (e) => {
            this.el.player.classList.add("show");
            this.el.playerControl.classList.add("show");
            this.el.playerNav.classList.add("trip");
            this.el.playerLogin.classList.add("trip");
        })
    }

    this.__proto__.login = function() {
        this.el.login.addEventListener('click', (e) => {
            this.el.popup.classList.remove("hidden");
            setTimeout(() => {
                this.el.popup.classList.add("appearance");
            });
        })
    }

    this.__proto__.cancel = function() {
        this.el.cancelSearch.addEventListener('click', (e) => {
            this.el.panelSearch.classList.remove('appearance');
            setTimeout(() => {
                this.el.panelSearch.classList.add('hidden');
            }, 500);
            builder.each(this.el.playerItem, (item) => {
                item.classList.remove('slowhide')
                item.style.display = "block";
            })
            this.el.field.value = "";
        })

        window.addEventListener("keydown", (e) => {
            if (e.keyCode == 27) {
                this.el.panelSearch.classList.remove('appearance');
                setTimeout(() => {
                    this.el.panelSearch.classList.add('hidden');
                }, 500);
                builder.each(this.el.playerItem, (item) => {
                    item.classList.remove('slowhide')
                    item.style.display = "block";
                })
                this.el.field.value = "";
            }
        })


        this.el.cancelPopup.addEventListener("click", (e) => {
            this.el.popup.classList.remove("appearance");
            setTimeout (() => {
                this.el.popup.classList.add("hidden");
            },500);
        })
    }

    this.__proto__.search = function() {
        this.el.search.addEventListener('click', (e) => {
            this.el.panelSearch.classList.remove("hidden");
            setTimeout(() => {
                this.el.panelSearch.classList.add("appearance")
            }, 200);
            this.el.field.focus();
        })
    }

    this.like();
    this.arrow();
    this.menu();
    this.login();
    this.cancel();
    this.search();
}


// btnSearch.addEventListener("click", function(event) {
//     panelSearch.classList.remove("hidden");
//     setTimeout(() => {
//       panelSearch.classList.add("appearance")
//   }, 200);
// });

builder.buttons = new Buttons;
