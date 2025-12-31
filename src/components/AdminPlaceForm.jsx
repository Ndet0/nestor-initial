import { useState } from "react";
import { Database, Save } from "lucide-react";
import Button from "./Button";

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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.location || !formData.county) {
      alert("Please fill required fields");
      return;
    }

    const payload = {
      ...formData,
      price: parseInt(formData.price, 10) || 0,
      highlights: formData.highlights.filter(Boolean),
      facilities: formData.facilities.filter(Boolean),
      images: formData.images.filter(Boolean),
      contact: {
        phone: formData.phone,
        email: formData.email
      }
    };

    try {
      const res = await fetch("http://localhost:4000/api/places", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error("Save failed");

      alert("Place saved to database ✅");
      resetForm();
    } catch (err) {
      console.error(err);
      alert("Failed to save place ❌");
    }
  };

  const generateJSON = () => {
    setGeneratedData(JSON.stringify(formData, null, 2));
  };

  const resetForm = () => {
    setFormData({
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
    setGeneratedData("");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Add New Place</h1>

      {/* ACTIONS */}
      <div className="flex gap-4 mb-6">
        <Button onClick={handleSubmit} className="flex items-center gap-2 px-6 py-3">
          <Database className="w-5 h-5" />
          Save to Database
        </Button>

        <Button onClick={generateJSON} className="flex items-center gap-2 px-6 py-3">
          <Save className="w-5 h-5" />
          Generate JSON
        </Button>

        <button onClick={resetForm} className="px-6 py-3 bg-slate-700 rounded-xl">
          Reset
        </button>
      </div>

      {generatedData && (
        <pre className="bg-black p-4 rounded-lg text-green-400 overflow-x-auto">
          {generatedData}
        </pre>
      )}
    </div>
  );
}
