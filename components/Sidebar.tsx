
import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  GraduationCap, 
  BookOpen, 
  Calendar, 
  MapPin, 
  ChevronRight,
  LogOut
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'students', label: 'Manajemen Siswa', icon: <Users size={20} /> },
    { id: 'teachers', label: 'Manajemen Guru', icon: <GraduationCap size={20} /> },
    { id: 'academic', label: 'Laporan Akademik', icon: <BookOpen size={20} /> },
    { id: 'agenda', label: 'Agenda Sekolah', icon: <Calendar size={20} /> },
    { id: 'map', label: 'Lokasi & Kontak', icon: <MapPin size={20} /> },
  ];

  return (
    <div className="h-screen w-72 bg-emerald-900 text-white flex flex-col fixed left-0 top-0 shadow-xl z-50">
      <div className="p-6 border-b border-emerald-800/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center font-bold text-emerald-900 shadow-lg">
            MH
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight">MI Miftahul Huda</h1>
            <p className="text-emerald-400 text-xs font-medium">02 Papungan</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 mt-6 px-4">
        <div className="space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group ${
                activeTab === item.id 
                  ? 'bg-amber-500 text-emerald-950 font-semibold shadow-lg' 
                  : 'text-emerald-100 hover:bg-emerald-800 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                {item.icon}
                <span className="text-sm">{item.label}</span>
              </div>
              {activeTab === item.id && <ChevronRight size={16} />}
            </button>
          ))}
        </div>
      </nav>

      <div className="p-6 border-t border-emerald-800/50 mt-auto">
        <button className="flex items-center gap-3 text-emerald-300 hover:text-white transition-colors w-full px-4 py-2">
          <LogOut size={18} />
          <span className="text-sm font-medium">Logout Admin</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
