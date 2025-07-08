// src/component/Info.tsx
import {
  FaGlobe,
  FaWater,
  FaThermometerHalf,
  FaMapMarkerAlt,
  FaSearch,
} from "react-icons/fa";
import { MdOutlineSecurity } from "react-icons/md";
import { motion } from "framer-motion";
import {
  slideUpFadeIn,
  growIn,
  slideLeft,
  slideRight,
} from "../animation/animations";

const Info: React.FC = () => {
  return (
    <section
      className="p-6 pt-25 bg-gray-900 text-white font-sans min-h-screen"
      id="sobre-o-projeto"
    >
      <motion.h1
        initial={slideUpFadeIn.initial}
        whileInView={slideUpFadeIn.animate}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="text-4xl font-extrabold mb-8 text-center text-sky-500 drop-shadow-md"
      >
        Sobre o TideTrack
      </motion.h1>{" "}
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Visão Geral do Projeto - ATUALIZADO */}
        <motion.div
          initial={slideRight.initial}
          whileInView={slideRight.animate}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 hover:border-blue-600 transition-all duration-300"
        >
          <h2 className="text-2xl font-bold mb-4 text-purple-300 flex items-center">
            <FaGlobe className="w-7 h-7 mr-3 text-purple-400" /> O que você
            encontra aqui?
          </h2>
          <p className="text-lg leading-relaxed text-gray-300">
            O <strong>TideTrack</strong> é uma ferramenta interativa pensada
            para te dar informações essenciais sobre as{" "}
            <strong>condições do mar em qualquer lugar do mundo</strong>. De
            forma simples, você pode clicar em qualquer ponto do mapa para ver a
            previsão da altura das ondas, da temperatura da água,{" "}
            <span className="font-semibold text-gray-200">o nível do mar</span>{" "}
            e a{" "}
            <span className="font-semibold text-gray-200">
              direção média das ondas
            </span>
            .
          </p>
          <p className="text-lg leading-relaxed text-gray-300 mt-3">
            Também é possível usar a barra de busca para encontrar rapidamente
            locais como cidades costeiras ou regiões oceânicas. Nosso objetivo é
            que você tenha acesso fácil a dados marítimos precisos, seja para
            planejar um passeio, uma viagem ou atividades profissionais.
          </p>
        </motion.div>

        {/* Detalhes das APIs - INTRODUÇÃO ATUALIZADA */}
        <motion.div
          initial={slideLeft.initial}
          whileInView={slideLeft.animate}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 hover:border-orange-600 transition-all duration-300"
        >
          <h2 className="text-2xl font-bold mb-4 text-orange-300 flex items-center">
            <FaThermometerHalf className="w-7 h-7 mr-3 text-orange-400" /> Como
            obtemos os dados?
          </h2>
          <p className="text-lg leading-relaxed text-gray-300 mb-4">
            As informações que você vê no TideTrack vêm de uma complexa rede de
            coleta e processamento de dados. Estações meteorológicas, boias
            oceânicas, radares e satélites ao redor do mundo coletam uma enorme
            quantidade de dados sobre o clima e as condições do oceano. Esses
            dados são então alimentados em modelos numéricos avançados que
            simulam a atmosfera e os oceanos, gerando previsões detalhadas.
            <br />
            <br />
            Essas previsões são disponibilizadas por instituições de pesquisa e
            serviços meteorológicos em grandes servidores. Nós, então, acessamos
            esses dados através de APIs (Interfaces de Programação de
            Aplicativos) de terceiros, que funcionam como uma ponte entre esses
            servidores e o nosso aplicativo, organizando as informações para que
            possamos exibi-las a você de forma clara e interativa.
          </p>

          <p className="text-lg leading-relaxed text-gray-300 mb-4 font-semibold">
            Especificamente, este projeto usa duas fontes de dados externas:
          </p>

          <ul className="list-disc pl-5 space-y-4">
            <li>
              <h3 className="text-xl font-semibold text-blue-300 flex items-center mb-1">
                <FaWater className="w-6 h-6 mr-2 text-blue-400" /> API Marine
                Weather da Open-Meteo
              </h3>
              <div className="text-gray-400">
                Esta é a principal fonte para as **previsões** do mar. Ela nos
                fornece informações importantes como:
                <ul className="list-disc pl-6 mt-2 text-gray-300">
                  <li>
                    <span className="font-semibold">Altura das Ondas:</span>{" "}
                    Projeções de altura das ondas em metros (ou pés).
                  </li>
                  <li>
                    <span className="font-semibold">
                      Temperatura da Superfície do Mar:
                    </span>{" "}
                    Previsão da temperatura da água em graus Celsius (ou
                    Fahrenheit).
                  </li>
                  <li>
                    <span className="font-semibold">
                      Nível do Mar (MSL - Mean Sea Level):
                    </span>{" "}
                    A altura da superfície do mar em relação a um ponto de
                    referência médio. É como se fosse a "altura zero" para as
                    medidas de profundidade e elevação.
                    <p className="mt-1 text-sm italic text-gray-400">
                      <strong>Para leigos:</strong> O MSL é como a "média" do
                      nível da água do mar, ignorando as marés momentâneas. É o
                      nível que se usa como base para medir a altura de
                      montanhas ou a profundidade do oceano. O nível do mar pode
                      variar lentamente ao longo do tempo devido a fatores
                      climáticos e geológicos.
                    </p>
                  </li>
                  <li>
                    <span className="font-semibold">
                      Direção Média das Ondas:
                    </span>{" "}
                    A direção principal de onde as ondas estão vindo, em graus
                    (0° para o Norte, 90° para o Leste, etc.).
                  </li>
                </ul>
                <p className="mt-2">
                  <span className="font-semibold text-white">
                    Previsões Futuras:
                  </span>{" "}
                  Os dados são horários e mostram as condições esperadas para os
                  <strong> próximos dias</strong>, permitindo que você veja
                  tendências e planeje com antecedência.
                </p>
                {/* NOVO BLOCO DE EXPLICAÇÃO SOBRE TEMPERATURA */}
                <p className="mt-4 p-3 bg-gray-700 rounded-md border border-gray-600 text-sm text-gray-300">
                  <span className="font-semibold text-blue-200">
                    Importante sobre a Temperatura da Água:
                  </span>{" "}
                  A temperatura da <strong>superfície do mar</strong> mostrada
                  aqui raramente será negativa, mesmo em regiões muito frias
                  como o Ártico. Isso acontece porque a água salgada congela em
                  temperaturas um pouco abaixo de 0°C (por volta de -1.8°C). Se
                  a água estiver mais fria que isso, ela já se transformou em
                  gelo, e a medição de "água líquida" não se aplica da mesma
                  forma. Nossos dados refletem a temperatura da água em estado
                  líquido.
                </p>
              </div>
            </li>

            <li className="mt-6">
              <h3 className="text-xl font-semibold text-green-300 flex items-center mb-1">
                <FaMapMarkerAlt className="w-6 h-6 mr-2 text-green-400" /> API
                Nominatim da OpenStreetMap
              </h3>
              <div className="text-gray-400">
                Usamos esta API para entender e localizar lugares no mapa:
                <ul className="list-disc pl-6 mt-2 text-gray-300">
                  <li>
                    <span className="font-semibold">
                      De Coordenadas para Endereço:
                    </span>{" "}
                    Quando você clica no mapa, ela nos ajuda a identificar o
                    país, estado ou cidade daquele ponto.
                  </li>
                  <li>
                    <span className="font-semibold">
                      De Endereço para Coordenadas:
                    </span>{" "}
                    E quando você busca um local por nome, ela nos diz onde ele
                    está no mapa para que possamos centralizá-lo.
                  </li>
                </ul>
                <p className="mt-2">
                  <span className="font-semibold text-white">
                    Dados de Localização:
                  </span>{" "}
                  Esta API trabalha com informações geográficas estáveis, que
                  são atualizadas conforme sua interação no mapa ou na busca.
                </p>
              </div>
            </li>
          </ul>
        </motion.div>

        {/* Credibilidade e Precisão dos Dados */}
        <motion.div
          initial={slideRight.initial}
          whileInView={slideRight.animate}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 hover:border-green-600 transition-all duration-300"
        >
          <h2 className="text-2xl font-bold mb-4 text-rose-500 flex items-center">
            <MdOutlineSecurity className="w-7 h-7 mr-3 text-rose-500" /> Nossos
            Dados são Confiáveis?
          </h2>
          <p className="text-lg leading-relaxed text-gray-300 mb-4">
            A{" "}
            <strong className="text-emerald-400">
              confiabilidade dos dados
            </strong>{" "}
            é uma preocupação muito importante para nós. As informações de
            previsão marítima que você vê aqui vêm de uma fonte de alta
            qualidade e reconhecimento internacional: a{" "}
            <strong>Open-Meteo</strong>.
          </p>
          <p className="text-lg leading-relaxed text-gray-300 mb-4">
            A <strong>Open-Meteo</strong> é uma plataforma que oferece APIs de
            dados meteorológicos e climáticos. Eles são amplamente utilizados
            por desenvolvedores e pesquisadores porque agregam e processam dados
            de modelos numéricos de previsão do tempo de{" "}
            <strong>fontes renomadas e oficiais</strong>. Isso inclui modelos
            como o do Centro Europeu de Previsões Meteorológicas de Médio Prazo
            (ECMWF) e outras instituições meteorológicas nacionais e globais. Ou
            seja,{" "}
            <strong className="text-red-500">
              a Open-Meteo não inventa os dados
            </strong>
            , mas sim os organiza e distribui a partir de{" "}
            <strong className="text-emerald-500">
              bases científicas sólidas
            </strong>
            .
          </p>
          <p className="text-lg leading-relaxed text-gray-300 mb-4">
            É crucial entender que, mesmo com as melhores fontes e modelos, as
            informações apresentadas são <strong>previsões</strong>. Assim como
            a previsão do tempo para sua cidade, a previsão das condições do mar
            é uma estimativa baseada em modelos complexos. Fatores como mudanças
            repentinas nas condições atmosféricas ou no oceano podem influenciar
            a precisão.
          </p>
          <p className="text-lg leading-relaxed text-gray-300">
            Portanto, embora o sistema utilize dados de alta credibilidade e dê
            uma <strong>excelente estimativa</strong> do que pode acontecer, é
            sempre bom usá-lo como uma ferramenta de apoio e estar ciente de que
            a natureza da previsão implica uma margem de variação. Ele é um guia
            confiável para suas decisões.
          </p>
        </motion.div>

        {/* Utilidade do Recurso */}
        <motion.div
          initial={slideLeft.initial}
          whileInView={slideLeft.animate}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 hover:border-yellow-600 transition-all duration-300"
        >
          <h2 className="text-2xl font-bold mb-4 text-yellow-300 flex items-center">
            <FaSearch className="w-7 h-7 mr-3 text-yellow-400" /> Para quem é
            útil?
          </h2>
          <p className="text-lg leading-relaxed text-gray-300">
            As informações de previsão marítima são super importantes para um
            monte de gente e várias atividades:
          </p>
          <ul className="list-disc pl-5 mt-4 space-y-3 text-gray-300">
            <li>
              <span className="font-semibold text-white">
                Navegantes e Marinheiros:
              </span>{" "}
              Para planejar rotas e garantir a segurança em viagens.
            </li>
            <li>
              <span className="font-semibold text-white">Pescadores:</span> Para
              encontrar as melhores condições para a pesca, sabendo a
              temperatura da água, o nível do mar e o movimento das ondas.
            </li>
            <li>
              <span className="font-semibold text-white">
                Praticantes de Esportes Aquáticos:
              </span>{" "}
              Surfistas, velejadores, mergulhadores e nadadores podem checar as
              condições do mar antes de entrar na água.
            </li>
            <li>
              <span className="font-semibold text-white">
                Pesquisadores e Oceanógrafos:
              </span>{" "}
              Uma ferramenta rápida para visualizar dados do oceano em
              diferentes áreas.
            </li>
            <li>
              <span className="font-semibold text-white">
                Turismo e Hotelaria (Litoral):
              </span>{" "}
              Para informar hóspedes e clientes sobre as condições das praias e
              do mar.
            </li>
            <li>
              <span className="font-semibold text-white">
                Organização de Eventos na Costa:
              </span>{" "}
              Para garantir a segurança e o sucesso de atividades à beira-mar.
            </li>
          </ul>
          <p className="text-lg leading-relaxed text-gray-300 mt-4">
            Em resumo, qualquer pessoa ou empresa que precise de uma forma
            rápida e visual de entender as condições futuras do mar para
            segurança, lazer ou trabalho pode tirar proveito desta ferramenta.
          </p>
        </motion.div>
      </div>
      <span id="donate"></span>
    </section>
  );
};

export default Info;
