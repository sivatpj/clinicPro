'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    router.push('/login');
  };

  return (
    <aside className="sidebar">
      <h2>ClinicPro</h2>
      <ul>
        <li><Link href="/dashboard" className={pathname === '/dashboard' ? 'active' : ''}>Dashboard</Link></li>
        <li><Link href="/dashboard/patients" className={pathname.startsWith('/dashboard/patients') ? 'active' : ''}>Patients</Link></li>
        <li><Link href="/dashboard/appointments" className={pathname.startsWith('/dashboard/appointments') ? 'active' : ''}>Appointments</Link></li>
        <li><Link href="/dashboard/doctors" className={pathname.startsWith('/dashboard/doctors') ? 'active' : ''}>Doctors</Link></li>
      </ul>
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </aside>
  );
}