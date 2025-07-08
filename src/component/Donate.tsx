// src/component/Donate.tsx
import React from "react";
import { FaHeart } from "react-icons/fa";
import { FaPix } from "react-icons/fa6";
import { motion } from "framer-motion";
import { growIn, slideUpFadeIn } from "../animation/animations";

const Donate: React.FC = () => {
  // IMPORTANTE: Use o caminho da sua imagem de QR Code gerada localmente.
  // Substitua '/images/meu-qrcode-pix.png' pelo caminho real da sua imagem no projeto.
  const pixQrCodeLocalPath = "/img/QrCode.jpeg"; // <-- Exemplo de caminho local para sua imagem

  return (
    <section className="p-6 pt-20 bg-gray-900 text-white font-sans min-h-screen flex flex-col items-center justify-center">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <motion.h1
          initial={slideUpFadeIn.initial}
          whileInView={slideUpFadeIn.animate}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl font-extrabold mb-4 text-sky-500 drop-shadow-md"
        >
          <FaHeart className="inline-block mr-3 text-red-500" /> Apoie o
          TideTrack
        </motion.h1>

        <motion.p
          initial={slideUpFadeIn.initial}
          whileInView={slideUpFadeIn.animate}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-lg leading-relaxed text-gray-300"
        >
          O <strong className="text-sky-500">TideTrack</strong> é um projeto de
          código aberto, mantido com paixão e dedicação. Sua contribuição é
          fundamental para nos ajudar a cobrir custos de infraestrutura,
          investir em novas funcionalidades e garantir que a plataforma continue
          a ser uma ferramenta gratuita e de alta qualidade para todos.
        </motion.p>

        <motion.p
          initial={slideUpFadeIn.initial}
          whileInView={slideUpFadeIn.animate}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-lg leading-relaxed text-gray-300 mt-4"
        >
          Cada doação, por menor que seja, faz uma grande diferença e nos motiva
          a continuar aprimorando o monitoramento marítimo global.
        </motion.p>
      </div>

      <div className="max-w-xl w-full mx-auto px-4">
        {/* Método de Pagamento: PIX */}
        <motion.div
          initial={growIn.initial}
          whileInView={growIn.animate}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          className="bg-gray-800 p-8 rounded-lg shadow-xl border border-gray-700 hover:border-blue-600 transition-all duration-300 flex flex-col items-center text-center"
        >
          <FaPix className="w-16 h-16 text-green-400 mb-4" />
          <h2 className="text-2xl font-bold mb-3 text-green-300">
            Doar com Pix
          </h2>
          <p className="text-md text-gray-300 mb-4">
            A forma mais rápida e fácil de apoiar no Brasil. Escaneie o QR Code
            ou use a chave Pix abaixo:
          </p>
          <img
            src={pixQrCodeLocalPath} // <-- AGORA USANDO O CAMINHO DA SUA IMAGEM LOCAL
            alt="QR Code Pix"
            className="w-42 h-42 mb-4 border border-gray-600 rounded-md"
          />
          <p className="text-sm text-gray-500 mt-8">
            Agradecemos imensamente seu apoio ao TideTrack!
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Donate;
