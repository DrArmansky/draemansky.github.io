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
