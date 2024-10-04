import { useState } from 'react';
import { Award, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const leaderboardData = [
  {
    rank: 1,
    name: 'John Doe',
    deliveries: 120,
    avgTime: '16:30',
    rating: 5,
  },
  {
    rank: 2,
    name: 'Jane Smith',
    deliveries: 110,
    avgTime: '17:10',
    rating: 4.9,
  },
  {
    rank: 3,
    name: 'Alex Johnson',
    deliveries: 105,
    avgTime: '18:00',
    rating: 4.8,
  },
  // Add more couriers here
];

const LeaderBoard = () => {
  const [leaderboard] = useState(leaderboardData);

  return (
    <div className="p-8">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">LeaderBoard</h1>
          <p className="text-sm text-gray-500">Top performing couriers based on recent deliveries</p>
        </div>
        <Button>View Full LeaderBoard</Button>
      </header>

      <div className="grid grid-cols-1 gap-6">
        {leaderboard.map((courier) => (
          <Card key={courier.rank}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <div className="flex items-center">
                  <Award className="mr-2 text-yellow-500" />
                  <span>Rank #{courier.rank}</span>
                </div>
                <span className="text-sm font-normal text-gray-500">{courier.deliveries} Deliveries</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">{courier.name}</p>
                  <p className="text-sm text-gray-500">Courier Name</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold">{courier.avgTime}</p>
                  <p className="text-sm text-gray-500">Avg. Delivery Time</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold">{courier.rating.toFixed(1)} / 5</p>
                  <div className="flex justify-center mt-1 text-yellow-500">
                    {[...Array(Math.floor(courier.rating))].map((_, i) => (
                      <Star key={i} className="inline-block" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-500">Rating</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LeaderBoard;