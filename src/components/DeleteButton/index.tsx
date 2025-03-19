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
        const confirmDelete = window.confirm("Tem certeza que deseja excluir este registro?");

        if (!confirmDelete) return;

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
            if(onSuccess){
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