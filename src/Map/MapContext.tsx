import { Map } from "ol";
import { createContext } from "react";

export const MapContext = createContext({} as { map: Map });