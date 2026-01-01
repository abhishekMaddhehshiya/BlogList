import { useForm, type SubmitHandler } from "react-hook-form"
import { Quote } from "../components/Quote"
import { useDispatch } from "react-redux"
import { loginSuccess } from "../store/slice/authSlice"
import { signup } from "../actions/user.action"
import { useNavigate } from "react-router-dom"

type Inputs = {
  email: string
  password: string
  name: string
}

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()
   const dispatch = useDispatch()
   const navigate = useNavigate()
  const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
    const res = await signup(data) 
      if (res.success) {
        dispatch(loginSuccess({
        user: res.user,
        token: res.token,
      }))
      navigate("/")
      }
  }

  return (
    <div className="h-screen w-full grid grid-cols-1 md:grid-cols-2 overflow-hidden">
      
      {/* Left Section - Form */}
      <div className="flex items-center justify-center px-6">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md flex flex-col gap-4 overflow-hidden"
        >
          <h1 className="text-2xl font-bold text-gray-800">Create Account</h1>

          <input
            placeholder="abc@gmail.com"
            {...register("email", { required: true })}
            className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
          {errors.email && (
            <span className="text-sm text-red-500">Email is required</span>
          )}

          <input
            type="password"
            placeholder=""
            {...register("password", { required: true })}
            className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
          {errors.password && (
            <span className="text-sm text-red-500">Password is required</span>
          )}

          <input
            placeholder="Your name"
            {...register("name")}
            className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />

          <button
            type="submit"
            className="mt-2 bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
          >
            Sign Up
          </button>
          <div>
          Do you have an account! <button className="font-medium" onClick={()=>navigate("/signin")} >SignIn</button>
        </div>

        </form>
        
      </div>
      

      {/* Right Section - Quote */}
      <div className="hidden md:flex items-center justify-center bg-gray-100 h-full">
        <Quote quote={"This is signup form"} />
      </div>
    </div>
  )
}
