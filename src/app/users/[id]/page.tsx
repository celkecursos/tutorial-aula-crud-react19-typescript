// A diretiva "use client" é usada para indicar que este componente é executado no cliente (browser)
// Essa diretiva é específica para Next.js 13+ quando se utiliza a renderização no lado do cliente.
'use client'

// Importa hooks do React para usar o estado "useState" e os efeitos colaterais "useEffect"
import { useEffect, useState } from "react";

// useParams - Acessar os parâmetros da URL de uma página que usa rotas dinâmicas.
import { useParams } from "next/navigation";

// Importa a instância do axios configurada para fazer requisições para a API
import instance from "@/services/api";

// Importar o componente para criar link
import Link from "next/link";

// importar o componente com o Menu
import Menu from "@/components/Menu";

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

    // Estado para armazenar o usuário
    const [user, setUser] = useState<User | null>(null);

    // Estado para controle de erros
    const [error, setError] = useState<string | null>(null);

    const fetchUserDetail = async (id: string) => {
        try {

            // Fazer a requisição à API
            const response = await instance.get(`/users/${id}`);
            // console.log(response.data.user);

            // Atualizar o estado com os dados da API
            setUser(response.data.user);

        } catch (error: any) {

            // Criar a mensagem genérica de erro
            setError("Erro ao carregar o usuário");
        }
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

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            {/* Menu Superior */}
            <Menu />

            {/* Conteúdo Principal */}
            <div className="flex-1 px-2 py-6 max-w-6xl mx-auto w-full">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Detalhes do Usuário</h1>
                    <Link href={'/users/list'} className="bg-cyan-500 text-white px-4 py-2 rounded-md hover:bg-cyan-600">Listar</Link>
                </div>

                {/* Exibe mensagem de erro */}
                {error && <p className="text-red-500 mt-4">{error}</p>}

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
