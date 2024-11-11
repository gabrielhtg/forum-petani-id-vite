import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Input } from "@/components/ui/input.jsx"; // Pastikan komponen Input tersedia di folder Anda

export default function ProfilePage() {
  // Data profil contoh; data ini bisa diambil dari backend atau context
  const userData = {
    profilePicture: "src/assets/logo/logo_tunas_nusantara.png", // Gambar profil placeholder
    name: "Keza Felice",
    email: "admin@web.app",
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-10 bg-gray-100">
      <Card className="w-full max-w-5xl p-10 shadow-lg bg-white rounded-lg">
        <CardHeader className="mb-8">
          <CardTitle className="text-2xl font-semibold text-gray-700">
            Profile
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Foto Profil di Samping Kiri */}
            <div className="flex flex-col items-center lg:items-start">
              <img
                src={userData.profilePicture}
                alt="User Profile Picture"
                className="w-48 h-48 rounded-full border border-gray-300 shadow-md"
              />
              <div className="mt-4">
                <label className="text-gray-600 font-semibold mb-2">
                  Change Profile Photo
                </label>
                <input
                  type="file"
                  className="mt-2 block text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>
            </div>

            {/* Formulir Edit Profil */}
            <form className="w-full space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label className="text-gray-600 font-semibold mb-2">
                    Name
                  </label>
                  <Input
                    type="text"
                    defaultValue={userData.name}
                    className="w-full"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-gray-600 font-semibold mb-2">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    defaultValue={userData.email}
                    className="w-full"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-gray-600 font-semibold mb-2">
                    Old Password
                  </label>
                  <Input type="password" className="w-full" />
                </div>

                <div className="flex flex-col">
                  <label className="text-gray-600 font-semibold mb-2">
                    New Password
                  </label>
                  <Input type="password" className="w-full" />
                </div>

                <div className="flex flex-col">
                  <label className="text-gray-600 font-semibold mb-2">
                    Confirm Password
                  </label>
                  <Input type="password" className="w-full" />
                </div>
              </div>

              <div className="flex justify-center lg:justify-start mt-6">
                <Button className="bg-blue-600 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-700">
                  Update Profile
                </Button>
              </div>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
