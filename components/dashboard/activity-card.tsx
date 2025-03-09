import { formatDistanceToNow } from "date-fns";

interface ActivityCardProps {
  emoji: string;
  description: string;
  xpAmount: number;
  createdAt: Date;
}

export function ActivityCard({ emoji, description, xpAmount, createdAt }: ActivityCardProps) {
  return (
    <div className="flex items-center gap-3 py-3 border-b last:border-0">
      <div className="text-2xl flex-shrink-0">
        {emoji}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm truncate">{description}</p>
        <p className="text-xs text-muted-foreground">
          {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
        </p>
      </div>
      <div className="flex-shrink-0 bg-amber-50 text-amber-600 px-2 py-1 rounded-full text-xs font-bold">
        +{xpAmount} XP
      </div>
    </div>
  );
} 