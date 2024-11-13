import { useEffect, useState } from "react";
import { Box, Heading, SimpleGrid, Text, Image } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import axiosInstance from "../api/axios";
import { Room } from "../global/types";

const Rooms: React.FC = () => {
  const { hotelId } = useParams<{ hotelId: string }>();
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axiosInstance.get<Room[]>(
          `/rooms/${hotelId}/all`
        );
        setRooms(response.data);
      } catch (error) {
        console.error("Не удалось показать комнаты", error);
      }
    };

    fetchRooms();
  }, [hotelId]);

  return (
    <Box p={5}>
      <Heading>Комнаты</Heading>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={4} mt={4}>
        {rooms.map((room) => (
          <Box key={room.id} p={5} shadow="md" borderWidth="1px">
            <Image
              src={`/static/images/rooms/${room.id}.webp`}
              alt={`${room.name} image`}
              maxH="200px"
              objectFit="cover"
            />
            <Heading fontSize="xl" mt={4}>
              {room.name}
            </Heading>
            <Text mt={4}>{room.price}₽</Text>
            <Text mt={4}>{room.services.join(", ")}</Text>
            <Text mt={4}>{room.description}</Text>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Rooms;
