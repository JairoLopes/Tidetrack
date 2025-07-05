// src/component/Footer.tsx

const Footer = () => {
  return (
    <footer className="bg-gray-950 py-12 px-4 sm:px-6 lg:px-8 text-white/80">
      <div className="container mx-auto max-w-6xl">
        {/* Grid para layout responsivo: 1 coluna em mobile, 2 colunas em telas médias */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-8 text-center md:text-left">
          {/* Seção 1: Logo e Slogan */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2 mb-4">
              <img
                src="/img/TideTrack_Logo.png"
                alt="TideTrack Logo"
                className="w-26 h-26 rounded-full object-cover"
              />
              <h2 className="text-white text-3xl font-bold tracking-wider">
                Tide<span className="text-blue-400">Track</span>
              </h2>
            </div>
            <p className="text-sm max-w-xs">
              Sua janela para as condições e previsões do oceano. Mantenha-se
              informado sobre a altura das ondas e a temperatura da água.
            </p>
          </div>

          {/* Seção 2: Navegação */}
          <div className="flex flex-col items-center md:items-start md:ml-auto">
            <h3 className="text-xl font-semibold text-white mb-4">Navegação</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#" // Link para o topo da página (Home)
                  className="hover:text-blue-400 transition-colors"
                >
                  Início
                </a>
              </li>
              <li>
                <a
                  href="#previsoes" // ID da seção de Previsão Marítima (consistente com Navbar)
                  className="hover:text-blue-400 transition-colors"
                >
                  Previsão Marítima
                </a>
              </li>
              <li>
                <a
                  href="#sobre" // ID da seção "Sobre o Projeto" (consistente com Navbar)
                  className="hover:text-blue-400 transition-colors"
                >
                  Sobre o Projeto
                </a>
              </li>
              <li>
                <a
                  href="#donate" // ID da seção "Apoie" (consistente com Navbar)
                  className="hover:text-blue-400 transition-colors"
                >
                  Apoie
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Linha separadora */}
        <hr className="border-gray-700 my-10" />

        {/* Direitos Autorais */}
        <div className="text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} TideTrack. Todos os direitos
            reservados.
          </p>
          <p className="mt-2">
            Desenvolvido por{" "}
            <a
              href="https://jairolopes-dev.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 text-lg transition-colors duration-300 font-semibold animate-pulse"
            >
              Jairo Lopes
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
