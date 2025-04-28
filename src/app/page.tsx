// A diretiva "use client" é usada para indicar que este componente é executado no cliente (browser)
// Essa diretiva é específica para Next.js 13+ quando se utiliza a renderização no lado do cliente.
'use client'

// Importa hooks do React para usar o estado 
import { useEffect, useState } from "react";

// Importa a instância do axios configurada para fazer requisições para a API
import instance from "@/services/api";

// importar o componente com o Menu
import Menu from "@/components/Menu";

// Importar o componente com o alerta
import AlertMessage from "@/components/AlertMessage";

// Importar o componente com o gráfico em barra
import UsersBarChart from "@/components/Graphic/User/BarChart";
import UsersAreaChart from "@/components/Graphic/User/AreaChart";

// Definir tipos para os dados do gráfico
interface UserReport {
  month: string,
  users: number,
}

export default function Home() {
  // Estado para controle de erros
  const [error, setError] = useState<string | null>(null);

  // Estado para controle de sucesso
  const [success, setSuccess] = useState<string | null>(null);

  // Estado para armazenar os dados do gráfico usuários
  const [usersReport, setUsersReport] = useState<UserReport[]>([]);

  const fetchReports = async () => {
    try {

      // Limpar o erro anterior
      setError(null);

      // Limpar o sucesso anterior
      setSuccess(null);

      // Fazer múltiplas requisições simultaneamente
      const [usersReport] = await Promise.all([
        instance.get(`/users-report`),
      ]);

      // Atribuir os dados que a API retornou
      setUsersReport(usersReport.data);

    } catch (error) {

      // Criar a mensagem genérica de erro
      setError("Erro gerar dados para o gráfico!");

    }
  }

  // Buscar os dados ao carregar a página
  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gray-100">

      {/* Menu Superior */}
      <Menu />

      {/* Exibe o alerta de erro */}
      <AlertMessage type="error" message={error} />

      {/* Exibe o alerta de sucesso */}
      <AlertMessage type="success" message={success} />

      {/* Conteúdo Principal */}
      <div className="flex-1 px-2 py-6 max-w-6xl mx-auto w-full">
        <div className="flex justify-between items-center mb-6">
        </div>

        <div className="mt-6 p-6 bg-white shadow-md rounded-lg flex flex-col md:flex-row items-cente justify-center gap-5">
          <UsersBarChart data={usersReport} />
          <UsersAreaChart data={usersReport} />
        </div>
      </div>
    </div>
  );
}
