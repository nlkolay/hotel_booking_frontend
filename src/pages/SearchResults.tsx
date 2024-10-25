import React from "react";
import { Box, Heading, SimpleGrid, Text, Image } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axios";
import { Hotel } from "../global/types";

const SearchResults: React.FC = () => {
  const [hotels, setHotels] = React.useState<Hotel[]>([]);
  const location = useLocation();
  const navigate = useNavigate();

  const query = new URLSearchParams(location.search);
  const locationQuery = query.get("location");
  const dateFrom = query.get("date_from");
  const dateTo = query.get("date_to");

  React.useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axiosInstance.get<Hotel[]>("/hotels", {
          params: {
            location: locationQuery,
            date_from: dateFrom,
            date_to: dateTo,
          },
        });
        setHotels(response.data);
      } catch (error) {
        console.error("Не удалось показать отели.", error);
      }
    };

    fetchHotels();
  }, [locationQuery, dateFrom, dateTo]);

  const handleHotelClick = (hotelId: number) => {
    navigate(`/rooms/${hotelId}?date_from=${dateFrom}&date_to=${dateTo}`);
  };

  return (
    <Box p={5}>
      <Heading>Результаты поиска отелей</Heading>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={4} mt={4}>
        {hotels.map((hotel) => (
          <Box
            key={hotel.id}
            p={5}
            shadow="md"
            borderWidth="1px"
            cursor="pointer"
            onClick={() => handleHotelClick(hotel.id)}
          >
            <Image
              src={`/static/images/${hotel.id}.webp`}
              alt={`${hotel.name} image`}
              maxH="200px"
              objectFit="cover"
            />
            <Heading fontSize="xl" mt={4}>
              {hotel.name}
            </Heading>
            <Text mt={2}>{hotel.location}</Text>
            <Text mt={2}>{hotel.services.join(", ")}</Text>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default SearchResults;
