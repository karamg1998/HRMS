import { useState } from "react";
import axios from "axios";
import toast from 'react-hot-toast';

function AddEmployeeModal({ close, refreshDashboard, refreshEmployees }) {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    department: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
     let resp = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/admin/employees/create`, form);
     if(resp.data.success)
     {
        toast.success(resp.data.msg);
     }
     else
     {
      toast.error(resp.data.msg);
     }
    }
    catch(err)
    {
       toast.error("something went worng please refresh the page")
    }
    

    refreshDashboard();
    refreshEmployees();
    close();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Add Employee</h2>

        <form onSubmit={handleSubmit}>
          <input
            placeholder="Full Name"
            value={form.full_name}
            onChange={(e) =>
              setForm({ ...form, full_name: e.target.value })
            }
          />

          <input
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            placeholder="Department"
            value={form.department}
            onChange={(e) =>
              setForm({ ...form, department: e.target.value })
            }
          />

          <div className="modal-buttons">
            <button type="submit">Add</button>
            <button type="button" onClick={close}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddEmployeeModal;