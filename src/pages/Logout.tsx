import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@chakra-ui/react";
import axiosInstance from '../api/axios';

const Logout = () => {
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const logout = async () => {
      try {
        // Отправляем запрос на выход с withCredentials
        await axiosInstance.post("/auth/logout", {}, { withCredentials: true });

        // Отображаем уведомление
        toast({
          title: "Вы вышли из профиля.",
          status: "success",
          duration: 2000,
          isClosable: true,
        });

        // Перенаправление на страницу входа
        navigate("/login");
      } catch (error) {
        console.error("Logout failed:", error);
        toast({
          title: "Ошибка выхода.",
          description: "Не удалось выйти из профиля.",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }
    };

    logout();
  }, [navigate, toast]);

  return null;
};

export default Logout;