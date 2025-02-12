import React, { useState } from "react";

export default function MultiStepForm() {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-semibold mb-4">Step {step} of 3</h2>

      {step === 1 && <div>Step 1: Enter your name <input type="text" className="border p-2 w-full mt-2" /></div>}
      {step === 2 && <div>Step 2: Enter your email <input type="email" className="border p-2 w-full mt-2" /></div>}
      {step === 3 && <div>Step 3: Confirm your details <button className="bg-green-500 text-white px-4 py-2 mt-2">Submit</button></div>}

      <div className="flex justify-between mt-4">
        {step > 1 && <button onClick={prevStep} className="bg-gray-500 text-white px-4 py-2">Back</button>}
        {step < 3 && <button onClick={nextStep} className="bg-blue-500 text-white px-4 py-2">Next</button>}
      </div>
    </div>
  );
}
