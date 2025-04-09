"use client"
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function Register() {
    const router = useRouter(); // ✅ useRouter() को Client Component में उपयोग करें
    const [loading, setloading] = useState(false) // loading dekh ne ke liye

    const [formSubmit, setformSubmit] = useState(false)
    const handleRegister = (e) => {
        setloading(true)

        e.preventDefault();
        var data = {
            name: e.target.name.value, // ✔️ सही 
            email: e.target.email.value, // ✔️ सही
            mobile_number: e.target.mobile_number.value,// ✔️ सही
            password: e.target.password.value, // ✔️ सही
        };
        axios.post("https://node-js-login-register-profile.onrender.com/api/frontend/users/register", data).then((result) => {
            console.log(result.data)
            if (result.data.status == true) {
                setformSubmit(true)
                setloading(false)

                toast.success(result.data.message)
                router.push("/login"); // ✅ अगर टोकन है तो Redirect करें

            }
            else {
                toast.error(result.data.message);
                setloading(false)

            }
        }).catch((error) => {
            toast.error(error.response?.data?.message || "Registration failed!");
            setloading(false); // इस लाइन को जरूर जोड़ें

        })

    };
    useEffect(() => {

    }, [formSubmit])

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <ToastContainer position="top-right" autoClose={3000} />

            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold text-center mb-6">रजिस्टर करें</h2>
                <form onSubmit={handleRegister}>

                    {/* Name Input */}
                    <input
                        type="text"
                        placeholder="नाम"
                        className="w-full p-2 border rounded mb-4"
                        name="name"
                        required
                    />

                    {/* Email Input */}
                    <input
                        type="email"
                        placeholder="ईमेल"
                        className="w-full p-2 border rounded mb-4"
                        name="email"

                        required
                    />

                    {/* Mobile Input */}
                    <input
                        type="tel"
                        placeholder="मोबाइल नंबर"
                        className="w-full p-2 border rounded mb-4"
                        name="mobile_number"

                        required
                    />

                    {/* Password Input */}
                    <input
                        type="password"
                        placeholder="पासवर्ड"
                        className="w-full p-2 border rounded mb-4"
                        name="password"
                        required
                    />

                    {/* Register Button */}
                    <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600" disabled={loading}

                    >
                        register
                        {
                            loading && <div role="status" className="flex justify-center items-center">
                                <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                                <span className="sr-only">Loading...</span>
                            </div>
                        }
                    </button>
                </form>
            </div>
        </div>
    );
}
