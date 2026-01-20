
import React from 'react';

export interface Student {
  id: string;
  nisn: string;
  full_name: string;
  class_name: string;
  gender: 'Laki-laki' | 'Perempuan';
  status: 'Aktif' | 'Izin' | 'Sakit' | 'Alumni';
  created_at: string;
}

export interface Teacher {
  id: string;
  nip: string;
  full_name: string;
  subject: string;
  phone: string;
  is_active: boolean;
  created_at: string;
}

export interface Agenda {
  id: string;
  title: string;
  description: string;
  event_date: string;
  location: string;
}

export interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

export interface DashboardStats {
  totalStudents: number;
  totalTeachers: number;
  activeAgendas: number;
  attendanceRate: string;
}