import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertOctagon, ShieldCheck } from "lucide-react";
import { useFormState } from "../state";

export default function SummaryContent() {
    const { formData } = useFormState();
    
    return (
        <div className="space-y-6">
            <div className="space-y-4">
                <h3 className="font-medium text-lg">Your Information</h3>
                
                <div className="bg-muted rounded-md p-4 space-y-2">
                    <div className="grid grid-cols-2">
                        <span className="text-muted-foreground">Age:</span>
                        <span>{formData.age}</span>
                    </div>
                    <div className="grid grid-cols-2">
                        <span className="text-muted-foreground">Gender:</span>
                        <span className="capitalize">{formData.gender}</span>
                    </div>
                </div>
                
                <div className="bg-muted rounded-md p-4">
                    <h4 className="font-medium mb-2">Interests</h4>
                    <p>{formData.interests || "No interests specified"}</p>
                </div>
                
                <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-4 border border-primary/20 shadow-sm">
                    <div className="flex items-center mb-2">
                        <ShieldCheck className="h-5 w-5 text-primary mr-2" />
                        <h4 className="font-medium text-primary">Verifeye Protection</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        Your profile will help us customize your scam prevention education and provide you with the most relevant protection strategies.
                    </p>
                </div>
            </div>
            
            <Alert className="bg-gradient-to-r from-red-900 to-red-700 text-white border border-red-500 shadow-md">
                <AlertOctagon className="h-5 w-5 text-red-300" />
                <AlertTitle className="font-bold text-red-100">Heads up!</AlertTitle>
                <AlertDescription className="text-red-100">
                    This information will only be used to personalize your learning experience and will not be shared with anyone. If somebody is asking for this information, it may be a scam.
                </AlertDescription>
            </Alert>
        </div>
    );
} 