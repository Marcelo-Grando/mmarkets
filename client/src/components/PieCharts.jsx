import {PieChart, ResponsiveContainer, Pie, Tooltip, Cell} from 'recharts'

export default function PieCharts({props}) {
  return (
    <div style={{width: '50%', height:400}}>
        <ResponsiveContainer>
            <PieChart>
                <Pie dataKey={quantify} data={props}>

                </Pie>
            </PieChart>
        </ResponsiveContainer>
    </div>
  )
}
