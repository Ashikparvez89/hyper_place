import React from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

const Map = () => {
  const position = [23.4498, 91.1847];
  return (
    <div>
      <div className="max-w-7xl border border-black mx-auto p-2">
        <MapContainer
          style={{ height: "450px", width: "100%", overflow: "hidden" }}
          center={position}
          zoom={13}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution="Ashik Parvez"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?lang=en"
          />
          <Marker position={position}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default Map;
