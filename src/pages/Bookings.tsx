import { useEffect, useState } from "react";
import {
  Box,
  Heading,
  SimpleGrid,
  Text,
  useToast,
  Button,
  Image,
  Flex,
  } from "@chakra-ui/react";
import axiosInstance from "../api/axios";

interface BookingResponse {
  id: number;
  room_id: number;
  date_from: string;
  date_to: string;
  total_cost: number;
}

interface HotelResponse {
  id: number;
  name: string;
  location: string;
  services: string[];
  rooms_quantity: number;
  image_id: number;
}

interface RoomResponse {
  id: number;
  hotel_id: number;
  name: string;
  description: string | null;
  price: number;
  services: string[];
  quantity: number;
  image_id: number;
}

// Updated BookingResponseExtended interface
interface BookingResponseExtended {
  Bookings: BookingResponse; // Use lowercase for consistency
  Hotels: HotelResponse;
  Rooms: RoomResponse;
}

const Bookings: React.FC = () => {
  const [bookings, setBookings] = useState<BookingResponseExtended[]>([]);
  const toast = useToast();
  
  useEffect(() => {
  const fetchBookings = async () => {
  try {
  const token = localStorage.getItem('token');
  const response = await axiosInstance.get<BookingResponseExtended[]>('/bookings', {
  headers: {
  Authorization: `Bearer ${token}`,
  },
  });
  setBookings(response.data);
  } catch (error) {
  toast({
  title: 'Не удалось получить бронирования.',
  status: 'error',
  duration: 2000,
  isClosable: true,
  });
  console.error('Failed to fetch bookings', error);
  }
  };
  
  fetchBookings();
  }, [toast]);
  
  const handleDeleteBooking = async (bookingId: number) => {
  try {
  const token = localStorage.getItem('token');
  await axiosInstance.delete(`/bookings/${bookingId}`, {
  headers: {
  Authorization: `Bearer ${token}`,
  },
  });
  setBookings(bookings.filter((booking) => booking.Bookings.id !== bookingId));
  toast({
  title: 'Бронирование успешно удалено',
  status: 'success',
  duration: 2000,
  isClosable: true,
  });
  } catch (error) {
  toast({
  title: 'Не удалось удалить бронирование',
  status: 'error',
  duration: 2000,
  isClosable: true,
  });
  console.error('Failed to delete booking', error);
  }
  };
  return (
    <Box p={5}>
    <Heading>Мои бронирования</Heading>
    <SimpleGrid columns={3} spacing={4} mt={4}>
    {bookings.map((booking) => (
    <Box key={booking.Bookings.id} p={5} shadow="md" borderWidth="1px">
    <Flex wrap='wrap'>
    <Image
    src={`/static/images/${booking.Hotels.image_id}.webp`}
    alt={`${booking.Hotels.name} изображение`}
    maxH='200px'
    />    
    <Image
    src={`/static/images/rooms/${booking.Rooms.id}.webp`}
    alt={`${booking.Rooms.id} изображение`}
    maxH='200px'
    />
    </Flex>
    <Heading fontSize="xl">Отель: {booking.Hotels.name}</Heading>
    <Text mt={4}>Адрес: {booking.Hotels.location}</Text>
    <Heading fontSize="lg" mt={4}>Комната: {booking.Rooms.name}</Heading>
    <Text mt={4}>Номер комнаты: {booking.Bookings.room_id}</Text>
    <Text mt={4}>Дата заезда: {booking.Bookings.date_from}</Text>
    <Text mt={4}>Дата выезда: {booking.Bookings.date_to}</Text>
    <Text mt={4}>Общая стоимость: {booking.Bookings.total_cost}₽</Text>
    <Button
    mt={4}
    colorScheme="red"
    onClick={() => handleDeleteBooking(booking.Bookings.id)}
    >
    Отменить бронирование
    </Button>
    </Box>
    ))}
    </SimpleGrid>
    </Box>
    );
  };

export default Bookings;

          /* TODO  
        +язык на рус сменить
        добавить дао и роутеры для: 
            +картинок отель-комната в букинг 
            +кнопку для создания бронирования в AvailableRooms
            +переставить навбар
        */