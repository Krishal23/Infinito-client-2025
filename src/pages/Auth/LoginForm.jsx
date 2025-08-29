// components/Auth/LoginForm.jsx
import { GoogleLogin } from '@react-oauth/google';

export default function LoginForm({ formData, handleChange, handleLogin, formLoading, handleGoogleSuccess }) {
  return (
    <form className="form" onSubmit={handleLogin}>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <button type="submit" disabled={formLoading}>
        {formLoading ? 'Logging in...' : 'Login'}
      </button>
      <div className="divider">OR</div>
      <GoogleLogin onSuccess={handleGoogleSuccess} onError={() => alert('Google OAuth Failed!')} />
    </form>
  );
}
