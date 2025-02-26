import { Card, CardContent } from "@components/ui/card";

const StatCard = ({ title, value, icon: Icon }) => {
  return (
    <Card className="p-6 flex items-center space-x-6 shadow-lg border border-gray-200 rounded-lg">
      {Icon && <Icon className="w-14 h-14 text-blue-500" />}
      <div>
        <p className="text-gray-700 text-sm">{title}</p>
        <p className="text-2xl font-semibold text-gray-900">{value}</p>
      </div>
    </Card>
  );
};

export default StatCard;
