function Dynamic() {
  this.el = {
    list: document.querySelectorAll('[data-dynamic]')
  }

  this.__proto__.update = function() {
      builder.each(this.el.list, (item) => {
        // let item = this.el.list[key]
        // console.log(item)
        let name = item.getAttribute('data-dynamic')
        if (!localStorage[name]) {
            item.innerHTML = this.list[name]
            console.log(name)
            localStorage.setItem(name, builder.dynamic.list[name])
        } else {
            item.innerHTML = localStorage[name]
        }
        item.removeAttribute('data-dynamic')
      })
  }
}

builder.dynamic = new Dynamic()
