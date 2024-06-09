import { useContext, useEffect } from "react";
import { OSM } from "ol/source";
import { MapContext } from "../MapContext";

import OLTileLayer from "ol/layer/Tile";

interface TileLayerProps {
  source: OSM;
  zIndex?: number;
}

export function TileLayer ({ source, zIndex = 0 }: TileLayerProps) {

  const { map } = useContext(MapContext);

  useEffect(() => {

    if (!map) 
      return;

    const tileLayer = new OLTileLayer({
      preload: 4,
      source,
      zIndex,
    });

    map?.addLayer(tileLayer);
    tileLayer.setZIndex(zIndex);

    return () => {
      if(map)
        map?.removeLayer(tileLayer);
    };

  }, [map, source, zIndex]);

  return null;
}