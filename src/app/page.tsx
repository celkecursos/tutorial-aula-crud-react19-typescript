// importar o componente com o Menu
import Menu from "@/components/Menu";

// Importar o componente com o gráfico em barra
import UsersBarChart from "@/components/Graphic/User/BarChart";
import UsersAreaChart from "@/components/Graphic/User/AreaChart";

export default function Home() {
  return (
    <div className="flex flex-col h-screen bg-gray-100">

      {/* Menu Superior */}
      <Menu />

      {/* Conteúdo Principal */}
      <div className="flex-1 px-2 py-6 max-w-6xl mx-auto w-full">
        <div className="flex justify-between items-center mb-6">
        </div>

        <div className="mt-6 p-6 bg-white shadow-md rounded-lg flex flex-col md:flex-row items-cente justify-center gap-5">
          <UsersBarChart />
          <UsersAreaChart />
        </div>
      </div>
    </div>
  );
}
