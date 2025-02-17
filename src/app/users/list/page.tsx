// A diretiva "use client" é usada para indicar que este componente é executado no cliente (browser)
// Essa diretiva é específica para Next.js 13+ quando se utiliza a renderização no lado do cliente.
'use client'

// Importa hooks do React para usar o estado 
import { useEffect, useState } from "react";

// Importa a instância do axios configurada para fazer requisições para a API
import instance from "@/services/api";

// Definir tipos para a resposta da API
interface User {
    id: number,
    name: string,
    email: string,
}

export default function Users() {
    // Estado para controle de erros
    const [error, setError] = useState<string | null>(null);

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

    // Hook para buscar os dados na primeira renderização
    useEffect(() => {
        // Busca os dados ao carregar a página
        fetchUsers();
    }, []);

    return (
        <div>

            <h1>Listar Usuários</h1>

            {/* Exibe mensagem de erro */}
            {error && <p style={{ color: "#f00" }}>{error}</p>}

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>E-mail</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}