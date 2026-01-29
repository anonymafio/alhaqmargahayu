"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";

interface FormData {
  nama_siswa: string;
  tempat_lahir: string;
  tanggal_lahir: string;
  jenis_kelamin: string;
  nama_ayah: string;
  nama_ibu: string;
  alamat: string;
  no_telepon: string;
  email: string;
  jenjang: string;
}

export default function Home() {
  const [formData, setFormData] = useState<FormData>({
    nama_siswa: "",
    tempat_lahir: "",
    tanggal_lahir: "",
    jenis_kelamin: "",
    nama_ayah: "",
    nama_ibu: "",
    alamat: "",
    no_telepon: "",
    email: "",
    jenjang: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const { error: supabaseError } = await supabase
        .from("pendaftaran")
        .insert([formData]);

      if (supabaseError) throw supabaseError;

      setShowSuccess(true);
      setFormData({
        nama_siswa: "",
        tempat_lahir: "",
        tanggal_lahir: "",
        jenis_kelamin: "",
        nama_ayah: "",
        nama_ibu: "",
        alamat: "",
        no_telepon: "",
        email: "",
        jenjang: "",
      });

      setTimeout(() => setShowSuccess(false), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      {/* Success Notification */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-50"
          >
            <div className="bg-emerald-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="font-medium">Pendaftaran berhasil! Kami akan menghubungi Anda segera.</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 opacity-90" />
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10" />

        <div className="relative max-w-7xl mx-auto px-4 py-20 sm:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
              Sekolah Islam Alhaq
            </h1>
            <p className="text-xl sm:text-2xl text-emerald-100 mb-2">
              Margahayu
            </p>
            <p className="text-lg text-emerald-200 max-w-2xl mx-auto mt-6">
              Membentuk Generasi Qurani yang Berakhlak Mulia, Cerdas, dan Berprestasi
            </p>
          </motion.div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="white"
              className="fill-emerald-50/50"
            />
          </svg>
        </div>
      </header>

      {/* Info Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8 mb-16"
          >
            {[
              {
                icon: "📚",
                title: "Kurikulum Terpadu",
                desc: "Perpaduan kurikulum nasional dengan pendidikan Islam yang komprehensif",
              },
              {
                icon: "🕌",
                title: "Tahfidz Al-Quran",
                desc: "Program hafalan Al-Quran dengan metode pembelajaran yang menyenangkan",
              },
              {
                icon: "🎓",
                title: "Tenaga Pendidik Berkualitas",
                desc: "Guru-guru berpengalaman dan berdedikasi tinggi",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Registration Form Section */}
      <section id="daftar" className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-4">
              Formulir Pendaftaran
            </h2>
            <p className="text-center text-gray-600 mb-10">
              Daftarkan putra/putri Anda untuk menjadi bagian dari keluarga besar Sekolah Islam Alhaq
            </p>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Jenjang Pendidikan */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Jenjang Pendidikan *
                </label>
                <select
                  name="jenjang"
                  value={formData.jenjang}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                >
                  <option value="">Pilih Jenjang</option>
                  <option value="TK">TK Islam Alhaq</option>
                  <option value="SD">SD Islam Alhaq</option>
                  <option value="SMP">SMP Islam Alhaq</option>
                </select>
              </div>

              {/* Data Siswa */}
              <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                <h3 className="font-semibold text-gray-800 mb-4">Data Calon Siswa</h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nama Lengkap *
                  </label>
                  <input
                    type="text"
                    name="nama_siswa"
                    value={formData.nama_siswa}
                    onChange={handleChange}
                    required
                    placeholder="Masukkan nama lengkap"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tempat Lahir *
                    </label>
                    <input
                      type="text"
                      name="tempat_lahir"
                      value={formData.tempat_lahir}
                      onChange={handleChange}
                      required
                      placeholder="Kota kelahiran"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tanggal Lahir *
                    </label>
                    <input
                      type="date"
                      name="tanggal_lahir"
                      value={formData.tanggal_lahir}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Jenis Kelamin *
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="jenis_kelamin"
                        value="Laki-laki"
                        checked={formData.jenis_kelamin === "Laki-laki"}
                        onChange={handleChange}
                        required
                        className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="ml-2 text-gray-700">Laki-laki</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="jenis_kelamin"
                        value="Perempuan"
                        checked={formData.jenis_kelamin === "Perempuan"}
                        onChange={handleChange}
                        className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="ml-2 text-gray-700">Perempuan</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Data Orang Tua */}
              <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                <h3 className="font-semibold text-gray-800 mb-4">Data Orang Tua/Wali</h3>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nama Ayah *
                    </label>
                    <input
                      type="text"
                      name="nama_ayah"
                      value={formData.nama_ayah}
                      onChange={handleChange}
                      required
                      placeholder="Nama lengkap ayah"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nama Ibu *
                    </label>
                    <input
                      type="text"
                      name="nama_ibu"
                      value={formData.nama_ibu}
                      onChange={handleChange}
                      required
                      placeholder="Nama lengkap ibu"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Alamat Lengkap *
                  </label>
                  <textarea
                    name="alamat"
                    value={formData.alamat}
                    onChange={handleChange}
                    required
                    rows={3}
                    placeholder="Alamat tempat tinggal"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors resize-none"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      No. Telepon/WhatsApp *
                    </label>
                    <input
                      type="tel"
                      name="no_telepon"
                      value={formData.no_telepon}
                      onChange={handleChange}
                      required
                      placeholder="08xxxxxxxxxx"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="email@contoh.com"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold py-4 px-6 rounded-lg hover:from-emerald-700 hover:to-teal-700 focus:ring-4 focus:ring-emerald-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Mengirim...
                  </span>
                ) : (
                  "Daftar Sekarang"
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4">Sekolah Islam Alhaq Margahayu</h3>
          <p className="text-gray-400 mb-6">
            Jl. Margahayu Raya, Bandung, Jawa Barat
          </p>
          <div className="flex justify-center gap-6 text-gray-400">
            <a href="tel:+62812345678" className="hover:text-white transition-colors">
              Telepon
            </a>
            <a href="mailto:info@alhaqmargahayu.sch.id" className="hover:text-white transition-colors">
              Email
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Instagram
            </a>
          </div>
          <p className="text-gray-500 text-sm mt-8">
            &copy; {new Date().getFullYear()} Sekolah Islam Alhaq Margahayu. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
