import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Lock, Bell, User } from 'lucide-react';
import axios from 'axios';
import { auth } from '@/utils/firebaseConfig';

const Settings = () => {
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [userDetails, setUserDetails] = useState({ displayName: '', email: '' });

    useEffect(() => {
        const fetchUserDetails = async () => {
            const user = auth.currentUser;
            if (user) {
                const response = await axios.get(`http://localhost:5000/api/users/${user.uid}`);
                setUserDetails({
                    displayName: response.data.displayName,
                    email: response.data.email,
                });
            }
        };
        fetchUserDetails();
    }, []);

    const handleSave = async () => {
        const user = auth.currentUser;
        if (user) {
            try {
                await axios.put(`http://localhost:5000/api/users/${user.uid}`, userDetails);
                alert('Settings saved successfully!');
            } catch (error) {
                console.error('Error saving user details:', error);
                alert('Error saving user details.');
            }
        }
    };

    return (
        <div className="px-4 py-2">
            <header className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold">Settings</h1>
                    <p className="text-sm text-gray-500">Configure your account preferences and settings</p>
                </div>
            </header>

            <div className="grid grid-cols-2 gap-6">
                {/* Account Information Section */}
                <Card className='shadow-lg'>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <User className="mr-2" /> Account Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Name</label>
                                <Input
                                    placeholder="Enter your name"
                                    value={userDetails.displayName}
                                    onChange={(e) => setUserDetails({ ...userDetails, displayName: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                <Input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={userDetails.email}
                                    onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Notifications Section */}
                <Card className='shadow-lg'>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Bell className="mr-2" /> Notifications
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-between items-center">
                            <p className="text-sm">Enable Notifications</p>
                            <Switch
                                checked={notificationsEnabled}
                                onCheckedChange={setNotificationsEnabled}
                            />
                        </div>
                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700">Notification Frequency</label>
                            <select className="mt-2 block w-full p-2 border border-gray-300 rounded-md">
                                <option>Instantly</option>
                                <option>Hourly</option>
                                <option>Daily</option>
                            </select>
                        </div>
                    </CardContent>
                </Card>

                {/* Security Section */}
                <Card className='shadow-lg'>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Lock className="mr-2" /> Security
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Change Password</label>
                                <Input type="password" placeholder="Enter new password" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                                <Input type="password" placeholder="Enter new password" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <div className="mt-8 flex justify-end">
                    <Button onClick={handleSave} className='border border-slate-200 rounded-md bg-black text-white hover:bg-slate-800 shadow-lg'>Save Settings</Button>
                </div>
            </div>
        </div>
    );
};

export default Settings;