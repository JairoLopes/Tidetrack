# 🌊 TideTrack: Monitoramento Marítimo Global

Bem-vindo ao repositório do **TideTrack**! Este projeto é uma ferramenta interativa desenvolvida para explorar e demonstrar a visualização e interação com dados marítimos em tempo real, utilizando APIs de previsão e geocodificação. O TideTrack oferece uma interface intuitiva para consultar previsões detalhadas das condições oceânicas em qualquer ponto do globo.

## 💡 Sobre o Projeto

O TideTrack nasceu com o objetivo de simplificar o acesso a informações oceânicas complexas, tornando-as mais visuais e compreensíveis. Através de um mapa interativo, os usuários podem:

* **Explorar o Mapa**: Clique em qualquer coordenada geográfica para obter dados marítimos instantâneos para aquela área.
* **Buscar Localizações**: Utilize a barra de busca para encontrar rapidamente regiões costeiras, cidades ou áreas oceânicas específicas por nome.
* **Visualizar Previsões Detalhadas**: Acesse gráficos claros e informativos com previsões horárias para os próximos dias, cobrindo:
  * **Altura das Ondas**
  * **Temperatura da Superfície da Água**
  * **Nível do Mar (MSL - Mean Sea Level)**
  * **Direção Média das Ondas**

Este projeto é focado na entrega de dados precisos de forma eficiente e acessível, sendo ideal para planejamento de atividades marítimas, estudos, ou como uma ferramenta de apoio para análises mais aprofundadas sobre as condições do oceano.

## 🛠️ Stack Tecnológica e APIs

O TideTrack é construído com tecnologias modernas do ecossistema JavaScript e integra-se com APIs externas robustas para consumir e apresentar os dados de forma dinâmica.

### Frontend

* **React**: Biblioteca JavaScript para a construção da interface de usuário dinâmica e modular.
* **TypeScript**: Superconjunto de JavaScript que adiciona tipagem estática, melhorando a manutenibilidade e a detecção de erros em tempo de desenvolvimento.
* **Tailwind CSS**: Framework CSS que permite um desenvolvimento ágil e responsivo da estilização diretamente no HTML.
* **React Icons**: Biblioteca de ícones vetorizados que complementam a interface do usuário.
* **Recharts**: Biblioteca para a criação de gráficos de dados, utilizada para visualizar as previsões de ondas, temperatura, nível do mar e direção das ondas de forma clara.
* **Leaflet & React-Leaflet**: A base para o mapa interativo, oferecendo um controle flexível sobre a visualização geográfica e a interação do usuário.

### APIs Externas

1. **Open-Meteo Marine Weather API**
   
   * **Propósito**: Esta é a API central para a obtenção de dados de previsão marítima.
   * **Funcionalidade**: Fornece acesso a uma vasta gama de parâmetros oceânicos horários para os próximos dias, incluindo:
     * **Altura das Ondas Significativas**: Projeções de altura das ondas em metros (ou pés).
     * **Temperatura da Superfície do Mar**: Previsão da temperatura da água em graus Celsius (ou Fahrenheit).
     * **Nível do Mar (MSL - Mean Sea Level)**: A altura da superfície do mar em relação a um ponto de referência médio. É um dado fundamental para a navegação e estudos oceanográficos.
     * **Direção Média das Ondas**: Indica a direção predominante de onde as ondas estão vindo (em graus).
   * **Coleta de Dados**: A Open-Meteo atua como um agregador e distribuidor de informações meteorológicas cientificamente embasadas. Ela coleta e processa dados de modelos numéricos de previsão do tempo de alta qualidade (como ECMWF), que por sua vez, são alimentados por uma complexa rede global de estações meteorológicas, boias oceânicas, radares e satélites. Essa abordagem garante a credibilidade e precisão das previsões.
   * **Observação sobre Temperaturas Negativas**: É importante notar que a temperatura da superfície do mar raramente é reportada como negativa, mesmo em águas árticas ou antárticas. Isso ocorre porque a água salgada congela a aproximadamente -1.8°C. Temperaturas abaixo disso geralmente indicam a presença de gelo, e a API foca na temperatura da água em estado líquido.

2. **Nominatim OpenStreetMap API**
   
   * **Propósito**: Utilizada para serviços de geocodificação e geocodificação reversa.
   * **Funcionalidade**:
     * **Geocodificação Reversa**: Converte coordenadas geográficas (latitude, longitude) obtidas ao clicar no mapa em um endereço ou nome de local compreensível, o que permite ao TideTrack exibir o nome da área selecionada.
     * **Geocodificação**: Traduz nomes de locais (cidades, oceanos) inseridos pelo usuário na barra de busca em coordenadas geográficas, possibilitando a centralização do mapa no ponto desejado.

## 🚀 Como Rodar o Projeto

Siga os passos abaixo para configurar e executar o TideTrack em sua máquina local:

1. **Clone o Repositório:**
   
   ```bash
   git clone [https://github.com/seu-usuario/tidetrack.git](https://github.com/seu-usuario/tidetrack.git)
   # Substitua 'seu-usuario' pelo seu nome de usuário ou pelo caminho correto do repositório
   ```

2. **Navegue até o Diretório do Projeto:**
   
   ```bash
   cd tidetrack
   ```

3. **Instale as Dependências:**
   Use `npm` ou `yarn` para instalar todas as bibliotecas e pacotes necessários:
   
   ```bash
   npm install
   # ou
   yarn install
   ```

4. **Inicie o Servidor de Desenvolvimento:**
   Após a instalação das dependências, você pode iniciar o aplicativo em modo de desenvolvimento:
   
   ```bash
   npm start
   # ou
   yarn start
   ```
   
   O aplicativo será aberto em seu navegador padrão, geralmente em `http://localhost:3000`.

## 🔒 Nossos Dados são Confiáveis?

A **confiabilidade dos dados** é uma preocupação primordial para nós. As informações de previsão marítima que você vê no TideTrack vêm de uma fonte de alta qualidade e reconhecimento internacional: a **Open-Meteo**.

A **Open-Meteo** é uma plataforma amplamente utilizada por desenvolvedores e pesquisadores por agregar e processar dados de modelos numéricos de previsão do tempo de **fontes renomadas e oficiais**. Isso inclui modelos de instituições como o Centro Europeu de Previsões Meteorológicas de Médio Prazo (ECMWF) e outras instituições meteorológicas nacionais e globais. Ou seja, a Open-Meteo não "inventa" os dados, mas sim os organiza e distribui a partir de **bases científicas sólidas**.

É crucial entender que, mesmo com as melhores fontes e modelos, as informações apresentadas são **previsões**. Assim como a previsão do tempo para sua cidade, a previsão das condições do mar é uma **estimativa baseada em modelos complexos**. Fatores como mudanças repentinas nas condições atmosféricas ou no oceano podem influenciar a precisão.

Portanto, embora o sistema utilize dados de alta credibilidade e dê uma **excelente estimativa** do que pode acontecer, é sempre bom usá-lo como uma ferramenta de apoio e estar ciente de que a natureza da previsão implica uma margem de variação. Ele é um guia confiável para suas decisões.

## 🧑‍💻 Para quem é útil?

As informações de previsão marítima são super importantes para diversas pessoas e atividades:

* **Navegantes e Marinheiros**: Para planejar rotas, garantir a segurança em viagens e evitar condições adversas.
* **Pescadores**: Para encontrar as melhores condições para a pesca, sabendo a temperatura da água, o nível do mar e o movimento das ondas.
* **Praticantes de Esportes Aquáticos**: Surfistas, velejadores, mergulhadores, nadadores e outros entusiastas podem checar as condições do mar antes de entrar na água para segurança e melhor desempenho.
* **Pesquisadores e Oceanógrafos**: Uma ferramenta rápida e visual para explorar e comparar dados oceânicos em diferentes áreas geográficas.
* **Setor de Turismo e Hotelaria (Litoral)**: Para informar hóspedes e clientes sobre as condições das praias e do mar, auxiliando no planejamento de atividades.
* **Organização de Eventos na Costa**: Para garantir a segurança e o sucesso de regatas, competições de surf, ou outros eventos à beira-mar.

Em resumo, qualquer pessoa ou empresa que precise de uma forma rápida e visual de entender as condições futuras do mar para segurança, lazer ou trabalho pode tirar proveito desta ferramenta.
