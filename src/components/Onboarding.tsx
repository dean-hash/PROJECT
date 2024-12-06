import React, { useState } from 'react';
import { Shield, Users, TrendingUp, Mail } from 'lucide-react';

interface OnboardingProps {
  onComplete: () => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: "Welcome to Digital Siblings",
      icon: <Users className="w-12 h-12 text-indigo-600" />,
      content: "Digital Siblings is your free, AI-powered advocate in the digital world. We're here to protect you from manipulation, create more efficient markets, and empower you with personalized expertise."
    },
    {
      title: "Your Data, Protected",
      icon: <Shield className="w-12 h-12 text-green-600" />,
      content: "We never sell your data or use it for advertising. Your information is encrypted and only used to provide you with better recommendations and protection."
    },
    {
      title: "Ethical Market Creation",
      icon: <TrendingUp className="w-12 h-12 text-blue-600" />,
      content: "We earn income through ethical affiliate partnerships, ensuring you get the best deals while supporting responsible businesses. This allows us to keep Digital Siblings free for everyone."
    },
    {
      title: "Email Analysis (Optional)",
      icon: <Mail className="w-12 h-12 text-purple-600" />,
      content: "You can choose to forward emails for analysis. We'll help you identify potential risks, opportunities, and provide ethical product recommendations if applicable."
    }
  ];

  const handleNext = () => {
    if (step === steps.length - 1) {
      onComplete();
    } else {
      setStep(prevStep => prevStep + 1);
    }
  };

  const handlePrev = () => {
    setStep(prevStep => Math.max(prevStep - 1, 0));
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <div className="text-center mb-8">
        {steps[step].icon}
        <h2 className="text-2xl font-bold mt-4">{steps[step].title}</h2>
      </div>
      <p className="text-gray-600 mb-8">{steps[step].content}</p>
      <div className="flex justify-between">
        <button
          onClick={handlePrev}
          disabled={step === 0}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          className="px-4 py-2 bg-indigo-600 text-white rounded"
        >
          {step === steps.length - 1 ? "Get Started" : "Next"}
        </button>
      </div>
    </div>
  );
};

export default Onboarding;