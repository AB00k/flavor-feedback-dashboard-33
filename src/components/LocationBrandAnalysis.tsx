
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from "recharts";
import { Review } from "@/services/mockData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMemo } from "react";

interface LocationBrandAnalysisProps {
  reviews: Review[];
}

export function LocationBrandAnalysis({ reviews }: LocationBrandAnalysisProps) {
  const locationData = useMemo(() => {
    const locations = [...new Set(reviews.map((review) => review.location))];
    
    const data = locations.map((location) => {
      const locationReviews = reviews.filter((review) => review.location === location);
      
      const getAvgRating = (reviews: Review[]) => {
        if (reviews.length === 0) return 0;
        return Number((reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length).toFixed(1));
      };
      
      return {
        name: location,
        Rating: getAvgRating(locationReviews),
        Reviews: locationReviews.length
      };
    });
    
    return data
      .sort((a, b) => b.Reviews - a.Reviews)
      .slice(0, 5); // Only show top 5 locations by review count
  }, [reviews]);
  
  const brandData = useMemo(() => {
    const brands = [...new Set(reviews.map((review) => review.brand))];
    
    const data = brands.map((brand) => {
      const brandReviews = reviews.filter((review) => review.brand === brand);
      
      const getAvgRating = (reviews: Review[]) => {
        if (reviews.length === 0) return 0;
        return Number((reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length).toFixed(1));
      };
      
      return {
        name: brand,
        Rating: getAvgRating(brandReviews),
        Reviews: brandReviews.length
      };
    });
    
    return data
      .sort((a, b) => b.Reviews - a.Reviews)
      .slice(0, 5); // Only show top 5 brands by review count
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
                <BarChart 
                  data={locationData}
                  layout="vertical"
                  margin={{ top: 10, right: 30, left: 60, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                  <XAxis type="number" domain={[0, 5]} tickCount={6} />
                  <YAxis dataKey="name" type="category" width={100} />
                  <Tooltip 
                    formatter={(value, name) => [
                      name === "Rating" ? `${value} stars` : `${value} reviews`, 
                      name
                    ]}
                  />
                  <Legend iconType="circle" />
                  <Bar dataKey="Rating" fill="#9b87f5" radius={[0, 4, 4, 0]} maxBarSize={20}>
                    <LabelList dataKey="Rating" position="right" formatter={(v: number) => v > 0 ? v.toFixed(1) : ''} />
                  </Bar>
                  <Bar dataKey="Reviews" fill="#D6BCFA" radius={[0, 4, 4, 0]} maxBarSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          <TabsContent value="brand">
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={brandData}
                  layout="vertical"
                  margin={{ top: 10, right: 30, left: 60, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                  <XAxis type="number" domain={[0, 5]} tickCount={6} />
                  <YAxis dataKey="name" type="category" width={100} />
                  <Tooltip 
                    formatter={(value, name) => [
                      name === "Rating" ? `${value} stars` : `${value} reviews`, 
                      name
                    ]}
                  />
                  <Legend iconType="circle" />
                  <Bar dataKey="Rating" fill="#9b87f5" radius={[0, 4, 4, 0]} maxBarSize={20}>
                    <LabelList dataKey="Rating" position="right" formatter={(v: number) => v > 0 ? v.toFixed(1) : ''} />
                  </Bar>
                  <Bar dataKey="Reviews" fill="#D6BCFA" radius={[0, 4, 4, 0]} maxBarSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
