
import { useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Review } from "@/services/mockData";

interface ReviewTrendChartProps {
  reviews: Review[];
}

export function ReviewTrendChart({ reviews }: ReviewTrendChartProps) {
  const chartData = useMemo(() => {
    // Create data for the bar chart showing different aspects of dining experience
    return [
      {
        name: "Food Quality",
        rating: 4.5,
        fill: "#F97316" // Bright Orange
      },
      {
        name: "Service",
        rating: 4.2,
        fill: "#0EA5E9" // Ocean Blue
      },
      {
        name: "Atmosphere",
        rating: 4.0,
        fill: "#8B5CF6" // Vivid Purple
      },
      {
        name: "Cleanliness",
        rating: 4.3,
        fill: "#D946EF" // Magenta Pink
      },
      {
        name: "Value",
        rating: 3.9,
        fill: "#9b87f5" // Primary Purple
      }
    ];
  }, [reviews]);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Dine-in Experience Ratings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12 }}
                padding={{ left: 10, right: 10 }}
              />
              <YAxis 
                domain={[0, 5]} 
                tick={{ fontSize: 11 }}
                tickCount={6}
              />
              <Tooltip 
                formatter={(value) => [`${value} stars`, '']}
                contentStyle={{ 
                  borderRadius: '8px',
                  padding: '8px 12px',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                }}
              />
              <Legend 
                iconType="circle" 
                verticalAlign="bottom"
                wrapperStyle={{ paddingTop: '10px' }}
              />
              <Bar 
                dataKey="rating" 
                radius={[4, 4, 0, 0]}
                barSize={40}
                label={{
                  position: 'top',
                  formatter: (value: number) => `${value}`,
                  fontSize: 12
                }}
                fill={(entry) => entry.fill}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
