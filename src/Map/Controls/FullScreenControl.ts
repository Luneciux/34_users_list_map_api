import { useContext, useEffect } from "react";
import { FullScreen } from "ol/control";
import { MapContext } from "../MapContext";

export function FullScreenControl () {
  const { map } = useContext(MapContext);

  useEffect(() => {
    if (!map) 
      return;

    const fullScreenControl = new FullScreen({});

    map?.addControl(fullScreenControl);

    return () => {
      map?.removeControl(fullScreenControl);
    };
  }, [map]);

  return null;
}