import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, MarkerF, InfoWindow } from '@react-google-maps/api';
import axios from 'axios';
import Data from './data.json'
import SearchInput from './SearchInput';

const MapViewGoogle = () => {
    const [pois, setPois] = useState([]);
    const [selectedPoi, setSelectedPoi] = useState(null);
    const [center, setCenter] = useState({lat: 51.5072178, lng: -0.1275862})

    const mapStyles = {
        height: "100vh",
        width: "100%"
    };

    const changeCenter = (new_center) => {
        setCenter(new_center)
    }

    useEffect(() => {
        setPois(Data)
    }, []);

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
                                    <div>
                                        <h2>{selectedPoi._poiName}</h2>
                                        <p>{selectedPoi._shortDesc}</p>
                                        {selectedPoi._pic && selectedPoi._pic[0] && <img style={{ maxWidth: '100%', maxHeight: '200px' }} src={selectedPoi._pic[0]} alt={selectedPoi._poiName} />}
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
