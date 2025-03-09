import { Button } from "@/components/ui/button";
import { useFormState } from "../state";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { saveUserProfile } from "../actions";

export default function SubmitButton() {
    const { formData } = useFormState();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async () => {
        try {
            setIsLoading(true);
            
            // Use the server action instead of the REST API
            const result = await saveUserProfile({
                age: formData.age,
                gender: formData.gender,
                interests: formData.interests,
            });

            if (!result.success) {
                throw new Error(result.error || 'Failed to save profile data');
            }

            // Redirect to learn/start
            router.push("/home");
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