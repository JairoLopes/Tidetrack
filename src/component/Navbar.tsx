// src/component/Navbar.tsx
import React, { useState } from "react";
import { FaBars, FaTimes, FaHome, FaWater, FaInfoCircle } from "react-icons/fa";
import { BiSolidDonateHeart } from "react-icons/bi";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Função para fechar o menu ao clicar em um link (útil para mobile)
  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="bg-gray-950 p-4 shadow-lg fixed w-full z-50 top-0">
      {/* Desktop  */}
      {/* Adicionado 'w-full' ao container para que ele preencha toda a largura disponível */}
      {/* 'mx-auto' também é importante para centralizar o conteúdo quando a tela é muito larga */}
      <div className="relative container mx-auto w-full flex justify-between items-center p-2">
        {/* Logo e Nome do Projeto */}
        <a href="#" className="flex items-center text-white text-2xl font-bold">
          Tide<span className="text-sky-500">Track</span>
        </a>

        {/* Links de Navegação - Desktop */}
        <div className="hidden lg:flex items-center space-x-8">
          <a
            href="#" // Voltar para o topo/Home
            className="flex items-center text-white hover:text-blue-400 transition-colors duration-300 text-base font-medium whitespace-nowrap"
          >
            <FaHome className="mr-2" /> Início
          </a>
          <a
            href="#previsoes"
            className="flex items-center text-white hover:text-blue-400 transition-colors duration-300 text-base font-medium whitespace-nowrap"
          >
            <FaWater className="mr-2" /> Previsão Marítima
          </a>
          <a
            href="#sobre"
            className="flex items-center text-white hover:text-blue-400 transition-colors duration-300 text-base font-medium whitespace-nowrap"
          >
            <FaInfoCircle className="mr-2" /> Sobre o Projeto
          </a>
          <a
            href="#donate"
            className="flex items-center text-blue-400 hover:text-blue-200 transition-colors duration-300 text-base font-semibold border-2 border-blue-400 hover:border-blue-200 px-4 py-1 rounded-full whitespace-nowrap"
          >
            <BiSolidDonateHeart className="mr-2" /> Apoie
          </a>
        </div>

        {/* Botão do Menu Hambúrguer - Mobile */}
        <div className="lg:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            {isOpen ? (
              <FaTimes className="w-8 h-8 text-blue-400" />
            ) : (
              <FaBars className="w-8 h-8 text-blue-400" />
            )}
          </button>
        </div>
      </div>

      {/* Menu Mobile (Dropdown) */}
      <div
        className={` lg:hidden bg-gray-900 absolute top-full left-0 w-full shadow-lg transform transition-all duration-300 ease-in-out ${
          isOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <ul className="flex flex-col items-center py-4 space-y-4">
          <li>
            <a
              href="#"
              onClick={closeMenu}
              className="flex items-center text-white hover:text-blue-400 transition-colors duration-300 text-xl font-medium py-2 px-4 rounded-lg hover:bg-gray-800 w-full justify-center"
            >
              <FaHome className="mr-3" /> Início
            </a>
          </li>
          <li>
            <a
              href="#previsoes"
              onClick={closeMenu}
              className="flex items-center text-white hover:text-blue-400 transition-colors duration-300 text-xl font-medium py-2 px-4 rounded-lg hover:bg-gray-800 w-full justify-center"
            >
              <FaWater className="mr-3" /> Previsão Marítima
            </a>
          </li>
          <li>
            <a
              href="#sobre"
              onClick={closeMenu}
              className="flex items-center text-white hover:text-blue-400 transition-colors duration-300 text-xl font-medium py-2 px-4 rounded-lg hover:bg-gray-800 w-full justify-center"
            >
              <FaInfoCircle className="mr-3" /> Sobre o Projeto
            </a>
          </li>
          <li>
            <a
              href="#donate"
              onClick={closeMenu}
              className="flex items-center text-white hover:text-blue-400 transition-colors duration-300 text-xl font-medium py-2 px-4 rounded-lg hover:bg-gray-800 w-full justify-center"
            >
              <BiSolidDonateHeart className="mr-3" /> Apoie
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
