import React from 'react'
import { Map as LeafLetMap, TileLayer } from 'react-leaflet'
import "./Map.css"
import { showDataOnMap } from './util'

function Map({ countries, casesType, center, zoom }) {
    return (
        <div className='map'>
            <LeafLetMap center={center} zoom={zoom}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                {showDataOnMap(countries, casesType)}
            </LeafLetMap>
        </div>
    )
}

export default Map
