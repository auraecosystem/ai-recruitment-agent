import { useState, useEffect } from "react";

const API = "http://localhost:3000";

export default function App() {
  const [file, setFile] = useState(null);
  const [role, setRole] = useState("Accountant");
  const [data, setData] = useState([]);

  async function upload() {
    const form = new FormData();
    form.append("resume", file);
    form.append("jobRole", role);

    await fetch(`${API}/api/candidates/upload`, {
      method: "POST",
      body: form
    });

    load();
  }

  async function load() {
    const res = await fetch(`${API}/api/candidates`);
    setData(await res.json());
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Commerce AI Hiring System</h1>

      <select onChange={(e) => setRole(e.target.value)}>
        <option>Accountant</option>
        <option>Auditor</option>
        <option>Sales Executive</option>
        <option>Business Analyst</option>
      </select>

      <br /><br />

      <input type="file" onChange={(e) => setFile(e.target.files[0])} />

      <button onClick={upload}>Analyze Candidate</button>

      <h2>Ranked Candidates</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Score</th>
            <th>Recommendation</th>
          </tr>
        </thead>

        <tbody>
          {data.map((c) => (
            <tr key={c.id}>
              <td>{c.name}</td>
              <td>{c.jobRole}</td>
              <td>{c.score}</td>
              <td>{c.recommendation}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
