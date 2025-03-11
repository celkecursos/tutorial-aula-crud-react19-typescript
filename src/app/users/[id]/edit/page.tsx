// A diretiva "use client" é usada para indicar que este componente é executado no cliente (browser)
// Essa diretiva é específica para Next.js 13+ quando se utiliza a renderização no lado do cliente.
'use client'

// Importa hooks do React para usar o estado 
import React, { useEffect, useState } from "react";

// useParams - Acessar os parâmetros da URL de uma página que usa rotas dinâmicas.
import { useParams } from "next/navigation";

// Importa a instância do axios configurada para fazer requisições para a API
import instance from "@/services/api";

// Importar o componente para criar link
import Link from "next/link";

// importar o componente com o Menu
import Menu from "@/components/Menu";

export default function EditUser() {

    // Usar o useParams para acessar o parâmetro 'id' da URL
    const { id } = useParams();

    // Estado para o campo name
    const [name, setName] = useState<string>("");

    // Estado para o campo email
    const [email, setEmail] = useState<string>("");

    // Estado para controle de erros
    const [error, setError] = useState<string | null>(null);

    // Estado para controle de sucesso
    const [success, setSuccess] = useState<string | null>(null);

    const fetchUserDetail = async () => {
        try {

            // Fazer a requisição à API
            const response = await instance.get(`/users/${id}`);
            // console.log(response.data.user);

            // Preencher os campos com os dados existentes
            setName(response.data.user.name);
            setEmail(response.data.user.email);

        } catch (error: any) {

            // Criar a mensagem genérica de erro
            setError(error.response?.data?.message || "Erro ao carregar o usuário");
        }
    }

    // Função para enviar os dados para a API
    const handleSubmit = async (event: React.FormEvent) => {

        // Evita o recarregamento da página ao enviar o formulário
        event.preventDefault();

        // Limpa o erro anterior
        setError(null);

        // Limpa o sucesso anterior
        setSuccess(null);

        try {

            // Fazer a requisição à API e enviar os dados
            const response = await instance.put(`/users/${id}`, {
                name,
                email,
            });
            // console.log(response.data);

            // Exibir mensagem de sucesso
            setSuccess(response.data.message);

        } catch (error: any) {
            // console.log(error.response.data);

            // Exibir mensagem de erro
            setError(error.response?.data?.message || "Erro ao atualizar o usuário!");
        }
    }

    // Hook para buscar os dados quando o id estiver disponível
    useEffect(() => {
        if (id) {

            // Busca os dados da situação se o id estiver disponível
            fetchUserDetail();

        }
    }, [id]); // Recarrega os dados quando o id mudar

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            {/* Menu Superior */}
            <Menu />

            {/* Conteúdo Principal */}
            <div className="flex-1 px-2 py-6 max-w-6xl mx-auto w-full">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Editar Usuário</h1>
                    <span>
                        <Link href={'/users/list'} className="bg-cyan-500 text-white px-4 py-2 me-1 rounded-md hover:bg-cyan-600">Listar</Link>
                        <Link href={`/users/${id}`} className="bg-blue-500 text-white px-4 py-2 me-1 rounded-md hover:bg-blue-600">Visualizar</Link>
                    </span>
                </div>

                {/* Exibe mensagem de erro */}
                {error && <p className="text-red-500 mt-4">{error}</p>}

                {/* Exibe mensagem de sucesso */}
                {success && <p className="text-green-500 mt-4">{success}</p>}

                <form onSubmit={handleSubmit} className="mt-6 bg-white shadow-md rounded-lg p-6">
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-semibold">Nome: </label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            placeholder="Nome completo do usuário"
                            onChange={(e) => setName(e.target.value)}
                            className="border p-2 w-full mt-1 rounded-md border-blue-100 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:outline-none"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-semibold">E-mail: </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            placeholder="Melhor e-mail do usuário"
                            onChange={(e) => setEmail(e.target.value)}
                            className="border p-2 w-full mt-1 rounded-md border-blue-100 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:outline-none"
                        />
                    </div>
                    <button type="submit" className="p-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600">Salvar</button>

                </form>

            </div>

        </div>
    )
}