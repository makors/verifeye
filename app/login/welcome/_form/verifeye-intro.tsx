import { ShieldCheck, Eye, BookOpen, Users, Bell, Award, Trophy } from "lucide-react";

export default function VerifeyeIntro() {
  return (
    <div className="space-y-8">
      <div className="grid gap-4">
        <Feature 
          icon={<Eye className="h-5 w-5 text-primary" />}
          title="See Through Scams"
          description="Verifeye helps you spot the warning signs of scams before you become a victim."
        />
        
        <Feature 
          icon={<BookOpen className="h-5 w-5 text-primary" />}
          title="Learn At Your Pace"
          description="Interactive, short-paced, and tailored lessons help you avoid scams."
        />
        
        <Feature 
          icon={<Trophy className="h-5 w-5 text-primary" />}
          title="Compete With Others"
          description="Rank up and earn badges for your achievements."
        />
      </div>

      <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-5 shadow-sm border border-primary/20">
        <div className="flex items-center justify-center mb-3">
          <ShieldCheck className="h-6 w-6 text-primary mr-2" />
          <h3 className="text-lg font-semibold text-primary">Our Mission</h3>
        </div>
        <p className="text-center text-sm">
          To prevent scams before they happen through education and awareness, 
          empowering you to protect yourself and your loved ones.
        </p>
      </div>
    </div>
  );
}

function Feature({ icon, title, description }: { 
  icon: React.ReactNode; 
  title: string; 
  description: string 
}) {
  return (
    <div className="flex items-center space-x-4 p-3 rounded-md bg-background border">
      <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
        {icon}
      </div>
      <div>
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
} 