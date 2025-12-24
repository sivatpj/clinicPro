import { redirect } from 'next/navigation';
// This page redirects to the login page when launched the application
export default function Home() {
  redirect('/login');
}