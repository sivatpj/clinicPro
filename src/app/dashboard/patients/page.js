const patients = [
  { id: 1, name: 'Alexander Johnson', age: 45, phone: '555-0101', condition: 'Hypertension' },
  { id: 2, name: 'Maria Garcia', age: 32, phone: '555-0102', condition: 'Diabetes Check' },
  { id: 3, name: 'James Lee', age: 28, phone: '555-0103', condition: 'Annual Checkup' },
];

export default function PatientsPage() {
  return (
    <div>
      <div className="page-header">
        <h1>Patients List</h1>
        <button className="btn btn-primary">Add New Patient</button>
      </div>

      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Age</th>
              <th>Phone</th>
              <th>Condition</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.map(p => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>{p.age}</td>
                <td>{p.phone}</td>
                <td>{p.condition}</td>
                <td>
                  <button className="btn btn-primary" style={{marginRight: '5px'}}>View</button>
                  <button className="btn btn-danger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}