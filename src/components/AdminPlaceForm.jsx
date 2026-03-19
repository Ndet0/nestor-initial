import { useState } from "react";
import { Database, Save, RotateCcw, Plus, X } from "lucide-react";
import { createPlace } from "../utils/api";
import Button from "./Button";

const CATEGORIES = ["Hiking", "Waterfall", "Picnic", "Adventure", "Scenic", "Beach", "Forest"];
const DIFFICULTIES = ["Easy", "Moderate", "Hard"];

const INITIAL_FORM = {
  name: "",
  location: "",
  county: "",
  price: 0,
  category: "Hiking",
  description: "",
  highlights: [""],
  openingHours: "",
  bestTimeToVisit: "",
  difficulty: "Easy",
  duration: "",
  facilities: [""],
  phone: "",
  email: "",
  images: [""],
  featured: false,
};

export default function AdminPlaceForm() {
  const [formData, setFormData] = useState({ ...INITIAL_FORM });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleArrayChange = (field, index, value) => {
    setFormData((prev) => {
      const copy = [...prev[field]];
      copy[index] = value;
      return { ...prev, [field]: copy };
    });
  };

  const addArrayItem = (field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  const removeArrayItem = (field, index) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Name is required";
    if (!formData.location.trim()) errs.location = "Location is required";
    if (!formData.county.trim()) errs.county = "County is required";
    if (formData.price < 0) errs.price = "Price cannot be negative";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setSaving(true);
    setStatus(null);

    const payload = {
      ...formData,
      price: parseInt(formData.price, 10) || 0,
      highlights: formData.highlights.filter(Boolean),
      facilities: formData.facilities.filter(Boolean),
      images: formData.images.filter(Boolean),
      contact: { phone: formData.phone, email: formData.email },
    };

    try {
      const result = await createPlace(payload);
      setStatus({ type: "success", message: `Place saved successfully (ID: ${result.id})` });
      resetForm();
    } catch (err) {
      setStatus({ type: "error", message: err.message || "Failed to save place" });
    } finally {
      setSaving(false);
    }
  };

  const resetForm = () => {
    setFormData({ ...INITIAL_FORM });
    setErrors({});
  };

  const inputClass =
    "w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition";
  const labelClass = "block text-sm font-medium text-slate-300 mb-1";
  const errorClass = "text-red-400 text-xs mt-1";

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 md:p-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Add New Place</h1>
        <p className="text-slate-400 mb-6">Fill in the details to add a new outdoor destination.</p>

        {/* Status banner */}
        {status && (
          <div
            className={`mb-6 px-4 py-3 rounded-lg text-sm font-medium ${
              status.type === "success"
                ? "bg-emerald-900/50 text-emerald-300 border border-emerald-700"
                : "bg-red-900/50 text-red-300 border border-red-700"
            }`}
          >
            {status.message}
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-wrap gap-3 mb-8">
          <Button onClick={handleSubmit} disabled={saving} className="flex items-center gap-2 px-6 py-3">
            <Database className="w-4 h-4" />
            {saving ? "Saving…" : "Save to Database"}
          </Button>

          <button
            type="button"
            onClick={resetForm}
            className="flex items-center gap-2 px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-xl transition"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
        </div>

        <div className="space-y-6">
          {/* ── Basic Info ───────────────────────────────────── */}
          <fieldset className="border border-slate-800 rounded-xl p-5">
            <legend className="text-lg font-semibold px-2">Basic Information</legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
              <div>
                <label htmlFor="name" className={labelClass}>Name *</label>
                <input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="e.g. Karura Forest" className={inputClass} />
                {errors.name && <p className={errorClass}>{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="location" className={labelClass}>Location *</label>
                <input id="location" name="location" value={formData.location} onChange={handleChange} placeholder="e.g. Nairobi" className={inputClass} />
                {errors.location && <p className={errorClass}>{errors.location}</p>}
              </div>
              <div>
                <label htmlFor="county" className={labelClass}>County *</label>
                <input id="county" name="county" value={formData.county} onChange={handleChange} placeholder="e.g. Nairobi" className={inputClass} />
                {errors.county && <p className={errorClass}>{errors.county}</p>}
              </div>
              <div>
                <label htmlFor="price" className={labelClass}>Price (KES)</label>
                <input id="price" name="price" type="number" min="0" value={formData.price} onChange={handleChange} className={inputClass} />
                {errors.price && <p className={errorClass}>{errors.price}</p>}
              </div>
              <div>
                <label htmlFor="category" className={labelClass}>Category</label>
                <select id="category" name="category" value={formData.category} onChange={handleChange} className={inputClass}>
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="difficulty" className={labelClass}>Difficulty</label>
                <select id="difficulty" name="difficulty" value={formData.difficulty} onChange={handleChange} className={inputClass}>
                  {DIFFICULTIES.map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
            </div>
            <div className="mt-4">
              <label htmlFor="description" className={labelClass}>Description</label>
              <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows={3} placeholder="Describe this place…" className={inputClass} />
            </div>
            <div className="mt-4 flex items-center gap-2">
              <input id="featured" name="featured" type="checkbox" checked={formData.featured} onChange={handleChange} className="accent-indigo-500 w-4 h-4" />
              <label htmlFor="featured" className="text-sm text-slate-300">Featured place</label>
            </div>
          </fieldset>

          {/* ── Timing ───────────────────────────────────────── */}
          <fieldset className="border border-slate-800 rounded-xl p-5">
            <legend className="text-lg font-semibold px-2">Timing &amp; Access</legend>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
              <div>
                <label htmlFor="openingHours" className={labelClass}>Opening Hours</label>
                <input id="openingHours" name="openingHours" value={formData.openingHours} onChange={handleChange} placeholder="e.g. 6 AM – 6 PM" className={inputClass} />
              </div>
              <div>
                <label htmlFor="bestTimeToVisit" className={labelClass}>Best Time to Visit</label>
                <input id="bestTimeToVisit" name="bestTimeToVisit" value={formData.bestTimeToVisit} onChange={handleChange} placeholder="e.g. Morning" className={inputClass} />
              </div>
              <div>
                <label htmlFor="duration" className={labelClass}>Duration</label>
                <input id="duration" name="duration" value={formData.duration} onChange={handleChange} placeholder="e.g. 4-6 hours" className={inputClass} />
              </div>
            </div>
          </fieldset>

          {/* ── Contact ──────────────────────────────────────── */}
          <fieldset className="border border-slate-800 rounded-xl p-5">
            <legend className="text-lg font-semibold px-2">Contact</legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
              <div>
                <label htmlFor="phone" className={labelClass}>Phone</label>
                <input id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="+254…" className={inputClass} />
              </div>
              <div>
                <label htmlFor="email" className={labelClass}>Email</label>
                <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="info@example.com" className={inputClass} />
              </div>
            </div>
          </fieldset>

          {/* ── Dynamic arrays ───────────────────────────────── */}
          {[
            { field: "highlights", label: "Highlights", placeholder: "e.g. Gorge walk" },
            { field: "facilities", label: "Facilities", placeholder: "e.g. Parking" },
            { field: "images", label: "Image URLs", placeholder: "https://…" },
          ].map(({ field, label, placeholder }) => (
            <fieldset key={field} className="border border-slate-800 rounded-xl p-5">
              <legend className="text-lg font-semibold px-2">{label}</legend>
              <div className="space-y-2 mt-3">
                {formData[field].map((val, idx) => (
                  <div key={idx} className="flex gap-2">
                    <input
                      value={val}
                      onChange={(e) => handleArrayChange(field, idx, e.target.value)}
                      placeholder={placeholder}
                      className={inputClass}
                    />
                    {formData[field].length > 1 && (
                      <button type="button" onClick={() => removeArrayItem(field, idx)} className="text-slate-500 hover:text-red-400 transition p-2" aria-label={`Remove ${label.toLowerCase()} item`}>
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => addArrayItem(field)}
                className="mt-2 flex items-center gap-1 text-sm text-indigo-400 hover:text-indigo-300 transition"
              >
                <Plus className="w-4 h-4" /> Add {label.toLowerCase().replace(/s$/, "")}
              </button>
            </fieldset>
          ))}
        </div>
      </div>
    </div>
  );
}
