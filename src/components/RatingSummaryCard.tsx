
import { Card, CardContent } from "@/components/ui/card";
import { Star, TrendingUp, TrendingDown } from "lucide-react";

interface RatingSummaryCardProps {
  platform: string;
  rating: number;
  reviewCount: number;
  color: string;
}

export function RatingSummaryCard({ platform, rating, reviewCount, color }: RatingSummaryCardProps) {
  // For demo purposes, generate a random trend percentage
  const trendPercent = Math.floor(Math.random() * 20) + 1;
  const isTrendPositive = Math.random() > 0.3; // 70% chance of positive trend

  // Convert platform name to capitalize first letter
  const formatPlatformName = () => {
    return platform.charAt(0).toUpperCase() + platform.slice(1);
  };

  // Get appropriate icon based on platform
  const getPlatformIcon = () => {
    switch (platform) {
      case "talabat":
        return "🍔";
      case "noon":
        return "🛒";
      case "careem":
        return "🚗";
      case "google":
        return "G";
      default:
        return "📊";
    }
  };

  return (
    <Card className="dashboard-card">
      <CardContent className="p-0">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between mb-4">
            <div 
              className="metric-icon text-white font-medium" 
              style={{ backgroundColor: color }}
            >
              {getPlatformIcon()}
            </div>
            <div className={isTrendPositive ? "trend-up" : "trend-down"}>
              {isTrendPositive ? (
                <TrendingUp className="w-3 h-3 mr-1" />
              ) : (
                <TrendingDown className="w-3 h-3 mr-1" />
              )}
              {isTrendPositive ? "+" : "-"}{trendPercent}%
            </div>
          </div>
          
          <div className="metric-label">{formatPlatformName()} Rating</div>
          <div className="flex items-baseline gap-2">
            <div className="metric-value">{rating.toFixed(1)}</div>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={14}
                  className={`${
                    star <= Math.round(rating) ? "fill-current text-amber-400" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            {reviewCount} {reviewCount === 1 ? "review" : "reviews"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
