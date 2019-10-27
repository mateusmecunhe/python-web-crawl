let buttons = document.querySelectorAll('.saiba-mais')
let modals = document.querySelectorAll('.modal')
let modal_closing_btn = document.querySelector('.modal-btn')



// esse trecho é responsável por chamar os métodos de encontrar as áreas dentro do texto de descrição,
// trocar os textos das áreas pelo mesmo texto envolto num <span> e, por fim,
// também chamar o método de tomar uma ação no clique do usuário na área
buttons.forEach(function(b){
    let btn_id_str = b.id.match(/\d+/)[0]
    let btn_id_int = parseInt(btn_id_str, 10)
  
    b.addEventListener('click', function(){
        modals[btn_id_int].classList.remove('hide')
        modal_closing_btn.classList.remove('hide')
        let arr_of_strings = find_areas(modals[btn_id_int])
        
        let str = modals[btn_id_int].innerHTML
        
        replace_areas(str, arr_of_strings, modals[btn_id_int])

        aciona_no_clique_da_area()
    
    })
})


//esse trecho é responsável por fechar o modal no clique de 'fechar'
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
        //aqui gastei um tempo até entender, após ler muitos tópicos no stackoverflow e documentação da w3
        //que o retorno do método matchAll não é um array, e sim um iterável.
        let matches_array = Array.from(matches)

        let array_of_strings_to_be_replaced = []

        //aqui, senti dificuldade por conta do regex. Acredito que haja um jeito mais elegante de encontrar a área
        //utilizando expressões regulares. Como ainda não conhecço profundamente regex,
        //acabei utilizando bastante código em javascript para encontrar o texto com a área através de encontrar
        //a potência de 2 no texto.

        //Aqui, também, o método falha caso o input no texto do imóvel não use a notação m² ou M²
        //(i.e. M2, m2)
        
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
        //o retorno do método contem um array com strings que contém a área
        return array_of_strings_to_be_replaced
}

//esse método recebe como parâmetro o retorno do método find_areas()
//o replace_areas(), além disso, recebe a string inteira do texto da descrição e a tag html que contém o texto.
// Na string, substitui o texto pelo mesmo texto envolto numa span
// no elemento HTML, substitui seu conteúdo pela nova string pós substituição

function replace_areas(string, array_of_strings, element){

    for(let counter = 0; counter < array_of_strings.length; counter++){
        string = string.replace(array_of_strings[counter], `<span class='yellow area'>`+array_of_strings[counter]+`</span>`)
    }
    element.innerHTML = string

}

//esse método é chamado após o clique no 'saiba mais', e encontra a cada vez o spans que substituem o texto original
//através do método replace_areas.
//Para cada span encontrado, há um disparador de evento de clique.

function aciona_no_clique_da_area(){
    let areas = document.querySelectorAll('.area')
    
    areas.forEach(function(a){
        //o disparador de evento de clique pega o momento exato do clique e guarda na variável today, 
        //transformada na variável timestamp após formatação.
        a.addEventListener('click', function(){
            let today = new Date()
                let dd = today.getDate()
                let mm = today.getMonth()+1
                let yyyy = today.getFullYear()
                let hh = today.getHours()
                let min = today.getMinutes()
                let ss = today.getSeconds()

                if(dd<10){
                    dd="0"+dd
                }
                if(mm<10){
                    mm="0"+mm
                }

                if(min<10){
                    min = "0"+min
                }
                if(ss<10){
                    ss = "0"+ss
                }

            let timestamp = yyyy+'-'+mm+'-'+dd + " " + hh+":"+min+":"+ss

            //também buscar o link, que está no html (mas não visível na página)
            //aqui, acredito haver possibilidade de melhroar esse método caso haja maneira
            //de comunicar direto entre js e python

            //busca também os outros elementos para formar o json: texto e área selecioanda

            let link = a.parentElement.parentElement.firstElementChild.innerText
            let texto = a.parentNode.innerText
            let selecao = a.innerText

            let json_info = 
                {
                    "timestamp": timestamp,
                    "link": link,
                    "texto": texto,
                    "selecao": selecao
                }

            
        
            //após clicar, enviar json com informação ao servidor
    
            send_json_to_server(json_info)
            
            
            
        })
    })
}
//método simples de enviar, via requisição post, json ao servidor
function send_json_to_server(json_imovel){
    xhr = new XMLHttpRequest()
    xhr.open("POST", "/")
    xhr.setRequestHeader("Content-type", "application/json")
   
    console.log(json_imovel)
    xhr.send(JSON.stringify(json_imovel))

}