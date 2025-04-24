// A diretiva "use client" é usada para indicar que este componente é executado no cliente (browser)
// Essa diretiva é específica para Next.js 13+ quando se utiliza a renderização no lado do cliente.
'use client'

// Importa hooks do React para usar o estado "useState" e os efeitos colaterais "useEffect"
import { useEffect, useState } from "react";

// useParams - Acessar os parâmetros da URL de uma página que usa rotas dinâmicas.
// Importa hooks usado para manipular a navegação do usuário
import { useParams, useRouter } from "next/navigation";

// Importar a biblioteca para gerar PDF.
import jsPDF from "jspdf";

// Importa a instância do axios configurada para fazer requisições para a API
import instance from "@/services/api";

// Importar o componente para criar link
import Link from "next/link";

// importar o componente com o Menu
import Menu from "@/components/Menu";

// Importa o componente para apagar registro
import DeleteButton from "@/components/DeleteButton";

// Importar o componente com o alerta
import AlertMessage from "@/components/AlertMessage";

// Definir tipos para a resposta da API
interface User {
    id: number,
    name: string,
    email: string,
    createdAt: string,
    updatedAt: string,
}

export default function UserDetails() {

    // Usando o useParams para acessar o parâmetro 'id' da URL
    const { id } = useParams();

    // Instancia o objeto router
    const router = useRouter();

    // Estado para armazenar o usuário
    const [user, setUser] = useState<User | null>(null);

    // Estado para controle de erros
    const [error, setError] = useState<string | null>(null);

    // Estado para controle de sucesso
    const [success, setSuccess] = useState<string | null>(null);

    const fetchUserDetail = async (id: string) => {
        try {

            // Fazer a requisição à API
            const response = await instance.get(`/users/${id}`);
            // console.log(response.data.user);

            // Atualizar o estado com os dados da API
            setUser(response.data.user);

        } catch (error: any) {

            // Criar a mensagem genérica de erro
            setError(error.response?.data?.message || "Erro ao carregar o usuário");
        }
    }

    // Redirecionar para a página listar após apagar o registro
    const handleSucess = () => {

        // Salvar a mensagem no sessionStorage antes de redirecionar 
        sessionStorage.setItem("successMessage", "Registro apagado com sucesso");

        // Redireciona para a página de listar
        router.push("/users/list");

    }

    // Hook para buscar os dados quando o id estiver disponível
    useEffect(() => {
        if (id) {
            // Garantir que id seja uma string
            const userId = Array.isArray(id) ? id[0] : id;

            // Busca os dados da situação se o id estiver disponível
            fetchUserDetail(userId);

        }
    }, [id]); // Recarrega os dados quando o id mudar

    // Gerar PDF dos dados do usuário
    const generatePdf = () => {

        // Verificar se existe o usuário
        if(!user) return;

        // Instanciar a biblioteca para gerar o PDF
        const doc = new jsPDF();

        /***** Início do conteúdo do PDF *****/
        doc.setFontSize(16);
        doc.text('Detalhes do Usuário', 20, 20);

        doc.setFontSize(12);
        // 20: é a posição horizontal (eixo X) — quantos milímetros da margem esquerda.
        // 40: é a posição vertical (eixo Y) — quantos milímetros a partir do topo da página.
        doc.text(`ID: ${user.id}`, 20, 40);
        doc.text(`Nome: ${user.name}`, 20, 50);
        doc.text(`E-mail: ${user.email}`, 20, 60);
        doc.text(`Criado em: ${new Date(user.createdAt).toLocaleString()}`, 20, 70);
        doc.text(`Editado em: ${new Date(user.updatedAt).toLocaleString()}`, 20, 80);
        /***** Fim do conteúdo do PDF *****/

        // Atribuir o nome do arquivo e gerar o PDF
        doc.save(`usuario-${user.id}.pdf`);
    }

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            {/* Menu Superior */}
            <Menu />

            {/* Conteúdo Principal */}
            <div className="flex-1 px-2 py-6 max-w-6xl mx-auto w-full">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Detalhes do Usuário</h1>
                    <span className="flex space-x-1">
                        <Link href={'/users/list'} className="bg-cyan-500 text-white px-2 py-1 rounded-md hover:bg-cyan-600">Listar</Link>
                        <button onClick={generatePdf} className="bg-yellow-500 text-white px-2 py-1 rounded-md hover:bg-yellow-600">
                            Gerar PDF
                        </button>
                        <Link href={`/users/${id}/edit`} className="bg-yellow-500 text-white px-2 py-1 rounded-md hover:bg-yellow-600">Editar</Link>
                        {user && !error && (
                            <DeleteButton
                                id={String(user.id)}
                                route="users"
                                onSuccess={handleSucess}
                                setError={setError}
                                setSuccess={setSuccess}
                            />
                        )}
                    </span>
                </div>

                {/* Exibe o alerta de erro */}
                <AlertMessage type="error" message={error} />

                {user && !error && (
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-4 text-gray-800">Informações do Usuário</h2>
                        <div className="text-gray-700">
                            <div className="mb-1">
                                <span className="font-bold">ID: </span>{user.id}
                            </div>
                            <div className="mb-1">
                                <span className="font-bold">Nome: </span>{user.name}
                            </div>
                            <div className="mb-1">
                                <span className="font-bold">E-mail: </span>{user.email}
                            </div>
                            <div className="mb-1">
                                <span className="font-bold">Criado em: </span>{new Date(user.createdAt).toLocaleString()}
                            </div>
                            <div className="mb-1">
                                <span className="font-bold">Editado em: </span>{new Date(user.updatedAt).toLocaleString()}
                            </div>
                        </div>
                    </div>
                )}


            </div>
        </div>
    )
}
