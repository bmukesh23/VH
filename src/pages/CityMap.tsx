import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { MapPin, RefreshCw, PlusCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import 'leaflet/dist/leaflet.css';
import { LatLngExpression } from 'leaflet';

const deliveryData = [
  {
    id: 1,
    restaurant: 'Pizza Palace',
    destination: '123 Main St',
    lat: 19.0760,
    lng: 72.8777,
    status: 'Delivered',
  },
  {
    id: 2,
    restaurant: 'Sushi Express',
    destination: '456 Elm St',
    lat: 19.1012,
    lng: 72.8950,
    status: 'In Progress',
  },
];

const CityMap = () => {
  const [deliveries] = useState(deliveryData);
  const center: LatLngExpression = [19.0760, 72.8777]; // Type for center using LatLngExpression

  return (
    <div className="p-8">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">CityMap</h1>
          <p className="text-sm text-gray-500">Monitor current deliveries and navigate the city</p>
        </div>
        <div className="flex space-x-4">
          <Button>
            <PlusCircle className="mr-2" /> Add Route
          </Button>
          <Button>
            <RefreshCw className="mr-2" /> Refresh Map
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Map Section */}
        <div className="col-span-2 lg:col-span-1 h-96">
          <MapContainer center={center} zoom={13} className="h-full w-full">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {deliveries.map((delivery) => (
              <Marker key={delivery.id} position={[delivery.lat, delivery.lng]}>
                <Popup>
                  <div>
                    <p className="font-semibold">{delivery.restaurant}</p>
                    <p className="text-sm">Destination: {delivery.destination}</p>
                    <p className="text-sm text-green-500">Status: {delivery.status}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* Deliveries List Section */}
        <div className="col-span-2 lg:col-span-1 space-y-4">
          {deliveries.map((delivery) => (
            <Card key={delivery.id}>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <div className="flex items-center">
                    <MapPin className="mr-2 text-blue-500" />
                    <span>{delivery.restaurant}</span>
                  </div>
                  <span className="text-sm font-normal text-gray-500">Status: {delivery.status}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">Destination</p>
                    <p className="text-sm text-gray-500">{delivery.destination}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Coordinates</p>
                    <p className="font-semibold">
                      Lat: {delivery.lat.toFixed(4)}, Lng: {delivery.lng.toFixed(4)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CityMap;