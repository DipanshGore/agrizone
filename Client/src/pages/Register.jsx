import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaUserTie, FaTractor, FaUserShield, FaArrowRight, FaPhone } from 'react-icons/fa';

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
    const [error, setError] = useState('');

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
        setError('');
    };

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
        setError('');
    };

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         if (!form.name || !form.email  || !form.password || !form.confirmPassword || (activeType === 'farmer' && !form.farmerType)) {
//             setError('Please fill all required fields.');
//             return;
//         }

//         if (form.password !== form.confirmPassword) {
//             setError('Passwords do not match!');
//             return;
//         }

//         setError('');
//         let summary = '';
//         if (activeType === 'customer') {
//             summary = `Registered as Customer: ${form.name} (${form.email})`;
//         } else if (activeType === 'farmer') {
//             summary = `Registered as Farmer (${form.farmerType}): ${form.name} (${form.email})`;
//         } else {
//             summary = `Registered as Admin: ${form.name} (${form.email})`;
//         }
//         setMessage(summary);
// console.log("Form Data:");
//         // Simulate API call
//         fetch('http://localhost:5000/api/auth/signup', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 name: form.name,
//                 email: form.email,
//                 password: form.password,
//             }),
//         })
//         .then(res => res.json())
//         .then(data => {
//             if (data.success) {
//                 setMessage('Registration successful! Please verify your email.');
//                  navigate('/verify-otp', {
//                  state: { email: form.email }
//         });
//             } else {
//                 setError(data.message || 'Registration failed. Please try again.');
//             }
//         })
//         .catch(err => {
//             setError('Registration failed. Please try again.');
//         });

       



//         setForm({
//             name: '',
//             email: '',
//             password: '',
//             confirmPassword: '',
//             farmerType: '',
//         });
//     };
const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password || !form.confirmPassword || (activeType === 'farmer' && !form.farmerType)) {
        setError('Please fill all required fields.');
        return;
    }

    if (form.password !== form.confirmPassword) {
        setError('Passwords do not match!');
        return;
    }

    setError('');
    let summary = '';
    if (activeType === 'customer') {
        summary = `Registered as Customer: ${form.name} (${form.email})`;
    } else if (activeType === 'farmer') {
        summary = `Registered as Farmer (${form.farmerType}): ${form.name} (${form.email})`;
    } else {
        summary = `Registered as Admin: ${form.name} (${form.email})`;
    }
    setMessage(summary);

    // ✅ Send only required fields to backend
    fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: form.name,
            email: form.email,
            password: form.password,
        }),
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            setMessage('Registration successful! Please verify your email.');
            navigate('/verify-otp', {
                state: { email: form.email }
            });
        } else {
            setError(data.message || 'Registration failed. Please try again.');
        }
    })
    .catch(() => {
        setError('Registration failed. Please try again.');
    });

    // Reset form
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
            <h2 className="text-2xl font-bold mb-6 text-yellow-600 text-center flex items-center justify-center gap-2">
                {activeType === 'customer' && (
                    <>
                        <FaUser className="text-yellow-600" />
                        <span className="text-yellow-600">Customer Registration</span>
                    </>
                )}
                {activeType === 'farmer' && (
                    <>
                        <FaTractor className="text-green-600" />
                        <span className="text-green-600">Farmer Registration</span>
                    </>
                )}
                {activeType === 'admin' && (
                    <>
                        <FaUserShield className="text-blue-600" />
                        <span className="text-blue-600">Admin Registration</span>
                    </>
                )}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1 text-sm font-medium" htmlFor="name">Name</label>
                    <div className="flex items-center">
                        <FaUser className="mr-2 text-gray-400" />
                        <input
                            className="w-full p-2 border border-gray-300 rounded"
                            type="text"
                            name="name"
                            placeholder='Ex: Dipansh Gore'
                            id="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <div>
                    <label className="block mb-1 text-sm font-medium" htmlFor="email">Email</label>
                    <div className="flex items-center">
                        <FaEnvelope className="mr-2 text-gray-400" />
                        <input
                            className="w-full p-2 border border-gray-300 rounded"
                            type="email"
                            name="email"
                            placeholder='Ex: dipansh@gmail.com'
                            id="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                
                <div>
                    <label className="block mb-1 text-sm font-medium" htmlFor="password">Password</label>
                    <div className="flex items-center">
                        <FaLock className="mr-2 text-gray-400" />
                        <input
                            className="w-full p-2 border border-gray-300 rounded"
                            type="password"
                            name="password"
                                placeholder='Enter your password'
                            id="password"
                            value={form.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <div>
                    <label className="block mb-1 text-sm font-medium" htmlFor="confirmPassword">Confirm Password</label>
                    <div className="flex items-center">
                        <FaLock className="mr-2 text-gray-400" />
                        <input
                            className="w-full p-2 border border-gray-300 rounded"
                            type="password"
                            name="confirmPassword"
                                placeholder='Re-enter your password'
                            id="confirmPassword"
                            value={form.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                {activeType === 'farmer' && (
                    <div>
                        <label className="block mb-1 text-sm font-medium" htmlFor="farmerType">
                            Farmer Type <span className="text-red-500">*</span>
                        </label>
                        <div className="flex items-center">
                            <FaUserTie className="mr-2 text-gray-400" />
                            <select
                                className="w-full p-2 border border-gray-300 rounded bg-white"
                                name="farmerType"
                                id="farmerType"
                                value={form.farmerType}
                                onChange={handleChange}
                                required
                            >
                                <option value="" disabled>Select type</option>
                                <option value="Crop Farmer">Crop Farmer</option>
                                <option value="Dairy Farmer">Dairy Farmer</option>
                                <option value="Poultry Farmer">Poultry Farmer</option>
                                <option value="Fish Farmer">Fish Farmer</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>
                )}
                <button
                    type="submit"
                    className={`w-full flex items-center justify-center gap-2 text-white font-medium p-2 rounded transition cursor-pointer
                        ${activeType === 'customer'
                                ? 'bg-yellow-600 hover:bg-yellow-700'
                                : activeType === 'farmer'
                                    ? 'bg-green-700 hover:bg-green-800'
                                    : 'bg-blue-700 hover:bg-blue-800'
                            }
                        `}
                >
                    Register <FaArrowRight />
                </button>
                <div className="flex justify-center gap-6 mb-4">
                    <button
                        type="button"
                        onClick={() => handleTypeSwitch('farmer')}
                        className={`flex items-center gap-1 text-green-700 hover:underline hover:text-green-900 font-semibold ${activeType === 'farmer' ? 'underline' : ''}`}
                    >
                        <FaTractor />
                        Register as a Farmer
                    </button>
                    <button
                        type="button"
                        onClick={() => handleTypeSwitch('admin')}
                        className={`flex items-center gap-1 text-blue-700 hover:underline hover:text-blue-900 font-semibold ${activeType === 'admin' ? 'underline' : ''}`}
                    >
                        <FaUserShield />
                        Register as an Admin
                    </button>
                </div>
                <div className="text-center mb-2 flex items-center justify-center gap-2">
                    <span className="text-gray-700">Already Registered?</span>
                    <Link
                        to="/home"
                        className="text-blue-700 font-semibold hover:underline hover:text-blue-900 transition flex items-center gap-1"
                    >
                        Login <FaArrowRight />
                    </Link>
                </div>
                {error && <div className="mt-2 text-center text-red-600 font-semibold">{error}</div>}
                {message && <div className="mt-2 text-center text-green-600 font-semibold">{message}</div>}
            </form>
        </div>
    );
};

export default Register;
