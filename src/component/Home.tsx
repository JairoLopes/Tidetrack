// src/component/Home.tsx
import React from "react";

const Home: React.FC = () => {
  return (
    <section
      id="home-section"
      className="relative w-full min-h-screen text-white flex items-center justify-center p-6 pt-[80px] z-15"
    >
      {/* Video para desktop */}
      <video
        className="hidden sm:block absolute inset-0 w-full h-full object-cover -z-10"
        autoPlay
        loop
        muted
        playsInline
        src="/video/Home_Desktop.mp4"
      />

      {/* Video para mobile */}
      <video
        className="block sm:hidden absolute inset-0 w-full h-full object-cover -z-10"
        autoPlay
        loop
        muted
        playsInline
        src="/video/Home_Mobile.mp4"
      />

      {/* Criando camada overlay para melhorar a legibilidade do texto */}
      <div className="absolute inset-0 bg-black opacity-70 -z-10"></div>

      {/* Conteúdo da Home Page */}
      <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
        {/* Nome da Empresa Estilizado com Novas Tonalidades de Azul e Sombreamento no "Track" */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-4 leading-tight drop-shadow-lg">
          <span className="text-sky-500 drop-shadow-md drop-shadow-black">
            Tide
          </span>
          <span className="text-gray-950 drop-shadow-md drop-shadow-sky-500">
            Track
          </span>
        </h1>

        {/* Slogan Mais Descritivo e Objetivo - ATUALIZADO */}
        <p className="text-sm sm:text-lg mb-10  text-gray-300">
          Sua plataforma para{" "}
          <strong className="text-orange-500 font-semibold">
            monitoramento marítimo global
          </strong>
          . Acesse dados precisos sobre a altura das ondas, a temperatura da
          água,{" "}
          <span className="font-semibold text-gray-200">o nível do mar</span> e{" "}
          <span className="font-semibold text-gray-200">
            a direção média das ondas
          </span>
          , e tome decisões seguras para navegação, pesquisa e lazer em qualquer
          oceano.
        </p>

        {/* Botão com a cor de fundo da Navbar e nova tonalidade de azul */}
        <a
          href="#previsoes"
          className="inline-block bg-sky-500/80 hover:bg-blue-600/70 text-white drop-shadow-lg drop-shadow-black font-semibold py-3 px-8 rounded-lg text-lg shadow-md
                     transition-colors duration-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
        >
          Ver Previsões
        </a>
      </div>

      <span id="previsoes" className="absolute bottom-5"></span>
    </section>
  );
};

export default Home;
