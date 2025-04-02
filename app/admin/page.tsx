"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { toast, ToastContainer } from "react-toastify";

interface QuizResult {
  id: string;
  name: string;
  score: number;
  total_questions: number;
  created_at: string;
}

export default function AdminPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [results, setResults] = useState<QuizResult[]>([]);

  const login = () => {
    if (username === "yasmin" && password === "#yasmin123") {
      setIsAuthenticated(true);
    } else {
      toast.error("Login incorreto!");
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchResults();
    }
  }, [isAuthenticated]);

  const fetchResults = async () => {
    const { data, error } = await supabase.from("quiz_results").select("*");
    if (!error) setResults(data);
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Relatório de Resultados", 14, 10);
    autoTable(doc, {
      startY: 20,
      head: [["Nome", "Pontuação", "Total de Perguntas", "Data"]],
      body: results.map((r) => [r.name, r.score, r.total_questions, new Date(r.created_at).toLocaleDateString()]),
    });
    doc.save("relatorio.pdf");
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-pink-100">
        <div className="p-8 bg-white shadow-lg rounded-lg w-80">
          <h2 className="text-xl font-bold text-pink-500">Login</h2>
          <input className="border p-2 my-2 w-full rounded" placeholder="Usuário" onChange={(e) => setUsername(e.target.value)} />
          <input className="border p-2 my-2 w-full rounded" placeholder="Senha" type="password" onChange={(e) => setPassword(e.target.value)} />
          <button className="bg-pink-500/75 text-white px-4 py-2 w-full rounded hover:bg-pink-600" onClick={login}>Entrar</button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 min-h-screen bg-gray-100 text-gray-800 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-pink-600">Painel Administrativo</h1>
      <button className="bg-pink-600 text-white px-6 py-3 rounded-lg mt-6 hover:bg-pink-700 transition-all" onClick={exportToPDF}>Exportar PDF</button>
      <div className="mt-6 bg-white shadow-xl rounded-lg p-6 w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-4 text-center">Resultados</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded-lg">
            <thead>
              <tr className="bg-pink-500 text-white">
                <th className="py-3 px-6 text-left">Nome</th>
                <th className="py-3 px-6 text-left">Pontuação</th>
                <th className="py-3 px-6 text-left">Total de Perguntas</th>
                <th className="py-3 px-6 text-left">Data</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result, index) => (
                <tr key={result.id} className={`${index % 2 === 0 ? "bg-pink-100" : "bg-white"} border-b` }>
                  <td className="py-3 px-6">{result.name}</td>
                  <td className="py-3 px-6">{result.score}</td>
                  <td className="py-3 px-6">{result.total_questions}</td>
                  <td className="py-3 px-6">{new Date(result.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ToastContainer theme="colored" autoClose={2000} />
    </div>
  );
}
