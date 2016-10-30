function Toggle() {
    this.el = {
        god: document.querySelector('[godmod]')
    }

    this.__proto__.god = function() {
        this.el.god.addEventListener('click', (e) => {
            this.el.god.classList.toggle('god-on');
        })
    }
}

builder.toggle = new Toggle();


// var toggleGod = document.querySelector('[godmod]');
//
// toggleGod.addEventListener("click", function(e) {
//     toggleGod.classList.toggle("god-on");
// })
