import { useEffect, useState, useContext } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import confetti from 'canvas-confetti';
import '../../styles/Auth/authstyles.css';
import Navbar from '../../components/Navbar';
import { AuthContext } from '../../context/AuthContext';
import axiosInstance from '../../utils/axios';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';



function getErrorMessage(error, fallback = 'Something went wrong') {
  if (error?.response?.data?.message) return error.response.data.message;
  if (error?.response?.data?.error) return error.response.data.error;
  if (error?.message) return error.message;
  return fallback;
}

function Auth() {
  const { user, login, logout, loading: globalLoading } = useContext(AuthContext);
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({ email: '', username: '', password: '', confirmPassword: '' });
  const [formLoading, setFormLoading] = useState(false);
  const [arrows, setArrows] = useState([]);
  const [signupStep, setSignupStep] = useState(1); // 1=register, 2=verify OTP
  const [otpSent, setOtpSent] = useState(false);

  const goBackToRegister = () => setSignupStep(1);

  const fireworkBurst = () => {
    const duration = 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };
    const interval = setInterval(() => {
      if (Date.now() > animationEnd) return clearInterval(interval);
      confetti({ ...defaults, particleCount: 50, origin: { x: Math.random(), y: Math.random() * 0.5 } });
    }, 200);
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      setFormLoading(true);
      const res = await axiosInstance.post("/auth/google-login", { credential: credentialResponse.credential });
      if (res?.data && res.data.success === false) {
        toast.error(res.data.message || 'Google login failed');
      } else {
        login(res.data.accessToken, res.data.user);
        fireworkBurst();
        toast.success(res.data.message || 'Google login successful');
      }
    } catch (err) {
      toast.error(getErrorMessage(err, "Google login failed"));
    } finally {
      setFormLoading(false);
    }
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const sendOtp = async (data) => {
    try {
      setFormLoading(true);
      const res = await axiosInstance.post('/auth/signup/send-otp', data);

      if (res?.data?.success === false && res?.data?.timeLeft) {
        toast.info(res.data.message || 'OTP already sent. Please check your inbox.');
        setOtpSent(true); 
        setSignupStep(2); 
        return; 
      }

      if (res?.data?.success) {
        toast.success(res.data.message || 'OTP sent to your email');
        setOtpSent(true);
        setSignupStep(2);
      } else {
        toast.error(res.data.message || 'Failed to send OTP');
      }

    } catch (error) {
      toast.error(getErrorMessage(error, 'Failed to send OTP'));
    } finally {
      setFormLoading(false);
    }
  };


  const verifyOtp = async ({ email, otp }) => {
    try {
      setFormLoading(true);
      const res = await axiosInstance.post('/auth/signup/verify-otp', { email, otp });
      login(res.data.accessToken, res.data.user);
      toast.success(res.data.message || 'Registration successful');
      return true;
    } catch (error) {
      toast.error(getErrorMessage(error, 'Invalid OTP'));
      return false;
    } finally {
      setFormLoading(false);
      setSignupStep(1); 
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setFormLoading(true);
      const res = await axiosInstance.post("auth/login", formData);
      if (res?.data && res.data.success === false) {
        toast.error(res.data.message || 'Login failed');
      } else {
        login(res.data.accessToken, res.data.user);
        fireworkBurst();
        toast.success(res.data.message || 'Login successful');
      }
    } catch (err) {
      toast.error(getErrorMessage(err, "Login failed"));
    } finally {
      setFormLoading(false);
    }
  };

  // console.log(user)
  

  useEffect(() => {
    const interval = setInterval(() => {
      setArrows(prev => [...prev, {
        id: Math.random(),
        left: Math.random() * window.innerWidth,
        top: Math.random() * window.innerHeight * 0.4,
        duration: Math.random() * 2 + 1,
      }]);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  if (globalLoading) return <p>Loading...</p>;

  return (
    <div className="page-wrapper">
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover />
      <Navbar />
      <div className="smoke" />
      {arrows.map(a => (
        <div key={a.id} className="arrow" style={{ left: `${a.left}px`, top: `${a.top}px`, animationDuration: `${a.duration}s` }} />
      ))}

      <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} scale={1.05}>
        <motion.div className="card" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
          {user ? (
            <div className="user-details">
              <h1 className="glitch-text">Welcome, {user.fullname}</h1>
              <p><strong>Username:</strong> {user.username}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <button onClick={logout} disabled={formLoading}>
                {formLoading ? 'Logging out...' : 'Logout'}
              </button>
            </div>
          ) : (
            <>
              <h1 className="glitch-text">{isSignup ? 'Register' : 'Login'}</h1>
              {isSignup ? (
                <>
                    <RegisterForm
                      formData={formData}
                      handleChange={handleChange}
                      sendOtp={sendOtp}
                      formLoading={formLoading}
                      handleGoogleSuccess={handleGoogleSuccess}
                      otpSent={otpSent}
                      setOtpSent={setOtpSent}
                      verifyOtp={verifyOtp}
                    />
                  
                </>
              ) : (
                <LoginForm
                  formData={formData}
                  handleChange={handleChange}
                  handleLogin={handleLogin}
                  formLoading={formLoading}
                  handleGoogleSuccess={handleGoogleSuccess}
                />
              )}
              <p className="switch-auth" onClick={() => {
                setIsSignup(!isSignup);
                setFormData({ email: '', username: '', password: '', confirmPassword: '' });
              }}>
                {isSignup ? 'Already have an account? ' : 'New here? '}<span>{isSignup ? 'Login' : 'Join'}</span>
              </p>
            </>
          )}
        </motion.div>
      </Tilt>
    </div>
  );
}




export default Auth;

