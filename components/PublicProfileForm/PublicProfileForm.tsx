/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

interface Weapon {
  id: string;
  name: string;
  type: string;
}

interface PublicProfileData {
  name: string;
  callsign: string;
  primary_image_url: string;
  secondary_image_url: string;
  weapons: Weapon[];
  playstyle: string;
  description: string;
  favorite_quote: string;
  favorite_mode: string;
  favorite_field: string;
  why_airsoft: string;
  why_unit_zero: string;
}

interface PublicProfileFormProps {
  userId: string;
  initialData?: Partial<PublicProfileData>;
}

const PLAYSTYLES = [
  "Aggressiv",
  "Support",
  "Taktisch",
  "Passiv",
  "Allrounder",
  "Sniper",
  "Rusher",
];

export default function PublicProfileForm({
  userId,
  initialData,
}: PublicProfileFormProps) {
  const [name, setName] = useState(initialData?.name || "");
  const [callsign, setCallsign] = useState(initialData?.callsign || "");
  const [primaryImageUrl, setPrimaryImageUrl] = useState(
    initialData?.primary_image_url || "",
  );
  const [secondaryImageUrl, setSecondaryImageUrl] = useState(
    initialData?.secondary_image_url || "",
  );
  const [primaryImageFile, setPrimaryImageFile] = useState<File | null>(null);
  const [secondaryImageFile, setSecondaryImageFile] = useState<File | null>(
    null,
  );
  const [primaryImagePreview, setPrimaryImagePreview] = useState<string | null>(
    null,
  );
  const [secondaryImagePreview, setSecondaryImagePreview] = useState<
    string | null
  >(null);
  const [weapons, setWeapons] = useState<Weapon[]>(initialData?.weapons || []);
  const [playstyle, setPlaystyle] = useState(initialData?.playstyle || "");
  const [description, setDescription] = useState(
    initialData?.description || "",
  );
  const [favoriteQuote, setFavoriteQuote] = useState(
    initialData?.favorite_quote || "",
  );
  const [favoriteMode, setFavoriteMode] = useState(
    initialData?.favorite_mode || "",
  );
  const [favoriteField, setFavoriteField] = useState(
    initialData?.favorite_field || "",
  );
  const [whyAirsoft, setWhyAirsoft] = useState(initialData?.why_airsoft || "");
  const [whyUnitZero, setWhyUnitZero] = useState(
    initialData?.why_unit_zero || "",
  );

  const [loading, setLoading] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [isDraggingPrimary, setIsDraggingPrimary] = useState(false);
  const [isDraggingSecondary, setIsDraggingSecondary] = useState(false);

  const router = useRouter();
  const primaryFileInputRef = useRef<HTMLInputElement>(null);
  const secondaryFileInputRef = useRef<HTMLInputElement>(null);
  const supabase = createClient();

  // Waffen-Management
  const addWeapon = () => {
    setWeapons([...weapons, { id: Date.now().toString(), name: "", type: "" }]);
  };

  const updateWeapon = (id: string, field: "name" | "type", value: string) => {
    setWeapons(
      weapons.map((w) => (w.id === id ? { ...w, [field]: value } : w)),
    );
  };

  const removeWeapon = (id: string) => {
    setWeapons(weapons.filter((w) => w.id !== id));
  };

  // Image Upload Handler
  const handleFileSelect = (file: File, type: "primary" | "secondary") => {
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!validTypes.includes(file.type)) {
      setError("Nur JPEG, PNG und WebP Bilder sind erlaubt");
      return;
    }

    if (file.size > maxSize) {
      setError("Bild darf maximal 10MB groß sein");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      if (type === "primary") {
        setPrimaryImageFile(file);
        setPrimaryImagePreview(reader.result as string);
      } else {
        setSecondaryImageFile(file);
        setSecondaryImagePreview(reader.result as string);
      }
    };
    reader.readAsDataURL(file);
    setError("");
  };

  // Drag & Drop Handlers
  const handleDragOver = (
    e: React.DragEvent,
    type: "primary" | "secondary",
  ) => {
    e.preventDefault();
    if (type === "primary") setIsDraggingPrimary(true);
    else setIsDraggingSecondary(true);
  };

  const handleDragLeave = (
    e: React.DragEvent,
    type: "primary" | "secondary",
  ) => {
    e.preventDefault();
    if (type === "primary") setIsDraggingPrimary(false);
    else setIsDraggingSecondary(false);
  };

  const handleDrop = (e: React.DragEvent, type: "primary" | "secondary") => {
    e.preventDefault();
    if (type === "primary") setIsDraggingPrimary(false);
    else setIsDraggingSecondary(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFileSelect(files[0], type);
    }
  };

  const handleFileInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "primary" | "secondary",
  ) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFileSelect(files[0], type);
    }
  };

  const removeImage = (type: "primary" | "secondary") => {
    if (type === "primary") {
      setPrimaryImageFile(null);
      setPrimaryImagePreview(null);
      if (primaryFileInputRef.current) {
        primaryFileInputRef.current.value = "";
      }
    } else {
      setSecondaryImageFile(null);
      setSecondaryImagePreview(null);
      if (secondaryFileInputRef.current) {
        secondaryFileInputRef.current.value = "";
      }
    }
  };

  // Upload Images to Supabase
  const uploadImage = async (
    file: File,
    type: "primary" | "secondary",
  ): Promise<string | null> => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) throw new Error("Nicht authentifiziert");

      const fileExt = file.name.split(".").pop();
      const fileName = `${userId}-${type}-${Date.now()}.${fileExt}`;
      const filePath = `profile-images/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("UnitZeroAirsoftBucket")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: true,
        });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from("UnitZeroAirsoftBucket")
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (err: any) {
      console.error("Image upload error:", err);
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      // Upload images if new ones selected
      let newPrimaryUrl = primaryImageUrl;
      let newSecondaryUrl = secondaryImageUrl;

      if (primaryImageFile || secondaryImageFile) {
        setUploadingImages(true);
      }

      if (primaryImageFile) {
        const uploadedUrl = await uploadImage(primaryImageFile, "primary");
        if (uploadedUrl) {
          newPrimaryUrl = uploadedUrl;
        } else {
          throw new Error("Fehler beim Hochladen des Primärbilds");
        }
      }

      if (secondaryImageFile) {
        const uploadedUrl = await uploadImage(secondaryImageFile, "secondary");
        if (uploadedUrl) {
          newSecondaryUrl = uploadedUrl;
        } else {
          throw new Error("Fehler beim Hochladen des Sekundärbilds");
        }
      }

      setUploadingImages(false);

      // Update database
      const { error: updateError } = await supabase
        .from("public_profiles")
        .upsert(
          {
            user_id: userId,
            name,
            callsign,
            primary_image_url: newPrimaryUrl,
            secondary_image_url: newSecondaryUrl,
            weapons: weapons.filter((w) => w.name.trim() !== ""),
            playstyle,
            description,
            favorite_quote: favoriteQuote,
            favorite_mode: favoriteMode,
            favorite_field: favoriteField,
            why_airsoft: whyAirsoft,
            why_unit_zero: whyUnitZero,
            updated_at: new Date().toISOString(),
          },
          {
            onConflict: "user_id",
          },
        );

      if (updateError) throw updateError;

      setSuccess(true);
      setPrimaryImageUrl(newPrimaryUrl);
      setSecondaryImageUrl(newSecondaryUrl);
      setPrimaryImageFile(null);
      setSecondaryImageFile(null);
      setPrimaryImagePreview(null);
      setSecondaryImagePreview(null);

      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message || "Ein Fehler ist aufgetreten");
    } finally {
      setLoading(false);
      setUploadingImages(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto p-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Öffentliches Profil
        </h2>
        <p className="text-sm text-gray-500">
          Diese Informationen werden auf deiner öffentlichen Profilkarte
          angezeigt.
        </p>
      </div>

      {error && (
        <div className="bg-red-50 p-4 rounded-md">
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      {success && (
        <div className="bg-green-50 p-4 rounded-md">
          <p className="text-sm text-green-800">
            ✓ Profil erfolgreich aktualisiert!
          </p>
        </div>
      )}

      {/* Basis-Informationen */}
      <div className="bg-white p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Basis-Informationen
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Dein Name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Callsign *
            </label>
            <input
              type="text"
              value={callsign}
              onChange={(e) => setCallsign(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Dein Callsign"
            />
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Spielstil
          </label>
          <select
            value={playstyle}
            onChange={(e) => setPlaystyle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Wähle deinen Spielstil</option>
            {PLAYSTYLES.map((style) => (
              <option key={style} value={style}>
                {style}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Profilbilder */}
      <div className="bg-white p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Profilbilder
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          Das Primärbild wird standardmäßig angezeigt. Beim Hover erscheint das
          Sekundärbild.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Primärbild */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Primärbild
            </label>
            <div
              onDragOver={(e) => handleDragOver(e, "primary")}
              onDragLeave={(e) => handleDragLeave(e, "primary")}
              onDrop={(e) => handleDrop(e, "primary")}
              className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                isDraggingPrimary
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            >
              <svg
                className="mx-auto h-10 w-10 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <label
                htmlFor="primary-upload"
                className="mt-2 cursor-pointer inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-blue hover:bg-blue/90"
              >
                Bild wählen
                <input
                  id="primary-upload"
                  ref={primaryFileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileInputChange(e, "primary")}
                  className="sr-only"
                />
              </label>
              <p className="mt-1 text-xs text-gray-500">oder hierher ziehen</p>
            </div>
            {(primaryImagePreview || primaryImageUrl) && (
              <div className="mt-3 flex items-center gap-2">
                <img
                  src={primaryImagePreview || primaryImageUrl}
                  alt="Primärbild"
                  className="h-16 w-16 rounded object-cover ring-2 ring-blue-500"
                />
                {primaryImagePreview && (
                  <button
                    type="button"
                    onClick={() => removeImage("primary")}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Entfernen
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Sekundärbild */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Sekundärbild (Hover)
            </label>
            <div
              onDragOver={(e) => handleDragOver(e, "secondary")}
              onDragLeave={(e) => handleDragLeave(e, "secondary")}
              onDrop={(e) => handleDrop(e, "secondary")}
              className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                isDraggingSecondary
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            >
              <svg
                className="mx-auto h-10 w-10 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <label
                htmlFor="secondary-upload"
                className="mt-2 cursor-pointer inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-blue hover:bg-blue/90"
              >
                Bild wählen
                <input
                  id="secondary-upload"
                  ref={secondaryFileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileInputChange(e, "secondary")}
                  className="sr-only"
                />
              </label>
              <p className="mt-1 text-xs text-gray-500">oder hierher ziehen</p>
            </div>
            {(secondaryImagePreview || secondaryImageUrl) && (
              <div className="mt-3 flex items-center gap-2">
                <img
                  src={secondaryImagePreview || secondaryImageUrl}
                  alt="Sekundärbild"
                  className="h-16 w-16 rounded object-cover ring-2 ring-gray-300"
                />
                {secondaryImagePreview && (
                  <button
                    type="button"
                    onClick={() => removeImage("secondary")}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Entfernen
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Waffen */}
      <div className="bg-white p-6 shadow-sm border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Deine Waffen</h3>
          <button
            type="button"
            onClick={addWeapon}
            className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-blue hover:bg-blue/90"
          >
            + Waffe hinzufügen
          </button>
        </div>

        <div className="space-y-3">
          {weapons.map((weapon, index) => (
            <div key={weapon.id} className="flex gap-3 items-start">
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  type="text"
                  value={weapon.name}
                  onChange={(e) =>
                    updateWeapon(weapon.id, "name", e.target.value)
                  }
                  placeholder={`Waffe ${index + 1} - Name`}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  value={weapon.type}
                  onChange={(e) =>
                    updateWeapon(weapon.id, "type", e.target.value)
                  }
                  placeholder="Typ (z.B. M4, AK, Sniper)"
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                type="button"
                onClick={() => removeWeapon(weapon.id)}
                className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md"
                title="Entfernen"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          ))}
          {weapons.length === 0 && (
            <p className="text-sm text-gray-500 text-center py-4">
              Noch keine Waffen hinzugefügt. Klicke auf Waffe hinzufügen um zu
              starten.
            </p>
          )}
        </div>
      </div>

      {/* Beschreibung */}
      <div className="bg-white p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Über dich</h3>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Beschreibung
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Erzähle etwas über dich und deinen Airsoft-Hintergrund..."
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Lieblingszitat
          </label>
          <input
            type="text"
            value={favoriteQuote}
            onChange={(e) => setFavoriteQuote(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Dein Lieblingszitat..."
          />
        </div>
      </div>

      {/* Vorlieben */}
      <div className="bg-white p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Vorlieben</h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Lieblings-Modus
            </label>
            <input
              type="text"
              value={favoriteMode}
              onChange={(e) => setFavoriteMode(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="z.B. Team Deathmatch, Capture the Flag..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Lieblings-Spielfeld
            </label>
            <input
              type="text"
              value={favoriteField}
              onChange={(e) => setFavoriteField(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Dein Lieblingsspielfeld..."
            />
          </div>
        </div>
      </div>

      {/* Motivation */}
      <div className="bg-white p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Deine Motivation
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Warum Airsoft?
            </label>
            <textarea
              value={whyAirsoft}
              onChange={(e) => setWhyAirsoft(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Was begeistert dich an Airsoft?"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Warum Unit Zero Airsoft als Team?
            </label>
            <textarea
              value={whyUnitZero}
              onChange={(e) => setWhyUnitZero(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Was macht Unit Zero Airsoft für dich besonders?"
            />
          </div>
        </div>
      </div>

      {/* Submit Buttons */}
      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          disabled={loading || uploadingImages}
          className="flex justify-center items-center bg-blue px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer rounded-md"
        >
          {uploadingImages ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Bilder werden hochgeladen...
            </>
          ) : loading ? (
            "Wird gespeichert..."
          ) : (
            "Profil speichern"
          )}
        </button>

        <button
          type="button"
          onClick={() => router.push("/dashboard")}
          className="flex justify-center bg-white px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 cursor-pointer rounded-md"
        >
          Abbrechen
        </button>
      </div>
    </form>
  );
}
