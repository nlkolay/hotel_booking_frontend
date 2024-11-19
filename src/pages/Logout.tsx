import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@chakra-ui/react";
import axiosInstance from '../api/axios';

const Logout = () => {
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    axiosInstance.post("/auth/logout", {}, { withCredentials: true });
    
    // Отображаем уведомление
    toast({
      title: "Вы вышли из профиля.",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
    
    // Перенаправление на страницу входа
    navigate("/login");
  }, [navigate, toast]);

  return null;
};

export default Logout;