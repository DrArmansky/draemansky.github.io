function Show() {
    this.el = {
        navItemAll: document.querySelector('.player-nav__item--all'),
        navItemEl: document.querySelector('.player-nav__item--elects'),
        navItemGr: document.querySelectorAll('.player-nav__item--group'),
        playerItem: document.querySelectorAll('.player__item'),
        playerControl: document.querySelector('.player-header__main-header'),
        playerNav: document.querySelector('.player-nav'),
        playerLogin: document.querySelector('.player-header__login-header'),
        player: document.querySelector('.player'),
        navElCount: document.querySelector('.player-nav__item--elects .player-nav__item-counter'),
    }

    this.__proto__.showAll = function() {
        this.el.navItemAll.addEventListener('click', (e) => {
            builder.each(this.el.playerItem, (item) => {
                item.style.display = "block";
            })
            this.el.player.classList.remove("show");
            this.el.playerControl.classList.remove("show");
            this.el.playerNav.classList.remove("trip");
            this.el.playerLogin.classList.remove("trip");
        })
    }

    this.__proto__.showElects = function() {
        if (document.querySelector('[elect]')) {
            this.el.navItemEl.style.display = "flex";
        }
        this.el.navItemEl.addEventListener('click', (e) => {
            builder.each(this.el.playerItem, (item) => {
                if (item.matches("[elect]")) {
                    item.style.display = "block";
                    this.el.player.classList.remove("show");
                    this.el.playerControl.classList.remove("show");
                    this.el.playerNav.classList.remove("trip");
                    this.el.playerLogin.classList.remove("trip");
                } else {
                    item.style.display = "none";
                }
            })
        })
    }

    this.__proto__.showGroup = function() {
        builder.each(this.el.navItemGr, (item) => {
            item.addEventListener('click', (e) => {
                let group = item.getAttribute('data-id');
                builder.each(this.el.playerItem, (item) => {
                    let groupItem = item.getAttribute('data-item-group');
                    if (group == groupItem) {
                        item.style.display = "block";
                        this.el.player.classList.remove("show");
                        this.el.playerControl.classList.remove("show");
                        this.el.playerNav.classList.remove("trip");
                        this.el.playerLogin.classList.remove("trip");
                    } else {
                        item.style.display = "none";
                    }
                })
            })
        })

    }

    this.showGroup();
    this.showElects();
    this.showAll();
}

builder.show = new Show();
