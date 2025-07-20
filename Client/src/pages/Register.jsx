import React, { useState } from 'react';

const Register = () => {
    const [form, setForm] = useState({
        accountType: '',
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        farmerType: '',
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleAccountTypeChange = (e) => {
        setForm({
            ...form,
            accountType: e.target.value,
            farmerType: e.target.value === 'farmer' ? form.farmerType : '',
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.accountType) {
            setMessage('Please select registration type.');
            return;
        }
        if (form.password !== form.confirmPassword) {
            setMessage('Passwords do not match!');
            return;
        }
        if (form.accountType === 'farmer' && !form.farmerType) {
            setMessage('Please select your farmer type.');
            return;
        }
        setMessage(
            `Registered as ${
                form.accountType === 'Administrator'
                    ? 'Administrator'
                    : form.accountType === 'farmer'
                    ? `Farmer (${form.farmerType})`
                    : 'Customer'
            }: ${form.name} (${form.email})`
        );
        setForm({
            accountType: '',
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            farmerType: '',
        });
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-8 border border-gray-300 rounded-lg bg-white shadow">
            <h2 className="text-2xl font-bold mb-6 text-green-700 text-center">Registration Form</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-2 text-sm font-medium">Register as <span className="text-red-500">*</span></label>
                    <div className="flex gap-6">
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="accountType"
                                value="Administrator"
                                checked={form.accountType === 'Administrator'}
                                onChange={handleAccountTypeChange}
                                required
                                className="mr-2 cursor-pointer"
                            />
                            Admin
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="accountType"
                                value="farmer"
                                checked={form.accountType === 'farmer'}
                                onChange={handleAccountTypeChange}
                                required
                                className="mr-2 cursor-pointer"
                            />
                            Farmer
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="accountType"
                                value="customer"
                                checked={form.accountType === 'customer'}
                                onChange={handleAccountTypeChange}
                                required
                                className="mr-2 cursor-pointer"
                            />
                            Customer
                        </label>
                    </div>
                </div>
                <div>
                    <label className="block mb-1 text-sm font-medium" htmlFor="name">Name</label>
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
                    <label className="block mb-1 text-sm font-medium" htmlFor="email">Email</label>
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
                    <label className="block mb-1 text-sm font-medium" htmlFor="password">Password</label>
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
                    <label className="block mb-1 text-sm font-medium" htmlFor="confirmPassword">Confirm Password</label>
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
                {form.accountType === 'farmer' && (
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
                            required={form.accountType === 'farmer'}
                        >
                            <option value="" disabled>Select type</option>
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
                    className="w-full bg-green-700 hover:bg-green-800 text-white font-medium p-2 rounded transition cursor-pointer"
                >
                    Register
                </button>
            </form>
            {message && <p className="mt-4 text-center text-green-600">{message}</p>}
        </div>
    );
};

export default Register;
