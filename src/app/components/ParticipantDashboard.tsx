import { useState } from "react";
import { User } from "../App";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Progress } from "./ui/progress";
import {
  GraduationCap,
  LogOut,
  Upload,
  FileText,
  CheckCircle2,
  Clock,
  XCircle,
  AlertCircle,
  Download,
  User as UserIcon
} from "lucide-react";

interface ParticipantDashboardProps {
  user: User;
  onLogout: () => void;
}

export function ParticipantDashboard({ user, onLogout }: ParticipantDashboardProps) {
  const [uploadedFiles, setUploadedFiles] = useState({
    photo: false,
    studentCard: false,
    schoolLetter: false,
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Diterima":
        return <Badge className="bg-green-500"><CheckCircle2 className="w-3 h-3 mr-1" />Diterima</Badge>;
      case "Ditolak":
        return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" />Ditolak</Badge>;
      case "Perlu Revisi":
        return <Badge className="bg-orange-500"><AlertCircle className="w-3 h-3 mr-1" />Perlu Revisi</Badge>;
      default:
        return <Badge variant="secondary"><Clock className="w-3 h-3 mr-1" />Menunggu Verifikasi</Badge>;
    }
  };

  const getProgressPercentage = () => {
    if (user.registrationData?.status === "Diterima") return 100;
    if (user.registrationData?.status === "Ditolak") return 100;
    if (uploadedFiles.photo && uploadedFiles.studentCard && uploadedFiles.schoolLetter) return 75;
    return 50;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg">OSN 2026</h1>
              <p className="text-xs text-gray-600">Dashboard Peserta</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-semibold">{user.name}</p>
              <p className="text-xs text-gray-600">{user.email}</p>
            </div>
            <Button variant="outline" size="sm" onClick={onLogout}>
              <LogOut className="w-4 h-4 mr-1" />
              Keluar
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Status Card */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Status Pendaftaran</CardTitle>
                <CardDescription>Pantau progres pendaftaran Anda</CardDescription>
              </div>
              {getStatusBadge(user.registrationData?.status || "Menunggu Verifikasi")}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Progres Pendaftaran</span>
                  <span className="text-sm text-gray-600">{getProgressPercentage()}%</span>
                </div>
                <Progress value={getProgressPercentage()} />
              </div>

              <div className="grid md:grid-cols-2 gap-4 pt-4">
                <div>
                  <p className="text-sm text-gray-600">Jenjang</p>
                  <p className="font-semibold">{user.registrationData?.level}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Bidang Studi</p>
                  <p className="font-semibold">{user.registrationData?.field}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Asal Sekolah</p>
                  <p className="font-semibold">{user.registrationData?.school}</p>
                </div>
                {user.registrationData?.registrationNumber && (
                  <div>
                    <p className="text-sm text-gray-600">Nomor Peserta</p>
                    <p className="font-semibold text-blue-600">{user.registrationData.registrationNumber}</p>
                  </div>
                )}
              </div>

              {user.registrationData?.notes && (
                <div className="mt-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                  <p className="text-sm font-semibold text-orange-800 mb-1">Catatan dari Admin:</p>
                  <p className="text-sm text-orange-700">{user.registrationData.notes}</p>
                </div>
              )}

              {user.registrationData?.status === "Diterima" && (
                <Button className="w-full mt-4">
                  <Download className="w-4 h-4 mr-2" />
                  Unduh Bukti Pendaftaran (PDF)
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Tabs defaultValue="biodata" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="biodata">Biodata</TabsTrigger>
            <TabsTrigger value="documents">Dokumen</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
          </TabsList>

          <TabsContent value="biodata">
            <Card>
              <CardHeader>
                <CardTitle>Data Diri Peserta</CardTitle>
                <CardDescription>Informasi lengkap data peserta</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Nama Lengkap</Label>
                    <Input value={user.name} disabled />
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input value={user.email} disabled />
                  </div>
                  <div className="space-y-2">
                    <Label>Jenjang</Label>
                    <Input value={user.registrationData?.level || ""} disabled />
                  </div>
                  <div className="space-y-2">
                    <Label>Bidang Studi</Label>
                    <Input value={user.registrationData?.field || ""} disabled />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label>Asal Sekolah</Label>
                    <Input value={user.registrationData?.school || ""} disabled />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents">
            <Card>
              <CardHeader>
                <CardTitle>Dokumen Persyaratan</CardTitle>
                <CardDescription>Upload dokumen yang diperlukan (Max 5MB, JPG/PNG/PDF)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <FileText className="w-5 h-5 text-blue-600" />
                        <span className="font-medium">Pas Foto 3x4</span>
                      </div>
                      {uploadedFiles.photo ? (
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Terupload
                        </Badge>
                      ) : (
                        <Badge variant="outline">Belum Upload</Badge>
                      )}
                    </div>
                    <Input
                      type="file"
                      accept="image/jpeg,image/png,application/pdf"
                      onChange={() => setUploadedFiles({ ...uploadedFiles, photo: true })}
                      className="mt-2"
                    />
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <FileText className="w-5 h-5 text-blue-600" />
                        <span className="font-medium">Kartu Pelajar</span>
                      </div>
                      {uploadedFiles.studentCard ? (
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Terupload
                        </Badge>
                      ) : (
                        <Badge variant="outline">Belum Upload</Badge>
                      )}
                    </div>
                    <Input
                      type="file"
                      accept="image/jpeg,image/png,application/pdf"
                      onChange={() => setUploadedFiles({ ...uploadedFiles, studentCard: true })}
                      className="mt-2"
                    />
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <FileText className="w-5 h-5 text-blue-600" />
                        <span className="font-medium">Surat Izin Sekolah</span>
                      </div>
                      {uploadedFiles.schoolLetter ? (
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Terupload
                        </Badge>
                      ) : (
                        <Badge variant="outline">Belum Upload</Badge>
                      )}
                    </div>
                    <Input
                      type="file"
                      accept="image/jpeg,image/png,application/pdf"
                      onChange={() => setUploadedFiles({ ...uploadedFiles, schoolLetter: true })}
                      className="mt-2"
                    />
                  </div>
                </div>

                <Button className="w-full mt-4">
                  <Upload className="w-4 h-4 mr-2" />
                  Kirim Semua Dokumen
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="timeline">
            <Card>
              <CardHeader>
                <CardTitle>Riwayat Pendaftaran</CardTitle>
                <CardDescription>Timeline aktivitas pendaftaran Anda</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                      </div>
                      <div className="w-0.5 h-12 bg-gray-200"></div>
                    </div>
                    <div className="flex-1 pb-4">
                      <p className="font-semibold">Akun Dibuat</p>
                      <p className="text-sm text-gray-600">28 April 2026, 10:30 WIB</p>
                      <p className="text-sm text-gray-500 mt-1">Akun berhasil didaftarkan</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                      </div>
                      <div className="w-0.5 h-12 bg-gray-200"></div>
                    </div>
                    <div className="flex-1 pb-4">
                      <p className="font-semibold">Formulir Terisi</p>
                      <p className="text-sm text-gray-600">28 April 2026, 10:45 WIB</p>
                      <p className="text-sm text-gray-500 mt-1">Data diri dan pilihan bidang studi tersimpan</p>
                    </div>
                  </div>

                  {user.registrationData?.status === "Diterima" && (
                    <>
                      <div className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                            <CheckCircle2 className="w-4 h-4 text-green-600" />
                          </div>
                          <div className="w-0.5 h-12 bg-gray-200"></div>
                        </div>
                        <div className="flex-1 pb-4">
                          <p className="font-semibold">Dokumen Diverifikasi</p>
                          <p className="text-sm text-gray-600">29 April 2026, 14:20 WIB</p>
                          <p className="text-sm text-gray-500 mt-1">Admin telah memverifikasi dokumen Anda</p>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                            <CheckCircle2 className="w-4 h-4 text-green-600" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-green-600">Pendaftaran Diterima</p>
                          <p className="text-sm text-gray-600">29 April 2026, 14:25 WIB</p>
                          <p className="text-sm text-gray-500 mt-1">
                            Selamat! Nomor peserta: {user.registrationData.registrationNumber}
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
