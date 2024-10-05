/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react';
import { Star, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import axios from 'axios';
import { FaArrowTrendUp } from 'react-icons/fa6';
import { MdMyLocation } from "react-icons/md";

interface Employee {
  rank: number;
  ADR: number;
  R: number;
  NOD: number;
}

interface Delivery {
  orderNumber: number;
  packageName: string;
  pickupLocation: string;
  destination: string;
  deliveryTime: string;
  rating: number;
}

interface DeliveriesData {
  totalDeliveries: number;
  averageDeliveryTime: number;
  averageRating: number;
  deliveries: Delivery[];
}

// Sample delivery data for different time periods
const deliveriesData: Record<string, DeliveriesData> = {
  week: {
    totalDeliveries: 5,
    averageDeliveryTime: 20,
    averageRating: 4.6,
    deliveries: [
      {
        orderNumber: 1,
        packageName: 'Fresh Produce Box',
        pickupLocation: 'Downtown Market',
        destination: 'Green Valley Apartments',
        deliveryTime: '18 min',
        rating: 4.8,
      },
      {
        orderNumber: 2,
        packageName: 'Weekly Pantry Refill',
        pickupLocation: 'SuperMart',
        destination: 'Sunset Boulevard, Apt 5',
        deliveryTime: '25 min',
        rating: 4.5,
      },
      {
        orderNumber: 3,
        packageName: 'Personal Care Essentials',
        pickupLocation: 'Wellness Store',
        destination: 'West End Towers',
        deliveryTime: '22 min',
        rating: 4.7,
      },
    ],
  },
  month: {
    totalDeliveries: 20,
    averageDeliveryTime: 22,
    averageRating: 4.5,
    deliveries: [
      {
        orderNumber: 4,
        packageName: 'Handyman Tools Set',
        pickupLocation: 'Home Depot',
        destination: 'Wood Valley',
        deliveryTime: '32 min',
        rating: 4.2,
      },
      {
        orderNumber: 5,
        packageName: 'Pet Supplies',
        pickupLocation: 'Pet Store',
        destination: 'Happy Paws Shelter',
        deliveryTime: '15 min',
        rating: 4.9,
      },
      {
        orderNumber: 6,
        packageName: 'Grocery Essentials',
        pickupLocation: 'Local Market',
        destination: 'Sunnydale Housing',
        deliveryTime: '20 min',
        rating: 4.6,
      },
    ],
  },
  year: {
    totalDeliveries: 100,
    averageDeliveryTime: 25,
    averageRating: 4.4,
    deliveries: [
      {
        orderNumber: 7,
        packageName: 'Furniture Delivery',
        pickupLocation: 'Furniture Warehouse',
        destination: 'Main Street Villa',
        deliveryTime: '45 min',
        rating: 4.3,
      },
      {
        orderNumber: 8,
        packageName: 'Clothing Delivery',
        pickupLocation: 'Fashion Store',
        destination: 'Downtown Boutique',
        deliveryTime: '30 min',
        rating: 4.5,
      },
      {
        orderNumber: 9,
        packageName: 'Electronics Delivery',
        pickupLocation: 'Tech Store',
        destination: 'Silicon Valley Estates',
        deliveryTime: '50 min',
        rating: 4.1,
      },
    ],
  },
};

const Deliveries = () => {
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [timePeriod, setTimePeriod] = useState<'week' | 'month' | 'year'>('month');
  const [currentDeliveries, setCurrentDeliveries] = useState<DeliveriesData>(deliveriesData[timePeriod]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get<Employee[]>('http://localhost:5000/api/employees');
        setEmployee(response.data[0] || null);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEmployees();
  }, []);

  // Update deliveries based on selected time period
  useEffect(() => {
    setCurrentDeliveries(deliveriesData[timePeriod]);
  }, [timePeriod]);

  return (
    <div className="px-4 py-2">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">My Deliveries</h1>
          <p className="text-sm text-gray-500">Track your completed deliveries and performance metrics</p>
        </div>
        {/* Dropdown for time period selection */}
        <select
          value={timePeriod}
          onChange={(e) => setTimePeriod(e.target.value as 'week' | 'month' | 'year')}
          className="border border-slate-300 rounded-md shadow-lg outline-none px-2 py-1 font-semibold"
        >
          <option value="week">Last Week</option>
          <option value="month">Last Month</option>
          <option value="year">Last Year</option>
        </select>
      </header>

      <div className="grid grid-cols-3 gap-6 mb-6">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="mr-2" /> Total Deliveries
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{currentDeliveries.totalDeliveries}</p>
            <p className="text-sm text-green-500 flex gap-1 mt-1 font-semibold">
              <span className="h-4 w-4 mt-1">
                <FaArrowTrendUp />
              </span>
              completed deliveries
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="mr-2" /> Average Delivery Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{`${currentDeliveries.averageDeliveryTime} min`}</p>
            <p className="text-sm text-green-500 font-semibold">consistent performance</p>
          </CardContent>
        </Card>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Star className="mr-2" /> Average Rating
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{`${currentDeliveries.averageRating} / 5`}</p>
            <p className="text-sm text-green-500 font-semibold flex gap-1 mt-1">
              <span className="h-4 w-4 mt-1">
                <FaArrowTrendUp />
              </span>
              +4% from last month
            </p>
            <Progress value={94} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Scrollable container with sample delivery data */}
      <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
        {currentDeliveries.deliveries.map((delivery) => (
          <div
            key={delivery.orderNumber}
            className="p-4 border text-slate-800 bg-lime-300 rounded-md flex items-center justify-between shadow-lg"
          >
            <div className="flex-1">
              <p className="font-semibold text-slate-700">Order #{delivery.orderNumber}</p>
              <p className="text-xl font-bold">{delivery.packageName}</p>
            </div>

            <div className="flex-2 justify-center">
              <p className="font-semibold flex items-center gap-2 mb-2">
                <MdMyLocation className='h-6 w-6 text-green-700' />
                <span className="font-semibold">{delivery.pickupLocation}</span>
              </p>
              <p className="font-semibold flex items-center gap-2">
                <MdMyLocation className='h-6 w-6 text-red-600' />
                <span className="font-semibold">{delivery.destination}</span>
              </p>
            </div>

            <div className="flex-1 text-right">
              <p className="text-sm font-semibold text-slate-600">{delivery.deliveryTime}</p>
              <p className="text-lg font-bold">{delivery.rating} / 5</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Deliveries;