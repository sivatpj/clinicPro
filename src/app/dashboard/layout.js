'use client';

import { useEffect, useState } from 'react';   
import { useRouter } from 'next/navigation';
import Sidebar from '../../components/Sidebar';

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const [isClientReady, setIsClientReady] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Run once on mount – only in browser
  useEffect(() => {
    setIsClientReady(true);

    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);

    if (!loggedIn) {
      router.replace('/login');  
    }
  }, [router]);

  if (!isClientReady) {
    return (
      <div style={{ padding: '100px', textAlign: 'center', color: '#666' }}>
        Loading dashboard...
      </div>
    );
  }
  
  if (!isLoggedIn) {
    return (
      <div style={{ padding: '50px', textAlign: 'center' }}>
        Redirecting to login...
      </div>
    );
  }

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="main-content">
        {children}
      </main>
    </div>
  );
}