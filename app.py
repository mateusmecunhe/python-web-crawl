from flask import Flask, render_template
from crawler import Crawler


app = Flask(__name__)
app.run(debug=True)


@app.route('/')
def index():
    crw = Crawler()
    url = 'https://www.zukerman.com.br/o/Imoveis?gclid=EAIaIQobChMIgOC4n8iy5QIVDgmRCh0WfA-wEAAYAiAAEgKOnPD_BwE'

    try:
        list_of_leiloes = crw.crawl(url)
        return render_template('index.html', list_of_leiloes = list_of_leiloes)

    except Exception as e:
        return str(e)

