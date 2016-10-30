function Search() {
    this.el = {
        form: document.querySelector('.search-form'),
        field: document.querySelector('.search-field'),
        playerItem: document.querySelectorAll('.player__item'),
    }


    this.el.form.addEventListener('keyup', (e) => {
        // console.log(this.el.field.value.toLowerCase());
        let value = this.el.field.value.toLowerCase();
        builder.each(this.el.playerItem, (item) => {
            let itemName = item.querySelector('.player__item-name span').innerHTML.toLowerCase();
            if(!(itemName.search(value)+1)) {
                item.classList.remove('appearance');
                item.classList.add('slowhide');
                setTimeout(() => {
                    item.style.display = "none";
                }, 300);
            } else {
                item.style.display = "block";
                setTimeout(() => {
                    item.classList.remove('slowhide');
                }, 300);
            }
        })
    })
}

builder.search = new Search();
