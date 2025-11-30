import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ALLOWED_DISCORD_IDS = [
  "512671808886013962" // ← Replace with your real ID (los1zoro)
];

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Discord user ID from Supabase OAuth
  const discordId = user?.user_metadata?.provider_id 
                 || user?.user_metadata?.sub
                 || null;

  // Deny if not your exact Discord account
  if (!discordId || !ALLOWED_DISCORD_IDS.includes(discordId)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
