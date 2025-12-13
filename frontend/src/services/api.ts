const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8001';

interface LoginPayload {
  email: string;
  password: string;
}

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

interface UserData {
  id: string;
  name: string;
  email: string;
}

interface AuthResponse {
  user: UserData;
  token: string;
}

async function handleResponse<T>(response: Response): Promise<T> {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.detail || 'Something went wrong');
  }
  return data as T;
}

export async function loginUser(payload: LoginPayload): Promise<AuthResponse> {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  return handleResponse<AuthResponse>(response);
}

export async function registerUser(payload: RegisterPayload): Promise<AuthResponse> {
  const response = await fetch(`${API_URL}/api/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  return handleResponse<AuthResponse>(response);
}

export async function getCurrentUser(token: string): Promise<UserData> {
  const response = await fetch(`${API_URL}/api/auth/me`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  return handleResponse<UserData>(response);
}
