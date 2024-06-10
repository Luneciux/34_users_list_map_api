import {Feature, Map, View} from 'ol';
import {OSM, Vector as VectorSource} from 'ol/source';
import {Point} from 'ol/geom';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import {useGeographic} from 'ol/proj';
import { useContext, useEffect, useRef } from 'react';
import { LocalsContext } from '../../App';

import './index.css';


export function GeoMap() {
  
  useGeographic();
  
  const { locals } = useContext(LocalsContext); 

  const loaded = useRef(false);

  
  
  useEffect(() => {
    
    const features: Feature<Point>[] = [];
    
    locals.map((local) => {
      features.push(new Feature( new Point([ parseFloat(local.lng), parseFloat(local.lat) ]) ));
    });
      
      
    if(locals.length > 0 && features.length > 0) {
      new Map({
        target: 'map',
    
        view: new View({
          center: [0, 0],
          zoom: 0,
        }),
    
        layers: [
    
          new TileLayer({
            source: new OSM(),
          }),
    
          new VectorLayer({
            source: new VectorSource({
              features: features,
            }),
            style: {
              'circle-radius': 9,
              'circle-fill-color': '#000',
            },
          }),
        ],
    
      });

    }



    

  }, [locals, loaded]);






  return (
    <div>

      <div id='map' className='map'/>
    </div>
  );

}
