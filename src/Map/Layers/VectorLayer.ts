import { useContext, useEffect } from "react";
import { Geometry } from "ol/geom";
import { MapContext } from "../MapContext";
import { Style } from "ol/style";

import VectorSource from "ol/source/Vector";
import OLVectorLayer from "ol/layer/Vector";
import Feature from "ol/Feature";

interface VectorLayerProps {
  source: VectorSource<Feature<Geometry>>;
  zIndex?: number;
  style?: Style;
}

export function VectorLayer ({ source, style, zIndex = 0 }: VectorLayerProps) {

  const { map } = useContext(MapContext);

  useEffect(() => {
    if (!map) return;

    const vectorLayer = new OLVectorLayer({
      source,
      style,
    });

    map?.addLayer(vectorLayer);
    vectorLayer.setZIndex(zIndex);

    return () => {
      if(map)
        map?.removeLayer(vectorLayer);
    }

  }, [map, source, style, zIndex]);

  return null;
}