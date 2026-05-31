CREATE TABLE tenants (
  id UUID PRIMARY KEY,
  name TEXT,
  plan TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE users (
  id UUID PRIMARY KEY,
  tenant_id UUID,
  email TEXT,
  password_hash TEXT,
  role TEXT
);

CREATE TABLE candidates (
  id UUID PRIMARY KEY,
  tenant_id UUID,
  name TEXT,
  email TEXT,
  job_role TEXT,
  resume_url TEXT,
  score INT,
  recommendation TEXT,
  summary TEXT,
  status TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

