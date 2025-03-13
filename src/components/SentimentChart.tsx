
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SentimentData } from "@/services/mockData";
import { useMemo } from "react";
import { ThumbsUp, MinusCircle, ThumbsDown } from "lucide-react";

interface SentimentChartProps {
  data: SentimentData;
}

export function SentimentChart({ data }: SentimentChartProps) {
  const chartData = useMemo(() => {
    return [
      { name: "Positive", value: data.positive, color: "#84CC16" },
      { name: "Neutral", value: data.neutral, color: "#FACC15" },
      { name: "Negative", value: data.negative, color: "#F97316" },
    ];
  }, [data]);

  const total = data.positive + data.neutral + data.negative;

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        className="font-medium"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const renderIcon = (type: string) => {
    switch (type) {
      case "Positive":
        return <ThumbsUp className="mr-1 h-4 w-4 text-green-500" />;
      case "Neutral":
        return <MinusCircle className="mr-1 h-4 w-4 text-yellow-500" />;
      case "Negative":
        return <ThumbsDown className="mr-1 h-4 w-4 text-orange-500" />;
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sentiment Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[270px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend
                layout="vertical"
                verticalAlign="middle"
                align="right"
                formatter={(value) => {
                  const item = chartData.find((data) => data.name === value);
                  const count = item?.value || 0;
                  const percentage = ((count / total) * 100).toFixed(1);
                  return (
                    <span className="flex items-center">
                      {renderIcon(value)}
                      {value} ({count} - {percentage}%)
                    </span>
                  );
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
