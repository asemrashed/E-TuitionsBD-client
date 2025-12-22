import { useNavigate, useLocation } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const SocialLogin = ({setRegisterError}) => {
    const { userSignInWithGoogle } = useAuth();
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state || "/";

    const handleGoogleSignIn = async () => {
        try {
        const res = await userSignInWithGoogle();
        const newUser = {
            displayName: res.user.displayName,
            email: res.user.email,
            photoURL: res.user.photoURL,
            role: "student",
            status: "active",
            createdAt: new Date(),
        };
        await axiosSecure.post("/users", newUser).then( res => {
            navigate(from, { replace: true });
        });
        } catch (error) {
        setRegisterError(error.message);
        }
    };
 
    return (
        <div className="w-full">
            <div className="divider my-6">OR</div>
            <button 
                onClick={handleGoogleSignIn} 
                className="btn btn-outline w-full gap-2 hover:bg-base-200 hover:text-base-content"
            >
                <FcGoogle className="text-xl" />
                Sign in with Google
            </button>
        </div>
    );
};

export default SocialLogin;
