// A diretiva "use client" é usada para indicar que este componente é executado no cliente (browser)
// Essa diretiva é específica para Next.js 13+ quando se utiliza a renderização no lado do cliente.
'use client'

// Importa hooks do React para usar o estado 
import React, { useState } from "react";

// Importa a instância do axios configurada para fazer requisições para a API
import instance from "@/services/api";

// Importar o componente para criar link
import Link from "next/link";

// importar o componente com o Menu
import Menu from "@/components/Menu";

export default function CreateUser() {

    // Estado para o campo name
    const [name, setName] = useState<string>("");

    // Estado para o campo email
    const [email, setEmail] = useState<string>("");

    // Estado para controle de erros
    const [error, setError] = useState<string | null>(null);

    // Estado para controle de sucesso
    const [success, setSuccess] = useState<string | null>(null);

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
            const response = await instance.post("/users", {
                name,
                email,
            });
            // console.log(response.data);

            // Exibir mensagem de sucesso
            setSuccess(response.data.message);

            // Limpa o campo do formulário
            setName("");
            setEmail("");

        } catch (error: any) {
            // console.log(error.response.data);

            // Exibir mensagem de erro
            setError(error.response.data.message);
        }
    }

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            {/* Menu Superior */}
            <Menu />

            {/* Conteúdo Principal */}
            <div className="flex-1 px-2 py-6 max-w-6xl mx-auto w-full">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Cadastrar Usuário</h1>
                    <Link href={'/users/list'} className="bg-cyan-500 text-white px-4 py-2 rounded-md hover:bg-cyan-600">Listar</Link>
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
                    <button type="submit" className="p-2 bg-green-500 text-white rounded-md hover:bg-green-600">Cadastrar</button>

                </form>

            </div>

        </div>
    )
}