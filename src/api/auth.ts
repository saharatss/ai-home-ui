import User from "@/types/user";

export const fetchUser = async (): Promise<User | null> => {
  try {
    const userId = localStorage.getItem("userId");
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/api/v1/user/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`,
      },
      // credentials: 'include',
    });
    if (!response.ok) return null;
    const data: User = (await response.json());
    return data;
  } catch (error) {
    console.warn('Error fetchUser', error);
    return null;
  }
};

// const login = async (userLogin: UserLogin) => {
//   try {
//     const response = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/api/users/login/`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       credentials: 'include',
//       body: JSON.stringify({
//         "username":userLogin.username,
//         "password":userLogin.password
//       }),
//     });
//     return (await response.json());
//   } catch (error) {
//     console.warn('Error login', error);
//     return { success: false, msg: 'Failed to login' };;
//   }
// };

const login = async (email: string, password: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/api/v1/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });

  if (!response.ok) {
    console.warn("Error login", response.statusText);
    return { success: false, msg: await response.text()};
  }

  const data = await response.json();
  localStorage.setItem("jwtToken", data.token);
  localStorage.setItem("userId", data.userId);
  return { success: true, msg: null, token: data.token };
};

const clearCookie = () => {
  // document.cookie.split(";").forEach((cookie) => {
  //   const [name] = cookie.split("=");
  //   document.cookie = `${name.trim()}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
  // });
  localStorage.removeItem("jwtToken");
  localStorage.removeItem("userId");
};

const logout = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/api/users/logout/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    if (!response.ok) throw new Error('Failed to logout');
  } catch (error) {
    console.warn('Error logout', error);
  }
  clearCookie();
};

const register = async (userRegister: User) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/api/users/register/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(userRegister),
    });
    return (await response.json());
  } catch (error) {
    console.warn('Error register', error);
    return { success: false, msg: 'Failed to login' };;
  }
};

const AuthAPI = {
  fetchUser,
  login,
  logout,
  register,
}

export default AuthAPI;