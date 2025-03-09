"use client";

import React, { useState } from 'react';
import Phone from './_components/phone';
import { motion, AnimatePresence } from 'framer-motion';
import { Figtree } from 'next/font/google';
import Image from 'next/image';
import Logo from "@/components/ui/logo";
import { ShieldCheck, CheckCircle, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Initialize Figtree font
const figtree = Figtree({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-figtree',
});

// Define our story stages for a banking scam scenario
const STORY_STAGES = [
  {
    id: 'intro',
    narration: "You receive a text message from what appears to be your bank...",
  },
  {
    id: 'alert',
    narration: "They inform you about suspicious activity on your account...",
  },
  {
    id: 'verification',
    narration: "They ask you to verify your identity by clicking a link...",
  },
  {
    id: 'fake-site',
    narration: "The link takes you to a site that looks like your bank's login page...",
  },
  {
    id: 'credentials',
    narration: "You enter your login credentials without noticing subtle differences in the URL...",
  },
  {
    id: 'success',
    narration: "The site confirms your verification was successful...",
  },
  {
    id: 'reality',
    narration: "Meanwhile, scammers have captured your banking credentials...",
  },
  {
    id: 'aftermath',
    narration: "Later, you notice unauthorized transactions in your account...",
  },
  {
    id: 'lesson',
    narration: "VerifEye could've helped avoid this scam.",
  },
];

export default function PhoneExamplePage() {
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const currentStage = STORY_STAGES[currentStageIndex];
  
  const goToNextStage = () => {
    if (currentStageIndex < STORY_STAGES.length - 1) {
      setCurrentStageIndex(currentStageIndex + 1);
    }
  };

  const resetStory = () => {
    setCurrentStageIndex(0);
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50 ${figtree.variable} font-sans`}>
      {/* Narration */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={currentStage.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="text-xl text-gray-800 mb-8 max-w-md text-center font-semibold"
        >
          {currentStage.narration}
        </motion.div>
      </AnimatePresence>
      
      {/* Phone with current stage content */}
      <div className="mb-8">
        <Phone>
          <StoryContent stageId={currentStage.id} />
        </Phone>
      </div>

      {/* Navigation buttons */}
      <div className="flex gap-4">
        {currentStageIndex < STORY_STAGES.length - 1 ? (
          <Button 
            onClick={goToNextStage}
            variant="default"
            className='min-w-24'
            size="lg"
          >
            Next
          </Button>
        ) : (
          <Link href="/home">
            <Button 
              variant="default"
              className='min-w-24'
              size="lg"
            >
              Start Learning
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}

// Component to render different content based on the current stage
function StoryContent({ stageId }: { stageId: string }) {
  switch (stageId) {
    case 'intro':
      return <IntroScreen />;
    case 'alert':
      return <IMessageApp messages={[
        { id: 1, text: "ALERT: We've detected unusual activity on your account. Please verify your identity immediately. -SecureBank", sender: "SecureBank", timestamp: "Now" },
      ]} />;
    case 'verification':
      return <IMessageApp messages={[
        { id: 1, text: "ALERT: We've detected unusual activity on your account. Please verify your identity immediately. -SecureBank", sender: "SecureBank", timestamp: "2m ago" },
        { id: 2, text: "For your protection, we need you to verify your account information. Click here: https://secure-b4nk-verify.com/auth", sender: "SecureBank", timestamp: "Now" },
      ]} />;
    case 'fake-site':
      return <FakeBankLogin />;
    case 'credentials':
      return <FakeBankLoginWithCredentials />;
    case 'success':
      return <VerificationSuccess />;
    case 'reality':
      return <ScammerScreen />;
    case 'aftermath':
      return <BankTransactions />;
    case 'lesson':
      return <LessonScreen />;
    default:
      return <div className="flex items-center justify-center h-full text-black">Loading...</div>;
  }
}

// Lock Screen 
function IntroScreen() {
  return (
    <div className="h-full bg-gradient-to-b from-blue-100 to-blue-200 flex flex-col justify-between">
      {/* Time */}
      <div className="text-center pt-16">
        <div className="text-gray-800 text-5xl font-light">9:41</div>
        <div className="text-gray-800 text-lg mt-1">Monday, June 3</div>
      </div>
      
      {/* Notification */}
      <div className="pb-16 px-4">
        <div className="bg-white/70 backdrop-blur-md rounded-2xl p-4 shadow-sm">
          <div className="flex items-center mb-2">
            <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
              </svg>
            </div>
            <div className="ml-2 text-gray-800">
              <div className="font-bold">Messages</div>
              <div className="text-sm opacity-80">now</div>
            </div>
          </div>
          <div className="text-gray-800">
            <strong>SecureBank</strong>: ALERT: We've detected unusual activity on your account...
          </div>
        </div>
      </div>
    </div>
  );
}

// iMessage App Component
interface Message {
  id: number;
  text: string;
  sender: string;
  timestamp: string;
}

function IMessageApp({ messages }: { messages: Message[] }) {
  return (
    <div className="h-full flex flex-col bg-gray-100">
      {/* Header */}
      <div className="bg-gray-200 p-3 flex items-center border-b border-gray-300">
        <div className="flex-1">
          <div className="font-semibold text-center">{messages[0].sender}</div>
        </div>
      </div>
      
      {/* Messages container */}
      <div className="flex-1 p-4 overflow-y-auto flex flex-col space-y-2">
        <AnimatePresence initial={false}>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col"
            >
              <div className={`max-w-[80%] rounded-2xl p-3 ${message.sender === 'me' ? 'bg-blue-500 text-white self-end' : 'bg-gray-300 text-black self-start'}`}>
                {message.text}
              </div>
              <div className={`text-xs mt-1 text-gray-500 ${message.sender === 'me' ? 'self-end' : 'self-start'}`}>
                {message.timestamp}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      {/* Message input (just for show) */}
      <div className="p-2 bg-gray-200 border-t border-gray-300">
        <div className="bg-white rounded-full p-2 px-4 flex items-center">
          <input
            type="text"
            placeholder="iMessage"
            disabled
            className="flex-1 bg-transparent outline-none"
          />
          <Button variant="ghost" size="icon" className="ml-2 text-blue-500 p-0 h-auto">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  );
}

// Fake Bank Login Screen
function FakeBankLogin() {
  return (
    <div className="h-full bg-white flex flex-col">
      {/* Browser address bar with subtle issues */}
      <div className="bg-gray-100 p-2 flex items-center border-b border-gray-200 text-xs">
        <div className="flex items-center bg-white rounded-md px-2 py-1 flex-1">
          <span className="text-gray-800 truncate">https://secure-b4nk-verify.com/auth</span>
        </div>
      </div>
      
      {/* Fake bank website content */}
      <div className="flex-1 overflow-auto">
        <div className="p-4 flex flex-col items-center">
          <Image src="/securebank.png" alt="SecureBank" width={100} height={100} />
          
          <h1 className="text-xl font-semibold text-gray-800 mb-2">Account Verification</h1>
          <p className="text-sm text-gray-600 mb-6 text-center">
            For your security, please verify your account details below.
          </p>
          
          <div className="w-full max-w-xs">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-semibold mb-1">Username</label>
              <input type="text" className="w-full p-2 border border-gray-300 rounded" placeholder="Enter username" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-semibold mb-1">Password</label>
              <input type="password" className="w-full p-2 border border-gray-300 rounded" placeholder="Enter password" />
            </div>
            <Button className="w-full" variant="default">
              Verify Account
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Fake Bank Login with Credentials Entered
function FakeBankLoginWithCredentials() {
  return (
    <div className="h-full bg-white flex flex-col">
      {/* Browser address bar with subtle issues */}
      <div className="bg-gray-100 p-2 flex items-center border-b border-gray-200 text-xs">
        <div className="flex items-center bg-white rounded-md px-2 py-1 flex-1">
          <span className="text-gray-800 truncate">https://secure-b4nk-verify.com/auth</span>
        </div>
      </div>
      
      {/* Fake bank website content */}
      <div className="flex-1 overflow-auto">
        <div className="p-4 flex flex-col items-center">
            <Image src="/securebank.png" alt="SecureBank" width={100} height={100} />

          
          <h1 className="text-xl font-semibold text-gray-800 mb-2">Account Verification</h1>
          <p className="text-sm text-gray-600 mb-6 text-center">
            For your security, please verify your account details below.
          </p>
          
          <div className="w-full max-w-xs">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-semibold mb-1">Username</label>
              <input type="text" className="w-full p-2 border border-gray-300 rounded" value="johndoe2023" readOnly />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-semibold mb-1">Password</label>
              <input type="password" className="w-full p-2 border border-gray-300 rounded" value="••••••••" readOnly />
            </div>
            <Button className="w-full animate-pulse" variant="default" disabled>
              Verifying...
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Verification Success Screen
function VerificationSuccess() {
  return (
    <div className="h-full bg-white flex flex-col">
      {/* Browser address bar */}
      <div className="bg-gray-100 p-2 flex items-center border-b border-gray-200 text-xs">
        <div className="flex items-center bg-white rounded-md px-2 py-1 flex-1">
          <span className="text-gray-800 truncate">https://secure-b4nk-verify.com/success</span>
        </div>
      </div>
      
      {/* Success content */}
      <div className="flex-1 overflow-auto">
        <div className="p-4 flex flex-col items-center justify-center h-full">
          <div className="w-16 h-16 bg-green-500 rounded-full mb-4 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          
          <h1 className="text-xl font-semibold text-gray-800 mb-2">Verification Successful</h1>
          <p className="text-sm text-gray-600 mb-6 text-center">
            Thank you for verifying your account details.<br/>
            Your account has been secured.
          </p>
          
          <div className="text-xs text-gray-500">
            You will be redirected to your account dashboard shortly.
          </div>
        </div>
      </div>
    </div>
  );
}

// Scammer Screen - What's happening behind the scenes
function ScammerScreen() {
  return (
    <div className="h-full bg-gray-900 text-green-500 p-4 font-mono text-sm">
      <div className="mb-4 text-white font-bold">SCAMMER'S COMPUTER</div>
      
      <div className="mb-2">$ ./phishing-tool.sh</div>
      <div className="mb-2">[+] Phishing site active at secure-b4nk-verify.com</div>
      <div className="mb-2">[+] Waiting for victim credentials...</div>
      <div className="mb-4">[+] CREDENTIALS CAPTURED:</div>
      
      <div className="bg-black p-2 rounded mb-4">
        <div>username: johndoe2023</div>
        <div>password: MySecur3P@ss</div>
        <div>ip: 192.168.1.45</div>
        <div>timestamp: 2023-06-03 09:42:15</div>
        <div>device: iPhone 13 Pro</div>
        <div>browser: Safari 15.4</div>
      </div>
      
      <div className="animate-pulse">[+] Initiating account takeover sequence...</div>
    </div>
  );
}

// Bank Transactions Screen showing unauthorized activity
function BankTransactions() {
  return (
    <div className="h-full bg-white flex flex-col">
      {/* App header */}
      <div className="bg-blue-600 p-4 text-white">
        <div className="font-bold text-lg">SecureBank</div>
        <div className="text-sm opacity-80">Account Overview</div>
      </div>
      
      {/* Account info */}
      <div className="p-4 border-b border-gray-200">
        <div className="text-sm text-gray-500">Available Balance</div>
        <div className="text-2xl font-semibold text-gray-800">$1,285.42</div>
        <div className="text-xs text-red-500 mt-1">-$3,714.58 today</div>
      </div>
      
      {/* Transaction list */}
      <div className="flex-1 overflow-auto p-2">
        <div className="text-sm font-semibold text-gray-500 mb-2 px-2">RECENT TRANSACTIONS</div>
        
        <div className="bg-red-50 p-3 rounded-md mb-2 border-l-4 border-red-500">
          <div className="flex justify-between">
            <div className="font-semibold text-gray-800">International Transfer</div>
            <div className="text-red-600 font-semibold">-$2,500.00</div>
          </div>
          <div className="text-xs text-gray-500">Today, 10:15 AM</div>
        </div>
        
        <div className="bg-red-50 p-3 rounded-md mb-2 border-l-4 border-red-500">
          <div className="flex justify-between">
            <div className="font-semibold text-gray-800">Online Purchase - Digital Wallet</div>
            <div className="text-red-600 font-semibold">-$1,214.58</div>
          </div>
          <div className="text-xs text-gray-500">Today, 9:52 AM</div>
        </div>
        
        <div className="bg-white p-3 rounded-md mb-2 border border-gray-200">
          <div className="flex justify-between">
            <div className="font-semibold text-gray-800">Paycheck - ABC Company</div>
            <div className="text-green-600 font-semibold">+$1,850.00</div>
          </div>
          <div className="text-xs text-gray-500">June 1, 8:30 AM</div>
        </div>
        
        <div className="bg-white p-3 rounded-md mb-2 border border-gray-200">
          <div className="flex justify-between">
            <div className="font-semibold text-gray-800">Grocery Store</div>
            <div className="text-red-600 font-semibold">-$78.35</div>
          </div>
          <div className="text-xs text-gray-500">May 30, 2:45 PM</div>
        </div>
      </div>
    </div>
  );
}

// Lesson Screen - Educational component with VerifEye branding
function LessonScreen() {
  return (
    <div className="h-full bg-background flex flex-col">
      {/* VerifEye Header */}
      <div className="bg-primary/10 p-4 flex items-center">
        <Logo />
        <div className="text-primary text-xs ml-auto font-medium">Security Awareness</div>
      </div>
      
      {/* Interactive Content */}
      <div className="flex-1 overflow-auto">
        {/* Title Section */}
        <div className="bg-secondary/50 p-4 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">Banking Scam Detected</h2>
          <p className="text-sm text-muted-foreground mt-1">Interactive Lesson</p>
        </div>
        
        {/* Scam Summary */}
        <div className="p-4 border-b border-border">
          <div className="flex items-start">
            <div className="w-10 h-10 rounded-full bg-destructive/10 flex-shrink-0 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-destructive" />
            </div>
            <div className="ml-3">
              <h3 className="font-semibold text-foreground">Phishing Attack Identified</h3>
              <p className="text-sm text-muted-foreground mt-1">
                You've experienced a simulation of a banking phishing scam. Let's break down how it works and how to protect yourself.
              </p>
            </div>
          </div>
        </div>
        
        {/* Interactive Quiz */}
        <div className="p-4 border-b border-border bg-background/50">
          <h3 className="font-semibold text-foreground mb-3">Test Your Knowledge</h3>
          
          <div className="space-y-4">
            {/* Question 1 */}
            <div className="bg-card p-3 rounded-lg shadow-sm">
              <p className="font-medium text-card-foreground mb-2">What was suspicious about the bank's text message?</p>
              
              <div className="space-y-2">
                <label className="flex items-center p-2 bg-background border border-border rounded cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors">
                  <input type="radio" name="q1" className="mr-2" />
                  <span className="text-sm">Nothing, it was legitimate</span>
                </label>
                
                <label className="flex items-center p-2 bg-background border border-border rounded cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors">
                  <input type="radio" name="q1" className="mr-2" />
                  <span className="text-sm">The bank's name was misspelled</span>
                </label>
                
                <label className="flex items-center p-2 bg-[#f0fdf4] border border-[#86efac] rounded cursor-pointer">
                  <input type="radio" name="q1" className="mr-2" defaultChecked />
                  <span className="text-sm font-medium text-[#166534]">It asked you to click a suspicious link</span>
                  <CheckCircle className="w-5 h-5 text-[#16a34a] ml-auto" />
                </label>
              </div>
            </div>
            
            {/* Question 2 */}
            <div className="bg-card p-3 rounded-lg shadow-sm">
              <p className="font-medium text-card-foreground mb-2">What was the red flag in the website URL?</p>
              
              <div className="space-y-2">
                <label className="flex items-center p-2 bg-[#f0fdf4] border border-[#86efac] rounded cursor-pointer">
                  <input type="radio" name="q2" className="mr-2" defaultChecked />
                  <span className="text-sm font-medium text-[#166534]">The URL used "b4nk" instead of "bank"</span>
                  <CheckCircle className="w-5 h-5 text-[#16a34a] ml-auto" />
                </label>
                
                <label className="flex items-center p-2 bg-background border border-border rounded cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors">
                  <input type="radio" name="q2" className="mr-2" />
                  <span className="text-sm">The website didn't use HTTPS</span>
                </label>
                
                <label className="flex items-center p-2 bg-background border border-border rounded cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors">
                  <input type="radio" name="q2" className="mr-2" />
                  <span className="text-sm">The website had a different bank name</span>
                </label>
              </div>
            </div>
          </div>
        </div>
        
        {/* Safety Tips */}
        <div className="p-4 bg-muted/30">
          <h3 className="font-semibold text-foreground mb-3">VerifEye Security Tips</h3>
          
          <div className="space-y-3">
            <div className="bg-card p-3 rounded-lg shadow-sm flex items-start">
              <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-4 h-4 text-primary" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-card-foreground">Never click suspicious links in text messages or emails from your bank</p>
              </div>
            </div>
            
            <div className="bg-card p-3 rounded-lg shadow-sm flex items-start">
              <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-4 h-4 text-primary" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-card-foreground">Always check URLs carefully before entering login credentials</p>
              </div>
            </div>
            
            <div className="bg-card p-3 rounded-lg shadow-sm flex items-start">
              <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-4 h-4 text-primary" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-card-foreground">Contact your bank directly through their official app or phone number</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Certificate of Completion */}
        <div className="p-4 flex flex-col items-center">
          <div className="w-full bg-gradient-to-r from-primary/5 to-primary/2 rounded-lg p-6 text-center border border-primary/10 shadow-sm">
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">VerifEye Security Training</div>
            <div className="font-bold text-lg mb-2 text-primary">Certificate of Completion</div>
            <div className="text-sm mb-3 text-foreground">You've successfully completed the banking scam awareness training</div>
            <div className="text-xs text-muted-foreground">Issued June 3, 2023</div>
            <div className="mt-4 flex justify-center">
              <ShieldCheck className="w-20 h-20 text-primary opacity-10" />
            </div>
          </div>
          
          <Link href="/home">
            <Button className="mt-4 flex items-center" variant="default" size="default">
              Share Certificate
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
              </svg>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}