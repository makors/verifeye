import { create } from "zustand";

interface FormState {
    currentStep: number;
    setCurrentStep: (step: number) => void;
    formData: {
        age: number;
        gender: "male" | "female" | "other";
        interests: string;
    };
    setAge: (age: number) => void;
    setGender: (gender: "male" | "female" | "other") => void;
    setInterests: (interests: string) => void;
}

export const useFormState = create<FormState>((set, get) => ({
    currentStep: 0,
    formData: {
        age: 0,
        gender: "male",
        interests: "",
    },
    setCurrentStep: (step: number) => set({ currentStep: step }),
    setAge: (age: number) => set((state) => ({ 
        formData: { ...state.formData, age } 
    })),
    setGender: (gender: "male" | "female" | "other") => set((state) => ({ 
        formData: { ...state.formData, gender } 
    })),
    setInterests: (interests: string) => set((state) => ({ 
        formData: { ...state.formData, interests } 
    })),
}));
