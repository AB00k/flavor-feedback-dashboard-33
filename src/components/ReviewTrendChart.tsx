
import { useMemo } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Review } from "@/services/mockData";

interface ReviewTrendChartProps {
  reviews: Review[];
}

export function ReviewTrendChart({ reviews }: ReviewTrendChartProps) {
  const chartData = useMemo(() => {
    // Create a map to store reviews by month
    const reviewsByMonth = new Map<string, { 
      month: string, 
      talabat: number, 
      noon: number, 
      careem: number,
      google: number,
      average: number,
      count: number
    }>();
    
    // Get last 3 months instead of 6
    const today = new Date();
    for (let i = 2; i >= 0; i--) {
      const date = new Date(today);
      date.setMonth(today.getMonth() - i);
      const monthYear = `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
      reviewsByMonth.set(monthYear, { 
        month: monthYear, 
        talabat: 0, 
        noon: 0, 
        careem: 0,
        google: 0,
        average: 0,
        count: 0
      });
    }
    
    // Group reviews by month and calculate average ratings
    reviews.forEach(review => {
      const date = new Date(review.date);
      const monthYear = `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
      
      if (reviewsByMonth.has(monthYear)) {
        const monthData = reviewsByMonth.get(monthYear)!;
        
        // Update platform-specific data
        if (review.platform === 'talabat') monthData.talabat = 
          (monthData.talabat * (monthData.count > 0 ? 1 : 0) + review.rating) / 
          ((monthData.count > 0 ? 1 : 0) + 1);
        else if (review.platform === 'noon') monthData.noon = 
          (monthData.noon * (monthData.count > 0 ? 1 : 0) + review.rating) / 
          ((monthData.count > 0 ? 1 : 0) + 1);
        else if (review.platform === 'careem') monthData.careem = 
          (monthData.careem * (monthData.count > 0 ? 1 : 0) + review.rating) / 
          ((monthData.count > 0 ? 1 : 0) + 1);
        else if (review.platform === 'google') monthData.google = 
          (monthData.google * (monthData.count > 0 ? 1 : 0) + review.rating) / 
          ((monthData.count > 0 ? 1 : 0) + 1);
        
        // Update average
        monthData.average = ((monthData.average * monthData.count) + review.rating) / (monthData.count + 1);
        monthData.count += 1;
        
        reviewsByMonth.set(monthYear, monthData);
      }
    });
    
    // Convert map to array
    return Array.from(reviewsByMonth.values()).map(data => ({
      month: data.month,
      Talabat: parseFloat(data.talabat.toFixed(1)),
      Noon: parseFloat(data.noon.toFixed(1)),
      Careem: parseFloat(data.careem.toFixed(1)),
      Google: parseFloat(data.google.toFixed(1)),
      Average: parseFloat(data.average.toFixed(1))
    }));
  }, [reviews]);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Rating Trends (Last 3 Months)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 5, right: 30, left: 20, bottom: 25 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="month" 
                angle={-15} 
                textAnchor="end" 
                height={60} 
                tick={{ fontSize: 12 }} 
              />
              <YAxis domain={[0, 5]} />
              <Tooltip 
                formatter={(value) => [`${value} stars`, '']}
              />
              <Legend iconType="circle" />
              <Line 
                type="monotone" 
                dataKey="Average" 
                stroke="#9b87f5" 
                strokeWidth={2} 
                dot={{ r: 4 }} 
                activeDot={{ r: 6 }} 
              />
              <Line type="monotone" dataKey="Talabat" stroke="#F97316" />
              <Line type="monotone" dataKey="Noon" stroke="#FACC15" />
              <Line type="monotone" dataKey="Careem" stroke="#84CC16" />
              <Line type="monotone" dataKey="Google" stroke="#3B82F6" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
