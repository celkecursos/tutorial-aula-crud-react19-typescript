// Importar o componente para criar link
import Link from "next/link";

// importar o componente com o Menu
import Menu from "@/components/Menu";

export default function Home() {
  return (
    <div className="flex flex-col h-screen bg-gray-100">

      {/* Menu Superior */}
      <Menu />

      Bem-vindo à Celke!<br />
      <Link href="/users/list">Usuários</Link>
    </div>
  );
}
