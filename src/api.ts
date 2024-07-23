interface LoginResponse {
  message: string;
  token: string;
  user: {
    id: string;
    username: string;
    email: string;
  };
}

interface FormData {
  email: string;
  password: string;
}

export async function LoginApi(formData: FormData): Promise<LoginResponse> {
  const response = await fetch('http://192.168.1.153:3000/api/login', {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    throw new Error('Something went wrong');
  }

  const data = await response.json();
  return data as LoginResponse;
}
