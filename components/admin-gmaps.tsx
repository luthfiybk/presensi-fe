import React, { useCallback, useRef } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: -7.50166466,
  lng: 111.257832302
};

interface MapProps {
  onMapClick: (lat: number, lng: number) => void;
  latitude?: number;
  longitude?: number;
}

const Map: React.FC<MapProps> = ({ onMapClick, latitude, longitude }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string // Ganti dengan API key Anda
  });

  const mapRef = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);

  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;

    if(latitude && longitude) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: latitude,
            lng: longitude,
          };

          map.setCenter(pos);
          if (markerRef.current) {
            markerRef.current.setPosition(pos);
          } else {
            markerRef.current = new google.maps.Marker({
              position: pos,
              map: map,
            });
          }
        },
        () => {
            const center = map.getCenter() as google.maps.LatLng;
            handleLocationError(true, center);
        }
      );
    } else if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          map.setCenter(pos);
          if (markerRef.current) {
            markerRef.current.setPosition(pos);
          } else {
            markerRef.current = new google.maps.Marker({
              position: pos,
              map: map,
            });
          }
        },
        () => {
            const center = map.getCenter() as google.maps.LatLng;
            handleLocationError(true, center);
        }
      );
    } else {
        const center = map.getCenter() || new google.maps.LatLng(0, 0);
        handleLocationError(false, center);
    }
  }, []);

  const handleLocationError = (browserHasGeolocation: boolean, pos: google.maps.LatLng) => {
    const infoWindow = new google.maps.InfoWindow({
      position: pos,
      content: browserHasGeolocation
        ? "Error: The Geolocation service failed."
        : "Error: Your browser doesn't support geolocation.",
    });
    infoWindow.open(mapRef.current);
  };

  const onClick = useCallback((e: google.maps.MapMouseEvent) => {
    if (e.latLng && markerRef.current) {
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();

      markerRef.current.setPosition(e.latLng);
      onMapClick(lat, lng);
    }
  }, [onMapClick]);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={13}
      onLoad={onLoad}
      onClick={onClick}
    />
  ) : <></>;
};

export default React.memo(Map);
