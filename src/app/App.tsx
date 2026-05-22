import { useState } from "react";
import { LandingPage } from "./components/LandingPage";
import { ParticipantDashboard } from "./components/ParticipantDashboard";
import { AdminDashboard } from "./components/AdminDashboard";

export type UserRole = "guest" | "participant" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  registrationData?: {
    level: string;
    school: string;
    field: string;
    status: "Menunggu Verifikasi" | "Diterima" | "Ditolak" | "Perlu Revisi";
    registrationNumber?: string;
    notes?: string;
  };
}

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const handleLogin = (email: string, password: string) => {
    // Mock login logic
    if (email === "admin@osn.id" && password === "admin") {
      setCurrentUser({
        id: "admin-1",
        name: "Administrator",
        email: "admin@osn.id",
        role: "admin",
      });
    } else {
      // Mock participant login
      setCurrentUser({
        id: "p-1",
        name: "Ahmad Rizki",
        email: email,
        role: "participant",
        registrationData: {
          level: "SMA",
          school: "SMAN 1 Jakarta",
          field: "Matematika",
          status: "Diterima",
          registrationNumber: "OSN-SMA-2026-001",
        },
      });
    }
  };

  const handleRegister = (data: any) => {
    setCurrentUser({
      id: "p-new",
      name: data.name,
      email: data.email,
      role: "participant",
      registrationData: {
        level: data.level,
        school: data.school,
        field: data.field,
        status: "Menunggu Verifikasi",
      },
    });
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  if (!currentUser) {
    return <LandingPage onLogin={handleLogin} onRegister={handleRegister} />;
  }

  if (currentUser.role === "admin") {
    return <AdminDashboard user={currentUser} onLogout={handleLogout} />;
  }

  return <ParticipantDashboard user={currentUser} onLogout={handleLogout} />;
}
