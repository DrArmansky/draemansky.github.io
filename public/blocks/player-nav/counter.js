
function Counter() {
    this.el = {
        navElCount: document.querySelector('.player-nav__item--elects .player-nav__item-counter'),
        playerItem: document.querySelectorAll('.player__item'),
        btnLike: document.querySelectorAll('.heart-like')
    }


    this.__proto__.countElect = function() {
        let count = 0;
        builder.each(this.el.playerItem, (item) => {
            if (item.matches('[elect]')) {
                count++;
                return count;
            }
        })
        this.el.navElCount.innerHTML = count;
    }

    this.__proto__.countLiked = function() {
        builder.each(this.el.btnLike, (item) => {
            item.addEventListener('click', (e) => {
                let count = 0;
                builder.each(this.el.playerItem, (item) => {
                    if (item.matches('[elect]')) {
                        count++;
                        return count;
                    }
                })
                this.el.navElCount.innerHTML = count;
            })
        })
    }

    this.countElect();
    this.countLiked();
}

builder.counter = new Counter();
