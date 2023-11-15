import { useEffect, useState } from "react";
import { getStatisticsProducts } from "../api/Reports";
import { PieChart, ResponsiveContainer, Pie, Tooltip, Legend } from "recharts";

export default function Statistics() {
  const [data, setData] = useState([]);

  const { market_id } = JSON.parse(localStorage.getItem("userData"));

  console.log('first', JSON.parse(localStorage.getItem("userData")))

  const loadStatistics = async () => {
    const response = await getStatisticsProducts(market_id);
    console.log(response);
    setData(response.data);
  };

  useEffect(() => {
    loadStatistics();
  }, []);

  console.log(data);

//   return (
//     <div style={{ width: "50%", height: 400 }}>
//       <ResponsiveContainer>
//         <PieChart>
//           <Pie
//             dataKey="quantify"
//             isAnimationActive={false}
//             data={data}
//             cx="50%"
//             cy="50%"
//             outerRadius={80}
//             fill="#8884d8"
//             label
//           >
//             <Tooltip/>
//           </Pie>
//         </PieChart>
//       </ResponsiveContainer>
//     </div>
//   );
return (
    <div className="border p-0" style={{width: '100%', height: 200}}>
        <ResponsiveContainer width="50%">
      <PieChart>
        <Pie
          dataKey="quantify"
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={20}
          outerRadius={80}
          fill="#8884d8"
        />
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
    </div>
)
}
