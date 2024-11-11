import { Button } from "@/components/ui/button.jsx";
import { Input } from "@/components/ui/input.jsx";

export default function ProfilePage() {
  const userData = {
    profilePicture: "src/assets/logo/logo_tunas_nusantara.png",
    Nama: "",
    Email: "",
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-20">
      <h1 className="text-4xl font-bold text-gray-800 mb-12">Profile</h1>

      <div className="flex flex-col lg:flex-row items-center w-full max-w-5xl gap-16">
        {/* Foto Profil di Samping Kiri */}
        <div className="flex flex-col items-center lg:items-start">
          <img
            src={userData.profilePicture}
            alt="User Profile Picture"
            className="w-48 h-48 rounded-full mb-4"
          />
          <label className="text-gray-600 font-semibold mb-2">
            Ganti Foto Profil
          </label>
          <input
            type="file"
            className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        {/* Formulir Edit Profil */}
        <div className="flex-1 w-full">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="text-gray-600 font-semibold mb-2">Nama</label>
                <Input type="text" defaultValue={userData.Nama} className="w-full" />
              </div>

              <div className="flex flex-col">
                <label className="text-gray-600 font-semibold mb-2">Email</label>
                <Input type="email" defaultValue={userData.Email} className="w-full" />
              </div>

              <div className="flex flex-col">
                <label className="text-gray-600 font-semibold mb-2">Kata Sandi Lama</label>
                <Input type="password" className="w-full" />
              </div>

              <div className="flex flex-col">
                <label className="text-gray-600 font-semibold mb-2">Kata Sandi Baru</label>
                <Input type="password" className="w-full" />
              </div>

              <div className="flex flex-col">
                <label className="text-gray-600 font-semibold mb-2">Konfirmasi Password</label>
                <Input type="password" className="w-full" />
              </div>
            </div>

            <div className="flex justify-start mt-6">
              <Button className="bg-blue-600 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-700">
                Perbaharui Profil
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
