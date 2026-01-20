
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import StatCard from './components/StatCard';
import { 
  Users, 
  GraduationCap, 
  CalendarDays, 
  BarChart3, 
  Search, 
  Plus, 
  MapPin,
  Phone,
  Mail,
  MoreVertical,
  CheckCircle2,
  Clock,
  BookOpen,
  AlertCircle,
  Database,
  Calendar
} from 'lucide-react';
import { Student, Teacher, Agenda } from './types';
import { supabase, isSupabaseConnected } from './services/supabaseClient';

// Mock Data for fallback
const mockStudents: Student[] = [
  { id: '1', nisn: '0112233445', full_name: 'Ahmad Zaki (Demo)', class_name: '6-A', gender: 'Laki-laki', status: 'Aktif', created_at: '' },
  { id: '2', nisn: '0112233446', full_name: 'Siti Aminah (Demo)', class_name: '6-A', gender: 'Perempuan', status: 'Aktif', created_at: '' },
  { id: '3', nisn: '0112233447', full_name: 'Budi Santoso (Demo)', class_name: '5-B', gender: 'Laki-laki', status: 'Izin', created_at: '' },
  { id: '4', nisn: '0112233448', full_name: 'Laila Majnun (Demo)', class_name: '4-C', gender: 'Perempuan', status: 'Aktif', created_at: '' },
];

const mockTeachers: Teacher[] = [
  { id: '1', nip: '19850101201001', full_name: 'Drs. H. Mahrus (Demo)', subject: 'Al-Qur\'an Hadits', phone: '08123456789', is_active: true, created_at: '' },
  { id: '2', nip: '19900202201502', full_name: 'Ustadzah Fatimah (Demo)', subject: 'Fiqih', phone: '08578912345', is_active: true, created_at: '' },
];

const mockAgendas: Agenda[] = [
  { id: '1', title: 'Isra Mi\'raj 1445 H (Demo)', description: 'Peringatan hari besar islam.', event_date: '2024-02-08', location: 'Halaman MI' },
  { id: '2', title: 'UTS Genap (Demo)', description: 'Ujian Tengah Semester.', event_date: '2024-03-04', location: 'Ruang Kelas' },
];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Data States
  const [students, setStudents] = useState<Student[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [agendas, setAgendas] = useState<Agenda[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dbError, setDbError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setDbError(null);

      if (!isSupabaseConnected || !supabase) {
        console.warn("Supabase credentials not configured. Using mock data.");
        setStudents(mockStudents);
        setTeachers(mockTeachers);
        setAgendas(mockAgendas);
        setIsLoading(false);
        return;
      }

      try {
        // Fetch all data in parallel from Supabase
        const [studentsRes, teachersRes, agendasRes] = await Promise.all([
          supabase.from('students').select('*').order('created_at', { ascending: false }),
          supabase.from('teachers').select('*').order('full_name', { ascending: true }),
          supabase.from('agendas').select('*').order('event_date', { ascending: true })
        ]);
        
        if (studentsRes.error) throw studentsRes.error;
        if (teachersRes.error) throw teachersRes.error;
        if (agendasRes.error) throw agendasRes.error;

        setStudents(studentsRes.data as Student[]);
        setTeachers(teachersRes.data as Teacher[]);
        setAgendas(agendasRes.data as Agenda[]);
      } catch (error: any) {
        console.error("Supabase connection failed:", error);
        setDbError(error.message || "Failed to connect to Supabase");
        // Fallback to mocks
        setStudents(mockStudents);
        setTeachers(mockTeachers);
        setAgendas(mockAgendas);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderHeader = (title: string, subtitle: string) => (
    <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
      <div>
        <h2 className="text-2xl font-bold text-slate-800 tracking-tight">{title}</h2>
        <div className="flex items-center gap-2 mt-1">
          <p className="text-slate-500 text-sm">{subtitle}</p>
          {isSupabaseConnected ? (
            <span className="flex items-center gap-1 text-[10px] font-bold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200 uppercase tracking-tighter">
              <Database size={10} />
              Supabase Live
            </span>
          ) : (
            <span className="flex items-center gap-1 text-[10px] font-bold bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full border border-amber-200 uppercase tracking-tighter">
              <AlertCircle size={10} />
              Local Mock
            </span>
          )}
        </div>
      </div>
      <div className="flex gap-3 w-full md:w-auto">
        <div className="relative flex-1 md:flex-none">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Cari..." 
            className="pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 w-full md:w-64 text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 shadow-sm transition-all active:scale-95 whitespace-nowrap">
          <Plus size={18} />
          Tambah
        </button>
      </div>
    </div>
  );

  const renderDashboard = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Siswa" value={isLoading ? "..." : students.length} icon={<Users />} trend="+0.5% Bulan ini" bgColor="bg-blue-600" />
        <StatCard title="Total Guru" value={isLoading ? "..." : teachers.length} icon={<GraduationCap />} trend="Staf Aktif" bgColor="bg-emerald-600" />
        <StatCard title="Kehadiran" value="96.5%" icon={<BarChart3 />} trend="Normal" bgColor="bg-amber-500" />
        <StatCard title="Agenda" value={isLoading ? "..." : agendas.length} icon={<CalendarDays />} trend="Feb-Mar" bgColor="bg-purple-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg text-slate-800">Status Sistem</h3>
            <button className="text-emerald-600 text-sm font-semibold hover:underline">Log Aktivitas</button>
          </div>
          <div className="space-y-4">
            {isLoading ? (
              [1, 2, 3].map(i => (
                <div key={i} className="h-16 bg-slate-50 animate-pulse-slow rounded-xl"></div>
              ))
            ) : (
              <>
                <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isSupabaseConnected ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                    <CheckCircle2 size={20} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-slate-800">
                      {isSupabaseConnected ? 'Sinkronisasi Supabase Aktif' : 'Menjalankan Mode Simulasi'}
                    </p>
                    <p className="text-xs text-slate-500">
                      {isSupabaseConnected ? 'Koneksi database berhasil dilakukan melalui Supabase client.' : 'Silakan isi VITE_SUPABASE_URL di .env.local untuk menghubungkan ke Supabase.'}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-400">Baru saja</p>
                  </div>
                </div>
                {students.slice(0, 2).map((s, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-4 rounded-xl bg-white border border-slate-50">
                    <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                      {s.full_name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-800">Siswa Terdaftar: {s.full_name}</p>
                      <p className="text-xs text-slate-400">Kelas {s.class_name}</p>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <h3 className="font-bold text-lg text-slate-800 mb-6">Agenda Terdekat</h3>
          <div className="space-y-6">
            {isLoading ? (
              <div className="h-32 bg-slate-50 animate-pulse rounded-xl"></div>
            ) : agendas.length > 0 ? (
              agendas.slice(0, 3).map((a, i) => (
                <div key={i} className={`relative pl-6 border-l-2 ${i % 2 === 0 ? 'border-amber-400' : 'border-emerald-400'} space-y-1`}>
                  <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 border-white ${i % 2 === 0 ? 'bg-amber-400' : 'bg-emerald-400'}`}></div>
                  <p className={`text-[10px] font-bold uppercase tracking-wider ${i % 2 === 0 ? 'text-amber-600' : 'text-emerald-600'}`}>
                    {new Date(a.event_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                  <h4 className="font-bold text-slate-800 text-sm leading-tight">{a.title}</h4>
                  <p className="text-[11px] text-slate-500">{a.location}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-400 italic">Tidak ada agenda terdaftar.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-slate-50 selection:bg-emerald-100 selection:text-emerald-900">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 ml-72 p-10 overflow-y-auto h-screen">
        <div className="max-w-7xl mx-auto">
          {dbError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-700 text-sm animate-in slide-in-from-top-2">
              <AlertCircle size={20} />
              <div>
                <p className="font-bold">Kesalahan Database</p>
                <p>{dbError}</p>
              </div>
              <button onClick={() => window.location.reload()} className="ml-auto underline font-bold">Coba Lagi</button>
            </div>
          )}

          {activeTab === 'dashboard' && (
            <>
              {renderHeader('Dashboard SIM', 'Pusat integrasi data akademik MI Miftahul Huda 02.')}
              {renderDashboard()}
            </>
          )}
          
          {activeTab === 'students' && (
            <>
              {renderHeader('Manajemen Siswa', 'Kelola data identitas dan status akademik siswa.')}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50 border-b border-slate-100">
                      <tr>
                        <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Nama Lengkap</th>
                        <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest">NISN</th>
                        <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Kelas</th>
                        <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Status</th>
                        <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {isLoading ? (
                         [1, 2, 3, 4].map(i => (
                           <tr key={i}><td colSpan={5} className="px-6 py-4"><div className="h-10 bg-slate-50 animate-pulse-slow rounded-lg"></div></td></tr>
                         ))
                      ) : students.filter(s => s.full_name.toLowerCase().includes(searchTerm.toLowerCase())).map((student) => (
                        <tr key={student.id} className="hover:bg-slate-50/50 transition-colors group">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                                {student.full_name.charAt(0)}
                              </div>
                              <span className="text-sm font-semibold text-slate-800">{student.full_name}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-600 font-mono">{student.nisn}</td>
                          <td className="px-6 py-4 text-sm text-slate-600 font-medium">{student.class_name}</td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                              student.status === 'Aktif' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                            }`}>
                              {student.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="text-slate-400 hover:text-emerald-700"><MoreVertical size={18} /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {activeTab === 'teachers' && (
            <>
              {renderHeader('Manajemen Guru', 'Database tenaga pendidik dan staf kependidikan.')}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {isLoading ? (
                  [1, 2, 3].map(i => <div key={i} className="h-36 bg-white rounded-2xl animate-pulse-slow"></div>)
                ) : teachers.filter(t => t.full_name.toLowerCase().includes(searchTerm.toLowerCase())).map(t => (
                  <div key={t.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex gap-4 hover:shadow-md transition-all">
                    <div className="w-14 h-14 rounded-2xl bg-amber-500 flex items-center justify-center text-white font-bold text-xl shrink-0">
                      {t.full_name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-slate-800 truncate">{t.full_name}</h4>
                      <p className="text-[10px] text-emerald-600 font-bold mb-3 uppercase tracking-widest">{t.subject}</p>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-slate-500 text-xs">
                          <Phone size={12} className="shrink-0" />
                          <span>{t.phone || '-'}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-500 text-xs">
                          <Clock size={12} className="shrink-0" />
                          <span className="truncate">NIP: {t.nip || 'N/A'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === 'academic' && (
            <div className="flex items-center justify-center h-96 bg-white rounded-2xl border-2 border-dashed border-slate-200">
              <div className="text-center">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen size={32} className="text-slate-300" />
                </div>
                <h3 className="font-bold text-slate-800">Modul Raport Digital</h3>
                <p className="text-slate-500 text-sm max-w-xs mx-auto">Sistem generasi nilai otomatis sedang dalam pemeliharaan berkala untuk optimasi data.</p>
              </div>
            </div>
          )}

          {activeTab === 'agenda' && (
             <div className="space-y-6">
               {renderHeader('Agenda Sekolah', 'Jadwal kegiatan akademik dan hari besar.')}
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {isLoading ? (
                   [1, 2, 3].map(i => <div key={i} className="h-40 bg-white rounded-2xl animate-pulse"></div>)
                 ) : agendas.length > 0 ? (
                   agendas.map((a) => (
                     <div key={a.id} className="bg-white p-6 rounded-2xl border-b-4 border-emerald-600 shadow-sm hover:shadow-md transition-all group">
                        <div className="flex items-start justify-between mb-4">
                          <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                            <Calendar size={18} />
                          </div>
                          <span className="text-[10px] font-black text-slate-300 uppercase">{new Date(a.event_date).getFullYear()}</span>
                        </div>
                        <p className="text-[10px] font-bold text-emerald-600 mb-1 uppercase">
                          {new Date(a.event_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long' })}
                        </p>
                        <h4 className="font-bold text-slate-800 mb-2 group-hover:text-emerald-700 transition-colors">{a.title}</h4>
                        <p className="text-xs text-slate-500 line-clamp-2">{a.description}</p>
                        <div className="mt-4 pt-4 border-t border-slate-50 flex items-center gap-2 text-slate-400 text-[11px]">
                          <MapPin size={12} />
                          <span>{a.location}</span>
                        </div>
                     </div>
                   ))
                 ) : (
                   <div className="col-span-full py-20 text-center bg-white rounded-2xl border border-slate-100">
                     <p className="text-slate-400 italic">Belum ada agenda yang dijadwalkan.</p>
                   </div>
                 )}
               </div>
             </div>
          )}

          {activeTab === 'map' && (
            <>
              {renderHeader('Lokasi & Kontak', 'Informasi resmi kantor administrasi madrasah.')}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 space-y-8">
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">Profil MI Miftahul Huda 02</h3>
                    <p className="text-slate-500 leading-relaxed text-sm">
                      Institusi pendidikan dasar berbasis Islami yang berlokasi strategis di Papungan, Kanigoro. Berfokus pada integrasi kurikulum nasional dengan nilai-nilai kepesantrenan yang luhur.
                    </p>
                  </div>
                  
                  <div className="space-y-5">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl shrink-0">
                        <MapPin size={24} />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Alamat Utama</p>
                        <p className="text-slate-700 font-medium text-sm leading-tight">Jl. KH. Agus Salim No. 02, Papungan, Kec. Kanigoro, Kab. Blitar, Jatim</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-blue-50 text-blue-600 rounded-xl shrink-0">
                        <Phone size={24} />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Sekretariat</p>
                        <p className="text-slate-700 font-medium text-sm">+62 342 812 345</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-200 h-[450px] relative group cursor-crosshair">
                  <div className="absolute inset-0 bg-emerald-900/10 group-hover:bg-transparent transition-all z-10 pointer-events-none"></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-20">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl text-emerald-700 animate-bounce">
                      <MapPin size={32} />
                    </div>
                    <p className="font-bold text-emerald-900 bg-white/80 backdrop-blur px-4 py-1 rounded-full text-sm">Lokasi Madrasah</p>
                    <a 
                      href="https://www.google.com/maps" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="mt-6 inline-block bg-emerald-700 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-emerald-800 transition-all active:scale-95"
                    >
                      Buka Rute Navigasi
                    </a>
                  </div>
                  <div 
                    className="absolute inset-0 opacity-60 bg-cover bg-center"
                    style={{ backgroundImage: `url('https://picsum.photos/seed/mi-map/800/600')` }}
                  ></div>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
