// A diretiva "use client" é usada para indicar que este componente é executado no cliente (browser)
// Essa diretiva é específica para Next.js 13+ quando se utiliza a renderização no lado do cliente.
'use client'

// Importar os componentes do grafico
import { Area, AreaChart, CartesianAxis, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

// Definir o tipo dos dados esperados
interface UserAreaChartProps {
    data: { 
        month: string,
        users: number,
    }[];
}

const UsersAreaChart = ({ data }: UserAreaChartProps) => {
    return (
        <div className="w-full h-96">
            <h2 className="text-base font-semibold text-gray-700 text-center">Usuários Inscritos Mensalmente</h2>

            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    data={data}
                    margin={{
                        top: 20,
                        right: 0,
                        left: -25,
                        bottom: 25,
                    }}
                >
                    <CartesianAxis strokeDasharray="0" />
                    <XAxis dataKey="month" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Area type="monotone" dataKey="users" fill="#63B3ED" stroke="3182CE" />
                </AreaChart>
            </ResponsiveContainer>

        </div>
    )
}

export default UsersAreaChart;