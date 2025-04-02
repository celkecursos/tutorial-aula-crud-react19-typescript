// A diretiva "use client" é usada para indicar que este componente é executado no cliente (browser)
// Essa diretiva é específica para Next.js 13+ quando se utiliza a renderização no lado do cliente.
'use client'

// Importa hooks do React para usar o estado 
import { useEffect, useState } from "react";

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
}

export default function Users() {
    // Estado para controle de erros
    const [error, setError] = useState<string | null>(null);

    // Estado para controle de sucesso
    const [success, setSuccess] = useState<string | null>(null);

    // Estado para armazenar os usuários
    const [users, setUsers] = useState<User[]>([]);

    // Função para buscar os usuário da API
    const fetchUsers = async () => {
        try {

            // Fazer a requisição à API
            const response = await instance.get("/users");
            // console.log(response.data);

            // Atualizar o estado com os dados da API
            setUsers(response.data);

        } catch (error) {
            // Criar a mensagem genérica de erro
            setError("Erro ao carregar os usuários");

        }
    }

    // Atualizar a lista de registros após apagar o registro
    const handleSucess = () => {
        fetchUsers();
    }

    // Hook para buscar os dados na primeira renderização
    useEffect(() => {

        // Recuperar a mensagem salva no sessionStorage
        const message = sessionStorage.getItem("successMessage");

        // Verificar se existe a mensagem
        if (message) {

            // Atribuir a mensagem
            setSuccess(message);

            // Remover para evitar duplicação
            sessionStorage.removeItem("successMessage");
        }

        // Busca os dados ao carregar a página
        fetchUsers();
    }, []);

    return (
        <div className="flex flex-col h-screen bg-gray-100">

            {/* Menu Superior */}
            <Menu />

            {/* Conteúdo Principal */}
            <div className="flex-1 px-2 py-6 max-w-6xl mx-auto w-full">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Listar Usuários</h1>
                    <Link href={'/users/create'} className="bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-600">Cadastrar</Link>
                </div>

                {/* Exibe o alerta de erro */}
                <AlertMessage type="error" message={error} />

                {/* Exibe o alerta de sucesso */}
                <AlertMessage type="success" message={success} />

                {/* Tabela */}
                <div className="mt-6 bg-white shadow-md rounded-lg p-6">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border p-3 text-left">ID</th>
                                <th className="border p-3 text-left">Nome</th>
                                <th className="border p-3 text-left">E-mail</th>
                                <th className="border p-3 text-center">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-100">
                                    <td className="border p-3">{user.id}</td>
                                    <td className="border p-3">{user.name}</td>
                                    <td className="border p-3">{user.email}</td>
                                    <td className="border p-3 text-center space-x-1 flex justify-center items-center">
                                        <Link href={`/users/${user.id}`} className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600">Visualizar</Link>
                                        <Link href={`/users/${user.id}/edit`} className="bg-yellow-500 text-white px-2 py-1 rounded-md hover:bg-yellow-600">Editar</Link>
                                        <DeleteButton
                                            id={String(user.id)}
                                            route="users"
                                            onSuccess={handleSucess}
                                            setError={setError}
                                            setSuccess={setSuccess}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}