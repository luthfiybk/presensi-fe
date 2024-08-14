"use client"
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { useCallback, useState, useEffect } from 'react';
import { Skeleton } from './ui/skeleton';

interface IGmapsProps {
    width: string;
    height: string;
    latitude?: number
    longitude?: number
}

export default function Gmaps({ width, height, latitude, longitude }: IGmapsProps) {
    const [center, setCenter] = useState({ lat: 0, lng: 0 });
    const [zoom, setZoom] = useState(20)

    useEffect(() => {
        // Mendapatkan lokasi pengguna saat komponen dimuat
        if (latitude !== undefined && longitude !== undefined) {
            setCenter({ lat: latitude, lng: longitude });
        } else {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setCenter({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    });
                },
                () => {
                    console.log('Error: The Geolocation service failed.');
                }
            );
        }
    }, [latitude, longitude]);

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GMAPS_API_KEY as string
    })

    const [map, setMap] = useState(null)

    const onLoad = useCallback(function callback(map: any) {
        const bounds = new window.google.maps.LatLngBounds();
        map.fitBounds(bounds);
        setMap(map)
    }, [])

    const onUnmount = useCallback(function callback(map: any) {
        setMap(null)
    }, [])

    console.log(center)

    return (
        isLoaded ? (
            <GoogleMap
                mapContainerStyle={{width: width, height: height}}
                center={center}
                zoom={zoom}
                onLoad={onLoad}
                onUnmount={onUnmount}
            >
                { /* Child components, such as markers, info windows, etc. */ }
                <Marker
                    position={{lat: center.lat, lng: center.lng }}
                />
            </GoogleMap>
        ) : 
        <>
            <div className="flex flex-col space-y-3">
                <Skeleton className="h-[300px] w-[400px] rounded-md" />
            </div>
        </>
    )
}