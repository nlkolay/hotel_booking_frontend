import { useForm } from "react-hook-form";
import { Box, Button, FormControl, FormLabel, Input, useToast } from "@chakra-ui/react";
import axiosInstance from "../api/axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
const { register, handleSubmit } = useForm();
const toast = useToast();
const navigate = useNavigate();

const onSubmit = async (data: Record<string, string>) => {
try {
const response = await axiosInstance.post("/auth/register", data);
toast({
title: response.data.message || "Регистрация прошла успешно.", // Translated "Registration successful."
status: "success",
duration: 2000,
isClosable: true,
});
await axiosInstance.post("/auth/logout");
navigate("/login");
} catch (error) {
toast({
title: "Ошибка регистрации.", // Translated "Registration failed."
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
<Button mt={4} colorScheme="teal" type="submit">Зарегистрироваться</Button> {/* Translated "Register" */}
</form>
</Box>
);
};

export default Register;