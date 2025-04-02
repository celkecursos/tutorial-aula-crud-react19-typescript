// Importa hooks do React
import { useEffect } from "react";

// SweetAlert2 para apresentar o alerta.
import Swal from "sweetalert2";

// Criar interface para tipar os dados
interface AlertMessageProps {
    type: "success" | "error";
    message: string | null;
}

export default function AlertMessage({ type, message }: AlertMessageProps){
    useEffect(() => {
        if(message){
            Swal.fire({
                icon: type, // 'success' ou 'error'
                title: type === "success" ? "Sucesso" : "Erro!",
                text: message,
                confirmButtonColor: type === "success" ? "#4caf50" : "#f44336",
              });
        }
    }, [message, type]); // Executar quando a `message` ou `type` mudar

    return null; // Remover o retorno já que o SweetAlert2 exibe a mensagem
}