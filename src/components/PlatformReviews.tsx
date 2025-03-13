
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Review } from "@/services/mockData";
import { Star } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

interface PlatformReviewsProps {
  platform: string;
  reviews: Review[];
  color: string;
}

export function PlatformReviews({ platform, reviews, color }: PlatformReviewsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const platformName = platform.charAt(0).toUpperCase() + platform.slice(1);
  
  // Sort by newest first
  const sortedReviews = [...reviews].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  const platformColor = `bg-${platform}`;
  
  return (
    <Card className="w-full">
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost" 
            className="w-full flex items-center justify-between rounded-none border-b p-4 hover:bg-muted/20"
            style={{ color: color }}
          >
            <div className="flex items-center gap-2">
              <div 
                className="h-3 w-3 rounded-full" 
                style={{ backgroundColor: color }}
              ></div>
              <span className="font-medium">{platformName} Reviews ({reviews.length})</span>
            </div>
            {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-2 p-4">
          {sortedReviews.length > 0 ? (
            sortedReviews.map((review) => (
              <div key={review.id} className="rounded-md bg-muted/30 p-3">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm font-medium">{review.reviewer}</span>
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
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{review.date}</span>
                  <span>{review.location} • {review.brand}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-4 text-muted-foreground">
              No reviews for this platform
            </div>
          )}
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
