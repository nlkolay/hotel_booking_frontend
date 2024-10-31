import { useForm } from "react-hook-form";
import { Box, Button, FormControl, FormLabel, Input, useToast } from "@chakra-ui/react";
import axiosInstance from "../api/axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
const { register, handleSubmit } = useForm();
const toast = useToast();
const navigate = useNavigate();

const onSubmit = async (data: Record<string, string>) => {
try {
await axiosInstance.post("/auth/login", data);
toast({
title: "Login successful.",
status: "success",
duration: 2000,
isClosable: true,
});
navigate("/bookings");
} catch (error) {
toast({
title: "Login failed.",
status: "error",
duration: 2000,
isClosable: true,
});
}
};

return (
    <Box p={5}>
    <form onSubmit={handleSubmit(onSubmit)}>
    <FormControl>
    <FormLabel>Адрес электронной почты</FormLabel> {/* Translated "Email" */}
    <Input type="email" {...register("email", { required: "Это поле обязательно" })} /> {/* Translated "Email is required" */}
    </FormControl>
    <FormControl>
    <FormLabel>Пароль</FormLabel> {/* Translated "Password" */}
    <Input type="password" {...register("password", { required: true })} />
    </FormControl>
    <Button mt={4} colorScheme="teal" type="submit">Войти</Button> {/* Translated "Login" */}
    </form>
    </Box>
    );
    };

export default Login;