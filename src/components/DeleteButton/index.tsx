// A diretiva "use client" é usada para indicar que este componente é executado no cliente (browser)
// Essa diretiva é específica para Next.js 13+ quando se utiliza a renderização no lado do cliente.
'use client'

// SweetAlert2 para apresentar o alerta de confirmação.
import Swal from "sweetalert2";

// Importa a instância do axios configurada para fazer requisições para a API
import instance from "@/services/api";

interface DeleteButtonProps {
    id: string; // ID da situação a ser excluída
    route: string; // Rota para requisição 
    onSuccess?: () => void; // Função de callback após sucesso
    setError: (message: string | null) => void; // Função de callback para retornar mensagem de erro
    setSuccess: (message: string | null) => void; // Função de callback para retornar mensagem de sucesso
}

const DeleteButton = ({ id, route, onSuccess, setError, setSuccess }: DeleteButtonProps) => {

    const handleDelete = async () => {
        // Exibir alerta de confirmação
        const confirmDelete = await Swal.fire({
            title: "Tem certeza?",
            text: "Esta ação não pode ser desfeita!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Sim, Excluir",
            cancelButtonText: "Cancelar"
        });

        if (!confirmDelete.isConfirmed) return;

        // Limpa o erro anterior
        setError(null);

        // Limpa o sucesso anterior
        setSuccess(null);

        try {

            // Fazer a requisição à API
            const response = await instance.delete(`/${route}/${id}`);

            // Exibir mensagem de sucesso
            setSuccess(response.data.mensagem || "Registro apagado com sucesso!");

            // Chamar a função de sucesso, se estiver definida
            if (onSuccess) {
                onSuccess();
            }

        } catch (error: any) {
            // Verifica se o erro contém mensagens de validação
            setError(error.response?.data?.message || "Erro ao apagar o registro!");
        }

    }
    return (
        <div>
            <button className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600" onClick={handleDelete}>
                Apagar
            </button>
        </div>
    )
}

export default DeleteButton;