import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import UpdatePasswordForm from "@/components/UpdatePasswordForm";
import { motion } from "framer-motion";

const ResetPasswordPage = () => {
  const { session, isResettingPassword } = useAuth();
  const navigate = useNavigate();

  // Redirect if not in password reset mode and already logged in
  useEffect(() => {
    if (!isResettingPassword && session.isLoggedIn) {
      navigate("/dashboard");
    } else if (!isResettingPassword) {
      navigate("/auth");
    }
  }, [isResettingPassword, session.isLoggedIn]);

  if (session.isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full"
      >
        <UpdatePasswordForm />
      </motion.div>
    </div>
  );
};

export default ResetPasswordPage; 