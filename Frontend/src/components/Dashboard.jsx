function Dashboard({ data }) {
  return (
    <div className="dashboard">
      <div className="card">
        <h3>Total Employees</h3>
        <p>{data.total_employees}</p>
      </div>

      <div className="card">
        <h3>Present Today</h3>
        <p>{data.present_today}</p>
      </div>

      <div className="card">
        <h3>Absent Today</h3>
        <p>{data.absent_today}</p>
      </div>
    </div>
  );
}

export default Dashboard;