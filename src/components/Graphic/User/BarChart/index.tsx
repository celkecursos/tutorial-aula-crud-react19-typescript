// A diretiva "use client" é usada para indicar que este componente é executado no cliente (browser)
// Essa diretiva é específica para Next.js 13+ quando se utiliza a renderização no lado do cliente.
'use client'

// Importar os componentes do grafico em barra
import { Bar, BarChart, CartesianAxis, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

// Dados de exemplo: quantidade de usuários inscritos nos últimos 12 meses
const data = [
    { month: "Jan", users: 120 },
    { month: "Fev", users: 90 },
    { month: "Mar", users: 150 },
    { month: "Abr", users: 80 },
    { month: "Mai", users: 110 },
    { month: "Jun", users: 140 },
    { month: "Jul", users: 130 },
    { month: "Ago", users: 160 },
    { month: "Set", users: 170 },
    { month: "Out", users: 200 },
    { month: "Nov", users: 220 },
    { month: "Dez", users: 250 },
];

const UsersBarChart = () => {
    return (
        <div className="w-full h-96">
            <h2 className="text-base font-semibold text-gray-700 text-center">Usuários Inscritos Mensalmente</h2>

            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{
                    top: 20,
                    right: 0,
                    left: -25,
                    bottom: 25,
                }}>
                    <CartesianAxis strokeDasharray="0" />
                    <XAxis dataKey="month"/>
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="users" fill="#3182CE" barSize={50} />
                </BarChart>
            </ResponsiveContainer>

        </div>
    )
}

export default UsersBarChart;