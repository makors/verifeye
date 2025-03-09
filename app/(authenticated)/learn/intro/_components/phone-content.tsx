"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { fetchUserMessages } from "@/app/login/welcome/actions";

interface Message {
  id: number;
  text: string;
  sender: 'them' | 'me';
  time: string;
}

export default function PhoneContent() {
  const [userAnswer, setUserAnswer] = useState<boolean | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(true);
  const [personalizedText, setPersonalizedText] = useState<{
    sender: { name: string; phoneNumber: string };
    body: string;
    isPhishing: boolean;
    redFlags: string[];
  } | null>(null);

  // Default messages if no personalized content is available
  const defaultMessages: Message[] = [
    {
      id: 1,
      text: "URGENT: Your Apple ID has been locked due to suspicious activity. Verify your account now to prevent permanent closure: https://apple-id-verify.co/secure",
      sender: 'them',
      time: '10:23 AM'
    }
  ];

  const [messages, setMessages] = useState<Message[]>(defaultMessages);

  useEffect(() => {
    async function loadPersonalizedContent() {
      try {
        setLoading(true);
        const result = await fetchUserMessages();
        
        if (result.success && result.text) {
          setPersonalizedText(result.text);
          
          // Create a message from the personalized text
          setMessages([
            {
              id: 1,
              text: result.text.body,
              sender: 'them',
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
          ]);
        }
      } catch (error) {
        console.error("Error loading personalized content:", error);
      } finally {
        setLoading(false);
      }
    }

    loadPersonalizedContent();
  }, []);

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
        <p className="text-gray-600">Loading your personalized text message example...</p>
      </div>
    );
  }

  // Get red flags from personalized content or use defaults
  const redFlags = personalizedText?.redFlags || [
    "Suspicious shortened URL",
    "Creates urgency with 'URGENT' message",
    "Threatens account closure",
    "Sender is unknown",
    "Contains suspicious link"
  ];

  const isPhishing = personalizedText?.isPhishing ?? true;

  return (
    <div className="max-w-md mx-auto border rounded-lg overflow-hidden shadow-sm bg-white">
      {/* Phone Header */}
      <div className="bg-gray-800 text-white p-3 flex items-center justify-between">
        <div className="text-sm font-medium">
          {personalizedText?.sender?.name || "Unknown Sender"}
        </div>
        <div className="text-xs opacity-75">
          {personalizedText?.sender?.phoneNumber || "Unknown Number"}
        </div>
      </div>
      
      {/* Messages */}
      <div className="p-4 bg-gray-100 flex flex-col space-y-3 min-h-[200px]">
        {messages.map(message => (
          <div 
            key={message.id}
            className={`max-w-[80%] ${message.sender === 'them' ? 'self-start' : 'self-end'}`}
          >
            <div 
              className={`p-3 rounded-2xl ${
                message.sender === 'them' 
                  ? 'bg-gray-200 rounded-tl-sm text-black' 
                  : 'bg-blue-500 rounded-tr-sm text-white'
              }`}
            >
              {message.text}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {message.time}
            </div>
          </div>
        ))}
      </div>

      {/* User Interaction */}
      <div className="p-4 bg-gray-50 border-t">
        <p className="mb-3 font-medium">Would you click this link?</p>
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
            Yes, I would click it
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
            No, I would ignore it
          </button>
        </div>

        {showResult && (
          <div className={`mt-4 p-4 rounded-md ${
            (userAnswer === false && isPhishing) || 
            (userAnswer === true && !isPhishing) 
              ? 'bg-green-100 text-green-800 border border-green-300' 
              : 'bg-red-100 text-red-800 border border-red-300'
          }`}>
            {(userAnswer === false && isPhishing) || 
             (userAnswer === true && !isPhishing) ? (
              <p className="font-medium text-lg mb-2">✓ Correct! {isPhishing ? "This is a phishing text." : "This is a legitimate text."}</p>
            ) : (
              <p className="font-medium text-lg mb-2">✗ Incorrect. {isPhishing ? "This is a phishing text." : "This is a legitimate text."}</p>
            )}
            {isPhishing && redFlags.length > 0 && (
              <div className="mt-3">
                <p className="font-semibold text-base border-b pb-1 mb-2">Warning Signs to Look For:</p>
                <ul className="list-disc pl-5 space-y-1">
                  {redFlags.map((flag, index) => (
                    <li key={index} className="text-sm">{flag}</li>
                  ))}
                </ul>
                <div className="mt-4 text-sm bg-yellow-50 p-3 rounded border border-yellow-200">
                  <p className="font-medium mb-1">Learning Tip:</p>
                  <p>Be cautious of text messages with links, especially from unknown numbers. Legitimate organizations rarely ask you to click links in text messages for account verification.</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
