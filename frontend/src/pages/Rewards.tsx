/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Calendar, Gift } from 'lucide-react';
import { MdArrowOutward } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

// Define types for the missions
interface Mission {
    id: number;
    title: string;
    progress: number;
    target: number;
    reward: number;
}

const RewardsSystem: React.FC = () => {
    const navigate = useNavigate();
    const [dailyMissions, setDailyMissions] = useState<Mission[]>([
        { id: 1, title: 'Complete 10 deliveries', progress: 7, target: 10, reward: 50 },
        { id: 2, title: 'Maintain 4.5 star rating', progress: 4.7, target: 4.5, reward: 30 },
        { id: 3, title: 'Zero late deliveries', progress: 100, target: 100, reward: 20 },
    ]);

    const [weeklyMissions, setWeeklyMissions] = useState<Mission[]>([
        { id: 1, title: 'Complete 50 deliveries', progress: 32, target: 50, reward: 200 },
        { id: 2, title: 'Achieve 98% on-time rate', progress: 97, target: 98, reward: 150 },
        { id: 3, title: 'Get 10 five-star ratings', progress: 6, target: 10, reward: 100 },
    ]);

    const [totalPoints, setTotalPoints] = useState(0);

    useEffect(() => {
        const dailyPoints = dailyMissions.reduce(
            (sum, mission) => sum + (mission.progress >= mission.target ? mission.reward : 0),
            0
        );
        const weeklyPoints = weeklyMissions.reduce(
            (sum, mission) => sum + (mission.progress >= mission.target ? mission.reward : 0),
            0
        );
        setTotalPoints(dailyPoints + weeklyPoints);
    }, [dailyMissions, weeklyMissions]);

    const handleReward = () => {
        window.alert("Sorry, you are not eligible to claim reward😔");
    };

    // Add types to MissionCard
    const MissionCard: React.FC<{ title: string; missions: Mission[] }> = ({ title, missions }) => (
        <Card className="flex-1 mx-2"> {/* Make card take equal space and add margin */}
            <CardHeader>
                <CardTitle className="flex items-center">
                    {title === 'Daily Missions' ? <Calendar className="mr-2" /> : <Trophy className="mr-2" />}
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent>
                {missions.map((mission) => (
                    <div key={mission.id} className="mb-4">
                        <div className="flex justify-between items-center mb-2">
                            <span>{mission.title}</span>
                            <Badge
                                variant={mission.progress >= mission.target ? "secondary" : "default"}
                                className={`${mission.progress >= mission.target
                                    ? 'bg-white text-black'
                                    : 'bg-black text-white'
                                    }`}
                            >
                                {mission.progress >= mission.target ? 'Completed' : 'In Progress'}
                            </Badge>
                        </div>
                        <Progress value={(mission.progress / mission.target) * 100} className="mb-1 bg-black" />
                        <div className="flex justify-between text-sm text-gray-500">
                            <span>{mission.progress} / {mission.target}</span>
                            <span>Reward: {mission.reward} points</span>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );

    return (
        <div className="p-4 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-4 flex items-center justify-center">
                <Gift className="mr-2" />
                GoQuest Rewards
            </h1>
            <Card className="mb-4 bg-lime-300">
                <CardContent className="text-center py-4">
                    <h2 className="text-xl font-semibold mb-2">Total Points you have claimed</h2>
                    <p className="text-3xl font-bold">{totalPoints}</p>
                </CardContent>
            </Card>
            <div className="flex justify-between">
                {/* Mission cards displayed in a row */}
                <MissionCard title="Daily Missions" missions={dailyMissions} />
                <MissionCard title="Weekly Missions" missions={weeklyMissions} />
            </div>
            <div className='border-2 border-lime-500 bg-orange-100 p-4 rounded-xl mt-6 text-center'>
                <p className='font-bold'>Claim a Minimum ₹6000 OFF on your favorite food orders! 🎉</p>
                <p className='text-sm'>Indulge in the tastiest meals and snacks from our top-rated restaurants. Use this referral code to get your discount</p>
                <button
                    className='bg-slate-400 rounded-lg text-sm px-3 py-1 text-white font-semibold flex items-center mx-auto mt-2'
                    onClick={handleReward}
                >
                    Click to redeem now
                    <MdArrowOutward className='ml-1' />
                </button>
            </div>

        </div>
    );
};

export default RewardsSystem;