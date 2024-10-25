import { useEffect, useState } from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
import axiosInstance from "../api/axios";
import { User } from "../global/types";

const Account = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axiosInstance.get("/auth/account", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error("Failed to fetch account details", error);
      }
    };

    fetchAccount();
  }, []);

  if (!user) {
    return <Box p={5}>You're not logged in =(</Box>;
  }

  return (
    <Box p={5}>
      <Heading>Account Details</Heading>
      <Text mt={4}>Email: {user.email}</Text>
    </Box>
  );
};

export default Account;
