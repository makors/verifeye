"use client";

import React, { useState, useEffect } from "react";
import { fetchUserMessages } from "@/app/login/welcome/actions";

interface EmailContentProps {
  sender?: {
    name: string;
    email: string;
  };
  metadata?: {
    location: string;
    timeSent: string;
  };
  subjectLine?: string;
  body?: string;
  isPhishing?: boolean;
  redFlags?: string[];
}

export default function EmailContent({
  sender = {
    name: "PayPal Customer Service",
    email: "service@paypa1.com"
  },
  metadata = {
    location: "Unknown Location",
    timeSent: "Today, 10:23 AM"
  },
  subjectLine = "Urgent: Your PayPal account has been limited",
  body = `Dear Valued Customer,

We've detected unusual activity on your PayPal account. To ensure your account security, we've temporarily limited some features.

Please verify your information by clicking the link below:
<a href="https://paypa1-secure.com/verify" className="text-blue-500 underline">https://paypa1-secure.com/verify</a>

If you don't verify within 24 hours, your account will be suspended.

Regards,
PayPal Security Team`,
  isPhishing = true,
  redFlags = [
    "Suspicious sender email (paypa1.com instead of paypal.com)",
    "Creates urgency with threats",
    "Suspicious link URL",
    "Requests personal information"
  ]
}: EmailContentProps) {
  const [userAnswer, setUserAnswer] = useState<boolean | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(true);
  const [personalizedEmail, setPersonalizedEmail] = useState<EmailContentProps | null>(null);

  useEffect(() => {
    async function loadPersonalizedContent() {
      try {
        setLoading(true);
        const result = await fetchUserMessages();
        
        if (result.success && result.email) {
          setPersonalizedEmail({
            sender: result.email.sender,
            subjectLine: result.email.subjectLine,
            body: result.email.body,
            isPhishing: result.email.isPhishing,
            redFlags: result.email.redFlags || [],
            metadata: {
              location: "Unknown Location",
              timeSent: "Today, 10:23 AM"
            }
          });
        }
      } catch (error) {
        console.error("Error loading personalized content:", error);
      } finally {
        setLoading(false);
      }
    }

    loadPersonalizedContent();
  }, []);

  // Use personalized content if available, otherwise use default props
  const emailContent = personalizedEmail || {
    sender,
    metadata,
    subjectLine,
    body,
    isPhishing,
    redFlags
  };

  const handleAnswer = (answer: boolean) => {
    setUserAnswer(answer);
    setShowResult(true);
  };

  if (loading) {
    return (
      <div className="p-8 text-center">
        <div className="animate-pulse mb-4">
          <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
        </div>
        <p className="text-gray-600">Loading your personalized email example...</p>
      </div>
    );
  }

  // Ensure all properties are defined
  const senderName = emailContent.sender?.name || "Unknown Sender";
  const senderEmail = emailContent.sender?.email || "unknown@example.com";
  const metadataTime = emailContent.metadata?.timeSent || "Unknown Time";
  const metadataLocation = emailContent.metadata?.location || "Unknown Location";
  const emailSubject = emailContent.subjectLine || "No Subject";
  const emailBody = emailContent.body || "No content";
  const isPhishingEmail = !!emailContent.isPhishing;
  const emailRedFlags = emailContent.redFlags || [];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="border rounded-lg overflow-hidden shadow-sm">
        {/* Email Header */}
        <div className="bg-gray-100 p-4 border-b">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold">{senderName}</p>
              <p className="text-sm text-gray-600">{senderEmail}</p>
            </div>
            <div className="text-right text-sm text-gray-500">
              <p>{metadataTime}</p>
              <p>{metadataLocation}</p>
            </div>
          </div>
          <p className="font-medium mt-2">{emailSubject}</p>
        </div>
        
        {/* Email Body */}
        <div className="p-4 bg-white">
          <div 
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: emailBody }}
          />
        </div>
        
        {/* User Interaction */}
        <div className="p-4 bg-gray-50 border-t">
          <p className="mb-3 font-medium">Is this a phishing email?</p>
          <div className="flex gap-3">
            <button 
              className={`px-4 py-2 rounded-md ${
                userAnswer === true 
                  ? "bg-blue-500 text-white" 
                  : "bg-gray-200 text-gray-800"
              } ${showResult ? "opacity-50 cursor-not-allowed" : ""}`}
              onClick={() => handleAnswer(true)}
              disabled={showResult}
            >
              Yes, it's phishing
            </button>
            <button 
              className={`px-4 py-2 rounded-md ${
                userAnswer === false 
                  ? "bg-blue-500 text-white" 
                  : "bg-gray-200 text-gray-800"
              } ${showResult ? "opacity-50 cursor-not-allowed" : ""}`}
              onClick={() => handleAnswer(false)}
              disabled={showResult}
            >
              No, it's legitimate
            </button>
          </div>

          {showResult && (
            <div className={`mt-4 p-4 rounded-md ${
              (userAnswer === true && isPhishingEmail) || 
              (userAnswer === false && !isPhishingEmail) 
                ? 'bg-green-100 text-green-800 border border-green-300' 
                : 'bg-red-100 text-red-800 border border-red-300'
            }`}>
              {(userAnswer === true && isPhishingEmail) || 
               (userAnswer === false && !isPhishingEmail) ? (
                <p className="font-medium text-lg mb-2">✓ Correct! {isPhishingEmail ? "This is a phishing email." : "This is a legitimate email."}</p>
              ) : (
                <p className="font-medium text-lg mb-2">✗ Incorrect. {isPhishingEmail ? "This is a phishing email." : "This is a legitimate email."}</p>
              )}
              {isPhishingEmail && emailRedFlags.length > 0 && (
                <div className="mt-3">
                  <p className="font-semibold text-base border-b pb-1 mb-2">Warning Signs to Look For:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    {emailRedFlags.map((flag, index) => (
                      <li key={index} className="text-sm">{flag}</li>
                    ))}
                  </ul>
                  <div className="mt-4 text-sm bg-yellow-50 p-3 rounded border border-yellow-200">
                    <p className="font-medium mb-1">Learning Tip:</p>
                    <p>Always check for these warning signs when receiving unexpected emails. Phishing attempts often create a sense of urgency to trick you into acting quickly without thinking.</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
