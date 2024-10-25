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
import { BookingResponse } from "../global/types";

const Bookings: React.FC = () => {
  const [bookings, setBookings] = useState<BookingResponse[]>([]);
  const toast = useToast();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axiosInstance.get<BookingResponse[]>(
          "/bookings",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBookings(response.data);
      } catch (error) {
        toast({
          title: "Не удалось получить бронирования.",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
        console.error("Failed to fetch bookings", error);
      }
    };

    fetchBookings();
  }, [toast]);

  const handleDeleteBooking = async (bookingId: number) => {
    try {
      const token = localStorage.getItem("token");
      await axiosInstance.delete(`/bookings/${bookingId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBookings(
        bookings.filter((booking) => booking.Bookings.id !== bookingId)
      );
      toast({
        title: "Бронирование успешно удалено",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Не удалось удалить бронирование",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      console.error("Failed to delete booking", error);
    }
  };

  return (
    <Box p={5}>
      <Heading>Мои бронирования</Heading>
      <SimpleGrid
        columns={{ base: 1, sm: 2, md: 3 }} // Responsive columns
        spacing={4}
        mt={4}
      >
        {bookings.map((bookingResponse) => (
          <Box
            key={bookingResponse.Bookings.id}
            p={5}
            shadow="md"
            borderWidth="1px"
            display="flex"
            flexDirection="column"
            justifyContent="space-between" // Aligns content to the bottom
            height="100%" // Ensures the Box takes full height
          >
            <Flex wrap="nowrap" overflow="hidden" alignItems="center">
              <Image
                src={`/static/images/${bookingResponse.Bookings.room.hotel.image_id}.webp`}
                alt={`изображение ${bookingResponse.Bookings.room.hotel.name}`}
                maxH="200px"
                objectFit="cover" // Ensures the image covers the area without distortion
                flexShrink={0} // Prevents the image from shrinking
              />
              <Image
                src={`/static/images/rooms/${bookingResponse.Bookings.room.id}.webp`}
                alt={`изображение ${bookingResponse.Bookings.room.name}`}
                maxH="200px"
                objectFit="cover" // Ensures the image covers the area without distortion
                flexShrink={0} // Prevents the image from shrinking
              />
            </Flex>
            <Box>
              <Heading fontSize="xl" mt={4}>
                Отель: {bookingResponse.Bookings.room.hotel.name}
              </Heading>
              <Text mt={2}>
                Адрес: {bookingResponse.Bookings.room.hotel.location}
              </Text>
              <Heading fontSize="lg" mt={4}>
                Комната: {bookingResponse.Bookings.room.name}
              </Heading>
              <Text mt={2}>
                Номер комнаты: {bookingResponse.Bookings.room_id}
              </Text>
              <Text mt={2}>
                Дата заезда: {bookingResponse.Bookings.date_from}
              </Text>
              <Text mt={2}>
                Дата выезда: {bookingResponse.Bookings.date_to}
              </Text>
              <Text mt={2}>
                Общая стоимость: {bookingResponse.Bookings.total_cost}₽
              </Text>
            </Box>
            <Button
              mt={4}
              colorScheme="red"
              onClick={() => handleDeleteBooking(bookingResponse.Bookings.id)}
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
