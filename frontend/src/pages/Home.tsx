import { useState, useEffect } from 'react';
import { Clock, Award, User, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { FaArrowTrendUp } from "react-icons/fa6";
import axios from 'axios';


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

// Define types for the simulation state
interface Simulation {
    orderId: number;
    restaurant: string;
    destination: string;
    estimatedTime: number;
    trafficLevel: string;
}

const WeeklyPerformanceChart: React.FC = () => {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Weekly Delivery Performance',
            },
        },
    };

    const data = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
            {
                label: 'Deliveries',
                data: [12, 19, 15, 17, 14, 23, 21],
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    return <Bar options={options} data={data} />;
};

const RatingsChart: React.FC = () => {
    const options = {
        indexAxis: 'y' as const,
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: 'Customer Ratings Distribution',
            },
        },
        scales: {
            x: {
                stacked: true,
                beginAtZero: true,
                max: 100,
            },
            y: {
                stacked: true,
                display: false,
            },
        },
    };

    const data = {
        labels: ['Ratings'],
        datasets: [
            {
                label: '5 Stars',
                data: [50],
                backgroundColor: 'rgba(75, 192, 192, 0.8)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
            {
                label: '4 Stars',
                data: [30],
                backgroundColor: 'rgba(54, 162, 235, 0.8)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
            {
                label: '3 Stars',
                data: [15],
                backgroundColor: 'rgba(255, 206, 86, 0.8)',
                borderColor: 'rgba(255, 206, 86, 1)',
                borderWidth: 1,
            },
            {
                label: '2 Stars',
                data: [4],
                backgroundColor: 'rgba(255, 159, 64, 0.8)',
                borderColor: 'rgba(255, 159, 64, 1)',
                borderWidth: 1,
            },
            {
                label: '1 Star',
                data: [1],
                backgroundColor: 'rgba(255, 99, 132, 0.8)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            },
        ],
    };

    return (
        <div>
            <Bar options={options} data={data} />
            <div className="mt-4 flex justify-between text-sm text-gray-500">
                <span>0%</span>
                <span>25%</span>
                <span>50%</span>
                <span>75%</span>
                <span>100%</span>
            </div>
        </div>
    );
};

interface CircularGaugeProps {
    percentage: number;
}

const CircularGauge: React.FC<CircularGaugeProps> = ({ percentage }) => {
    const circumference = 2 * Math.PI * 47;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
        <div className="relative w-32 h-32">
            <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle
                    className="text-gray-200"
                    strokeWidth="6"
                    stroke="currentColor"
                    fill="transparent"
                    r="47"
                    cx="50"
                    cy="50"
                />
                <circle
                    className="text-blue-600"
                    strokeWidth="6"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="47"
                    cx="50"
                    cy="50"
                    transform="rotate(-90 50 50)"
                />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-2xl font-bold">
                {percentage}%
            </span>
        </div>
    );
};

interface Employee {
    rank: number,
    ADR: number,
    R: number

}

const Dashboard = () => {
    const [currentSimulation, setCurrentSimulation] = useState<Simulation | null>(null);
    const [completionPercentage, setCompletionPercentage] = useState<number>(0);
    const [employee, setEmployee] = useState<Employee | null>(null);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/employees');
                setEmployee(response.data[0]);
                // console.log(response.data[0]);
            } catch (error) {
                console.error(error);
            }
        }

        fetchEmployees();
    }, [])

    const startSimulation = () => {
        setCurrentSimulation({
            orderId: Math.floor(Math.random() * 1000),
            restaurant: "Pizza Palace",
            destination: "123 Main St",
            estimatedTime: 20,
            trafficLevel: "Medium"
        });
        setCompletionPercentage(0);
    };

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;
        if (currentSimulation && completionPercentage < 100) {
            interval = setInterval(() => {
                setCompletionPercentage((prev) => {
                    if (prev >= 100) {
                        clearInterval(interval!);
                        return 100;
                    }
                    return prev + 1;
                });
            }, 200);
        }
        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [currentSimulation, completionPercentage]);

    return (
        <div className="px-4 py-1 flex-1">
            <header className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold">Delivery Training Dashboard</h1>
                    <p className="text-sm text-gray-500">Improve your skills and compete with fellow couriers!</p>
                </div>
                <Button
                    onClick={startSimulation}
                    disabled={currentSimulation ? completionPercentage < 100 : false}
                    className='border border-slate-300 rounded-full shadow-lg'
                >
                    {currentSimulation && completionPercentage < 100 ? "Simulation in Progress" : "Start New Simulation"}
                </Button>
            </header>



            <div className="grid grid-cols-3 gap-6 mb-6">
                <Card className='shadow-lg'>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Award className="mr-2" /> Your Rank
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">
                            <span className="text-base align-super">#</span>
                            {/* {Math.floor(employee.rank)} */}
                            {employee ? Math.floor(employee.rank) : "N/A"} 
                        </p>
                        <p className="text-sm text-green-500 font-semibold flex items-center gap-1">
                            <span className='h-4 w-4 mt-2'><FaArrowTrendUp /></span>
                            out of 300 couriers
                        </p>
                    </CardContent>
                </Card>
                <Card className='shadow-lg'>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Clock className="mr-2" /> Average Delivery Time
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">{employee ? `${employee.ADR} min` : "N/A"}</p>
                        <p className="text-sm text-green-500 font-semibold flex gap-1 mt-1">
                            <span className='h-4 w-4 mt-1'><FaArrowTrendUp /></span>
                            2min 30 sec faster than average
                        </p>
                    </CardContent>
                </Card>
                <Card className='shadow-lg'>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <User className="mr-2" /> Customer Satisfaction
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">{employee ? `${employee.R} / 5` : "N/A"}</p>
                        <p className="text-sm text-green-500 font-semibold flex gap-1 mt-1">
                            <span className='h-4 w-4 mt-1'><FaArrowTrendUp /></span>
                            +4% from last month
                        </p>
                        <Progress value={96} className="mt-2" />
                    </CardContent>
                </Card>
            </div>

            {currentSimulation && (
                <Card className="mb-6 shadow-lg">
                    <CardHeader>
                        <CardTitle className="flex justify-between items-center">
                            <span>Current Simulation</span>
                            <span className="text-sm font-normal text-gray-500">Order #{currentSimulation.orderId}</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="font-semibold">{currentSimulation.restaurant}</p>
                                <p className="text-sm text-gray-500">Pick-up Location</p>
                            </div>
                            <MapPin className="text-red-500" />
                            <div>
                                <p className="font-semibold">{currentSimulation.destination}</p>
                                <p className="text-sm text-gray-500">Delivery Location</p>
                            </div>
                            <div>
                                <p className="font-semibold">{currentSimulation.estimatedTime} mins</p>
                                <p className="text-sm text-gray-500">Estimated Time</p>
                            </div>
                            <div>
                                <p className="font-semibold">{currentSimulation.trafficLevel}</p>
                                <p className="text-sm text-gray-500">Traffic Level</p>
                            </div>
                            <CircularGauge percentage={completionPercentage} />
                        </div>
                    </CardContent>
                </Card>
            )}

            <div className="grid grid-cols-2 gap-6">
                <Card className='shadow-lg'>
                    <CardHeader>
                        <CardTitle>Weekly Performance</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <WeeklyPerformanceChart />
                    </CardContent>
                </Card>
                <Card className='shadow-lg'>
                    <CardHeader>
                        <CardTitle>Customer Ratings</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <RatingsChart />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;