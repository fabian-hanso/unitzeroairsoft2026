/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function SetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const initializeSession = async () => {
      try {
        const searchParams = new URLSearchParams(window.location.search);
        const token = searchParams.get("token");
        const type = searchParams.get("type");

        console.log("Token:", token);
        console.log("Type:", type);

        if (!token) {
          throw new Error(
            "Kein Token gefunden. Bitte verwende den Link aus der E-Mail.",
          );
        }

        if (type === "invite") {
          // Für Invite-Links verwenden wir verifyOtp mit token_hash
          console.log("Verifying invite token...");
          const { data, error } = await supabase.auth.verifyOtp({
            token_hash: token,
            type: "invite",
          });

          if (error) {
            console.error("Verify error:", error);
            throw new Error(
              "Token ist ungültig oder abgelaufen. Bitte fordere eine neue Einladung an.",
            );
          }

          console.log("Token verified successfully:", data);

          // Prüfe ob Session erstellt wurde
          const { data: sessionData } = await supabase.auth.getSession();
          if (!sessionData.session) {
            throw new Error("Session konnte nicht erstellt werden.");
          }

          console.log("Session active:", sessionData.session);
        } else {
          throw new Error("Unbekannter Token-Typ.");
        }
      } catch (err: any) {
        console.error("Initialization error:", err);
        setError(err.message || "Fehler beim Initialisieren der Session.");
      } finally {
        setInitializing(false);
      }
    };

    initializeSession();
  }, [supabase]);

  const handleSetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (password !== confirmPassword) {
      setError("Passwörter stimmen nicht überein");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Passwort muss mindestens 6 Zeichen lang sein");
      setLoading(false);
      return;
    }

    try {
      // Prüfe Session
      const { data: sessionData } = await supabase.auth.getSession();

      if (!sessionData.session) {
        throw new Error(
          "Keine aktive Session. Bitte verwende den Link aus der E-Mail erneut.",
        );
      }

      console.log(
        "Updating password for user:",
        sessionData.session.user.email,
      );

      // Passwort aktualisieren
      const { error } = await supabase.auth.updateUser({
        password: password,
      });

      if (error) throw error;

      console.log("Password updated successfully");
      setSuccess(true);

      // Nach 2 Sekunden weiterleiten
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    } catch (err: any) {
      console.error("Password update error:", err);
      setError(err.message || "Ein Fehler ist aufgetreten");
    } finally {
      setLoading(false);
    }
  };

  if (initializing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full p-8 bg-white shadow-lg rounded-lg">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Link wird verarbeitet...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-6 text-gray-900">
          Passwort setzen
        </h1>

        {success ? (
          <div className="p-4 bg-green-100 text-green-700 rounded-md">
            ✓ Passwort erfolgreich gesetzt! Du wirst weitergeleitet...
          </div>
        ) : (
          <>
            {error ? (
              <div className="space-y-4">
                <div className="p-4 bg-red-100 text-red-700 rounded-md">
                  {error}
                </div>
                <button
                  onClick={() => router.push("/login")}
                  className="w-full bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700"
                >
                  Zurück zum Login
                </button>
              </div>
            ) : (
              <form onSubmit={handleSetPassword} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Neues Passwort
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Mindestens 6 Zeichen"
                    required
                    minLength={6}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Passwort bestätigen
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Passwort wiederholen"
                    required
                    minLength={6}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                >
                  {loading ? "Wird gespeichert..." : "Passwort speichern"}
                </button>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
}
