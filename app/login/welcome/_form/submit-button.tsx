import { Button } from "@/components/ui/button";
import { useFormState } from "../state";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SubmitButton() {
    const { formData } = useFormState();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async () => {
        try {
            setIsLoading(true);
            
            // Save user profile data
            const response = await fetch('/api/user/profile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    age: formData.age,
                    gender: formData.gender,
                    interests: formData.interests,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to save profile data');
            }

            // Redirect to learn/start
            router.push("/learn/start");
        } catch (error) {
            console.error('Error saving profile:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Button 
            onClick={handleSubmit} 
            className="min-w-[120px]"
            disabled={isLoading}
        >
            {isLoading ? "Saving..." : "Get Started"}
        </Button>
    );
}