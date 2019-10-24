let buttons = document.querySelectorAll('.saiba-mais')
let modals = document.querySelectorAll('.modal')
let modal_closing_btns = document.querySelectorAll('.modal-btn')


buttons.forEach(function(b){
    let btn_id_str = b.id.match(/\d+/)[0]
    let btn_id_int = parseInt(btn_id_str, 10)
  
    b.addEventListener('click', function(){
        modals[btn_id_int].classList.remove('hide')
    })
})

modal_closing_btns.forEach(function(b){
    b.addEventListener('click', function(){
        modals.forEach(function(m){
            m.classList.add('hide')
        })
    })
})