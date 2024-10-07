import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Home = () => {
return (
<Box p={5}>
<Heading>Welcome to Hotel Booking</Heading>
<Text>Your go-to app for booking the best hotels!</Text>
<Box mt={5} display="flex" flexDirection="column" alignItems="start" gap={2}>
<Button as={Link} to="/" colorScheme="teal" width="100%">
Home
</Button>
<Button as={Link} to="/login" colorScheme="teal" width="100%">
Login
</Button>
<Button as={Link} to="/register" colorScheme="teal" width="100%">
Register
</Button>
<Button as={Link} to="/hotels" colorScheme="teal" width="100%">
Hotels
</Button>
<Button as={Link} to="/bookings" colorScheme="teal" width="100%">
Bookings
</Button>
<Button as={Link} to="/account" colorScheme="teal" width="100%">
Account
</Button>
</Box>
</Box>
);
};

export default Home;