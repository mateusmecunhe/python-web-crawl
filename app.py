# -*- coding: utf-8 -*-
from flask import Flask, render_template, request, redirect
from crawler import Crawler
import json

app = Flask(__name__)
app.run(debug=True) #change to false when in production

# para o setup básico de um projeto flask, me baseei em outros que já tinha feito
#Já havia feito também um tutorial com o beautifulsoup, que foi a ferramenta escolhida para o crawling.
#com esse conjunto de ferramentas, tive dificuldade de conseguir fazer o crawling da página mencionada e
#conforme combinado, utilzei outra URL (guardada dentro da variável url abaixo)


@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'GET':
        crw = Crawler()
        url = 'https://www.zukerman.com.br/o/Imoveis?gclid=EAIaIQobChMIgOC4n8iy5QIVDgmRCh0WfA-wEAAYAiAAEgKOnPD_BwE'

        try:
            list_of_leiloes = crw.crawl(url)
            return render_template('index.html', list_of_leiloes = list_of_leiloes)

        except Exception as e:
            return str(e)
    
    elif request.method == 'POST': 
        #aqui o servidor busca o json do request post e imprime
        json_from_post = request.get_json()
        print(json_from_post)
        
        return redirect('/')
    else:
        return "unable to find"
