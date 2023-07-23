export const ACCESS_TOKEN = 'access_token';

type SignUpData = {
  user_name: string;
  login_type: number;
  user_email: string;
  user_pw: string;
};

type LoginData = {
  user_email: string;
  user_pw: string;
};

export type SignupFormData = {
  email: string;
  authCode: string;
  pw: string;
  confirmPw: string;
  nickname: string;
};

export type LoginFormData = {
  email: string;
  pw: string;
};

export async function signUp(userData: SignUpData) {
  return fetch(`${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/memos`, {
    method: 'post',
    body: JSON.stringify(userData),
  });

  // return axios.post(
  //   `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/users`,
  //   userData
  // );
}

export async function login(userData: LoginData) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/users/login`,
    {
      method: 'post',
      body: JSON.stringify(userData),
    }
  );

  // const res = await axios.post(
  //   `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/users/login`,
  //   userData
  // );

  // saveToken(ACCESS_TOKEN, res.data.token);
  return res;
}

export function logout() {
  clearToken();
}

export async function sendCodeToEmail(email: string) {
  return fetch(`${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/auth/email_code`, {
    method: 'post',
    body: JSON.stringify({ email }),
  });

  // return axios.post(
  //   `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/auth/email_code`,
  //   {
  //     email,
  //   }
  // );
}

export function confirmCode(code: string) {
  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/auth/email_code/validity`,
    {
      method: 'post',
      body: JSON.stringify({ code }),
    }
  );

  // return axios.post(
  //   `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/auth/email_code/validity`,
  //   { code }
  // );
}

export async function checkNickname(nickname: string) {
  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/auth/nickname/${nickname}`
  );

  // return axios.get(
  //   `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/auth/nickname/${nickname}`
  // );
}

export function checkEmail(email: string) {
  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/auth/email/${email}`
  );

  // return axios.get(
  //   `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/auth/email/${email}`
  // );
}

function saveToken(type: string, token: string) {
  localStorage.setItem(type, token);
}

export function getToken(type: string) {
  return localStorage.getItem(type);
}

function clearToken() {
  localStorage.clear();
}
