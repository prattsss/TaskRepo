// MultiStepForm.js
import React, { useState, useEffect } from "react";
import { updateUser } from "../util/api";
import { X } from "lucide-react";
export default function MultiStepForm({ addUser, closeForm, editData, toggleForm }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ name: "", email: "" });

  useEffect(() => {
    if (editData) {
      setFormData({
        name: editData.name,
        email: editData.email
      });
    }
  }, [editData]);

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 2));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    try {
      if (editData) {
        console.log('editing')
        await updateUser(editData.id, formData);
        addUser({ ...formData, id: editData.id });
      } else {
        addUser(formData);
      }
      closeForm();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className=" relative max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <button className="absolute top-4 right-4 text-black" onClick={toggleForm}>
        <X size={28} />
      </button>
      <h2 className="text-xl font-semibold mb-4">Step {step} of 2</h2>

      {step === 1 && (
        <div>
          Step 1: Enter your name
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border p-2 w-full mt-2"
          />
        </div>
      )}

      {step === 2 && (
        <div>
          Step 2: Enter your email
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border p-2 w-full mt-2"
          />
        </div>
      )}

      <div className="flex justify-between mt-4">
        {step > 1 && (
          <button onClick={prevStep} className="bg-gray-500 text-white px-4 py-2">
            Back
          </button>
        )}
        {step < 2 ? (
          <button onClick={nextStep} className="bg-blue-500 text-white px-4 py-2">
            Next
          </button>
        ) : (
          <button onClick={handleSubmit} className="bg-green-500 text-white px-4 py-2">
            {editData ? "Update" : "Submit"}
          </button>
        )}
      </div>
    </div>
  );
}