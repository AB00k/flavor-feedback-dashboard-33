
import { useEffect, useState } from "react";
import { RatingSummaryCard } from "@/components/RatingSummaryCard";
import { SentimentChart } from "@/components/SentimentChart";
import { TopReviews } from "@/components/TopReviews";
import { PlatformReviews } from "@/components/PlatformReviews";
import { LocationBrandAnalysis } from "@/components/LocationBrandAnalysis";
import { ReviewTrendChart } from "@/components/ReviewTrendChart";
import {
  Review,
  generateMockReviews,
  getAggregatedRatings,
  getSentimentData,
  getTopReviews,
} from "@/services/mockData";

export default function ReviewDashboard() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const loadData = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would be an API call
        const data = generateMockReviews();
        setReviews(data);
      } catch (error) {
        console.error("Failed to load review data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const aggregatedRatings = getAggregatedRatings(reviews);
  const sentimentData = getSentimentData(reviews);
  const positiveReviews = getTopReviews(reviews, true, 3);
  const negativeReviews = getTopReviews(reviews, false, 3);

  // Group reviews by platform
  const talabatReviews = reviews.filter(review => review.platform === "talabat");
  const noonReviews = reviews.filter(review => review.platform === "noon");
  const careemReviews = reviews.filter(review => review.platform === "careem");
  const googleReviews = reviews.filter(review => review.platform === "google");

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-pulse-slow mb-4">
            <div className="h-12 w-48 bg-gray-200 rounded-md mx-auto"></div>
          </div>
          <p className="text-muted-foreground">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Restaurant Feedback Dashboard</h1>
        <p className="text-muted-foreground">
          Analyzing customer reviews across multiple delivery platforms
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
        {aggregatedRatings.map((platform) => (
          <RatingSummaryCard
            key={platform.platform}
            platform={platform.platform}
            rating={platform.averageRating}
            reviewCount={platform.reviewCount}
            color={platform.color}
          />
        ))}
      </div>

      {/* First row: Sentiment Analysis and Rating Trends side by side */}
      <div className="grid gap-6 md:grid-cols-2 mb-6">
        <SentimentChart data={sentimentData} />
        <ReviewTrendChart reviews={reviews} />
      </div>

      {/* Second row: Top Positive and Negative Reviews */}
      <div className="grid gap-6 md:grid-cols-2 mb-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Top Positive Reviews</h2>
          <div className="space-y-4">
            {positiveReviews.map((review) => (
              <div key={review.id} className="rounded-lg border p-4">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`rounded-full w-2 h-2 bg-${review.platform}`} />
                    <span className="text-sm font-medium">{review.platform.charAt(0).toUpperCase() + review.platform.slice(1)}</span>
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
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Top Negative Reviews</h2>
          <div className="space-y-4">
            {negativeReviews.map((review) => (
              <div key={review.id} className="rounded-lg border p-4">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`rounded-full w-2 h-2 bg-${review.platform}`} />
                    <span className="text-sm font-medium">{review.platform.charAt(0).toUpperCase() + review.platform.slice(1)}</span>
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
            ))}
          </div>
        </div>
      </div>

      {/* Third row: Location and Brand Analysis */}
      <div className="grid gap-6 mb-6">
        <LocationBrandAnalysis reviews={reviews} />
      </div>
      
      {/* Fourth row: Reviews by Platform */}
      <div className="grid gap-4 mb-6">
        <h2 className="text-xl font-semibold">Reviews by Platform</h2>
        <div className="space-y-2">
          <PlatformReviews 
            platform="talabat" 
            reviews={talabatReviews} 
            color="#F97316" 
          />
          <PlatformReviews 
            platform="noon" 
            reviews={noonReviews} 
            color="#FACC15" 
          />
          <PlatformReviews 
            platform="careem" 
            reviews={careemReviews} 
            color="#84CC16" 
          />
          <PlatformReviews 
            platform="google" 
            reviews={googleReviews} 
            color="#3B82F6" 
          />
        </div>
      </div>
    </div>
  );
}
