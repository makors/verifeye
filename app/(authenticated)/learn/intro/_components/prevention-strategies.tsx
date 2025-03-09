import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

export default function PreventionStrategies() {
  return (
    <div className="container mx-auto">      
      <p className="my-2 mb-4">
        Here are some simple strategies to help protect your family from common scams.
      </p>
      
      <Card>
        <CardHeader>
          <CardTitle>Family Protection Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {[
              "Never share personal information with unexpected callers or emailers",
              "Create a family code word to verify legitimate requests for money or information",
              "If it sounds too good to be true, it probably is",
              "Check in with older family members regularly about suspicious contacts",
              "Teach kids to ask parents before clicking links or downloading anything",
              "Use strong, unique passwords for important accounts",
              "Don't rush decisions - scammers create false urgency",
              "Verify requests for money by calling the person directly on a known number",
              "Keep software and devices updated with security patches",
              "Google suspicious phone numbers, emails, or offers before responding"
            ].map((tip, index) => (
              <li key={index} className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

