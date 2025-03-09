import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useFormState } from "../state";

export default function Interests() {
    const { formData, setAge, setGender, setInterests } = useFormState();
    
    return (
        <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                    <Label htmlFor="age" className="text-sm font-semibold">
                        Age
                    </Label>
                    <Input 
                        id="age"
                        type="number" 
                        placeholder="Enter your age" 
                        value={formData.age || ''}
                        onChange={(e) => setAge(parseInt(e.target.value) || 0)}
                        className="w-full"
                    />
                </div>
                
                <div className="space-y-1.5">
                    <Label htmlFor="gender" className="text-sm font-semibold">
                        Gender
                    </Label>
                    <Select 
                        value={formData.gender} 
                        onValueChange={(value) => setGender(value as "male" | "female" | "other")}
                    >
                        <SelectTrigger id="gender">
                            <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            
            <div className="space-y-1.5">
                <Label htmlFor="interests" className="text-sm font-semibold">
                Please share your interests and topics you are passionate about
                </Label>
                <Textarea
                    id="interests"
                    placeholder="For example: fishing, cooking, gardening, etc."
                    className="min-h-[120px] resize-none"
                    value={formData.interests}
                    onChange={(e) => setInterests(e.target.value)}
                />
                <p className="text-sm text-muted-foreground mt-1">
                    This helps us tailor your learning experience with relevant examples and scenarios.
                </p>
            </div>
        </div>
    );
} 