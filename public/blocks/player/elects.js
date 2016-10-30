function Elects() {

    this.el = {
        songList: document.querySelectorAll('.player__item'),
    }

    builder.each(this.el.songList, (item) => {
        let itemName = item.querySelector('.player__item-name span');
        let like = item.querySelector('.heart-like');

        if (localStorage[itemName.innerHTML]) {
            like.classList.add("appearance");
            item.setAttribute('elect', '');
        }
    })
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
