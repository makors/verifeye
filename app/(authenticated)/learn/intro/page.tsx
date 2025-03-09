'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Content from "./_components/content";
import EmailContent from "./_components/email-content";
import PhoneContent from "./_components/phone-content";
import PreventionStrategies from "./_components/prevention-strategies";

// Step content components - these could be imported from separate files
const Step1Content = () => (
  <div className="pb-8">
    <h2 className="text-2xl font-bold mb-3">Introduction to Scam Awareness</h2>
    <p className="text-gray-600 mb-6">Learn the basics of identifying online scams and protecting yourself from common threats.</p>
    <Separator className="my-6" />
    <Content />
  </div>
);

const Step2Content = () => (
  <div className="pb-8">
    <h2 className="text-2xl font-bold mb-3">Practice Exercise #1</h2>
    <p className="text-gray-600 mb-6">Identify whether the following email is a scam or not.</p>
    <Separator className="my-6" />
    <EmailContent />
  </div>
);

const Step3Content = () => (
  <div className="pb-8">
    <h2 className="text-2xl font-bold mb-3">Practice Exercise #2</h2>
    <p className="text-gray-600 mb-6">Identify whether the following text message is a scam or not.</p>
    <Separator className="my-6" />
    <PhoneContent />
  </div>
);

const Step4Content = () => (
  <div className="pb-8">
    <h2 className="text-2xl font-bold mb-3">Prevention Strategies</h2>
    <p className="text-gray-600 mb-6">Learn effective strategies to protect yourself and your loved ones from scams.</p>
    <Separator className="my-6" />
    <PreventionStrategies />
  </div>
);

// Types for our stepper
type Step = {
  title: string;
  component: React.ComponentType;
};

type StepperProps = {
  steps: Step[];
};

// Reusable Stepper component
const Stepper = ({ steps }: StepperProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = steps.length;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Get current step component
  const CurrentStepComponent = steps[currentStep - 1].component;

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-10">
        <div className="flex w-full h-1">
          {steps.map((_, index) => (
            <div 
              key={index}
              className={`h-full flex-1 ${
                index + 1 < currentStep 
                  ? "bg-green-500" 
                  : index + 1 === currentStep 
                    ? "bg-blue-500" 
                    : "bg-gray-200"
              } ${index > 0 ? "ml-2" : ""}`}
            />
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div>
        <CurrentStepComponent />
      </div>
      
      {/* Navigation */}
      <div className="flex justify-between items-center mt-8">
        <Button 
          variant="outline" 
          onClick={handlePrevious}
          disabled={currentStep === 1}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Previous
        </Button>
        <div className="text-sm text-gray-500">
          Page {currentStep} of {totalSteps}
        </div>
        <Button 
          onClick={handleNext}
          className="flex items-center gap-2"
        >
          {currentStep === totalSteps ? "Finish" : "Next"}
          {currentStep !== totalSteps && <ArrowRight className="w-4 h-4" />}
        </Button>
      </div>
    </div>
  );
};

// Main page component
export default function IntroPage() {
  // Define steps with titles and components
  const steps = [
    { title: "Step 1", component: Step1Content },
    { title: "Step 2", component: Step2Content },
    { title: "Step 3", component: Step3Content },
    { title: "Step 4", component: Step4Content }
  ];

  return (
    <div className="container mx-auto py-8">
      <Stepper steps={steps} />
    </div>
  );
}