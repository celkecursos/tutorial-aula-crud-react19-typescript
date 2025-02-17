// Importar o componente para criar link
import Link from "next/link";

export default function Home() {
  return (
    <div>
      Bem-vindo à Celke!<br/>
      <Link href="/users/list">Usuários</Link>
    </div>
  );
}
