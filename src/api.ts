import Cookies from 'js-cookie';

interface LoginResponse {
  message: string;
  token: string;
  user: {
    id: string;
    username: string;
    email: string;
  };
}

interface FormDataLogin {
  email: string;
  password: string;
}

interface FormDataRegister {
  email: string;
  username: string;
  password: string;
}

export async function LoginApi(
  formData: FormDataLogin
): Promise<LoginResponse> {
  const response = await fetch('http://192.168.103.56:3000/api/login', {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    throw new Error('Something went wrong');
  }

  const data = await response.json();
  Cookies.set('token', data.token, { expires: 1 / 24 });
  window.location.href = '/home'
  return data as LoginResponse;
}

export async function RegisterApi(formData: FormDataRegister): Promise<void> {
  const response = await fetch('http://192.168.103.56:3000/api/signup', {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    throw new Error('Something went wrong');
  }
}
