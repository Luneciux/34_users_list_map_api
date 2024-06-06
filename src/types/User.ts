export interface UserType {
  id: number, 
  name: string, 
  email: string, 
  address: {
    street: string,
    suite: string,
    city: string,
    zipcode: string,
    geo: GeoType
  }
}

export interface GeoType {
  lat: string, 
  lng: string,
}