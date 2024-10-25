interface Booking {
  id: number;
  date_to: string; // ISO date string
  price: number;
  total_days: number;
  user_id: number;
  room_id: number;
  date_from: string; // ISO date string
  total_cost: number;
  room: Room;
}

interface Room {
  hotel_id: number;
  name: string;
  price: number;
  services: string[];
  id: number;
  description: string;
  quantity: number;
  image_id: number;
  hotel: Hotel;
}

interface Hotel {
  location: string;
  image_id: number;
  services: string[];
  name: string;
  id: number;
  rooms_quantity: number;
}

interface BookingResponse {
  Bookings: Booking;
}

interface User {
  id: number;
  email: string;
  }

export type { Booking, BookingResponse, Room, Hotel, User };