from flask import Flask, render_template, request, redirect
from crawler import Crawler
import json


app = Flask(__name__)
app.run(debug=True) #change to false when in production


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
    
    else: 
        json_from_post = request.get_json()
        print(json_from_post)
        
        return redirect('/')
