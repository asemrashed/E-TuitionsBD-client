import { useForm } from "react-hook-form";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { userSignIn } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state|| "/";
    const [loginError, setLoginError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = async (data) => {
        setLoginError("");
        try {
            await userSignIn({ email: data.email, password: data.password });
            navigate(from, { replace: true });
        } catch (error) {
            setLoginError(error.message);
        }
    };

    return (
        <div className="w-full">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-base-content">Welcome Back</h2>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text font-semibold">Email</span>
                    </label>
                    <input
                        type="email"
                        placeholder="email@example.com"
                        className={`input input-bordered w-full ${errors.email ? 'input-error' : ''}`}
                        {...register("email", { required: "Email is required" })}
                    />
                    {errors.email && <span className="text-error text-sm mt-1">{errors.email.message}</span>}
                </div>

                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text font-semibold">Password</span>
                    </label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            className={`input input-bordered w-full ${errors.password ? 'input-error' : ''}`}
                            {...register("password", { required: "Password is required" })}
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-3 flex items-center text-base-content/60 hover:text-base-content"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                    {errors.password && <span className="text-error text-sm mt-1">{errors.password.message}</span>}
                </div>

                {loginError && <p className="text-error text-center text-sm">{loginError}</p>}

                <button type="submit" className="btn btn-primary w-full text-white text-lg">
                    Sign In
                </button>
            </form>
        </div>
    );
};

export default Login;