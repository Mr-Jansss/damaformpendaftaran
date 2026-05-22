import { useState } from "react";
import { User } from "../App";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Label } from "./ui/label";
import {
  GraduationCap,
  LogOut,
  Users,
  CheckCircle2,
  Clock,
  XCircle,
  AlertCircle,
  Search,
  Download,
  BarChart3,
  FileText,
  Eye,
  Filter
} from "lucide-react";

interface AdminDashboardProps {
  user: User;
  onLogout: () => void;
}

interface Participant {
  id: string;
  name: string;
  email: string;
  level: string;
  school: string;
  field: string;
  status: "Menunggu Verifikasi" | "Diterima" | "Ditolak" | "Perlu Revisi";
  registrationNumber?: string;
  registrationDate: string;
  notes?: string;
}

export function AdminDashboard({ user, onLogout }: AdminDashboardProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterLevel, setFilterLevel] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedParticipant, setSelectedParticipant] = useState<Participant | null>(null);
  const [verificationStatus, setVerificationStatus] = useState("");
  const [verificationNotes, setVerificationNotes] = useState("");

  // Mock data
  const [participants, setParticipants] = useState<Participant[]>([
    {
      id: "1",
      name: "Ahmad Rizki",
      email: "ahmad@email.com",
      level: "SMA",
      school: "SMAN 1 Jakarta",
      field: "Matematika",
      status: "Diterima",
      registrationNumber: "OSN-SMA-2026-001",
      registrationDate: "28 Apr 2026",
    },
    {
      id: "2",
      name: "Siti Nurhaliza",
      email: "siti@email.com",
      level: "SMP",
      school: "SMPN 5 Bandung",
      field: "Fisika",
      status: "Menunggu Verifikasi",
      registrationDate: "28 Apr 2026",
    },
    {
      id: "3",
      name: "Budi Santoso",
      email: "budi@email.com",
      level: "SMA",
      school: "SMAN 3 Surabaya",
      field: "Kimia",
      status: "Perlu Revisi",
      registrationDate: "27 Apr 2026",
      notes: "Foto kartu pelajar tidak jelas, mohon upload ulang dengan kualitas lebih baik"
    },
    {
      id: "4",
      name: "Dewi Lestari",
      email: "dewi@email.com",
      level: "SD",
      school: "SDN 10 Yogyakarta",
      field: "Matematika",
      status: "Diterima",
      registrationNumber: "OSN-SD-2026-001",
      registrationDate: "27 Apr 2026",
    },
    {
      id: "5",
      name: "Eko Prasetyo",
      email: "eko@email.com",
      level: "SMP",
      school: "SMPN 2 Semarang",
      field: "Biologi",
      status: "Ditolak",
      registrationDate: "26 Apr 2026",
      notes: "Data sekolah tidak sesuai dengan dokumen yang diunggah"
    },
  ]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Diterima":
        return <Badge className="bg-green-500"><CheckCircle2 className="w-3 h-3 mr-1" />Diterima</Badge>;
      case "Ditolak":
        return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" />Ditolak</Badge>;
      case "Perlu Revisi":
        return <Badge className="bg-orange-500"><AlertCircle className="w-3 h-3 mr-1" />Perlu Revisi</Badge>;
      default:
        return <Badge variant="secondary"><Clock className="w-3 h-3 mr-1" />Menunggu</Badge>;
    }
  };

  const stats = {
    total: participants.length,
    waiting: participants.filter(p => p.status === "Menunggu Verifikasi").length,
    accepted: participants.filter(p => p.status === "Diterima").length,
    rejected: participants.filter(p => p.status === "Ditolak").length,
    needsRevision: participants.filter(p => p.status === "Perlu Revisi").length,
  };

  const filteredParticipants = participants.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       p.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       p.school.toLowerCase().includes(searchTerm.toLowerCase());
    const matchLevel = filterLevel === "all" || p.level === filterLevel;
    const matchStatus = filterStatus === "all" || p.status === filterStatus;
    return matchSearch && matchLevel && matchStatus;
  });

  const handleVerify = () => {
    if (selectedParticipant && verificationStatus) {
      const updatedParticipants = participants.map(p => {
        if (p.id === selectedParticipant.id) {
          return {
            ...p,
            status: verificationStatus as any,
            notes: verificationNotes,
            registrationNumber: verificationStatus === "Diterima"
              ? `OSN-${p.level}-2026-${String(participants.length + 1).padStart(3, '0')}`
              : undefined
          };
        }
        return p;
      });
      setParticipants(updatedParticipants);
      setSelectedParticipant(null);
      setVerificationStatus("");
      setVerificationNotes("");
    }
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
              <p className="text-xs text-gray-600">Dashboard Administrator</p>
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
        {/* Statistics Cards */}
        <div className="grid md:grid-cols-5 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Peserta</p>
                  <p className="text-2xl font-bold">{stats.total}</p>
                </div>
                <Users className="w-8 h-8 text-blue-600 opacity-50" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Menunggu</p>
                  <p className="text-2xl font-bold text-gray-600">{stats.waiting}</p>
                </div>
                <Clock className="w-8 h-8 text-gray-400 opacity-50" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Diterima</p>
                  <p className="text-2xl font-bold text-green-600">{stats.accepted}</p>
                </div>
                <CheckCircle2 className="w-8 h-8 text-green-600 opacity-50" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Perlu Revisi</p>
                  <p className="text-2xl font-bold text-orange-600">{stats.needsRevision}</p>
                </div>
                <AlertCircle className="w-8 h-8 text-orange-600 opacity-50" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Ditolak</p>
                  <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
                </div>
                <XCircle className="w-8 h-8 text-red-600 opacity-50" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Data Peserta</CardTitle>
                <CardDescription>Kelola dan verifikasi pendaftaran peserta</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export Excel
                </Button>
                <Button variant="outline">
                  <FileText className="w-4 h-4 mr-2" />
                  Export PDF
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Filters */}
            <div className="flex gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Cari nama, email, atau sekolah..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterLevel} onValueChange={setFilterLevel}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Jenjang" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Jenjang</SelectItem>
                  <SelectItem value="SD">SD</SelectItem>
                  <SelectItem value="SMP">SMP</SelectItem>
                  <SelectItem value="SMA">SMA</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Status</SelectItem>
                  <SelectItem value="Menunggu Verifikasi">Menunggu</SelectItem>
                  <SelectItem value="Diterima">Diterima</SelectItem>
                  <SelectItem value="Ditolak">Ditolak</SelectItem>
                  <SelectItem value="Perlu Revisi">Perlu Revisi</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Table */}
            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nama</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Jenjang</TableHead>
                    <TableHead>Bidang</TableHead>
                    <TableHead>Sekolah</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Tanggal</TableHead>
                    <TableHead>Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredParticipants.map((participant) => (
                    <TableRow key={participant.id}>
                      <TableCell className="font-medium">{participant.name}</TableCell>
                      <TableCell>{participant.email}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{participant.level}</Badge>
                      </TableCell>
                      <TableCell>{participant.field}</TableCell>
                      <TableCell className="max-w-[200px] truncate">{participant.school}</TableCell>
                      <TableCell>{getStatusBadge(participant.status)}</TableCell>
                      <TableCell className="text-sm text-gray-600">{participant.registrationDate}</TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedParticipant(participant)}
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              Detail
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Detail & Verifikasi Peserta</DialogTitle>
                              <DialogDescription>
                                Periksa data dan dokumen peserta, lalu tetapkan status verifikasi
                              </DialogDescription>
                            </DialogHeader>
                            {selectedParticipant && (
                              <div className="space-y-6">
                                {/* Participant Info */}
                                <div className="grid md:grid-cols-2 gap-4">
                                  <div>
                                    <Label className="text-xs text-gray-600">Nama Lengkap</Label>
                                    <p className="font-semibold">{selectedParticipant.name}</p>
                                  </div>
                                  <div>
                                    <Label className="text-xs text-gray-600">Email</Label>
                                    <p className="font-semibold">{selectedParticipant.email}</p>
                                  </div>
                                  <div>
                                    <Label className="text-xs text-gray-600">Jenjang</Label>
                                    <p className="font-semibold">{selectedParticipant.level}</p>
                                  </div>
                                  <div>
                                    <Label className="text-xs text-gray-600">Bidang Studi</Label>
                                    <p className="font-semibold">{selectedParticipant.field}</p>
                                  </div>
                                  <div className="md:col-span-2">
                                    <Label className="text-xs text-gray-600">Asal Sekolah</Label>
                                    <p className="font-semibold">{selectedParticipant.school}</p>
                                  </div>
                                  {selectedParticipant.registrationNumber && (
                                    <div className="md:col-span-2">
                                      <Label className="text-xs text-gray-600">Nomor Peserta</Label>
                                      <p className="font-semibold text-blue-600">{selectedParticipant.registrationNumber}</p>
                                    </div>
                                  )}
                                </div>

                                {/* Documents */}
                                <div>
                                  <Label className="mb-2 block">Dokumen yang Diunggah</Label>
                                  <div className="grid grid-cols-3 gap-2">
                                    <div className="border rounded-lg p-3 text-center">
                                      <FileText className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                                      <p className="text-xs font-medium">Pas Foto</p>
                                      <Button variant="link" size="sm" className="text-xs">Lihat</Button>
                                    </div>
                                    <div className="border rounded-lg p-3 text-center">
                                      <FileText className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                                      <p className="text-xs font-medium">Kartu Pelajar</p>
                                      <Button variant="link" size="sm" className="text-xs">Lihat</Button>
                                    </div>
                                    <div className="border rounded-lg p-3 text-center">
                                      <FileText className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                                      <p className="text-xs font-medium">Surat Izin</p>
                                      <Button variant="link" size="sm" className="text-xs">Lihat</Button>
                                    </div>
                                  </div>
                                </div>

                                {/* Verification Form */}
                                <div className="space-y-4 border-t pt-4">
                                  <div className="space-y-2">
                                    <Label>Status Verifikasi</Label>
                                    <Select value={verificationStatus} onValueChange={setVerificationStatus}>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Pilih status" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="Diterima">Diterima</SelectItem>
                                        <SelectItem value="Ditolak">Ditolak</SelectItem>
                                        <SelectItem value="Perlu Revisi">Perlu Revisi</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div className="space-y-2">
                                    <Label>Catatan untuk Peserta</Label>
                                    <Textarea
                                      placeholder="Berikan catatan atau alasan (wajib untuk status Ditolak/Perlu Revisi)"
                                      value={verificationNotes}
                                      onChange={(e) => setVerificationNotes(e.target.value)}
                                      rows={3}
                                    />
                                  </div>
                                  <Button
                                    onClick={handleVerify}
                                    className="w-full"
                                    disabled={!verificationStatus}
                                  >
                                    <CheckCircle2 className="w-4 h-4 mr-2" />
                                    Simpan Verifikasi
                                  </Button>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
