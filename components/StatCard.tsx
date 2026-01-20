
import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  bgColor: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, trend, bgColor }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md transition-shadow">
      <div className={`p-3 rounded-xl ${bgColor} text-white`}>
        {icon}
      </div>
      <div>
        <p className="text-slate-500 text-sm font-medium">{title}</p>
        <h3 className="text-2xl font-bold text-slate-800">{value}</h3>
        {trend && (
          <p className="text-emerald-600 text-xs mt-1 font-semibold">{trend}</p>
        )}
      </div>
    </div>
  );
};

export default StatCard;
