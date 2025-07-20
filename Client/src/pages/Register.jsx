import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const [activeType, setActiveType] = useState('customer');
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        farmerType: '',
    });
    const [message, setMessage] = useState('');

    const handleTypeSwitch = (type) => {
        setActiveType(type);
        setForm({
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            farmerType: '',
        });
        setMessage('');
    };

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (form.password !== form.confirmPassword) {
            setMessage('Passwords do not match!');
            return;
        }

        if (activeType === 'farmer' && !form.farmerType) {
            setMessage('Please select your farmer type.');
            return;
        }

        navigate('/verify-otp', {
            state: { email: form.email }
        });

        let summary = '';
        if (activeType === 'customer') {
            summary = `Registered as Customer: ${form.name} (${form.email})`;
        } else if (activeType === 'farmer') {
            summary = `Registered as Farmer (${form.farmerType}): ${form.name} (${form.email})`;
        } else {
            summary = `Registered as Admin: ${form.name} (${form.email})`;
        }
        setMessage(summary);

        setForm({
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            farmerType: '',
        });
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-8 border border-gray-300 rounded-lg bg-white shadow">
            <h2 className="text-2xl font-bold mb-6 text-yellow-600 text-center">
                {activeType === 'customer' && <span className="text-yellow-600">Customer Registration</span>}
                {activeType === 'farmer' && <span className="text-green-600">Farmer Registration</span>}
                {activeType === 'admin' && <span className="text-blue-600">Admin Registration</span>}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1 text-sm font-medium" htmlFor="name">
                        Name
                    </label>
                    <input
                        className="w-full p-2 border border-gray-300 rounded"
                        type="text"
                        name="name"
                        id="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1 text-sm font-medium" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="w-full p-2 border border-gray-300 rounded"
                        type="email"
                        name="email"
                        id="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1 text-sm font-medium" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="w-full p-2 border border-gray-300 rounded"
                        type="password"
                        name="password"
                        id="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1 text-sm font-medium" htmlFor="confirmPassword">
                        Confirm Password
                    </label>
                    <input
                        className="w-full p-2 border border-gray-300 rounded"
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                </div>
                {activeType === 'farmer' && (
                    <div>
                        <label className="block mb-1 text-sm font-medium" htmlFor="farmerType">
                            Farmer Type <span className="text-red-500">*</span>
                        </label>
                        <select
                            className="w-full p-2 border border-gray-300 rounded bg-white"
                            name="farmerType"
                            id="farmerType"
                            value={form.farmerType}
                            onChange={handleChange}
                            required
                        >
                            <option value="" disabled>
                                Select type
                            </option>
                            <option value="Crop Farmer">Crop Farmer</option>
                            <option value="Dairy Farmer">Dairy Farmer</option>
                            <option value="Poultry Farmer">Poultry Farmer</option>
                            <option value="Fish Farmer">Fish Farmer</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                )}
                <button
                    type="submit"
                    className={`w-full text-white font-medium p-2 rounded transition cursor-pointer
                    ${activeType === 'customer'
                            ? 'bg-yellow-600 hover:bg-yellow-700'
                            : activeType === 'farmer'
                                ? 'bg-green-700 hover:bg-green-800'
                                : 'bg-blue-700 hover:bg-blue-800'
                        }
                        `}
                >
                    Register
                </button>
                <div className="flex justify-center gap-4 mb-6">
                    <button
                        onClick={() => handleTypeSwitch('farmer')}
                        className={`px-4 py-2 rounded bg-green-600 text-white font-semibold hover:bg-green-700 transition ${activeType === 'farmer' ? 'ring-2 ring-green-500' : ''
                            }`}
                    >
                        Register as a Farmer
                    </button>
                    <button
                        onClick={() => handleTypeSwitch('admin')}
                        className={`px-4 py-2 rounded bg-blue-700 text-white font-semibold hover:bg-blue-900 transition ${activeType === 'admin' ? 'ring-2 ring-blue-500' : ''
                            }`}
                    >
                        Register as an Admin
                    </button>
                </div>
            </form>
            {message && <p className="mt-4 text-center text-green-600">{message}</p>}
        </div>
    );
};

export default Register;
