import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export const CreateTradeAdForm = () => {
  const [user, setUser] = useState<any>(null);
  const [itemsOffering, setItemsOffering] = useState<string[]>([]);
  const [itemsWanted, setItemsWanted] = useState<string[]>([]);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  // ❌ Not logged in → Block
  if (!user) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-white text-2xl font-bold mb-3">Login Required</h2>
        <p className="text-gray-400 mb-6">You must sign in with Discord to post a Trade Ad.</p>

        <button
          onClick={() => supabase.auth.signInWithOAuth({ provider: "discord" })}
          className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg"
        >
          Login with Discord
        </button>
      </div>
    );
  }

  // Logged-in user info
  const username = user.user_metadata.preferred_username || user.user_metadata.full_name || user.email;

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const { error } = await supabase.from("trade_ads").insert({
      items_offering: itemsOffering,
      items_wanted: itemsWanted,
      username: username, // Auto-filled
      status: "active",
      expires_at: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(), // Auto 48h expiry
    });

    if (error) console.log(error);
    alert("Trade Ad posted!");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto mt-10 text-white">

      <div className="mb-6">
        <label className="block text-gray-400 mb-1">Your Username (Auto-Filled)</label>
        <input
          value={username}
          disabled
          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-300"
        />
      </div>

      {/* Offering */}
      <div className="mb-6">
        <label className="block text-gray-400 mb-1">Items You Are Offering</label>
        <input
          type="text"
          placeholder="Example: Fritz, Helos"
          onChange={(e) => setItemsOffering(e.target.value.split(","))}
          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg"
        />
      </div>

      {/* Wanted */}
      <div className="mb-6">
        <label className="block text-gray-400 mb-1">Items You Want</label>
        <input
          type="text"
          placeholder="Example: Vizard Mask, Keys"
          onChange={(e) => setItemsWanted(e.target.value.split(","))}
          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg"
        />
      </div>

      {/* No description field at ALL (your request) */}

      <button
        type="submit"
        className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg w-full"
      >
        Post Trade Ad
      </button>
    </form>
  );
};
