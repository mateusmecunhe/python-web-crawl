let buttons = document.querySelectorAll('.saiba-mais')
let modals = document.querySelectorAll('.modal')
let modal_closing_btn = document.querySelector('.modal-btn')




buttons.forEach(function(b){
    let btn_id_str = b.id.match(/\d+/)[0]
    let btn_id_int = parseInt(btn_id_str, 10)
  
    b.addEventListener('click', function(){
        modals[btn_id_int].classList.remove('hide')
        modal_closing_btn.classList.remove('hide')
        let arr_of_strings = find_areas(modals[btn_id_int])
        
        let str = modals[btn_id_int].innerHTML
        
        replace_areas(str, arr_of_strings, modals[btn_id_int])


    })
})



modal_closing_btn.addEventListener('click', function(){
    modal_closing_btn.classList.add('hide')
        modals.forEach(function(mod){
            mod.classList.add('hide')
        })
    })



//function that goes through the description and returns an array of the texts containing areas in sqrd mts
function find_areas(modal_element){
        //finding text of the refered modal
        let str = modal_element.innerText

        //finding all squared notations
        let regexp = /²/g
        let matches = str.matchAll(regexp)
        let matches_array = Array.from(matches)

        let array_of_strings_to_be_replaced = []
        
        //not breaking when used in loops if there is no area in description
        if(matches_array.length == 0){
            return null
        }

        //looping through all matches
        for (contador = 0; contador < matches_array.length; contador++) { 
          
            let indice_do_match = matches_array[contador].index
            let array_of_indexes_to_be_replaced_for_span = []
            let contador_de_espacos = 0
            let numero_de_espacos_permitidos = 1
            
            // checando de a medida está separada por espaço
            if(str[indice_do_match-2] == " "){
                numero_de_espacos_permitidos = 2
            }

            //finding string index for areas
            while(contador_de_espacos < numero_de_espacos_permitidos){
                
                if(str[indice_do_match] == " "){
                    contador_de_espacos++
                }
                array_of_indexes_to_be_replaced_for_span.push(indice_do_match)
                indice_do_match--
            }
            
            //attributing value to indexes of where area starts and ends
            initial_value_to_be_replaced = Math.min.apply( Math, array_of_indexes_to_be_replaced_for_span )
            final_value_to_be_replaced = Math.max.apply( Math, array_of_indexes_to_be_replaced_for_span )


            //adding content to be replaced in one array
            array_containing_content_to_be_replaced = []
            while(initial_value_to_be_replaced <= final_value_to_be_replaced){
                array_containing_content_to_be_replaced.push(str[initial_value_to_be_replaced])
                initial_value_to_be_replaced++
            }
            

            //changing array of chars into string
            string_to_be_replaced = array_containing_content_to_be_replaced.join("")
            array_of_strings_to_be_replaced.push(string_to_be_replaced)
           
            
            
            
        } 
        
        return array_of_strings_to_be_replaced
}

function replace_areas(string, array_of_strings, element){

    for(let counter = 0; counter <= array_of_strings.length; counter++){
        string = string.replace(array_of_strings[counter], `<span class='yellow area'>`+array_of_strings[counter]+`</span>`)
    }
    element.innerHTML = string

}