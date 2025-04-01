"use client"

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { Button } from '@/components/ui/button';

interface QuizQuestion {
  question: string;
  options: string[];
  answer: string;
}

const quizData: QuizQuestion[] = [
  {
    question: "O que são agentes biológicos?",
    options: [
      "Substâncias químicas utilizadas em laboratórios",
      "Organismos vivos ou seus derivados que podem causar doenças",
      "Equipamentos de proteção individual (EPIs)",
      "Resíduos hospitalares comuns",
    ],
    answer: "Organismos vivos ou seus derivados que podem causar doenças",
  },
  {
    question: "Qual é a principal norma brasileira que regulamenta o gerenciamento de resíduos de serviços de saúde?",
    options: [
      "NR 32",
      "RDC 222/2018 (ANVISA)",
      "Lei do Meio Ambiente",
      "Código de Defesa do Consumidor",
    ],
    answer: "RDC 222/2018 (ANVISA)",
  },
  {
    question: "Qual das opções abaixo é considerada um resíduo biológico?",
    options: [
      "Luvas descartáveis usadas em procedimentos cirúrgicos",
      "Pilhas e baterias usadas",
      "Sobras de alimentos de um hospital",
      "Restos de papel e plástico não contaminados",
    ],
    answer: "Luvas descartáveis usadas em procedimentos cirúrgicos",
  },
  {
    question: "Qual é a maneira correta de descartar uma seringa usada sem agulha?",
    options: [
      "No lixo comum",
      "Em um coletor de perfurocortantes",
      "Em um saco de lixo reciclável",
      "Em um frasco de vidro reutilizável",
    ],
    answer: "Em um coletor de perfurocortantes",
  },
  {
    question: "O que deve ser feito com um frasco de reagente químico inflamável após o uso?",
    options: [
      "Jogar no ralo com bastante água",
      "Descartar no lixo comum, desde que esteja seco",
      "Encaminhar para um sistema de descarte adequado, seguindo normas ambientais",
      "Deixar armazenado no laboratório indefinidamente",
    ],
    answer: "Encaminhar para um sistema de descarte adequado, seguindo normas ambientais",
  },
  {
    question: "Qual é a cor padrão para os sacos de lixo usados no descarte de resíduos infectantes?",
    options: [
      "Azul",
      "Preto",
      "Vermelho",
      "Branco",
    ],
    answer: "Branco",
  },
  {
    question: "Qual dos EPIs é essencial para a manipulação segura de agentes biológicos em um laboratório?",
    options: [
      "Jaleco, luvas e óculos de proteção",
      "Máscara de tecido e sandálias abertas",
      "Roupas casuais e boné",
      "Nenhum, desde que o contato seja mínimo",
    ],
    answer: "Jaleco, luvas e óculos de proteção",
  },
  {
    question: "O que significa a sigla “PGRSS” na área da saúde?",
    options: [
      "Plano de Gerenciamento de Resíduos de Serviços de Saúde",
      "Programa de Gestão de Riscos Sanitários e Sustentáveis",
      "Projeto de Garantia de Reciclagem Segura de Seringas",
      "Protocolo Geral de Resíduos de Segurança Sanitária",
    ],
    answer: "Plano de Gerenciamento de Resíduos de Serviços de Saúde",
  },
  {
    question: "Como os produtos químicos incompatíveis devem ser armazenados?",
    options: [
      "Misturados no mesmo recipiente para economizar espaço",
      "Separados de acordo com suas propriedades químicas e risco de reação",
      "Em prateleiras abertas e sem identificação",
      "Juntos, desde que tampados corretamente",
    ],
    answer: "Separados de acordo com suas propriedades químicas e risco de reação",
  },
  {
    question: "Qual o principal risco do descarte inadequado de resíduos biológicos e químicos?",
    options: [
      "Poluição ambiental e contaminação de solos e águas",
      "Risco de infecção e intoxicação para trabalhadores e comunidade",
      "Multas e penalizações para a instituição responsável",
      "Todas as alternativas anteriores",
    ],
    answer: "Todas as alternativas anteriores",
  },
];

export default function Quiz() {

  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);

  const totalQuestions = quizData.length;

  const handleAnswer = (selectedOption: string) => {
    if (step > 0 && step <= totalQuestions) {
      const currentQuestion = quizData[step - 1];
      if (selectedOption === currentQuestion.answer) {
        setScore((prev) => prev + 1);
      }
    }
    setStep((prev) => prev + 1);
  };

  const handleReset = () => {
    setStep(0);
    setScore(0);
  };

  const variants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-3xl bg-white p-6 sm:p-8 md:p-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5 }}
          >
            {step === 0 && (
              <div className="text-center">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-pink-500/75 drop-shadow-2xl">
                  Conhecimento sobre Armazenamento e Descarte de Agentes Biológicos e Químicos
                </h1>
                <Button onClick={() => setStep(1)} className="mt-4 px-4 bg-pink-500/70 hover:bg-pink-600/75 cursor-pointer w-full text-white text-lg font-semibold py-2">
                  Iniciar Quiz
                </Button>
              </div>
            )}

            {step > 0 && step <= totalQuestions && (
              <div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-6 text-pink-500/75">
                  Pergunta {step} de {totalQuestions}
                </h2>
                <p className="mb-4 text-base sm:text-lg md:text-xl text-pink-500/75">
                  {quizData[step - 1].question}
                </p>
                <div className="grid grid-cols-1 gap-4">
                  {quizData[step - 1].options.map((option, index) => (
                    <Button
                      key={index}
                      onClick={() => handleAnswer(option)}
                      variant="outline"
                      className="w-full min-h-[65px] cursor-pointer text-sm sm:text-base md:text-lg p-2 text-pink-500/75 px-4 py-2 whitespace-normal break-words text-center"
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              </div>
            )}


            {step === totalQuestions + 1 && (
              <div className="text-center">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-pink-500/75">
                  Resultados do Quiz
                </h2>
                <p className="mb-2 text-base sm:text-lg md:text-xl text-pink-500/75">
                  Acertos: {score} de {totalQuestions}
                </p>
                <p className="mb-6 text-base sm:text-lg md:text-xl text-pink-500/75">
                  Erros: {totalQuestions - score} de {totalQuestions}
                </p>
                <p className="mb-6 text-base sm:text-lg md:text-xl text-pink-500/75">
                  Porcentagem de acertos: {((score / totalQuestions) * 100).toFixed(2)}%
                </p>
                <Button onClick={handleReset} className="mt-4 px-4 bg-pink-500/70 hover:bg-pink-600/75 cursor-pointer w-full text-white text-lg font-semibold py-2">
                  Reiniciar Quiz
                </Button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}