"use client";

import { useState } from 'react';

const Home = () => {
    const [status, setStatus] = useState('');
    const [mapLink, setMapLink] = useState('');

    const geoFindMe = () => {
        setStatus('');
        setMapLink('');

        const success = (position) => {
            const latitude = position.coords.latitude + 0.01; // Increase latitude
            const longitude = position.coords.longitude + 0.01; // Increase longitude

            setStatus(`Latitude: ${latitude.toFixed(6)} °, Longitude: ${longitude.toFixed(6)} °`);
            setMapLink(`https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`);
        };

        const error = () => {
            setStatus('Unable to retrieve your location');
        };

        if (!navigator.geolocation) {
            setStatus('Geolocation is not supported by your browser');
        } else {
            setStatus('Locating…');
            navigator.geolocation.getCurrentPosition(success, error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen text-center">
            <h1 className="mb-5 text-4xl bg-red-500">To find your latitude and longitude</h1>
            <button 
                onClick={geoFindMe} 
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-yellow-600"
            >
                Show my location
            </button>
            <br />
            <p className="mt-4">{status}</p>
            {mapLink && (
                <a 
                    href={mapLink} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="mt-2 text-pink-500 hover:underline"
                >
                    {status}
                </a>
            )}
        </div>
    );
};

export default Home;
