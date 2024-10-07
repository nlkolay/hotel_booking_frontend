import React from "react";
import { Box, Heading, SimpleGrid, Text, Image } from "@chakra-ui/react";
import axiosInstance from "../api/axios";
import { useNavigate } from "react-router-dom";

interface Hotel {
id: number;
name: string;
location: string;
services: string[];
rooms_quantity: number;
image_id: number;
}

const Hotels = () => {
const [hotels, setHotels] = React.useState<Hotel[]>([]);
const navigate = useNavigate();

React.useEffect(() => {
const fetchHotels = async () => {
try {
const response = await axiosInstance.get("/hotels/");
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
<SimpleGrid columns={3} spacing={4} mt={4}>
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
maxH='200px'
/>
<Heading fontSize="xl" mt={4}>{hotel.name}</Heading>
<Text mt={2}>{hotel.location}</Text>
<Text mt={2}>{hotel.services.join(", ")}</Text>
</Box>
))}
</SimpleGrid>
</Box>
);
};

export default Hotels;