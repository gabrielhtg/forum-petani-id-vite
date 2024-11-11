import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });
            const data = await response.json();
            setMessage(data.message);
        } catch (error) {
            setMessage('Terjadi kesalahan, coba lagi.');
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="p-5 bg-white rounded-md shadow-md text-center">
                <h2 className="text-lg font-semibold">Lupa Kata Sandi</h2>
                <p>Masukkan email Anda untuk menerima tautan reset kata sandi.</p>
                <form onSubmit={handleForgotPassword} className="mt-4">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border p-2 w-full mb-3"
                        required
                    />
                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
                        Kirim Tautan Reset
                    </button>
                </form>
                {message && <p className="mt-4">{message}</p>}
                <button onClick={() => navigate('/login')} className="text-blue-500 mt-4">
                    Kembali ke Login
                </button>
            </div>
        </div>
    );
}

export default ForgotPasswordPage;
