import { useState } from 'react';
import Map, { NavigationControl, FullscreenControl, GeolocateControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

const CityMap = () => {
  const [viewState, setViewState] = useState({
    latitude: 19.383783,
    longitude: 72.8286646,
    zoom: 12
  });

  return (
    <div className="flex w-full h-[590px]">
      {/* Map Section */}
      <div className="w-1/2 relative">
        <div className="absolute top-4 left-4 z-10">
          <h1 className="text-2xl font-bold">City Map</h1>
          <p className="text-sm text-gray-500">Monitor your deliveries in real time.</p>
        </div>
        <div className="h-full mt-20">
          <Map
            {...viewState}
            onMove={evt => setViewState(evt.viewState)}
            mapStyle="mapbox://styles/mukeshh/cm1vlefgl015c01qv8yp60ho6"
            mapboxAccessToken={MAPBOX_TOKEN}
          >
            <NavigationControl position="top-left" />
            <FullscreenControl position="top-right" />
            <GeolocateControl position="top-right" />
          </Map>
        </div>
      </div>

      {/* Deliveries List Section */}
      <div className="w-1/2 p-4 overflow-y-auto">
        <header className="mb-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Deliveries</h1>
            <p className="text-sm text-gray-500">View the status of your current deliveries.</p>
          </div>

          <div className="flex space-x-4 mt-2">
            <Button>
              <PlusCircle className="mr-2" /> Add Route
            </Button>
          </div>
        </header>

        <div className='flex flex-col gap-6'>
          <div className='flex items-center justify-between p-4 border border-yellow-500 rounded-md '>
            <div>
              <h1 className='text-2xl font-bold'>Handyman Tools Set</h1>
              <div className="flex items-center gap-2 text-xs font-semibold">
                <p>Pickup location: <span className='text-yellow-500'>Vasai</span></p>
                <p>Destination location: <span className='text-yellow-500'>Nalasopara</span></p>
              </div>
            </div>

            <div className='font-semibold'>
              <p className='text-sm'>Status: <span className='text-yellow-500'>In Progress</span></p>
            </div>
          </div>
          <div className='flex items-center justify-between p-4 border border-green-500 rounded-md '>
            <div>
              <h1 className='text-2xl font-bold'>Pet Supplies</h1>
              <div className="flex items-center gap-2 text-xs font-semibold">
                <p>Pickup location: <span className='text-green-500'>Bhiwandi</span></p>
                <p>Destination location: <span className='text-green-500'>Kalyan</span></p>
              </div>
            </div>

            <div className='font-semibold'>
              <p className='text-sm'>Status: <span className='text-green-500'>Delivered</span></p>
            </div>
          </div>
          <div className='flex items-center justify-between p-4 border border-green-500 rounded-md '>
            <div>
              <h1 className='text-2xl font-bold'>Grocery Essentials</h1>
              <div className="flex items-center gap-2 text-xs font-semibold">
                <p>Pickup location: <span className='text-green-500'>Anand Nagar</span></p>
                <p>Destination location: <span className='text-green-500'>D.N. Nagar</span></p>
              </div>
            </div>

            <div className='font-semibold'>
              <p className='text-sm'>Status: <span className='text-green-500'>Delivered</span></p>
            </div>
          </div>
          <div className='flex items-center justify-between p-4 border border-green-500 rounded-md '>
            <div>
              <h1 className='text-2xl font-bold'>Fresh Produce Box</h1>
              <div className="flex items-center gap-2 text-xs font-semibold">
                <p>Pickup location: <span className='text-green-500'>Bhayandar Gaon</span></p>
                <p>Destination location: <span className='text-green-500'>Kalyan</span></p>
              </div>
            </div>

            <div className='font-semibold'>
              <p className='text-sm'>Status: <span className='text-green-500'>Delivered</span></p>
            </div>
          </div>
        </div>

        <div className='flex items-center justify-center gap-4 mt-6'>
          <button className='bg-blue-500 text-white font-semibold rounded-md px-4 py-2'>Proof of Delivery</button>
          <button className='bg-green-500 text-white font-semibold rounded-md px-4 py-2'>Delivery Feedback</button>
        </div>
      </div>
    </div>
  );
};

export default CityMap;