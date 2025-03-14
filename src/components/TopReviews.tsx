
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Review } from "@/services/mockData";
import { ThumbsUp, ThumbsDown, Star } from "lucide-react";

interface TopReviewsProps {
  positiveReviews: Review[];
  negativeReviews: Review[];
  showPositiveOnly?: boolean;
  showNegativeOnly?: boolean;
}

export function TopReviews({ 
  positiveReviews, 
  negativeReviews, 
  showPositiveOnly = false,
  showNegativeOnly = false
}: TopReviewsProps) {
  return (
    <div className="space-y-6">
      {(!showNegativeOnly) && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <ThumbsUp className="h-5 w-5 text-green-500" />
              <CardTitle>Top Positive Reviews</CardTitle>
            </div>
            <CardDescription>Highest rated customer feedback</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {positiveReviews.map((review) => (
                <ReviewItem key={review.id} review={review} />
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {(!showPositiveOnly) && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <ThumbsDown className="h-5 w-5 text-orange-500" />
              <CardTitle>Top Negative Reviews</CardTitle>
            </div>
            <CardDescription>Areas that may need improvement</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {negativeReviews.map((review) => (
                <ReviewItem key={review.id} review={review} />
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function ReviewItem({ review }: { review: Review }) {
  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case "talabat":
        return "bg-talabat";
      case "noon":
        return "bg-noon";
      case "careem":
        return "bg-careem";
      case "google":
        return "bg-google";
      default:
        return "bg-gray-400";
    }
  };

  const platformColor = getPlatformColor(review.platform);
  const platformName = review.platform.charAt(0).toUpperCase() + review.platform.slice(1);

  return (
    <div className="rounded-lg border p-4">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          <div className={`rounded-full w-2 h-2 ${platformColor}`} />
          <span className="text-sm font-medium">{platformName}</span>
          <span className="text-sm text-muted-foreground">• {review.date}</span>
        </div>
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={14}
              className={`${
                star <= review.rating ? "fill-current text-amber-400" : "text-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
      <p className="text-sm mb-2">"{review.comment}"</p>
      <div className="flex justify-between">
        <span className="text-xs text-muted-foreground">{review.reviewer}</span>
        <span className="text-xs text-muted-foreground">
          {review.location} • {review.brand}
        </span>
      </div>
    </div>
  );
}
