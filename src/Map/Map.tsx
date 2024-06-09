import * as ol from "ol";

import { ReactNode, useEffect, useRef, useState } from "react";
import { MapContext } from "./MapContext";
import { Coordinate } from "ol/coordinate";

import "./index.css";

interface MapProps {
  children: ReactNode;
  zoom: number;
  center: Coordinate;
  view?: ol.View;
  callBack?: (map: ol.Map) => void;
}

export function Map({ children, zoom, center, view, callBack } : MapProps) {

  const mapRef = useRef({} as HTMLDivElement);
  const [map, setMap] = useState<ol.Map>();

  useEffect(() => {

    const mapObject = new ol.Map({
      view: view || new ol.View({ zoom, center }),
      layers: [],
      controls: [],
      overlays: [],
    });

    mapObject.setTarget(mapRef?.current);

    setMap(mapObject);
    
    callBack && callBack(mapObject as ol.Map);

    return () => mapObject.setTarget(undefined);

  }, [callBack, center, view, zoom]);


  useEffect(() => {
    if (!map)
      return;

    map?.getView().setZoom(zoom);
  }, [map, zoom]);


  useEffect(() => {
    if (!map)
      return;

    map?.getView().setCenter(center);
  }, [center, map]);


  return (
    <MapContext.Provider value={{ map } as { map: ol.Map }}>
      <div>
        <div ref={mapRef} className="main-div">
          {children}
        </div>
      </div>
    </MapContext.Provider>
  );
}