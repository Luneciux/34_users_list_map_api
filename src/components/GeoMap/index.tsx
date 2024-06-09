import { useMemo, useState } from "react";
import { Style, Fill, Stroke } from "ol/style";
import { Geolocation, View } from "ol";
import { osm, Vector } from "../../Map/Source";
import { Coordinate } from "ol/coordinate";
import { Layers, TileLayer, VectorLayer } from "../../Map/Layers";
import { Controls } from "../../Map";
import { Map } from "../../Map/Map";
import { FullScreenControl } from "../../Map/Controls/FullScreenControl";


import CircleStyle from "ol/style/Circle";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";

export function GeoMap () {

  const [zoom] = useState(1);

  const view = useMemo(
    () =>
      new View({
        center: [0, 0],
        zoom,
      }),
    [zoom]
  );

  const geolocation = new Geolocation({
    trackingOptions: {
      enableHighAccuracy: true,
    },
    projection: view.getProjection(),
  });

  geolocation.on("change:position", () => {
    console.log("minha posição", geolocation.getPosition());
  });

  const accuracyFeature = useMemo(() => new Feature(), []);

  geolocation.on("change:accuracyGeometry", () => {
    const accuracyGeometry = geolocation.getAccuracyGeometry();
    accuracyGeometry && accuracyFeature.setGeometry(accuracyGeometry);
  });

  const positionFeature = useMemo(() => new Feature(), []);

  positionFeature.setStyle(
    new Style({
      image: new CircleStyle({
        radius: 6,
        fill: new Fill({
          color: "#33cc4c",
        }),
        stroke: new Stroke({
          color: "#fff",
          width: 2,
        }),
      }),
    })
  );

  const flyTo = (location: Coordinate, callBackDone?: () => void) => {
    if (geolocation.getTracking()) {
      view.animate(
        {
          center: location,
          duration: 2500,
          zoom: zoom + 12,
        },
        () => {
          callBackDone && callBackDone();
        }
      );
      geolocation.setTracking(false);
    }
  };

  geolocation.on("change:position", () => {
    const coordinates = geolocation.getPosition();
    coordinates && positionFeature.setGeometry(new Point(coordinates));

    coordinates &&
      flyTo(coordinates, () => {
        alert("chegamos ao destino");
      });
  });

  return (
    <>
      <Map center={[0, 0]} zoom={zoom} view={view}>
        <Layers>
          <TileLayer source={osm()} zIndex={0} />
          <VectorLayer
            source={Vector({
              features: [accuracyFeature, positionFeature],
            })}
          />
        </Layers>
        <Controls>
          <FullScreenControl />
        </Controls>
      </Map>

      <div>
        <button
          onClick={() => {
            geolocation.setTracking(true);
          }}
        >
          Pegar minha localização
        </button>
      </div>
    </>
  );
}