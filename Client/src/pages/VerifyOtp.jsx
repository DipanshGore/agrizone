import { useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const OTP_LENGTH = 4;

const VerifyOtp = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const email = location.state?.email || "";
    const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [resendTime, setResendTime] = useState(0);

    const inputsRef = Array.from({ length: OTP_LENGTH }, () => useRef(null));

    const handleChange = (e, idx) => {
        const value = e.target.value.replace(/[^0-9]/g, "");
        if (!value) return;
        let updatedOtp = [...otp];
        updatedOtp[idx] = value[0];
        setOtp(updatedOtp);
        setError("");
        if (idx < OTP_LENGTH - 1 && value) {
            inputsRef[idx + 1].current.focus();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const enteredOtp = otp.join("");
        if (enteredOtp.length !== OTP_LENGTH) {
            setError("Please enter the full 4-digit OTP.");
            return;
        }
        if (enteredOtp === "1234") {
            setSuccess("✅ Verification successful!");
            setError("");
            setTimeout(() => navigate("/Home"), 1500);
        } else {
            setError("❌ OTP is incorrect. Please try again.");
            setSuccess("");
        }
    };

    const handleResend = () => {
        setResendTime(30);
        setSuccess("A new OTP was sent to your email!");
        setOtp(Array(OTP_LENGTH).fill(""));
        setError("");
        let t = 30;
        const timer = setInterval(() => {
            t -= 1;
            setResendTime(t);
            if (t <= 0) clearInterval(timer);
        }, 1000);
    };

    return (
        <div className="max-w-md mx-auto mt-35 p-8 border border-gray-300 bg-white shadow-xl rounded-xl">
            <h2 className="text-2xl font-bold text-center text-green-600 mb-2">Email Verification</h2>
            <p className="mb-6 text-center text-gray-600">
                We've sent a 4-digit OTP to <span className="font-mono text-green-700">{email}</span><br />
                Please enter it below to verify your email.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col items-center gap-6">
                <div className="flex gap-2 justify-center items-center mb-2">
                    {otp.map((digit, idx) => (
                        <input
                            key={idx}
                            ref={inputsRef[idx]}
                            value={digit}
                            onChange={e => handleChange(e, idx)}
                            maxLength={1}
                            className="w-12 h-12 text-center border-b-2 border-green-600 text-2xl font-mono focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            autoFocus={idx === 0}
                        />
                    ))}
                </div>
                {error && <div className="text-red-600 text-center text-sm">{error}</div>}
                {success && <div className="text-green-700 text-center text-sm">{success}</div>}
                <button
                    type="submit"
                    className="w-1/2 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded transition"
                >
                    Verify
                </button>
            </form>
            <div className="mt-6 text-center w-full">
                <button
                    onClick={handleResend}
                    disabled={resendTime > 0}
                    className="underline text-blue-700 hover:text-blue-900 disabled:text-gray-400"
                >
                    {resendTime > 0
                        ? `Resend OTP in ${resendTime}s`
                        : "Resend OTP"}
                </button>
            </div>
        </div>
    );
};

export default VerifyOtp;
