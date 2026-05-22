import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { GraduationCap, Award, Users, FileCheck } from "lucide-react";

interface LandingPageProps {
  onLogin: (email: string, password: string) => void;
  onRegister: (data: any) => void;
}

export function LandingPage({ onLogin, onRegister }: LandingPageProps) {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    school: "",
    level: "",
    field: "",
  });

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(loginEmail, loginPassword);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRegister(registerData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg">OSN 2026</h1>
              <p className="text-xs text-gray-600">Sistem Pendaftaran</p>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Olimpiade Sains Nasional 2026
          </h2>
          <p className="text-lg text-gray-600 mb-2">
            Tingkat Daerah
          </p>
          <p className="text-gray-600">
            Daftarkan diri Anda untuk mengikuti kompetisi sains bergengsi tingkat nasional
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Pendaftaran Online</h3>
              <p className="text-sm text-gray-600">Daftar kapan saja dan dimana saja</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileCheck className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Verifikasi Cepat</h3>
              <p className="text-sm text-gray-600">Proses verifikasi maksimal 3 hari</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">3 Jenjang</h3>
              <p className="text-sm text-gray-600">SD, SMP, dan SMA</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="font-semibold mb-2">7 Bidang Studi</h3>
              <p className="text-sm text-gray-600">Matematika, Fisika, Kimia, Biologi, dan lainnya</p>
            </CardContent>
          </Card>
        </div>

        {/* Auth Forms */}
        <div className="max-w-2xl mx-auto">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Masuk</TabsTrigger>
              <TabsTrigger value="register">Daftar Akun</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <Card>
                <CardHeader>
                  <CardTitle>Masuk ke Sistem</CardTitle>
                  <CardDescription>
                    Gunakan email dan password Anda untuk masuk
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleLoginSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-email">Email</Label>
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="nama@email.com"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="login-password">Password</Label>
                      <Input
                        id="login-password"
                        type="password"
                        placeholder="••••••••"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      Masuk
                    </Button>
                    <div className="text-sm text-center text-gray-600 space-y-1">
                      <p>Demo Login:</p>
                      <p>Admin: admin@osn.id / admin</p>
                      <p>Peserta: isi email apa saja / password apa saja</p>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="register">
              <Card>
                <CardHeader>
                  <CardTitle>Daftar Akun Baru</CardTitle>
                  <CardDescription>
                    Isi formulir di bawah untuk membuat akun peserta
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleRegisterSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nama Lengkap *</Label>
                        <Input
                          id="name"
                          placeholder="Ahmad Rizki"
                          value={registerData.name}
                          onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="ahmad@email.com"
                          value={registerData.email}
                          onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="password">Password *</Label>
                        <Input
                          id="password"
                          type="password"
                          placeholder="••••••••"
                          value={registerData.password}
                          onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Konfirmasi Password *</Label>
                        <Input
                          id="confirm-password"
                          type="password"
                          placeholder="••••••••"
                          value={registerData.confirmPassword}
                          onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="school">Asal Sekolah *</Label>
                      <Input
                        id="school"
                        placeholder="SMAN 1 Jakarta"
                        value={registerData.school}
                        onChange={(e) => setRegisterData({ ...registerData, school: e.target.value })}
                        required
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="level">Jenjang *</Label>
                        <Select
                          value={registerData.level}
                          onValueChange={(value) => setRegisterData({ ...registerData, level: value })}
                          required
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih jenjang" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="SD">SD</SelectItem>
                            <SelectItem value="SMP">SMP</SelectItem>
                            <SelectItem value="SMA">SMA</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="field">Bidang Studi *</Label>
                        <Select
                          value={registerData.field}
                          onValueChange={(value) => setRegisterData({ ...registerData, field: value })}
                          required
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih bidang" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Matematika">Matematika</SelectItem>
                            <SelectItem value="Fisika">Fisika</SelectItem>
                            <SelectItem value="Kimia">Kimia</SelectItem>
                            <SelectItem value="Biologi">Biologi</SelectItem>
                            <SelectItem value="Komputer">Komputer</SelectItem>
                            <SelectItem value="Astronomi">Astronomi</SelectItem>
                            <SelectItem value="Ekonomi">Ekonomi</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <Button type="submit" className="w-full">
                      Daftar Sekarang
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-gray-50 mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-gray-600">
          <p>© 2026 Olimpiade Sains Nasional - Sistem Pendaftaran Online</p>
          <p className="mt-1">Dikembangkan untuk Software Engineering Course</p>
        </div>
      </footer>
    </div>
  );
}
