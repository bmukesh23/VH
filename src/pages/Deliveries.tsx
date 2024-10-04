import { useState } from 'react';
import { MapPin, Star, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const deliveriesData = [
  {
    orderId: 1023,
    restaurant: 'Burger Joint',
    destination: '456 Elm St',
    deliveryTime: '15:30',
    rating: 5,
  },
  {
    orderId: 1024,
    restaurant: 'Sushi Express',
    destination: '789 Oak St',
    deliveryTime: '20:15',
    rating: 4,
  },
  {
    orderId: 1025,
    restaurant: 'Pizza Palace',
    destination: '321 Pine St',
    deliveryTime: '18:00',
    rating: 5,
  },
  // Add more deliveries here
];

const Deliveries = () => {
  const [deliveries] = useState(deliveriesData);

  return (
    <div className="p-8">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">My Deliveries</h1>
          <p className="text-sm text-gray-500">Track your completed deliveries and performance metrics</p>
        </div>
        <Button>Export Data</Button>
      </header>

      <div className="grid grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="mr-2" /> Total Deliveries
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{deliveries.length}</p>
            <p className="text-sm text-gray-500">Completed Deliveries</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="mr-2" /> Average Delivery Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">17:45</p>
            <p className="text-sm text-green-500">Consistent performance</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Star className="mr-2" /> Average Rating
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">4.7 / 5</p>
            <Progress value={94} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {deliveries.map((delivery) => (
          <Card key={delivery.orderId}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Order #{delivery.orderId}</span>
                <span className="text-sm font-normal text-gray-500">{delivery.deliveryTime}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">{delivery.restaurant}</p>
                  <p className="text-sm text-gray-500">Pick-up Location</p>
                </div>
                <MapPin className="text-red-500" />
                <div>
                  <p className="font-semibold">{delivery.destination}</p>
                  <p className="text-sm text-gray-500">Delivery Location</p>
                </div>
                <div>
                  <p className="font-semibold">{delivery.rating} Stars</p>
                  <p className="text-sm text-yellow-500">
                    {[...Array(delivery.rating)].map((_, i) => (
                      <Star key={i} className="inline-block" />
                    ))}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Deliveries;