
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
  // Add missing BookOpen import
  BookOpen
} from 'lucide-react';
import { Student, Teacher, Agenda } from './types';

// Mock Data (Fallback if Supabase is not connected)
const mockStudents: Student[] = [
  { id: '1', nisn: '0112233445', full_name: 'Ahmad Zaki', class_name: '6-A', gender: 'Laki-laki', status: 'Aktif', created_at: '' },
  { id: '2', nisn: '0112233446', full_name: 'Siti Aminah', class_name: '6-A', gender: 'Perempuan', status: 'Aktif', created_at: '' },
  { id: '3', nisn: '0112233447', full_name: 'Budi Santoso', class_name: '5-B', gender: 'Laki-laki', status: 'Izin', created_at: '' },
  { id: '4', nisn: '0112233448', full_name: 'Laila Majnun', class_name: '4-C', gender: 'Perempuan', status: 'Aktif', created_at: '' },
];

const mockTeachers: Teacher[] = [
  { id: '1', nip: '19850101201001', full_name: 'Drs. H. Mahrus', subject: 'Al-Qur\'an Hadits', phone: '08123456789', is_active: true, created_at: '' },
  { id: '2', nip: '19900202201502', full_name: 'Ustadzah Fatimah', subject: 'Fiqih', phone: '08578912345', is_active: true, created_at: '' },
];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');

  // UI Helpers
  const renderHeader = (title: string, subtitle: string) => (
    <div className="mb-8 flex justify-between items-end">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">{title}</h2>
        <p className="text-slate-500">{subtitle}</p>
      </div>
      <div className="flex gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Cari data..." 
            className="pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 w-64 text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 shadow-sm transition-colors">
          <Plus size={18} />
          Tambah Baru
        </button>
      </div>
    </div>
  );

  const renderDashboard = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Siswa" value="482" icon={<Users />} trend="+12 Siswa baru" bgColor="bg-blue-500" />
        <StatCard title="Total Guru" value="28" icon={<GraduationCap />} trend="Staf Aktif" bgColor="bg-emerald-600" />
        <StatCard title="Kehadiran Hari Ini" value="96.5%" icon={<BarChart3 />} trend="Meningkat 2%" bgColor="bg-amber-500" />
        <StatCard title="Agenda Mendatang" value="3" icon={<CalendarDays />} trend="Bulan Februari" bgColor="bg-purple-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg text-slate-800">Aktivitas Terbaru</h3>
            <button className="text-emerald-600 text-sm font-semibold hover:underline">Lihat Semua</button>
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
                  <CheckCircle2 size={20} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-800">Input Nilai Raport Selesai</p>
                  <p className="text-xs text-slate-500">Kelas 6-A • Ustadzah Fatimah</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-400">10:45 WIB</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <h3 className="font-bold text-lg text-slate-800 mb-6">Agenda Terdekat</h3>
          <div className="space-y-6">
            <div className="relative pl-6 border-l-2 border-amber-400 space-y-1">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-amber-400 border-2 border-white"></div>
              <p className="text-xs font-bold text-amber-600 uppercase">08 FEBRUARI 2024</p>
              <h4 className="font-bold text-slate-800">Isra Mi'raj 1445 H</h4>
              <p className="text-xs text-slate-500">Halaman Madrasah • 07:30 - Selesai</p>
            </div>
            <div className="relative pl-6 border-l-2 border-emerald-400 space-y-1">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-emerald-400 border-2 border-white"></div>
              <p className="text-xs font-bold text-emerald-600 uppercase">04 MARET 2024</p>
              <h4 className="font-bold text-slate-800">UTS Genap</h4>
              <p className="text-xs text-slate-500">Seluruh Kelas • Serentak</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStudents = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden animate-in slide-in-from-bottom-4 duration-500">
      <table className="w-full text-left">
        <thead className="bg-slate-50 border-b border-slate-100">
          <tr>
            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Siswa</th>
            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">NISN</th>
            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Kelas</th>
            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Gender</th>
            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {mockStudents.map((student) => (
            <tr key={student.id} className="hover:bg-slate-50/50 transition-colors">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs uppercase">
                    {student.full_name.charAt(0)}
                  </div>
                  <span className="text-sm font-semibold text-slate-800">{student.full_name}</span>
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-slate-600">{student.nisn}</td>
              <td className="px-6 py-4 text-sm text-slate-600">{student.class_name}</td>
              <td className="px-6 py-4 text-sm text-slate-600">{student.gender}</td>
              <td className="px-6 py-4 text-sm">
                <span className={`px-2 py-1 rounded-lg text-xs font-bold ${
                  student.status === 'Aktif' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                }`}>
                  {student.status}
                </span>
              </td>
              <td className="px-6 py-4 text-slate-400">
                <button className="hover:text-slate-600"><MoreVertical size={18} /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="p-6 border-t border-slate-100 flex justify-between items-center">
        <p className="text-sm text-slate-500">Menampilkan 1-4 dari 482 siswa</p>
        <div className="flex gap-2">
          <button className="px-3 py-1 border border-slate-200 rounded-lg text-sm hover:bg-slate-50">Prev</button>
          <button className="px-3 py-1 bg-emerald-700 text-white rounded-lg text-sm">1</button>
          <button className="px-3 py-1 border border-slate-200 rounded-lg text-sm hover:bg-slate-50">Next</button>
        </div>
      </div>
    </div>
  );

  const renderMap = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in zoom-in-95 duration-500">
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 space-y-8">
        <div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">Profil Madrasah</h3>
          <p className="text-slate-500 leading-relaxed">
            MI Miftahul Huda 02 Papungan adalah institusi pendidikan dasar berbasis Islami yang berlokasi di Kanigoro, Blitar. Kami berkomitmen mencetak generasi cerdas, berakhlak mulia, dan kompetitif.
          </p>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
              <MapPin size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase">Alamat Lengkap</p>
              <p className="text-slate-700 font-medium">Jl. KH. Agus Salim No. 02, Papungan, Kec. Kanigoro, Kabupaten Blitar, Jawa Timur 66171</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
              <Phone size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase">Hubungi Kami</p>
              <p className="text-slate-700 font-medium">+62 342 123456 / 0812-3456-7890</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
              <Mail size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase">Email Resmi</p>
              <p className="text-slate-700 font-medium">admin@mi-miftahulhuda02.sch.id</p>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100">
          <h4 className="font-bold text-slate-800 mb-3 text-sm">Statistik Geografis</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 p-4 rounded-xl">
              <p className="text-xs text-slate-500">Lintang (Latitude)</p>
              <p className="font-bold text-slate-800">-8.125674</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl">
              <p className="text-xs text-slate-500">Bujur (Longitude)</p>
              <p className="font-bold text-slate-800">112.213456</p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl overflow-hidden shadow-sm border border-slate-100 bg-slate-200 h-[500px] flex items-center justify-center relative group">
        <div className="absolute inset-0 bg-emerald-900/10 group-hover:bg-transparent transition-all z-10 pointer-events-none"></div>
        <div className="text-center z-20">
          <MapPin size={48} className="text-emerald-700 mx-auto mb-4" />
          <p className="font-bold text-emerald-900">Peta Satelit Aktif</p>
          <p className="text-sm text-slate-600">Klik untuk melihat rute di Google Maps</p>
          <a 
            href="https://www.google.com/maps" 
            target="_blank" 
            rel="noopener noreferrer"
            className="mt-6 inline-block bg-white text-emerald-800 px-6 py-2 rounded-full font-bold shadow-lg border border-emerald-100 hover:bg-emerald-50 transition-colors"
          >
            Buka Peta Besar
          </a>
        </div>
        {/* Placeholder for map background */}
        <div 
          className="absolute inset-0 opacity-40 bg-cover bg-center"
          style={{ backgroundImage: `url('https://picsum.photos/seed/school-map/800/600')` }}
        ></div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-slate-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 ml-72 p-10">
        <div className="max-w-7xl mx-auto">
          {activeTab === 'dashboard' && (
            <>
              {renderHeader('Pusat Kendali Utama', 'Selamat datang di SIM MI Miftahul Huda 02 Papungan.')}
              {renderDashboard()}
            </>
          )}
          
          {activeTab === 'students' && (
            <>
              {renderHeader('Manajemen Siswa', 'Kelola data identitas dan status akademik siswa.')}
              {renderStudents()}
            </>
          )}

          {activeTab === 'teachers' && (
            <>
              {renderHeader('Manajemen Guru', 'Database tenaga pendidik dan staf kependidikan.')}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mockTeachers.map(t => (
                  <div key={t.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-amber-500 flex items-center justify-center text-white font-bold text-xl">
                      {t.full_name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-800">{t.full_name}</h4>
                      <p className="text-xs text-emerald-600 font-bold mb-2 uppercase">{t.subject}</p>
                      <div className="flex items-center gap-2 text-slate-500 text-sm">
                        <Phone size={14} />
                        <span>{t.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-500 text-sm mt-1">
                        <Clock size={14} />
                        <span>NIP: {t.nip}</span>
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
                <BookOpen size={48} className="mx-auto text-slate-300 mb-4" />
                <h3 className="font-bold text-slate-800">Modul Raport Digital</h3>
                <p className="text-slate-500 max-w-xs mx-auto">Sistem generasi nilai otomatis sedang dalam pemeliharaan berkala.</p>
              </div>
            </div>
          )}

          {activeTab === 'agenda' && (
             <div className="space-y-6">
               {renderHeader('Agenda Sekolah', 'Jadwal kegiatan akademik dan hari besar Islam.')}
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {[
                   { date: '08 Feb 2024', title: 'Peringatan Isra Mi\'raj', desc: 'Peringatan hari besar islam tingkat sekolah.' },
                   { date: '10 Feb 2024', title: 'Libur Tahun Baru Imlek', desc: 'Sesuai ketetapan pemerintah pusat.' },
                   { date: '04 Mar 2024', title: 'Awal UTS Genap', desc: 'Materi mencakup bab 1 sampai 3.' }
                 ].map((a, i) => (
                   <div key={i} className="bg-white p-6 rounded-2xl border-b-4 border-emerald-600 shadow-sm">
                      <p className="text-xs font-bold text-emerald-600 mb-2">{a.date}</p>
                      <h4 className="font-bold text-slate-800 mb-2">{a.title}</h4>
                      <p className="text-sm text-slate-500">{a.desc}</p>
                   </div>
                 ))}
               </div>
             </div>
          )}

          {activeTab === 'map' && (
            <>
              {renderHeader('Lokasi & Kontak', 'Informasi resmi kantor administrasi madrasah.')}
              {renderMap()}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;