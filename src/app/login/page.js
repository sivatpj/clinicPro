// app/login/page.js
'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, replace } from 'next/navigation';
import { loginUser, renewToken } from '@/app/lib/api'; // Make sure renewToken is exported from your api file

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [, setError] = useState('');
  const [popupMessage, setPopupMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [captchaCorrectAnswer, setCaptchaCorrectAnswer] = useState(0);
  const canvasRef = useRef(null);

  const router = useRouter();

  // Generate CAPTCHA
  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const answer = num1 + num2;
    setCaptchaCorrectAnswer(answer);
    setCaptchaAnswer('');

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#f8f9fa';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Noise lines
    for (let i = 0; i < 6; i++) {
      ctx.strokeStyle = `rgba(0,0,0,${Math.random() * 0.3 + 0.1})`;
      ctx.lineWidth = Math.random() * 2 + 1;
      ctx.beginPath();
      ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.stroke();
    }

    // Text with slight distortion
    const text = `${num1} + ${num2} = ?`;
    ctx.font = 'bold 28px Arial';
    ctx.fillStyle = '#333';

    ctx.setTransform(
      1 + Math.random() * 0.1,
      Math.random() * 0.2 - 0.1,
      Math.random() * 0.2 - 0.1,
      1 + Math.random() * 0.1,
      15 + Math.random() * 10,
      40 + Math.random() * 10
    );

    ctx.fillText(text, 10, 40);
    ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset
  };

  // Silent session check + CAPTCHA generation
  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleRenewToken = async () => {
      try {
        const result = await renewToken();
        if (result?.success) {
          // Handle login_time from server response (same format as login)
          let loginTime = new Date().toLocaleTimeString('en-IN', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true,
          });

          if (result.responseTime) {
            try {
              const [, timePart] = result.responseTime.split(', ');
              if (timePart) {
                const [hours, minutes, seconds] = timePart.split(':').map(Number);
                const tempDate = new Date();
                tempDate.setHours(hours, minutes, seconds || 0);
                loginTime = tempDate.toLocaleTimeString('en-IN', {
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                  hour12: true,
                });
              }
            } catch (e) {
              console.warn('Failed to parse refresh responseTime');
            }
          }

          localStorage.setItem('login_time', loginTime);
          router.replace('/dashboard');
          return;
        }
      } catch (err) {
        console.debug('Silent refresh failed or no token:', err.message);
        // Continue to show login form
      } finally {
        setCheckingSession(false);
        generateCaptcha(); // Generate CAPTCHA only after session check
      }
    };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setPopupMessage('');

    if (!captchaAnswer) {
      setPopupMessage('Please enter the CAPTCHA answer.');
      generateCaptcha();
      return;
    }

    if (parseInt(captchaAnswer) !== captchaCorrectAnswer) {
      setPopupMessage('Incorrect CAPTCHA. Please try again.');
      generateCaptcha();
      return;
    }

    setLoading(true);

    try {
      const { success, responseTime } = await loginUser(username, password);

      if (success) {
        let loginTime = new Date().toLocaleTimeString('en-IN', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        });

        if (responseTime) {
          try {
            const [, timePart] = responseTime.split(', ');
            if (timePart) {
              const [hours, minutes, seconds] = timePart.split(':').map(Number);
              const tempDate = new Date();
              tempDate.setHours(hours, minutes, seconds || 0);
              loginTime = tempDate.toLocaleTimeString('en-IN', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true,
              });
            }
          } catch (e) {
            console.warn('Failed to parse login responseTime');
          }
        }

        localStorage.setItem('login_time', loginTime);
        router.push('/dashboard');
      } else {
        setPopupMessage('Invalid username or password.');
        generateCaptcha();
      }
    } catch (err) {
      setPopupMessage(err.message || 'Login failed. Please try again.');
      generateCaptcha();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-box">
        <h1>Clinic Login</h1>

        <form className="login-form" onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            disabled={loading}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />

          {/* CAPTCHA */}
          <div className="captcha-container" style={{ margin: '20px 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <canvas
                ref={canvasRef}
                width={160}
                height={100}
                style={{
                  border: '1px solid #ccc',
                  borderRadius: '6px',
                  background: '#fff',
                }}
              />
              <button
                type="button"
                onClick={generateCaptcha}
                disabled={loading}
                style={{
                  padding: '8px',
                  background: '#f0f0f0',
                  border: '1px solid #ccc',
                  borderRadius: '6px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                }}
              >
                🔄
              </button>
            </div>
            <input
              type="number"
              placeholder="Enter sum"
              value={captchaAnswer}
              onChange={(e) => setCaptchaAnswer(e.target.value)}
              required
              disabled={loading}
              style={{ marginTop: '8px', width: '100%' }}
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {popupMessage && <p className="error" style={{ color: 'red', marginTop: '10px' }}>{popupMessage}</p>}
      </div>
    </div>
  );
}