import StatCard from '@components/StatCard'; 
import { useEffect, useState } from "react";
import { DollarSign, AlertTriangle, Users, Activity } from "lucide-react";

const Dashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch("/api/estadisticas") //API
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((error) => console.error("Error fetching stats:", error));
  }, []);

  if (!stats) return <p className="text-center text-gray-500">Cargando estadísticas...</p>;

  return (
    <div className="m-[1cm]">
      <div className="container mx-auto p-6">
        {/* Contenedor grid para diseño en pantallas grandes */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <StatCard title="Total Transacciones" value={stats.total_transacciones} icon={DollarSign} />
          <StatCard title="Fraudes Detectados" value={stats.fraudes_detectados} icon={AlertTriangle} />
          <StatCard title="Clientes Sospechosos" value={stats.clientes_sospechosos} icon={Users} />
          <StatCard title="Transacciones Sospechosas" value={stats.transacciones_sospechosas} icon={Activity} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
