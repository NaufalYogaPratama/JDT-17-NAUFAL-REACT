import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { CustomFormField, Form } from "../../components/form";
import { loginSchema, type LoginSchema } from "../../service/auth/form";
import { Input } from "../../components/input";
import { postAuth } from "../../service/auth/api";
import { useToken } from "../../hooks/useToken";
import { zodResolver } from "@hookform/resolvers/zod";

const Login = () => {
  const { changeUser } = useToken();
  const navigate = useNavigate();
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const { handleSubmit, control } = form;

  const onSubmit = async (data: LoginSchema) => {
    try {
      const response = await postAuth(data);

      if (response) {
        const user = {
          accessToken: response?.accessToken,
          refreshToken: response?.refreshToken,
          username: response?.username,
          email: response?.email,
          image: response?.image,
        };
        changeUser(user);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      form.setError("root", { message: "Login failed. Please check your credentials." });
    }
  };

  return (
    <div className="movie-page-container min-h-screen bg-[#000000] w-full flex items-center justify-center relative overflow-hidden bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#CB2957]/15 via-[#000000] to-[#000000] font-sans bg-grid-pattern">

      {/* Login Card */}
      <div className="w-full max-w-[440px] bg-black/75 sm:bg-[#0B0B0B]/85 backdrop-blur-md border border-white/10 p-8 sm:p-12 rounded-xl shadow-2xl flex flex-col gap-6 relative z-10 text-left">
        <div>
          <h1 className="text-3xl font-extrabold text-[#EEEEEE] tracking-tight">Sign In</h1>
          <p className="text-xs text-neutral-400 font-light mt-1.5">Sign in to access your developer hub.</p>
        </div>
        
        <Form {...form}>
          <form
            className="flex flex-col gap-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <CustomFormField<LoginSchema>
              control={control}
              name="username"
              label="Username"
              required
            >
              {(field) => (
                <Input 
                  {...field} 
                  placeholder="Enter username" 
                  type="text" 
                  className="bg-[#1A1A1A] border-white/10 text-white rounded-lg focus:border-[#CB2957] focus:ring-1 focus:ring-[#CB2957]/50 focus:ring-offset-0 placeholder-neutral-500 py-3 h-12 w-full transition-colors mt-4"
                />
              )}
            </CustomFormField>

            <CustomFormField<LoginSchema>
              control={control}
              name="password"
              label="Password"
              required
            >
              {(field) => (
                <Input 
                  {...field} 
                  placeholder="Enter password" 
                  type="password" 
                  className="bg-[#1A1A1A] border-white/10 text-white rounded-lg focus:border-[#CB2957] focus:ring-1 focus:ring-[#CB2957]/50 focus:ring-offset-0 placeholder-neutral-500 py-3 h-12 w-full transition-colors mt-4"
                />
              )}
            </CustomFormField>

            {form.formState.errors.root && (
              <p className="text-[#CB2957] text-xs font-semibold mt-1">
                {form.formState.errors.root.message}
              </p>
            )}
            
            <button 
              type="submit"
              className="bg-[#CB2957] hover:bg-[#CB2957]/90 text-white font-bold py-3 rounded-lg transition-all duration-300 w-full hover:scale-[1.02] active:scale-95 cursor-pointer mt-4 shadow-lg hover:shadow-[#CB2957]/20 text-center text-sm"
            >
              Sign In
            </button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Login;

