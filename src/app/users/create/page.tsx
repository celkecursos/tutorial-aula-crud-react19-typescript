// A diretiva "use client" é usada para indicar que este componente é executado no cliente (browser)
// Essa diretiva é específica para Next.js 13+ quando se utiliza a renderização no lado do cliente.
'use client'

// Importa hooks do React para usar o estado 
import React, { useState } from "react";

// Importa a instância do axios configurada para fazer requisições para a API
import instance from "@/services/api";

// Importar o componente para criar link
import Link from "next/link";

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

        try{

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

        } catch(error: any){
            // console.log(error.response.data);

            // Exibir mensagem de erro
            setError(error.response.data.message);
        }
    }

    return (
        <div>

            <h1>Cadastrar Usuário</h1>

            <Link href={'/users/list'}>Listar</Link>

            {/* Exibe mensagem de erro */}
            {error && <p style={{ color: "#f00" }}>{error}</p>}

            {/* Exibe mensagem de sucesso */}
            {success && <p style={{ color: "#086" }}>{success}</p>}<br/>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Nome: </label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        placeholder="Nome completo do usuário"
                        onChange={(e) => setName(e.target.value)}
                        className="border p-1"
                    />
                </div>
                <div>
                    <label htmlFor="email">E-mail: </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        placeholder="Melhor e-mail do usuário"
                        onChange={(e) => setEmail(e.target.value)}
                        className="border p-1"
                    />
                </div>
                <button type="submit">Cadastrar</button>

            </form>

        </div>
    )
}