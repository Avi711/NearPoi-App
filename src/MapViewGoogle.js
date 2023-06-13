import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, MarkerF, InfoWindow } from '@react-google-maps/api';
import axios from 'axios';
import Data from './data.json'
import Card from './Card';
import SearchInput from './SearchInput';

const MapViewGoogle = () => {
    const [pois, setPois] = useState([]);
    const [selectedPoi, setSelectedPoi] = useState(null);
    const [center, setCenter] = useState({ lat: 40.7127753, lng: -74 })

    const mapStyles = {
        height: "100vh",
        width: "100%"
    };

    const changeCenter = (new_center, lat, lng, rad, setIsLoading, mode) => {
        setCenter(new_center)
        const params = {
            lat: lat,
            lon: lng,
            rad: rad
        }
        setIsLoading(true)
        if (mode === "Pois") {
        axios.get('http://localhost:3500/pois', { params })
            .then(function (response) {
                let pois = response.data.filter(poi => poi._pic.length > 0)
                setPois(pois);
                setIsLoading(false)
                console.log(pois)
            })
            .catch(function (error) {
                console.log(error);
                setIsLoading(false)
                setPois([]);
            });
        } else {
            const currentDate = new Date();
            const nextWeekDate = new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000);
            params.end = nextWeekDate
            axios.get('http://localhost:3500/events', { params })
            .then(function (response) {
                let pois = response.data.map(e => {
                    return {_poiName: e.name, _shortDesc: e.description, _pic: [e.images], _latitude: e.lat, _longitude: e.lon}
                })
                setPois(pois);
                setIsLoading(false)
            })
            .catch(function (error) {
                console.log(error);
                setIsLoading(false)
                setPois([]);
            });
        }

    }



    return (
        <>
            <SearchInput changeCenter={changeCenter}></SearchInput>
            <div className='map'>
                <LoadScript
                    googleMapsApiKey='AIzaSyBxUbtR09g-jgF3lxtvmYE3UO35PnITml4'>
                    <GoogleMap
                        mapContainerStyle={mapStyles}
                        zoom={13}
                        center={center}>
                        {
                            pois.map((poi, index) => (
                                <MarkerF
                                    key={index}
                                    position={{ lat: parseFloat(poi._latitude), lng: parseFloat(poi._longitude) }}
                                    onClick={() => {
                                        setSelectedPoi(poi);
                                    }}
                                />
                            ))
                        }
                        {
                            selectedPoi && (
                                <InfoWindow
                                    position={{ lat: parseFloat(selectedPoi._latitude), lng: parseFloat(selectedPoi._longitude) }}
                                    onCloseClick={() => {
                                        setSelectedPoi(null);
                                    }}
                                >
                                    {/* <div>
                                        <h2>{selectedPoi._poiName}</h2>
                                        <p>{selectedPoi._shortDesc}</p>
                                        {selectedPoi._pic && selectedPoi._pic[0] && <img style={{ maxWidth: '100%', maxHeight: '200px' }} src={selectedPoi._pic[0]} alt={selectedPoi._poiName} />}
                                    </div> */}
                                    <div>
                                        <Card title={selectedPoi._poiName} info={selectedPoi._shortDesc} image={selectedPoi._pic[0]} />
                                    </div>
                                </InfoWindow>
                            )
                        }
                    </GoogleMap>
                </LoadScript>
            </div>
        </>
    )
}

export default MapViewGoogle;
