
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ReviewDashboard() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("overview");

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
      <header className="mb-6">
        <h1 className="text-2xl font-bold mb-1">Restaurant Feedback Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Analyzing customer reviews across multiple delivery platforms
        </p>
      </header>

      <Tabs value={activeSection} onValueChange={setActiveSection} className="mb-6">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="detailed">Detailed Analysis</TabsTrigger>
          <TabsTrigger value="platform">Platform Reviews</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          {/* Rating Summary Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
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

          {/* Sentiment Analysis and Rating Trends side by side */}
          <div className="grid gap-6 md:grid-cols-2 mb-6">
            <SentimentChart data={sentimentData} />
            <ReviewTrendChart reviews={reviews} />
          </div>

          {/* Top Positive and Negative Reviews side by side */}
          <div className="grid gap-6 md:grid-cols-2 mb-6">
            <TopReviews positiveReviews={positiveReviews} negativeReviews={[]} showPositiveOnly={true} />
            <TopReviews positiveReviews={[]} negativeReviews={negativeReviews} showNegativeOnly={true} />
          </div>
        </TabsContent>

        <TabsContent value="detailed">
          {/* Location Brand Analysis */}
          <div className="grid gap-6 mb-6">
            <LocationBrandAnalysis reviews={reviews} />
          </div>
        </TabsContent>
        
        <TabsContent value="platform">
          {/* Reviews by Platform */}
          <div className="grid gap-4 mb-6">
            <div className="space-y-4">
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
        </TabsContent>
      </Tabs>
    </div>
  );
}
