import { Collection, Feature } from "ol";
import { Geometry } from "ol/geom";
import { Vector as VectorSource } from "ol/source";

interface VectorProps {
  features?: Feature<Geometry>[] | Collection<Feature<Geometry>>;
}

export function Vector ({ features }: VectorProps = {}) {
  if (!features) {
    return new VectorSource({});
  }
  
  return new VectorSource({
    features,
  });
}