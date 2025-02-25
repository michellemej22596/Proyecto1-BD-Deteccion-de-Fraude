import { Card, CardContent } from "@components/ui/card";

const StatCard = ({ title, value, icon: Icon }) => {
  return (
    <Card className="p-4 flex items-center space-x-4 shadow-lg">
      {Icon && <Icon className="w-10 h-10 text-blue-500" />}
      <div>
        <p className="text-gray-600 text-sm">{title}</p>
        <p className="text-xl font-bold">{value}</p>
      </div>
    </Card>
  );
};

export default StatCard;
