import React from 'react';
import { Box, Button, Flex, Spacer } from "@chakra-ui/react";
import SearchForm from './SearchForm';
import { Link } from "react-router-dom";

const NavBar = () => {
return (
<Flex as="nav" align="center" justify="space-between" p={3} bg="gray.100" color="gray.800">
<Box as="a" href="/" fontSize="2xl" fontWeight="bold" mr={2}>
Bronenosets
</Box>
<Flex align="center">
<Button as={Link} to="/login" colorScheme="teal" size="md" mr={2}>
Вход
</Button>
<Button as={Link} to="/register" colorScheme="teal" size="md" mr={2}>
Регистрация
</Button>
<SearchForm /> {/* Your SearchForm component */}
<Spacer /> {/* This will push the buttons to the right */}
<Button as={Link} to="/hotels" colorScheme="teal" size="md" mr={2}>
Отели
</Button>
<Button as={Link} to="/bookings" colorScheme="teal" size="md" mr={2}>
Бронирования
</Button>
<Button as={Link} to="/logout" colorScheme="teal" size="md">
Выход
</Button>
</Flex>
</Flex>
);
};

export default NavBar;