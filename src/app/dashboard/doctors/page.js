const doctors = [
  {
    id: 1,
    name: 'Dr. Sarah Williams',
    specialty: 'General Physician',
    phone: '+1 555-0101',
    email: 'sarah.w@clinicpro.com',
    patientsToday: 12,
    status: 'Available',
  },
  {
    id: 2,
    name: 'Dr. Michael Chen',
    specialty: 'Cardiologist',
    phone: '+1 555-0102',
    email: 'michael.c@clinicpro.com',
    patientsToday: 8,
    status: 'In Consultation',
  },
  {
    id: 3,
    name: 'Dr. Robert Patel',
    specialty: 'Pediatrician',
    phone: '+1 555-0103',
    email: 'robert.p@clinicpro.com',
    patientsToday: 15,
    status: 'Available',
  },
  {
    id: 4,
    name: 'Dr. Lisa Anderson',
    specialty: 'Dermatologist',
    phone: '+1 555-0104',
    email: 'lisa.a@clinicpro.com',
    patientsToday: 10,
    status: 'On Leave',
  },
];

export default function DoctorsPage() {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Available':
        return '#28a745';
      case 'In Consultation':
        return '#ffc107';
      case 'On Leave':
        return '#dc3545';
      default:
        return '#6c757d';
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1>Doctors Management</h1>
        <button className="btn btn-primary">Add New Doctor</button>
      </div>

      <div className="card">
        <h2>Our Doctors</h2>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Specialty</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Patients Today</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor) => (
              <tr key={doctor.id}>
                <td>{doctor.id}</td>
                <td>{doctor.name}</td>
                <td>{doctor.specialty}</td>
                <td>{doctor.phone}</td>
                <td>{doctor.email}</td>
                <td>{doctor.patientsToday}</td>
                <td>
                  <span
                    style={{
                      color: getStatusColor(doctor.status),
                      fontWeight: 'bold',
                      padding: '5px 10px',
                      borderRadius: '4px',
                    }}
                  >
                    ● {doctor.status}
                  </span>
                </td>
                <td>
                  <button className="btn btn-primary" style={{ marginRight: '8px', fontSize: '0.9rem' }}>
                    View Profile
                  </button>
                  <button className="btn btn-danger" style={{ fontSize: '0.9rem' }}>
                    Remove
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