import useAuth from "./useAuth";

const useRole = () => {
    const { user, loading } = useAuth();
    // For now, we will just return a placeholder. 
    // In a real app, you would fetch this from your backend.
    
    // Placeholder implementation:
    const role = "admin"; // Defaulting to admin to show all links if any role-based logic exists
    const isLoading = loading;

    return { role, isLoading };
};

export default useRole;
