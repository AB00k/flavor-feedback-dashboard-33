
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Review } from "@/services/mockData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMemo } from "react";

interface LocationBrandAnalysisProps {
  reviews: Review[];
}

export function LocationBrandAnalysis({ reviews }: LocationBrandAnalysisProps) {
  const locationData = useMemo(() => {
    const locations = [...new Set(reviews.map((review) => review.location))];
    
    return locations.map((location) => {
      const locationReviews = reviews.filter((review) => review.location === location);
      const talabatReviews = locationReviews.filter((review) => review.platform === "talabat");
      const noonReviews = locationReviews.filter((review) => review.platform === "noon");
      const careemReviews = locationReviews.filter((review) => review.platform === "careem");
      const googleReviews = locationReviews.filter((review) => review.platform === "google");
      
      const getAvgRating = (reviews: Review[]) => {
        if (reviews.length === 0) return 0;
        return Number((reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length).toFixed(1));
      };
      
      return {
        name: location,
        Talabat: getAvgRating(talabatReviews),
        Noon: getAvgRating(noonReviews),
        Careem: getAvgRating(careemReviews),
        Google: getAvgRating(googleReviews),
        Overall: getAvgRating(locationReviews),
        count: locationReviews.length
      };
    });
  }, [reviews]);
  
  const brandData = useMemo(() => {
    const brands = [...new Set(reviews.map((review) => review.brand))];
    
    return brands.map((brand) => {
      const brandReviews = reviews.filter((review) => review.brand === brand);
      const talabatReviews = brandReviews.filter((review) => review.platform === "talabat");
      const noonReviews = brandReviews.filter((review) => review.platform === "noon");
      const careemReviews = brandReviews.filter((review) => review.platform === "careem");
      const googleReviews = brandReviews.filter((review) => review.platform === "google");
      
      const getAvgRating = (reviews: Review[]) => {
        if (reviews.length === 0) return 0;
        return Number((reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length).toFixed(1));
      };
      
      return {
        name: brand,
        Talabat: getAvgRating(talabatReviews),
        Noon: getAvgRating(noonReviews),
        Careem: getAvgRating(careemReviews),
        Google: getAvgRating(googleReviews),
        Overall: getAvgRating(brandReviews),
        count: brandReviews.length
      };
    });
  }, [reviews]);

  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>Location & Brand Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="location">
          <TabsList className="mb-4">
            <TabsTrigger value="location">By Location</TabsTrigger>
            <TabsTrigger value="brand">By Brand</TabsTrigger>
          </TabsList>
          <TabsContent value="location">
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={locationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 5]} />
                  <Tooltip 
                    formatter={(value) => [value, '']}
                    labelFormatter={(name) => {
                      const location = locationData.find(loc => loc.name === name);
                      return `${name} (${location?.count || 0} reviews)`;
                    }}
                  />
                  <Legend />
                  <Bar dataKey="Talabat" fill="#F97316" />
                  <Bar dataKey="Noon" fill="#FACC15" />
                  <Bar dataKey="Careem" fill="#84CC16" />
                  <Bar dataKey="Google" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          <TabsContent value="brand">
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={brandData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 5]} />
                  <Tooltip 
                    formatter={(value) => [value, '']}
                    labelFormatter={(name) => {
                      const brand = brandData.find(b => b.name === name);
                      return `${name} (${brand?.count || 0} reviews)`;
                    }}
                  />
                  <Legend />
                  <Bar dataKey="Talabat" fill="#F97316" />
                  <Bar dataKey="Noon" fill="#FACC15" />
                  <Bar dataKey="Careem" fill="#84CC16" />
                  <Bar dataKey="Google" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
