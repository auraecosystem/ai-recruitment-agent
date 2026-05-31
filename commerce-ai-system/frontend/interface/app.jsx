import { useEffect, useState } from "react";

const API = "http://localhost:3000";

export default function App() {
  const [file, setFile] = useState(null);
  const [candidates, setCandidates] = useState([]);

  async function upload() {
    const form = new FormData();
    form.append("resume", file);
    form.append("candidateName", "Test User");
    form.append("email", "test@mail.com");
    form.append("jobRole", "Dynamics 365 Developer");

    await fetch(`${API}/api/candidates/upload`, {
      method: "POST",
      body: form
    });

    load();
  }

  async function load() {
    const res = await fetch(`${API}/api/candidates`);
    setCandidates(await res.json());
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>AI Recruitment SaaS</h1>

      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <button onClick={upload}>Upload Resume</button>

      <h2>Candidates</h2>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Score</th>
            <th>Recommendation</th>
          </tr>
        </thead>

        <tbody>
          {candidates.map(c => (
            <tr key={c.id}>
              <td>{c.candidateName}</td>
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
