
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Review } from "@/services/mockData";
import { ThumbsUp, ThumbsDown, Star, MessageSquare, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  
  const getPositiveSummary = () => {
    const themes = [
      "Fast delivery and excellent packaging",
      "Friendly and professional staff",
      "Excellent food quality and taste",
      "Good value for money"
    ];
    
    return themes;
  };
  
  const getNegativeSummary = () => {
    const themes = [
      "Slow delivery times",
      "Food quality below expectations",
      "Packaging issues",
      "Order accuracy problems"
    ];
    
    return themes;
  };
  
  return (
    <div className="space-y-6">
      {(!showNegativeOnly) && (
        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <ThumbsUp className="h-5 w-5 text-green-500" />
              <CardTitle className="text-xl">Top Positive Reviews</CardTitle>
            </div>
            <CardDescription>Highest rated customer feedback</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="summary">
              <TabsList className="mb-4 w-full justify-start">
                <TabsTrigger value="summary" className="flex gap-1">
                  <MessageSquare className="h-4 w-4" />
                  <span>Summary</span>
                </TabsTrigger>
                <TabsTrigger value="reviews" className="flex gap-1">
                  <List className="h-4 w-4" />
                  <span>Full Reviews</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="summary" className="pt-2">
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground mb-2">
                    Common themes in positive reviews:
                  </p>
                  <ul className="space-y-2">
                    {getPositiveSummary().map((theme, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <div className="mt-0.5 h-2 w-2 rounded-full bg-green-500 shrink-0" />
                        <span>{theme}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>
              
              <TabsContent value="reviews" className="pt-2">
                <div className="space-y-4">
                  {positiveReviews.map((review) => (
                    <ReviewItem key={review.id} review={review} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}

      {(!showPositiveOnly) && (
        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <ThumbsDown className="h-5 w-5 text-orange-500" />
              <CardTitle className="text-xl">Top Negative Reviews</CardTitle>
            </div>
            <CardDescription>Areas that may need improvement</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="summary">
              <TabsList className="mb-4 w-full justify-start">
                <TabsTrigger value="summary" className="flex gap-1">
                  <MessageSquare className="h-4 w-4" />
                  <span>Summary</span>
                </TabsTrigger>
                <TabsTrigger value="reviews" className="flex gap-1">
                  <List className="h-4 w-4" />
                  <span>Full Reviews</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="summary" className="pt-2">
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground mb-2">
                    Common issues in negative reviews:
                  </p>
                  <ul className="space-y-2">
                    {getNegativeSummary().map((theme, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <div className="mt-0.5 h-2 w-2 rounded-full bg-orange-500 shrink-0" />
                        <span>{theme}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>
              
              <TabsContent value="reviews" className="pt-2">
                <div className="space-y-4">
                  {negativeReviews.map((review) => (
                    <ReviewItem key={review.id} review={review} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
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
    <div className="rounded-lg border p-3">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          <div className={`rounded-full w-2 h-2 ${platformColor}`} />
          <span className="text-sm font-medium">{platformName}</span>
          <span className="text-xs text-muted-foreground">• {review.date}</span>
        </div>
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={14}
              className={star <= review.rating ? "fill-current text-amber-400" : "text-gray-300"}
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
