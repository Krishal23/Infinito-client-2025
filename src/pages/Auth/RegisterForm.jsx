import { useState, useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import '../../styles/Auth/authstyles.css';

export default function RegisterForm({ handleGoogleSuccess, sendOtp, verifyOtp, otpSent, setOtpSent }) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    otp: ''
  });

  const [formLoading, setFormLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSendOtp = async () => {
    if (formData.password !== formData.confirmPassword) return;
    setFormLoading(true);
    const sent = await sendOtp(formData);
    setFormLoading(false);
    if (sent) {
      setOtpSent(true);
    }
  };

  const handleResendOtp = async () => {
    await handleSendOtp();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!otpSent) {
      await handleSendOtp();
    } else {
      setFormLoading(true);
      const verified = await verifyOtp(formData);
      setFormLoading(false);
      if (verified) {
        alert('Registration successful!');
      }
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      {/* Username */}
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
        required
      />

      {/* Email */}
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      {/* Password */}
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />

      {/* Confirm Password */}
      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        onChange={handleChange}
        required
      />

      {/* Warning if mismatch */}
      {formData.password !== formData.confirmPassword &&
        formData.confirmPassword && (
          <p style={{ color: 'red' }}>Passwords do not match</p>
        )}

      {/* OTP input + resend */}
      {otpSent && (
        <>
        <div className='verify-otp'>
          <label>Verify OTP</label>
          <input
            type="text"
            name="otp"
            placeholder="Enter 6-digit OTP"
            value={formData.otp}
            onChange={handleChange}
            maxLength={6}
            required
          />
            
          </div>
          <div className='resend-otp'>
            <button
              type="button"
              onClick={handleResendOtp}
              style={{
                background:'transparent',
                color: '#d97706',
                cursor: 'pointer'
              }}
            >
              Resend OTP
            </button>
          </div>
        </>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={
          formLoading ||
          (!otpSent && formData.password !== formData.confirmPassword)
        }
      >
        {formLoading
          ? otpSent
            ? 'Verifying...'
            : 'Sending OTP...'
          : otpSent
          ? 'Verify OTP'
          : 'Send OTP'}
      </button>

      {/* Google Login */}
      {!otpSent && (
        <>
          <div className="divider">OR</div>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => alert('Google OAuth Failed!')}
          />
        </>
      )}
    </form>
  );
}
