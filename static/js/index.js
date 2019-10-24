let buttons = document.querySelectorAll('.saiba-mais')
let modals = document.querySelectorAll('.modal')
let modal_closing_btns = document.querySelectorAll('.modal-btn')


buttons.forEach(function(b){
    let btn_id_str = b.id.match(/\d+/)[0]
    let btn_id_int = parseInt(btn_id_str, 10)
  
    b.addEventListener('click', function(){
        find_areas(modals[btn_id_int])
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

function find_areas(element){
    modals.forEach(function(m){
        let str = m.innerText
        let matches = str.matchAll(/M²/)
        for (const match of matches) {
            index = match.index
            console.log(match.index);

            console.log(str[index])
            index++
            console.log(str[index])
            index--
            let contador_de_espacos = 0
            while (contador_de_espacos < 2){
                if(str[index] == " "){
                    contador_de_espacos++
                }
                console.log(str[index])
                index--

            }
          }
    })
}