
import { useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
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
        color: "#F97316" // Bright Orange
      },
      {
        name: "Service",
        rating: 4.2,
        color: "#0EA5E9" // Ocean Blue
      },
      {
        name: "Atmosphere",
        rating: 4.0,
        color: "#8B5CF6" // Vivid Purple
      },
      {
        name: "Cleanliness",
        rating: 4.3,
        color: "#D946EF" // Magenta Pink
      },
      {
        name: "Value",
        rating: 3.9,
        color: "#9b87f5" // Primary Purple
      }
    ];
  }, [reviews]);

  return (
    <Card className="h-full">
      <CardHeader className="pb-1">
        <CardTitle className="text-lg font-medium">Dining Experience Ratings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              barSize={40}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} horizontal={true} vertical={false} />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12, fill: '#666' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                domain={[0, 5]} 
                tickCount={6}
                tick={{ fontSize: 12, fill: '#666' }}
                axisLine={false}
                tickLine={false}
                width={30}
              />
              <Tooltip 
                formatter={(value) => [`${value} out of 5 stars`, '']}
                labelStyle={{ fontWeight: 'bold', color: '#333' }}
                contentStyle={{ 
                  borderRadius: '8px',
                  padding: '10px 14px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  border: 'none',
                  backgroundColor: 'rgba(255, 255, 255, 0.98)'
                }}
                cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
              />
              {chartData.map((entry) => (
                <Bar 
                  key={entry.name}
                  dataKey="rating" 
                  name={entry.name}
                  fill={entry.color}
                  radius={[4, 4, 0, 0]}
                  background={{ fill: '#f5f5f5', radius: [4, 4, 0, 0] }}
                  maxBarSize={60}
                  label={{
                    position: 'top',
                    formatter: (value: number) => `${value}`,
                    fontSize: 13,
                    fontWeight: 'bold',
                    fill: '#555'
                  }}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
