import { useFormState } from "../state";
import { useRouter } from "next/navigation";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import VerifeyeIntro from "./verifeye-intro";
import Interests from "./interests";
import SubmitButton from "./submit-button";

export default function MainForm() {
    const { currentStep, setCurrentStep } = useFormState();
    const router = useRouter();

    return (
        <Card className="w-full max-w-xl">
            <CardHeader>
                <CardTitle className="text-xl font-bold">
                    {currentStep === 0 && "Welcome to Verifeye"}
                    {currentStep === 1 && "Personalize Your Experience"}
                </CardTitle>
                <CardDescription className="text-sm">
                    {currentStep === 0 && "Your personal guide to online safety"}
                    {currentStep === 1 && "Help us customize your learning journey"}
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pb-0">
                {currentStep === 0 && <VerifeyeIntro />}
                {currentStep === 1 && <Interests />}
            </CardContent>
            <CardFooter className="pt-0">
                <div className="flex w-full justify-between">
                    <Button
                        variant="outline"
                        onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                        disabled={currentStep === 0}
                        className="min-w-[120px]"
                    >
                        Back
                    </Button>
                    {currentStep === 1 ? (
                        <SubmitButton />
                    ) : (
                        <Button
                            onClick={() => setCurrentStep(currentStep + 1)}
                            className="min-w-[120px]"
                        >
                            Next
                        </Button>
                    )}
                </div>
            </CardFooter>
        </Card>
    );
}