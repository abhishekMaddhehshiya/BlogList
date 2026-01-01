

const BASE_URL = "http://localhost:3000/api/v1"
interface logindata {
    email:string,
    password: string

}

interface signUpdata {
    email:string,
    password: string
    name?: string
}

interface AuthResponse  {
  success: boolean,
  message?: string
  user: {
    id: string
    email: string
    name?: string
  }
  token: string
}

export async function login(data: logindata): Promise<AuthResponse> {
    const res = await fetch(`${BASE_URL}/user/signin`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
    })

  const result = await res.json()

  if (!result.success) {
    throw new Error(result.message || "Login failed")
  }

  return result
}

export async function signup(data: signUpdata): Promise<AuthResponse> {
       const res = await fetch(`${BASE_URL}/user/signup`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        credentials: "include", 
        body: JSON.stringify(data),
    })

  const result = await res.json()

  if (!result.success) {
    throw new Error(result.message || "Signup failed")
  }

  return result
}