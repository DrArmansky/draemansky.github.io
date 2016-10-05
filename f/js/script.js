"use strict";

function Builder() {
	// Перебор коллекции NodeList
	this.__proto__.each = function (items, callback) {
		// return Object.keys(items).map(callback)
		return Array.prototype.map.call(items, callback);
	};
	// Преобразование коллекции NodeList в настоящий массив
	this.__proto__.trueArray = function (items) {
		return Array.prototype.slice.call(items, 0);
	};
	// Хранилище
	this.store = {};
	// Позиция эллемента
	Element.prototype.offset = function () {
		var bodyRect = document.body.getBoundingClientRect(),
		    elemRect = this.getBoundingClientRect();

		return {
			top: elemRect.top - bodyRect.top,
			left: elemRect.left - bodyRect.left
		};
	};
}

var builder = new Builder();
// var link = document.querySelector(".searching-block-btn");
// var popup = document.querySelector(".modal-block");
// var close = document.querySelector(".modal-block-close");
//
// var data_in = popup.querySelector("[name=data-in]");
// var form = popup.querySelector("form");
//
// var storage = localStorage.getItem("data-in")
//
// link.addEventListener("click", function(event) {
//   event.preventDefault();
//   popup.classList.add("modal-block-show");
//   data_in.focus();
// });
//
// form.addEventListener("submit", function(event) {
// if (!data_in.value) {
//   event.preventDefault();
//   popup.classList.remove("modal-error");
//   popup.offsetWidth = popup.offsetWidth;
//   popup.classList.add("modal-error");
// } else {
//   localStorage.setItem("data-in", data_in.value);
// }
// });
//
// window.addEventListener("keydown", function(event) {
//   if (event.keyCode === 27) {
//     if (popup.classList.contains("modal-block-show")) {
//       popup.classList.remove("modal-block-show");
//       popup.classList.remove("modal-error");
//     }
//   }
// });


// var menu = document.querySelector(".menu-button");
// var player = document.querySelector(".player");
//
// menu.addEventListener("click", function(event) {
//   if (document.querySelector(".player-close")) {
//       player.classList.remove("player-close");
//   } else {
//       player.classList.add("player-close");
//   }
// });
"use strict";
// var arrow = document.querySelector(".arrow-button");
// var player = document.querySelector(".player");
// var playerControl = document.querySelector(".player-header__main-header");
//
// arrow.addEventListener("click", function(event) {
//     player.classList.remove("show");
//     playerControl.classList.remove("show");
//     playerNav.classList.remove("trip");
//     playerLogin.classList.remove("trip");
// });
"use strict";
'use strict';

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
        header: document.querySelector('.player-header')
    };

    this.__proto__.like = function () {
        var _this = this;

        builder.each(this.el.likes, function (item) {
            item.addEventListener('click', function (e) {
                e.target.closest('.heart-like').classList.toggle("appearance");

                var playerItem = item.parentNode.parentNode;
                var itemName = playerItem.querySelector('.player__item-name span');

                if (playerItem.matches("[elect]")) {
                    playerItem.removeAttribute('elect');
                    localStorage.removeItem(itemName.innerHTML, 'elect');
                } else {
                    playerItem.setAttribute('elect', '');
                    localStorage.setItem(itemName.innerHTML, 'elect');
                }

                var count = 0;
                builder.each(_this.el.playerItem, function (item) {
                    if (item.matches('[elect]')) {
                        count++;
                        return count;
                    }
                });
                if (count > 0) {
                    _this.el.navItemEl.style.display = "flex";
                } else {
                    _this.el.navItemEl.style.display = "none";
                }
            });
        });
    };

    this.__proto__.arrow = function () {
        var _this2 = this;

        this.el.arrow.addEventListener('click', function (e) {
            _this2.el.player.classList.remove("show");
            _this2.el.playerControl.classList.remove("show");
            _this2.el.playerNav.classList.remove("trip");
            _this2.el.playerLogin.classList.remove("trip");
        });
    };

    this.__proto__.menu = function () {
        var _this3 = this;

        this.el.menu.addEventListener('click', function (e) {
            _this3.el.player.classList.add("show");
            _this3.el.playerControl.classList.add("show");
            _this3.el.playerNav.classList.add("trip");
            _this3.el.playerLogin.classList.add("trip");
        });
    };

    this.__proto__.login = function () {
        var _this4 = this;

        this.el.login.addEventListener('click', function (e) {
            _this4.el.popup.classList.remove("hidden");
            setTimeout(function () {
                _this4.el.popup.classList.add("appearance");
            });
        });
    };

    this.__proto__.cancel = function () {
        var _this5 = this;

        this.el.cancelSearch.addEventListener('click', function (e) {
            _this5.el.panelSearch.classList.remove('appearance');
            setTimeout(function () {
                _this5.el.panelSearch.classList.add('hidden');
            }, 500);
            builder.each(_this5.el.playerItem, function (item) {
                item.classList.remove('slowhide');
                item.style.display = "block";
            });
            _this5.el.field.value = "";
        });

        window.addEventListener("keydown", function (e) {
            if (e.keyCode == 27) {
                _this5.el.panelSearch.classList.remove('appearance');
                setTimeout(function () {
                    _this5.el.panelSearch.classList.add('hidden');
                }, 500);
                builder.each(_this5.el.playerItem, function (item) {
                    item.classList.remove('slowhide');
                    item.style.display = "block";
                });
                _this5.el.field.value = "";
            }
        });

        this.el.cancelPopup.addEventListener("click", function (e) {
            _this5.el.popup.classList.remove("appearance");
            setTimeout(function () {
                _this5.el.popup.classList.add("hidden");
            }, 500);
        });
    };

    this.__proto__.search = function () {
        var _this6 = this;

        this.el.search.addEventListener('click', function (e) {
            _this6.el.panelSearch.classList.remove("hidden");
            setTimeout(function () {
                _this6.el.panelSearch.classList.add("appearance");
            }, 200);
            _this6.el.field.focus();
        });
    };

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

builder.buttons = new Buttons();
// var btnCancelSearch = document.querySelector(".cancel-button--search")
// var btnCancelPopup = document.querySelector(".cancel-button--popup")
//
// btnCancelSearch.addEventListener("click", function (event) {
//     panelSearch.classList.remove("appearance");
//     setTimeout(() => {
//       panelSearch.classList.add("hidden");
//   }, 500);
// });
//
// btnCancelPopup.addEventListener("click", function (event) {
//     popup.classList.remove("appearance");
//     setTimeout (() => {
//     popup.classList.add("hidden");
//     },500);
// });
"use strict";

// var like = document.querySelectorAll(".heart-like");
//
//
// like.forEach (function(item, i, arr) {
//     // console.log(item)
//     item.addEventListener("click", function(e) {
//
//         let audioURL = item.parentNode.parentNode.querySelector('.song');
//         e.target.closest('.heart-like').classList.toggle("appearance");
//
//         if (item.matches("[elect]")) {
//             item.removeAttribute('elect');
//             localStorage.removeItem(audioURL.value, 'elect');
//         } else {
//             item.setAttribute('elect', '');
//             localStorage.setItem(audioURL.value, 'elect');
//         }
//     })
// })
"use strict";
// var btnLogin = document.querySelector(".login-button")
// var popup = document.querySelector(".popup")
// //
// btnLogin.addEventListener("click", function(event) {
//     popup.classList.remove("hidden");
//     setTimeout(() => {
//         popup.classList.add("appearance");
//     });
// });
"use strict";
// var menu = document.querySelector(".menu-button");
// var player = document.querySelector(".player");
// var playerControl = document.querySelector(".player-header__main-header");
// var playerNav = document.querySelector(".player-nav");
// var playerLogin = document.querySelector(".player-header__login-header");
//
// menu.addEventListener("click", function(event) {
//     player.classList.add("show");
//     playerControl.classList.add("show");
//     playerNav.classList.add("trip");
//     playerLogin.classList.add("trip");
// });
"use strict";
// var btnPlay = document.querySelector(".play-button");
//
// btnPlay.addEventListener("click", function(event) {
//     // btnPlay.classList.toggle("play-button--stop");
//     if (oAudio.src) {
//         if (oAudio.paused) {
//         oAudio.play();
//         btnPlay.classList.add("play-button--stop");
//     }
//     else {
//         oAudio.pause();
//         btnPlay.classList.remove("play-button--stop");
//     }
// } else {
//     oAudio.src = document.querySelector(".song").value;
//     oAudio.play();
//     btnPlay.classList.add("play-button--stop");
// }
// });
//
// // oAudio.addEventListener("timeupdate", function(event){
// //     btnPlay.classList.toggle("play-button--stop");
// // });
"use strict";
// var btnSearch = document.querySelector(".search-button");
// var panelSearch = document.querySelector(".search-panel");
// var header = document.querySelector(".player-header");
//
// btnSearch.addEventListener("click", function(event) {
//     panelSearch.classList.remove("hidden");
//     setTimeout(() => {
//       panelSearch.classList.add("appearance")
//   }, 200);
// });
"use strict";
'use strict';

function Dynamic() {
  this.el = {
    list: document.querySelectorAll('[data-dynamic]')
  };

  this.__proto__.update = function () {
    var _this = this;

    builder.each(this.el.list, function (item) {
      // let item = this.el.list[key]
      // console.log(item)
      var name = item.getAttribute('data-dynamic');
      if (!localStorage[name]) {
        item.innerHTML = _this.list[name];
        console.log(name);
        localStorage.setItem(name, builder.dynamic.list[name]);
      } else {
        item.innerHTML = localStorage[name];
      }
      item.removeAttribute('data-dynamic');
    });
  };
}

builder.dynamic = new Dynamic();
'use strict';

function Elects() {

    this.el = {
        songList: document.querySelectorAll('.player__item')
    };

    builder.each(this.el.songList, function (item) {
        var itemName = item.querySelector('.player__item-name span');
        var like = item.querySelector('.heart-like');

        if (localStorage[itemName.innerHTML]) {
            like.classList.add("appearance");
            item.setAttribute('elect', '');
        }
    });
}

builder.elects = new Elects();

//     let songList = document.querySelectorAll(".player__item");
//
//     songList.forEach(function(item, i, arr) {
//         let audioURL = item.querySelector('.song');
//         if (localStorage[audioURL.value]) {
//             let like = item.querySelector('.heart-like')
//             like.classList.add("appearance");
//             like.setAttribute('elect', '');
//         }
//     })
// function Player() {
//     this.el = {
//         item: document.querySelectorAll('.player__item'),
//         audio: document.querySelectorAll('.player__item .myaudio'),
//         bar: document.querySelectorAll('.player__item .positionBar'),
//         good: document.querySelector('.good'),
//         button: document.querySelector('.play-button')
//     }
//
//     this.__proto__.play = function(block) {
//
//         let audio = block.querySelector('.myaudio')
//         audio.play()
//
//         let bar = block.querySelector('.positionBar')
//
//         if (!this.el.good.checked) {
//             endy.each(this.el.bar, (item) => {
//                 item.classList.remove('positionBar--play')
//             })
//         }
//
//         if (bar.classList.contains('positionBar--play')) {
//             bar.classList.remove('positionBar--play')
//             bar.style.animationPlatState = 'paused'
//             bar.style.animationDuration = 0
//             setTimeout(() => {
//                 bar.style.animationPlatState = 'running'
//                 bar.classList.add('positionBar--play')
//                 bar.style.animationDuration = audio.duration - 1.35+'s'
//             }, 30)
//         } else {
//             bar.classList.add('positionBar--play')
//             bar.style.animationDuration = audio.duration - 1.35+'s'
//         }
//
//         this.el.button.classList.add('play-button--stop')
//         audio.addEventListener('ended', (e) => {
//             let is_playing = false
//             endy.each(this.el.audio, (item) => {
//                 if (!item.paused) is_playing = true
//             })
//             if (!is_playing) {
//                 this.el.button.classList.remove('play-button--stop')
//             }
//
//             // console.log(e.target.contains('.player__item'))
//             let bar = e.target.parentNode.querySelector('.positionBar')
//             bar.classList.remove('positionBar--play')
//             bar.style.animationDuration = ''
//         })
//     }
//
//     this.__proto__.pause = function() {
//         endy.each(this.el.audio, (item) => {
//             if (!item.paused) {
//                 item.pause()
//                 item.currentTime = 0
//             }
//         })
//     }
//
//
//     endy.each(this.el.item, (item) => {
//         item.addEventListener('click', (e) => {
//             if (e.target.closest('.player__item-like-bg')) return
//             if (!this.el.good.checked) {
//                 endy.each(this.el.audio, (item_audio) => {
//                     item_audio.pause()
//                     item_audio.currentTime = 0
//                 })
//                 setTimeout(() => {
//                     this.play(item)
//                 }, 100)
//             } else {
//                 this.play(item)
//             }
//         })
//     })
//
//     this.el.button.addEventListener('click', (e) => {
//         if (this.el.button.classList.contains('play-button--stop')) {
//             this.pause()
//             this.el.button.classList.remove('play-button--stop')
//         }
//         e.preventDefault()
//     })
// }
//
// endy.player = new Player()
// //
// //
// // // var songList = document.querySelectorAll()
// //
// // // var songa = document.getElementsByTagName('audio');
// // //
// // // var current = (document.getElementsByTagName('audio')[0].currentTime);
// //
// // var current = document.getElementsByTagName('audio');
// //
// // // activeSong = document.querySelector('.active');
// //
// //
// // var currentFile = "";
// //
// // var songList = document.querySelectorAll(".player__item");
// // // var oAudio = document.getElementById('myaudio');
// // var oAudio = document.querySelectorAll('.myaudio');
// // var playerGen = document.getElementById('gen-player');
// //
// // // var positionBar = document.getElementById("positionBar");
// //
// // songList.forEach (function(item, i, arr) {
// //     item.addEventListener("click", function(e) {
// //         let progress = item.querySelector(".positionBar");
// //         progress.style
// //         if (window.HTMLAudioElement) {
// //
// //             let audioURL = item.querySelector('.song');
// //             let player = item.querySelector('.myaudio');
// //             let toggleGod = document.querySelector('.god-on');
// //
// //             if (toggleGod) {
// //                 player.src = audioURL.value;
// //                 player.play();
// //                 btnPlay.classList.add("play-button--stop");
// //
// //                 player.addEventListener("ended", function(event){
// //                     btnPlay.classList.remove("play-button--stop");
// //                 })
// //
// //             //     console.log(item)
// //                 // let audioURL = item.querySelector('.song');
// //                 // let player = item.querySelector('.myaudio');
// //                 // if (audioURL.value !== currentFile) {
// //                     // player.src = audioURL.value;
// //                     // currentFile = audioURL.value;
// //                     // player.play();
// //                     // btnPlay.classList.add("play-button--stop");
// //                 // }
// //             } else {
// //
// //                 if (audioURL.value !== currentFile) {
// //                     playerGen.src = audioURL.value;
// //                     currentFile = audioURL.value;
// //                     playerGen.play();
// //                     btnPlay.classList.add("play-button--stop");
// //                 }
// //
// //                 playerGen.addEventListener("ended", function(event){
// //                     btnPlay.classList.remove("play-button--stop");
// //                 })
// //
// //                 playerGen.addEventListener("timeupdate", function(event) {
// //                     let positionBar = event.target.closest('.player__item').querySelector(".positionBar");
// //                     console.log(positionBar)
// //                     positionBar.style.width = (playerGen.currentTime / playerGen.duration * 100)  + "%";
// //                 })
// //             }
// //         }
// //
// //         let audioName = item.querySelector('.player__item-name');
// //         if (audioName.offsetWidth > item.offsetWidth*0.7) {
// //             audioName.classList.add('marquee');
// //         }
// //     })
// // })
// //
// // // oAudio.forEach (function(item, i, arr) {
// // //     item.addEventListener("ended", function(event){
// // //         btnPlay.classList.remove("play-button--stop");
// // //     })
// // // })
// //
// //
// // // function progressUpdate() {
// // //     oAudio.forEach (function(item, i, arr) {
// // //         let positionBar = item.querySelector(".positionBar");
// // //         let playerItem = item.querySelector('.myaudio')
// // //         console.log(item);
// // //         positionBar.style.width = (.currentTime / player.duration * 100)  + "%";
// // //     })
// // // }
// //
// // // function progressUpdateGEN() {
// // //     songList.forEach (function(item, i, arr) {
// // //         let positionBar = item.querySelector(".positionBar");
// // //         console.log(item);
// // //         positionBar.style.width = (playerGen.currentTime / playerGen.duration * 100)  + "%";
// // //     })
// // // }
// //
// // // function progressUpdateGen() {
// // //     songList.forEach (function(item, i, arr) {
// // //         item.addEventListener("click", function(e) {
// // //             // var positionBar = item.querySelector(".positionBar");
// // //             // console.log(positionBar);
// // //             // positionBar.style.width = (playerGen.currentTime / playerGen.duration * 100)  + "%";
// // //             console.log(item);
// // //         })
// // //    })
// // // }
// //
// // // var currentFile = "";
// // // function playAudio() {
// // //     // Check for audio element support.
// // //     if (window.HTMLAudioElement) {
// // //         try {
// // //             var oAudio = document.getElementById('myaudio');
// // //             var btn = document.getElementById('play');
// // //             var audioURL = document.getElementById('audiofile');
// // //
// // //             //Skip loading if current file hasn't changed.
// // //             if (audioURL.value !== currentFile) {
// // //                 oAudio.src = audioURL.value;
// // //                 currentFile = audioURL.value;
// // //             }
// // //
// // //             // Tests the paused attribute and set state.
// // //             if (oAudio.paused) {
// // //                 oAudio.play();
// // //                 btn.textContent = "Pause";
// // //             }
// // //             else {
// // //                 oAudio.pause();
// // //                 btn.textContent = "Play";
// // //             }
// // //         }
// // //         catch (e) {
// // //             // Fail silently but show in F12 developer tools console
// // //              if(window.console && console.error("Error:" + e));
// // //         }
// // //     }
// // // }
// //
// //
// //
// //
// //
// //
// //
// //
// //
// // // words.forEach(function(word) {
// // //   console.log(word);
// // //   if (word === "two") {
// // //     words.shift();
// // //   }
// //
// // // selectSong();
// //
// // // var play = document.querySelector('.play');
// // // play.addEventListener("click", function(event) {
// // //     playAudio();
// // // });
// //
// //
// //
// // // var play = document.querySelector('.play');
// // // play.addEventListener("click", function(event) {
// // //     playAudio();
// // // });
"use strict";
'use strict';

function PLayer() {
    var _this = this;

    this.el = {
        block: document.querySelectorAll('.player__item'),
        name: document.querySelectorAll('.player__item-name'),
        good: document.querySelector('.good'),
        audio: document.querySelectorAll('.myaudio'),
        bar: document.querySelectorAll('.positionBar'),
        button: document.querySelector('.play-button')
    };

    builder.each(this.el.block, function (item) {
        item.addEventListener('click', function (e) {
            if (e.target.closest('.player__item-like-bg')) return;
            if (!_this.el.good.checked) {
                builder.each(_this.el.audio, function (item_audio) {
                    item_audio.pause();
                    item_audio.currentTime = 0;
                });
                setTimeout(function () {
                    _this.play(item);
                    _this.position(item);
                    _this.button(item);
                    _this.marquee(item);
                }, 100);
            } else {
                _this.play(item);
                _this.position(item);
                _this.button(item);
                _this.marquee(item);
            }
        });
    });

    this.__proto__.play = function (block) {
        var audio = block.querySelector('.myaudio');
        audio.play();
    };

    this.__proto__.position = function (block) {
        var bar = block.querySelector('.positionBar');
        var audio = block.querySelector('.myaudio');
        var ua = navigator.userAgent;

        if (!this.el.good.checked) {
            builder.each(this.el.bar, function (item) {
                item.classList.remove('positionBar--play');
                item.style.animationPlatState = 'paused';
                item.style.animationDuration = 0;
            });
            setTimeout(function () {
                bar.classList.add('positionBar--play');
                if (ua.search(/Chrome/) > 0) {
                    console.log("Chrome");
                    bar.style.animationDuration = audio.duration - 1.35 + 's';
                } else {
                    console.log("Another");
                    bar.style.animationDuration = audio.duration + 0.4 + 's';
                }
            }, 30);
        } else if (bar.classList.contains('positionBar--play')) {
            bar.classList.remove('positionBar--play');
            bar.style.animationPlatState = 'paused';
            bar.style.animationDuration = 0;
            setTimeout(function () {
                bar.style.animationPlatState = 'running';
                bar.classList.add('positionBar--play');
                // bar.style.animationDuration = audio.duration +0.35+'s'
                if (ua.search(/Chrome/) > 0) {
                    console.log("Chrome");
                    bar.style.animationDuration = audio.duration - 1.35 + 's';
                } else {
                    console.log("Another");
                    bar.style.animationDuration = audio.duration + 0.4 + 's';
                }
            }, 30);
        } else {
            bar.classList.add('positionBar--play');
            // bar.style.animationDuration = audio.duration +'s'
            if (ua.search(/Chrome/) > 0) {
                console.log("Chrome");
                bar.style.animationDuration = audio.duration - 1.35 + 's';
            } else {
                console.log("Another");
                bar.style.animationDuration = audio.duration + 0.4 + 's';
            }
        }
    };

    this.__proto__.button = function (block) {
        var _this2 = this;

        this.el.button.classList.add('play-button--stop');
        var audio = block.querySelector('.myaudio');
        audio.addEventListener('ended', function (e) {
            var is_playing = false;
            builder.each(_this2.el.audio, function (item) {
                if (!item.paused) is_playing = true;
            });
            if (!is_playing) {
                _this2.el.button.classList.remove('play-button--stop');
            }

            // console.log(e.target.contains('.player__item'))
            var bar = e.target.parentNode.querySelector('.positionBar');
            bar.classList.remove('positionBar--play');
            bar.style.animationDuration = '';

            _this2.el.button.addEventListener('click', function (e) {
                if (_this2.el.button.classList.contains('play-button--stop')) {
                    _this2.stop();
                    builder.each(_this2.el.bar, function (item) {
                        item.classList.remove('positionBar--play');
                        item.style.animationPlatState = 'paused';
                        item.style.animationDuration = 0;
                    });
                    _this2.el.button.classList.remove('play-button--stop');
                }
                e.preventDefault();
            });
        });
    };

    this.__proto__.stop = function () {
        builder.each(this.el.audio, function (item) {
            if (!item.paused) {
                item.pause();
                item.currentTime = 0;
            }
        });
    };

    this.__proto__.marquee = function (block) {
        builder.each(this.el.name, function (item) {
            if (item.classList.contains('marquee')) {
                item.classList.remove('marquee');
            }
        });
        var marquee = block.querySelector('.player__item-name');
        if (marquee.offsetWidth > block.offsetWidth * 0.7) {
            marquee.classList.add('marquee');
        }
    };
}

builder.player = new PLayer();
'use strict';

function Counter() {
    this.el = {
        navElCount: document.querySelector('.player-nav__item--elects .player-nav__item-counter'),
        playerItem: document.querySelectorAll('.player__item'),
        btnLike: document.querySelectorAll('.heart-like')
    };

    this.__proto__.countElect = function () {
        var count = 0;
        builder.each(this.el.playerItem, function (item) {
            if (item.matches('[elect]')) {
                count++;
                return count;
            }
        });
        this.el.navElCount.innerHTML = count;
    };

    this.__proto__.countLiked = function () {
        var _this = this;

        builder.each(this.el.btnLike, function (item) {
            item.addEventListener('click', function (e) {
                var count = 0;
                builder.each(_this.el.playerItem, function (item) {
                    if (item.matches('[elect]')) {
                        count++;
                        return count;
                    }
                });
                _this.el.navElCount.innerHTML = count;
            });
        });
    };

    this.countElect();
    this.countLiked();
}

builder.counter = new Counter();
'use strict';

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
        navElCount: document.querySelector('.player-nav__item--elects .player-nav__item-counter')
    };

    this.__proto__.showAll = function () {
        var _this = this;

        this.el.navItemAll.addEventListener('click', function (e) {
            builder.each(_this.el.playerItem, function (item) {
                item.style.display = "block";
            });
            _this.el.player.classList.remove("show");
            _this.el.playerControl.classList.remove("show");
            _this.el.playerNav.classList.remove("trip");
            _this.el.playerLogin.classList.remove("trip");
        });
    };

    this.__proto__.showElects = function () {
        var _this2 = this;

        if (document.querySelector('[elect]')) {
            this.el.navItemEl.style.display = "flex";
        }
        this.el.navItemEl.addEventListener('click', function (e) {
            builder.each(_this2.el.playerItem, function (item) {
                if (item.matches("[elect]")) {
                    item.style.display = "block";
                    _this2.el.player.classList.remove("show");
                    _this2.el.playerControl.classList.remove("show");
                    _this2.el.playerNav.classList.remove("trip");
                    _this2.el.playerLogin.classList.remove("trip");
                } else {
                    item.style.display = "none";
                }
            });
        });
    };

    this.__proto__.showGroup = function () {
        var _this3 = this;

        builder.each(this.el.navItemGr, function (item) {
            item.addEventListener('click', function (e) {
                var group = item.getAttribute('data-id');
                builder.each(_this3.el.playerItem, function (item) {
                    var groupItem = item.getAttribute('data-item-group');
                    if (group == groupItem) {
                        item.style.display = "block";
                        _this3.el.player.classList.remove("show");
                        _this3.el.playerControl.classList.remove("show");
                        _this3.el.playerNav.classList.remove("trip");
                        _this3.el.playerLogin.classList.remove("trip");
                    } else {
                        item.style.display = "none";
                    }
                });
            });
        });
    };

    this.showGroup();
    this.showElects();
    this.showAll();
}

builder.show = new Show();
'use strict';

function Search() {
    var _this = this;

    this.el = {
        form: document.querySelector('.search-form'),
        field: document.querySelector('.search-field'),
        playerItem: document.querySelectorAll('.player__item')
    };

    this.el.form.addEventListener('keyup', function (e) {
        // console.log(this.el.field.value.toLowerCase());
        var value = _this.el.field.value.toLowerCase();
        builder.each(_this.el.playerItem, function (item) {
            var itemName = item.querySelector('.player__item-name span').innerHTML.toLowerCase();
            if (!(itemName.search(value) + 1)) {
                item.classList.remove('appearance');
                item.classList.add('slowhide');
                setTimeout(function () {
                    item.style.display = "none";
                }, 300);
            } else {
                item.style.display = "block";
                setTimeout(function () {
                    item.classList.remove('slowhide');
                }, 300);
            }
        });
    });
}

builder.search = new Search();
'use strict';

function Toggle() {
    this.el = {
        god: document.querySelector('[godmod]')
    };

    this.__proto__.god = function () {
        var _this = this;

        this.el.god.addEventListener('click', function (e) {
            _this.el.god.classList.toggle('god-on');
        });
    };
}

builder.toggle = new Toggle();

// var toggleGod = document.querySelector('[godmod]');
//
// toggleGod.addEventListener("click", function(e) {
//     toggleGod.classList.toggle("god-on");
// })
//# sourceMappingURL=script.js.map
