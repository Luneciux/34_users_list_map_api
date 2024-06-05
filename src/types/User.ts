export interface UserType {
  id: number, 
  name: string, 
  email: string, 
  address: {
    street: string,
    suite: string,
    city: string,
    zipcode: string,
    geo: {
      lat: string,
      lng: string
    }
  }
}