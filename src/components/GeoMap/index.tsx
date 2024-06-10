import {Feature, Map, View} from 'ol';
import {OSM, Vector as VectorSource} from 'ol/source';
import {Point} from 'ol/geom';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import {useGeographic} from 'ol/proj';
import { useContext, useEffect, useRef, useState } from 'react';
import { LocalsContext } from '../../App';

import './index.css';


export function GeoMap() {
  
  useGeographic();
  
  const { locals } = useContext(LocalsContext); 

  const loaded = useRef(false);
  const length = useRef(0);
  
  const [ map, setMap ] = useState(new Map());
  
  useEffect(() => {

    
    const features: Feature<Point>[] = [];
    
    locals.map((local) => {
      features.push(new Feature( new Point([ parseFloat(local.lng), parseFloat(local.lat) ]) ));
    });
      
      
    if(locals.length > 0 && features.length > 0 && loaded.current === false) {
      length.current = locals.length;
      loaded.current = true;

      map.setLayers([
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
      ]);

      map.setTarget('map');

      map.setView(new View({
        center: [0, 0],
        zoom: 0,
      }));

    }

    if(locals.length > length.current){
      console.log(locals[10].lat);

     
      locals.map((local) => {
        features.push(new Feature( new Point([ parseFloat(local.lng), parseFloat(local.lat) ]) ));
      });

    
      setMap((prevMap) => {
        prevMap.setLayers([
        
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
        ])
        
        return prevMap;
      });      
      
    }

  }, [locals]);



  return (
    <div id="map-refresh">
      <div id='map' className='map'/>
    </div>
  );

}
