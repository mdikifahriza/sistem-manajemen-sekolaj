
-- Enable uuid-ossp extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Students Table
CREATE TABLE IF NOT EXISTS students (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nisn VARCHAR(20) UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  class_name VARCHAR(10) NOT NULL,
  gender VARCHAR(10) CHECK (gender IN ('Laki-laki', 'Perempuan')),
  status VARCHAR(10) DEFAULT 'Aktif' CHECK (status IN ('Aktif', 'Izin', 'Sakit', 'Alumni')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Teachers Table
CREATE TABLE IF NOT EXISTS teachers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nip VARCHAR(20) UNIQUE,
  full_name TEXT NOT NULL,
  subject TEXT NOT NULL,
  phone VARCHAR(20),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Agendas Table
CREATE TABLE IF NOT EXISTS agendas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  event_date DATE NOT NULL,
  location TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Academic Reports (Simple)
CREATE TABLE IF NOT EXISTS academic_reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  subject TEXT NOT NULL,
  score INTEGER CHECK (score >= 0 AND score <= 100),
  semester VARCHAR(10) NOT NULL,
  academic_year VARCHAR(20) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- SEED DUMMY DATA
INSERT INTO students (nisn, full_name, class_name, gender, status) VALUES
('0112233445', 'Ahmad Zaki', '6-A', 'Laki-laki', 'Aktif'),
('0112233446', 'Siti Aminah', '6-A', 'Perempuan', 'Aktif'),
('0112233447', 'Budi Santoso', '5-B', 'Laki-laki', 'Izin'),
('0112233448', 'Laila Majnun', '4-C', 'Perempuan', 'Aktif');

INSERT INTO teachers (nip, full_name, subject, phone) VALUES
('19850101201001', 'Drs. H. Mahrus', 'Al-Qur''an Hadits', '08123456789'),
('19900202201502', 'Ustadzah Fatimah', 'Fiqih', '08578912345'),
('19920303201803', 'Pak Ridho, S.Pd', 'Matematika', '08967812345');

INSERT INTO agendas (title, description, event_date, location) VALUES
('PHBI Isra Mi''raj', 'Peringatan hari besar Islam di halaman sekolah.', '2024-02-08', 'Halaman MI'),
('Ujian Tengah Semester', 'Pelaksanaan UTS Genap TA 2023/2024', '2024-03-04', 'Ruang Kelas'),
('Rapat Wali Murid', 'Sosialisasi program akhir tahun.', '2024-05-15', 'Aula Madrasah');
