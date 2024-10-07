import React from "react";
import { Box, Heading, SimpleGrid, Text, Button, useToast, Image } from "@chakra-ui/react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axios";
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { AxiosError } from 'axios';

interface Room {
id: number;
name: string;
description: string;
price: number;
}

const AvailableRooms = () => {
const [rooms, setRooms] = React.useState<Room[]>([]);
const { hotelId } = useParams();
const location = useLocation();
const navigate = useNavigate();
const toast = useToast();

const query = new URLSearchParams(location.search);
const dateFrom = query.get("date_from");
const dateTo = query.get("date_to");

React.useEffect(() => {
const fetchRooms = async () => {
try {
const response = await axiosInstance.get(`/rooms/${hotelId}`, {
params: { date_from: dateFrom, date_to: dateTo }
});
setRooms(response.data);
} catch (error) {
console.error("Ошибка загрузки данных комнат", error);
}
};

fetchRooms();
}, [hotelId, dateFrom, dateTo]);

const handleBooking = async (roomId: number) => {
try {
const response = await axiosInstance.post('/bookings/create', {
room_id: roomId,
date_from: dateFrom,
date_to: dateTo
});
toast({
title: "Бронирование создано",
description: `Комната ${response.data.room_id} забронирована пользователем ${response.data.user_id} с ${format(new Date(response.data.date_from), 'dd.MM.yyyy', { locale: ru })} по ${format(new Date(response.data.date_to), 'dd.MM.yyyy', { locale: ru })}. Цена: ${response.data.price}₽`,
status: "success",
duration: 5000,
isClosable: true,
});
navigate('/bookings');
} catch (error) {
if (error instanceof AxiosError) {
toast({
title: "Ошибка",
description: error.response?.data?.detail || "Не удалось создать бронирование.",
status: "error",
duration: 5000,
isClosable: true,
});
} else {
toast({
title: "Произошла неизвестная ошибка",
description: "Пожалуйста попробуйте позже.",
status: "error",
duration: 5000,
isClosable: true,
});
}
}
};

return (
    <Box p={5}>
    <Heading>Доступные комнаты</Heading>
    <SimpleGrid columns={3} spacing={4} mt={4}>
    {rooms.map((room) => (
    <Box key={room.id} p={5} shadow="md" borderWidth="1px">
    <Image src={`/static/images/rooms/${room.id}.webp`} alt={`Изображение комнаты ${room.name}`} 
    maxH='200px'/>
    <Heading fontSize="xl" mt={4}>{room.name}</Heading>
    <Text mt={4}>{room.description}</Text>
    <Text mt={4}>Цена: {room.price}₽</Text>
    <Button mt={4} colorScheme="teal" onClick={() => handleBooking(room.id)}>Забронировать</Button>
    </Box>
    ))}
    </SimpleGrid>
    </Box>
    );
};

export default AvailableRooms;