function PLayer () {
    this.el = {
        block: document.querySelectorAll('.player__item'),
        name: document.querySelectorAll('.player__item-name'),
        good: document.querySelector('.good'),
        audio: document.querySelectorAll('.myaudio'),
        bar: document.querySelectorAll('.positionBar'),
        button: document.querySelector('.play-button')
    }

    builder.each(this.el.block, (item) => {
        item.addEventListener('click', (e) => {
            if (e.target.closest('.player__item-like-bg')) return
            if (!this.el.good.checked) {
                builder.each(this.el.audio, (item_audio) => {
                    item_audio.pause()
                    item_audio.currentTime = 0
                })
                setTimeout(() => {
                    this.play(item)
                    this.position(item)
                    this.button(item)
                    this.marquee(item)
                }, 100)
            } else {
                this.play(item)
                this.position(item)
                this.button(item)
                this.marquee(item)
            }
        })
    })

    this.__proto__.play = function(block) {
        let audio = block.querySelector('.myaudio')
        audio.play()
    }

    this.__proto__.position = function(block) {
        let bar = block.querySelector('.positionBar')
        let audio = block.querySelector('.myaudio')
        let ua = navigator.userAgent;

        if (!this.el.good.checked) {
            builder.each(this.el.bar, (item) => {
                item.classList.remove('positionBar--play')
                item.style.animationPlatState = 'paused'
                item.style.animationDuration = 0
            })
            setTimeout(() => {
                bar.classList.add('positionBar--play')
                if (ua.search(/Chrome/) > 0) {
                    console.log("Chrome");
                    bar.style.animationDuration = audio.duration - 0.45 +'s'
                } else {
                    console.log("Another");
                    bar.style.animationDuration = audio.duration + 0.4 +'s'
                }
            }, 30)
        } else if (bar.classList.contains('positionBar--play')) {
            bar.classList.remove('positionBar--play')
            bar.style.animationPlatState = 'paused'
            bar.style.animationDuration = 0
            setTimeout(() => {
                bar.style.animationPlatState = 'running'
                bar.classList.add('positionBar--play')
                // bar.style.animationDuration = audio.duration +0.35+'s'
                if (ua.search(/Chrome/) > 0) {
                    console.log("Chrome");
                    bar.style.animationDuration = audio.duration - 0.45 +'s'
                } else {
                    console.log("Another");
                    bar.style.animationDuration = audio.duration + 0.4 +'s'
                }
                }, 30)
        } else {
            bar.classList.add('positionBar--play')
            // bar.style.animationDuration = audio.duration +'s'
            if (ua.search(/Chrome/) > 0) {
                console.log("Chrome");
                bar.style.animationDuration = audio.duration - 0.45 +'s'
            } else {
                console.log("Another");
                bar.style.animationDuration = audio.duration + 0.4 +'s'
            }
        }
    }

    this.__proto__.button = function(block) {
        this.el.button.classList.add('play-button--stop')
        let audio = block.querySelector('.myaudio')
        audio.addEventListener('ended', (e) => {
            let is_playing = false
            builder.each(this.el.audio, (item) => {
                if (!item.paused) is_playing = true
            })
            if (!is_playing) {
                this.el.button.classList.remove('play-button--stop')
            }

            // console.log(e.target.contains('.player__item'))
            let bar = e.target.parentNode.querySelector('.positionBar')
            bar.classList.remove('positionBar--play')
            bar.style.animationDuration = ''

            this.el.button.addEventListener('click', (e) => {
                if (this.el.button.classList.contains('play-button--stop')) {
                    this.stop()
                    builder.each(this.el.bar, (item) => {
                        item.classList.remove('positionBar--play')
                        item.style.animationPlatState = 'paused'
                        item.style.animationDuration = 0
                    })
                    this.el.button.classList.remove('play-button--stop')
                }
                e.preventDefault()
            })
        })
    }

    this.__proto__.stop = function() {
        builder.each(this.el.audio, (item) => {
            if (!item.paused) {
                item.pause()
                item.currentTime = 0
            }
        })
    }

    this.__proto__.marquee = function(block) {
        builder.each(this.el.name, (item) => {
            if (item.classList.contains('marquee')) {
                item.classList.remove('marquee')
            }
        })
        let marquee = block.querySelector('.player__item-name');
        if (marquee.offsetWidth > block.offsetWidth*0.7) {
            marquee.classList.add('marquee');
        }
    }
}

builder.player = new PLayer();
