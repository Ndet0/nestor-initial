import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, X, Save } from "lucide-react";
import Button from "./Button";

/**
 * Simple admin form to add new places
 * Generates data structure you can copy-paste into places.js
 */
export default function AdminPlaceForm() {
  const [formData, setFormData] = useState({
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
    featured: false
  });

  const [generatedData, setGeneratedData] = useState("");

  const categories = ["Hiking", "Waterfall", "Picnic", "Adventure", "Scenic", "Beach", "Forest", "Mountain"];
  const difficulties = ["Easy", "Easy to Moderate", "Moderate", "Moderate to Hard", "Hard"];
  const counties = ["Nairobi", "Kiambu", "Nakuru", "Kajiado", "Machakos", "Mombasa", "Kilifi", "Kwale"];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleArrayChange = (field, index, value) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData(prev => ({ ...prev, [field]: newArray }));
  };

  const addArrayItem = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], ""]
    }));
  };

  const removeArrayItem = (field, index) => {
    if (formData[field].length > 1) {
      const newArray = formData[field].filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, [field]: newArray }));
    }
  };

  const generateDataStructure = () => {
    const id = Date.now();
    
    const placeObject = {
      id,
      name: formData.name,
      location: formData.location,
      county: formData.county,
      price: parseInt(formData.price) || 0,
      rating: 0,
      reviewCount: 0,
      images: formData.images.filter(img => img.trim() !== ""),
      category: formData.category,
      description: formData.description,
      highlights: formData.highlights.filter(h => h.trim() !== ""),
      openingHours: formData.openingHours,
      bestTimeToVisit: formData.bestTimeToVisit,
      difficulty: formData.difficulty,
      duration: formData.duration,
      facilities: formData.facilities.filter(f => f.trim() !== ""),
      contact: {
        phone: formData.phone,
        email: formData.email
      },
      coordinates: { lat: 0, lng: 0 },
      featured: formData.featured
    };

    const jsonString = JSON.stringify(placeObject, null, 2);
    setGeneratedData(jsonString);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedData);
    alert("Copied! Paste into places.js");
  };

  const resetForm = () => {
    setFormData({
      name: "", location: "", county: "", price: 0, category: "Hiking",
      description: "", highlights: [""], openingHours: "", bestTimeToVisit: "",
      difficulty: "Easy", duration: "", facilities: [""], phone: "", email: "",
      images: [""], featured: false
    });
    setGeneratedData("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Add New Place</h1>
          <p className="text-slate-400">Fill in the details to add a new adventure spot</p>
        </motion.div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
          <div className="space-y-6">
            {/* Basic Info */}
            <div>
              <h2 className="text-xl font-semibold mb-4 text-indigo-400">Basic Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Place Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g., Karura Forest"
                    className="w-full bg-slate-900/50 text-white px-4 py-2 rounded-lg border border-slate-700 focus:border-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Location *</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g., Nairobi"
                    className="w-full bg-slate-900/50 text-white px-4 py-2 rounded-lg border border-slate-700 focus:border-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">County *</label>
                  <select
                    name="county"
                    value={formData.county}
                    onChange={handleChange}
                    className="w-full bg-slate-900/50 text-white px-4 py-2 rounded-lg border border-slate-700 focus:border-indigo-500 focus:outline-none"
                  >
                    <option value="">Select County</option>
                    {counties.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Category *</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full bg-slate-900/50 text-white px-4 py-2 rounded-lg border border-slate-700 focus:border-indigo-500 focus:outline-none"
                  >
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Price (KSh)</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="0 for free"
                    className="w-full bg-slate-900/50 text-white px-4 py-2 rounded-lg border border-slate-700 focus:border-indigo-500 focus:outline-none"
                  />
                </div>
                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleChange}
                    className="w-5 h-5 rounded bg-slate-900/50 border-slate-700"
                  />
                  <label className="text-sm font-medium">Featured</label>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium mb-2">Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                placeholder="Describe the place..."
                className="w-full bg-slate-900/50 text-white px-4 py-2 rounded-lg border border-slate-700 focus:border-indigo-500 focus:outline-none resize-none"
              />
            </div>

            {/* Images */}
            <div>
              <h2 className="text-xl font-semibold mb-4 text-indigo-400">Images</h2>
              {formData.images.map((img, i) => (
                <div key={i} className="flex gap-2 mb-2">
                  <input
                    type="url"
                    value={img}
                    onChange={(e) => handleArrayChange("images", i, e.target.value)}
                    placeholder="Image URL"
                    className="flex-1 bg-slate-900/50 text-white px-4 py-2 rounded-lg border border-slate-700 focus:border-indigo-500 focus:outline-none"
                  />
                  {formData.images.length > 1 && (
                    <button onClick={() => removeArrayItem("images", i)} className="p-2 bg-red-600/20 hover:bg-red-600/30 rounded-lg">
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
              <button onClick={() => addArrayItem("images")} className="flex items-center gap-2 text-sm text-indigo-400 hover:text-indigo-300 mt-2">
                <Plus className="w-4 h-4" />Add Image
              </button>
            </div>

            {/* Highlights */}
            <div>
              <h2 className="text-xl font-semibold mb-4 text-indigo-400">Highlights</h2>
              {formData.highlights.map((h, i) => (
                <div key={i} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={h}
                    onChange={(e) => handleArrayChange("highlights", i, e.target.value)}
                    placeholder="e.g., 50+ km trails"
                    className="flex-1 bg-slate-900/50 text-white px-4 py-2 rounded-lg border border-slate-700 focus:border-indigo-500 focus:outline-none"
                  />
                  {formData.highlights.length > 1 && (
                    <button onClick={() => removeArrayItem("highlights", i)} className="p-2 bg-red-600/20 hover:bg-red-600/30 rounded-lg">
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
              <button onClick={() => addArrayItem("highlights")} className="flex items-center gap-2 text-sm text-indigo-400 hover:text-indigo-300 mt-2">
                <Plus className="w-4 h-4" />Add Highlight
              </button>
            </div>

            {/* Visit Info */}
            <div>
              <h2 className="text-xl font-semibold mb-4 text-indigo-400">Visit Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Opening Hours</label>
                  <input type="text" name="openingHours" value={formData.openingHours} onChange={handleChange} placeholder="6 AM - 6 PM" className="w-full bg-slate-900/50 text-white px-4 py-2 rounded-lg border border-slate-700 focus:border-indigo-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Best Time</label>
                  <input type="text" name="bestTimeToVisit" value={formData.bestTimeToVisit} onChange={handleChange} placeholder="Early morning" className="w-full bg-slate-900/50 text-white px-4 py-2 rounded-lg border border-slate-700 focus:border-indigo-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Difficulty</label>
                  <select name="difficulty" value={formData.difficulty} onChange={handleChange} className="w-full bg-slate-900/50 text-white px-4 py-2 rounded-lg border border-slate-700 focus:border-indigo-500 focus:outline-none">
                    {difficulties.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Duration</label>
                  <input type="text" name="duration" value={formData.duration} onChange={handleChange} placeholder="2-4 hours" className="w-full bg-slate-900/50 text-white px-4 py-2 rounded-lg border border-slate-700 focus:border-indigo-500 focus:outline-none" />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-6 border-t border-slate-700">
              <Button onClick={generateDataStructure} className="flex items-center gap-2 px-6 py-3">
                <Save className="w-5 h-5" />Generate Data
              </Button>
              <button onClick={resetForm} className="px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-xl transition-colors">
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Output */}
        {generatedData && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8 bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-indigo-400">Generated Data</h2>
              <Button onClick={copyToClipboard} className="px-4 py-2 text-sm">Copy</Button>
            </div>
            <pre className="bg-slate-900 p-4 rounded-lg overflow-x-auto text-sm text-green-400">{generatedData}</pre>
            <p className="text-sm text-slate-400 mt-4">
              Copy and paste into <code className="text-indigo-400">src/data/places.js</code>
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}