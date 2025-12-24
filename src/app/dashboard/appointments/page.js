const appointments = [
  {
    id: 1,
    patientName: 'Alexander Johnson',
    doctorName: 'Dr. Sarah Williams',
    date: '2025-12-24',
    time: '09:00 AM',
    status: 'Confirmed',
    reason: 'Annual Checkup',
  },
  {
    id: 2,
    patientName: 'Maria Garcia',
    doctorName: 'Dr. Michael Chen',
    date: '2025-12-24',
    time: '10:30 AM',
    status: 'Pending',
    reason: 'Diabetes Follow-up',
  },
  {
    id: 3,
    patientName: 'James Lee',
    doctorName: 'Dr. Sarah Williams',
    date: '2025-12-25',
    time: '02:00 PM',
    status: 'Confirmed',
    reason: 'Blood Pressure Check',
  },
  {
    id: 4,
    patientName: 'Emma Thompson',
    doctorName: 'Dr. Robert Patel',
    date: '2025-12-26',
    time: '11:15 AM',
    status: 'Cancelled',
    reason: 'Fever & Cough',
  },
  {
    id: 5,
    patientName: 'David Kim',
    doctorName: 'Dr. Michael Chen',
    date: '2025-12-27',
    time: '03:45 PM',
    status: 'Confirmed',
    reason: 'Back Pain Consultation',
  },
];

export default function AppointmentsPage() {
  const getStatusClass = (status) => {
   switch (status) {
    case 'Confirmed':
      return 'bg-green-100 text-green-800';
    case 'Pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'Cancelled':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
  };

  return (
    <div>
      <div className="page-header">
        <h1>Appointments Management</h1>
        <button className="btn btn-primary">Schedule New Appointment</button>
      </div>

      <div className="card">
        <h2>Upcoming Appointments</h2>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Patient</th>
              <th>Doctor</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Reason</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt) => (
              <tr key={appt.id}>
                <td>{appt.id}</td>
                <td>{appt.patientName}</td>
                <td>{appt.doctorName}</td>
                <td>{appt.date}</td>
                <td>{appt.time}</td>
                <td>
                 <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusClass(appt.status)}`}>
    {appt.status}
  </span>
                </td>
                <td>{appt.reason}</td>
                <td>
                  <button className="btn btn-primary" style={{ marginRight: '8px', fontSize: '0.9rem' }}>
                    Edit
                  </button>
                  <button className="btn btn-danger" style={{ fontSize: '0.9rem' }}>
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}