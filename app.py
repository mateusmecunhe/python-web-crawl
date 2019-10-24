from flask import Flask, render_template
from crawler import Crawler


app = Flask(__name__)
app.run(debug=True)

@app.route('/')
def index():
    
    crw = Crawler()
    url = 'https://www.zukerman.com.br/o/Imoveis?gclid=EAIaIQobChMIgOC4n8iy5QIVDgmRCh0WfA-wEAAYAiAAEgKOnPD_BwE'
    
    try:
        list_of_dicts_with_leiloes_information = crw.crawl(url)
        print(len(list_of_dicts_with_leiloes_information))
        # return list_of_dicts_with_leiloes_information[0]['bairro']
        return render_template('index.html')
    except Exception as e:
        return str(e)

