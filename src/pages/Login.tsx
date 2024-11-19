import { useForm } from "react-hook-form";
import { Box, Button, Flex, FormControl, FormLabel, Input, useToast } from "@chakra-ui/react";
import axiosInstance from "../api/axios";
import { useNavigate } from "react-router-dom";
import { setCookie } from 'typescript-cookie'

const Login = () => {
const { register, handleSubmit } = useForm();
const toast = useToast();
const navigate = useNavigate();

const onSubmit = async (data: Record<string, string>) => {
try {
const response = await axiosInstance.post("/auth/login", data);
// setCookie("token", response.data.token, {
//     sameSite: 'None', // not secure!!!
//     path: '/', 
//     expires: new Date(Date.now() + 1800000), 
//     httpOnly: true,
//     secure: true,
//  });
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
    <Flex
        align="center"
        justify="center"
        height="100vh" // Занять всю высоту экрана
    >
        <Box p={5} width="100%" maxWidth="400px"> {/* Ограничение ширины формы */}
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl>
                    <FormLabel>Адрес электронной почты</FormLabel>
                    <Input type="email" {...register("email", { required: "Это поле обязательно" })} />
                </FormControl>
                <FormControl mt={4}>
                    <FormLabel>Пароль</FormLabel>
                    <Input type="password" {...register("password", { required: true })} />
                </FormControl>
                <Button mt={4} colorScheme="teal" type="submit">Войти</Button>
            </form>
        </Box>
    </Flex>
);
};

export default Login;