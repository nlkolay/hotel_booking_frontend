import React from "react";
import { Box, Heading, SimpleGrid, Text, Image } from "@chakra-ui/react";
import axiosInstance from "../api/axios";
import { useNavigate } from "react-router-dom";
import { Hotel } from "../global/types";

const Hotels: React.FC = () => {
  const [hotels, setHotels] = React.useState<Hotel[]>([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axiosInstance.get<Hotel[]>("/hotels/");
        setHotels(response.data);
      } catch (error) {
        console.error("Не удалось показать отели.", error);
      }
    };

    fetchHotels();
  }, []);

  const handleHotelClick = (hotelId: number) => {
    navigate(`/hotels/${hotelId}`);
  };

  return (
    <Box p={5}>
      <Heading>Отели</Heading>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={4} mt={4}>
        {hotels.map((hotel) => (
          <Box
            key={hotel.id} // Ensure hotel.id is unique
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

export default Hotels;
