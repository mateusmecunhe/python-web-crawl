import requests
from bs4 import BeautifulSoup


class Crawler:
    def __init__(self):
        pass

    def crawl(self, url_to_crawl):
        
        headers={'User-Agent': 'Mozilla/5.0 (iPad; U; CPU OS 3_2_1 like Mac OS X; en-us) AppleWebKit/531.21.10 (KHTML, like Gecko) Mobile/7B405'}
        page = requests.get(url_to_crawl, headers=headers)
        
        soup = BeautifulSoup(page.text,"html.parser", from_encoding="utf-8")


        #crawling information
        all_cards = soup.find_all("div", {'class':'cd-it-img'})
        all_cities = soup.find_all('span', {'class':'cd-ba'})
        bairros = soup.find_all('span', {'class':'cd-ba'})
        cities = soup.find_all('a', {'class':'l-cid'})
        tipos = soup.find_all('div', {'class':'dv-tag-tipo'})

        #getting details from inner url

        def get_detalhes(url_detalhes):
            page_detail = requests.get(url_detalhes)
            detalhes_soup = BeautifulSoup(page_detail.text, 'html.parser')

            return detalhes_soup

        def get_endereco(url_detalhes):
            #getting html from detail page
            detalhes_soup = get_detalhes(url_detalhes)
            
            #getting endereco
            endereco = detalhes_soup.find('div', {'class':'s-d-ld-i2'})
            endereco_split = endereco.text.split('- ', 1)[1]

            return endereco_split


        def get_descricao(url_detalhes):
            #getting html from detail page
            detalhes_soup = get_detalhes(url_detalhes)

            #getting descricao
            descricao = detalhes_soup.find('div', {'class':'s-d-ld-i1'})
            descricao_text = descricao.text

            return descricao_text

        def get_valor_primeiro_leilao(url_detalhes):

            #getting html from detail page
            detalhes_soup = get_detalhes(url_detalhes)

            #getting endereco
            div_com_valor = detalhes_soup.find('div', {'class':'s-d-il-i-main'})

            #getting value
            for child_p in div_com_valor.find('p'):
                texto_com_valor = child_p
                valor_split = texto_com_valor.split('R$', 1)[1]
                
                return valor_split

        #adding information to lists

        bairros_list = []
        cities_list = []
        links_list = []
        tipos_list = []


        for tipo in tipos:
            tipos_list.append(tipo.text)

        for bairro in bairros:
            bairros_list.append(bairro.text)

        for city in cities:
            
            cities_list.append(city.text)

        for card in all_cards:
            links = card.find_all('a')
            
            for link in links:
                link_str = link.get('href')
                links_list.append(link_str)
                get_endereco(link_str)
                get_descricao(link_str)

        
        contador = 0
        list_of_dict_with_data = []
        while contador < len(bairros_list):

            all_items_dict = {}
            all_items_dict['id'] = contador
            all_items_dict['bairro'] = bairros_list[contador]
            all_items_dict['city'] = cities_list[contador]
            all_items_dict['tipos'] = tipos_list[contador]
            all_items_dict['links'] = links_list[contador]
            all_items_dict['endereco'] = get_endereco(links_list[contador])
            all_items_dict['descricao'] = get_descricao(links_list[contador])
            all_items_dict['valor'] = get_valor_primeiro_leilao(links_list[contador])
            
            list_of_dict_with_data.append(all_items_dict)

            contador += 1
        
        if len(list_of_dict_with_data) < 1:
            raise Exception('could not get information')
        
        
        return list_of_dict_with_data
