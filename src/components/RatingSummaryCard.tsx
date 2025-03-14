
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";

interface RatingSummaryCardProps {
  platform: string;
  rating: number;
  reviewCount: number;
  color: string;
}

export function RatingSummaryCard({ platform, rating, reviewCount, color }: RatingSummaryCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="h-2" style={{ backgroundColor: color }} />
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">{platform}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2">
          <div className="text-3xl font-bold">{rating.toFixed(1)}</div>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={16}
                className={`${
                  star <= Math.round(rating) ? "fill-current text-amber-400" : "text-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Based on {reviewCount} {reviewCount === 1 ? "review" : "reviews"}
        </p>
      </CardContent>
    </Card>
  );
}
