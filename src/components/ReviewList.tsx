import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Review, filterReviews } from "@/services/mockData";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageCircle, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

interface ReviewListProps {
  reviews: Review[];
  locations: string[];
  brands: string[];
}

export function ReviewList({ reviews, locations, brands }: ReviewListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string>("all");
  const [selectedBrand, setSelectedBrand] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"date" | "rating">("date");

  const togglePlatform = (platform: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platform)
        ? prev.filter((p) => p !== platform)
        : [...prev, platform]
    );
  };

  const filteredReviews = filterReviews(
    reviews,
    selectedPlatforms,
    selectedLocation !== "all" ? [selectedLocation] : [],
    selectedBrand !== "all" ? [selectedBrand] : []
  ).filter((review) =>
    review.comment.toLowerCase().includes(searchTerm.toLowerCase()) ||
    review.reviewer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    if (sortBy === "date") {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else {
      return b.rating - a.rating;
    }
  });

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              All Reviews
            </CardTitle>
            <CardDescription>
              {filteredReviews.length} of {reviews.length} reviews
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Search</label>
              <Input
                placeholder="Search reviews or reviewers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Location</label>
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="All Locations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  {locations.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Brand</label>
              <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                <SelectTrigger>
                  <SelectValue placeholder="All Brands" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Brands</SelectItem>
                  {brands.map((brand) => (
                    <SelectItem key={brand} value={brand}>
                      {brand}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-2">
            <div className="text-sm font-medium mr-2">Platforms:</div>
            <div className="flex items-center gap-1.5">
              <Checkbox
                id="platform-talabat"
                checked={selectedPlatforms.includes("talabat")}
                onCheckedChange={() => togglePlatform("talabat")}
                className="data-[state=checked]:bg-talabat data-[state=checked]:border-talabat"
              />
              <label
                htmlFor="platform-talabat"
                className="text-sm font-medium cursor-pointer"
              >
                Talabat
              </label>
            </div>
            <div className="flex items-center gap-1.5">
              <Checkbox
                id="platform-noon"
                checked={selectedPlatforms.includes("noon")}
                onCheckedChange={() => togglePlatform("noon")}
                className="data-[state=checked]:bg-noon data-[state=checked]:border-noon"
              />
              <label
                htmlFor="platform-noon"
                className="text-sm font-medium cursor-pointer"
              >
                Noon
              </label>
            </div>
            <div className="flex items-center gap-1.5">
              <Checkbox
                id="platform-careem"
                checked={selectedPlatforms.includes("careem")}
                onCheckedChange={() => togglePlatform("careem")}
                className="data-[state=checked]:bg-careem data-[state=checked]:border-careem"
              />
              <label
                htmlFor="platform-careem"
                className="text-sm font-medium cursor-pointer"
              >
                Careem
              </label>
            </div>
            <div className="flex items-center gap-1.5">
              <Checkbox
                id="platform-google"
                checked={selectedPlatforms.includes("google")}
                onCheckedChange={() => togglePlatform("google")}
                className="data-[state=checked]:bg-google data-[state=checked]:border-google"
              />
              <label
                htmlFor="platform-google"
                className="text-sm font-medium cursor-pointer"
              >
                Google
              </label>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <span className="text-sm font-medium">Sort by:</span>
              <Select value={sortBy} onValueChange={(v) => setSortBy(v as "date" | "rating")}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Latest</SelectItem>
                  <SelectItem value="rating">Highest rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4 mt-4">
            {sortedReviews.length > 0 ? (
              sortedReviews.map((review) => (
                <ReviewItem key={review.id} review={review} />
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No reviews found matching your filters
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ReviewItem({ review }: { review: Review }) {
  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case "talabat":
        return "bg-talabat text-white";
      case "noon":
        return "bg-noon text-black";
      case "careem":
        return "bg-careem text-white";
      case "google":
        return "bg-google text-white";
      default:
        return "bg-gray-400 text-white";
    }
  };

  const platformColor = getPlatformColor(review.platform);
  const platformName = review.platform.charAt(0).toUpperCase() + review.platform.slice(1);

  return (
    <div className="rounded-lg border p-4">
      <div className="flex flex-wrap justify-between items-start mb-2 gap-2">
        <div className="flex items-center gap-2">
          <span className={`text-xs px-2 py-1 rounded-full ${platformColor}`}>
            {platformName}
          </span>
          <span className="text-sm text-muted-foreground">{review.date}</span>
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
      <div className="flex flex-wrap justify-between gap-2">
        <span className="text-xs font-medium">{review.reviewer}</span>
        <span className="text-xs text-muted-foreground">
          {review.location} • {review.brand}
        </span>
      </div>
    </div>
  );
}
