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

type CheckUserResponse = {
  id: number;
  isLogin: boolean;
};

export async function signUp(userData: SignUpData, callback: () => void) {
  return fetch(`${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS_SECURE}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error('error');
      }
      callback();
    })
    .catch(console.error);
}

export async function login(userData: LoginData, callback: () => void) {
  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS_SECURE}/users/login`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(userData),
    }
  )
    .then((res) => {
      if (!res.ok) {
        throw new Error('error');
      }
      callback();
      return res.json();
    })
    .catch(console.error);
}

export async function logout(callback: () => void) {
  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS_SECURE}/users/logout`,
    {
      credentials: 'include',
    }
  )
    .then((res) => {
      if (!res.ok) throw new Error('error!!');
      callback();
    })
    .catch(console.error);
}

export async function checkUser(): Promise<CheckUserResponse> {
  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS_SECURE}/users/check`,
    {
      credentials: 'include',
    }
  )
    .then((res) => {
      if (!res.ok) throw new Error('error!!');
      return res.json();
    })
    .catch(console.error);
}

export async function sendCodeToEmail(email: string) {
  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS_SECURE}/auth/email_code`,
    {
      method: 'POST',
      body: JSON.stringify({ email }),
    }
  );
}

export function confirmCode(code: string) {
  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS_SECURE}/auth/email_code/validity`,
    {
      method: 'POST',
      body: JSON.stringify({ code }),
    }
  );
}

export async function checkNickname(nickname: string) {
  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS_SECURE}/auth/nickname/${nickname}`
  );
}

export function checkEmail(email: string) {
  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS_SECURE}/auth/email/${email}`
  );
}

// export function saveToken(type: string, token: string) {
//   if (typeof window !== 'undefined') {
//     localStorage.setItem(type, token);
//   }
// }

// export function getToken(type: string) {
//   if (typeof window !== 'undefined') {
//     return localStorage.getItem(type);
//   }
// }

function clearToken() {
  if (typeof window !== 'undefined') {
    localStorage.clear();
  }
}
