import React from 'react';
import { Box, Button, FormControl, Input, useToast } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';

const SearchForm = () => {
    const { register, handleSubmit, setValue, watch } = useForm();
    const navigate = useNavigate();
    const toast = useToast();

    const dateFrom = watch("date_from");
    const dateTo = watch("date_to");

    const onDateChange = (field: string, date: Date | null) => {
        setValue(field, date);
    };

    const onSubmit = (data: Record<string, any>) => {
        if (new Date(data.date_from) > new Date(data.date_to)) {
            toast({
                title: "Дата заезда не может быть позже даты выезда.",
                status: "error",
                duration: 2000,
                isClosable: true,
            });
            return;
        }
        navigate(`/results?location=${data.location}&date_from=${format(new Date(data.date_from), 'yyyy-MM-dd')}&date_to=${format(new Date(data.date_to), 'yyyy-MM-dd')}`);
    };

    return (
        <Box as="form" onSubmit={handleSubmit(onSubmit)} display="flex" alignItems="center" ml={5}>
        {/* Location Input */}
        <FormControl mr={2}>
        <Input
        type="text"
        {...register("location", { required: "Location is required" })}
        placeholder="Введите местоположение"
        size="sm"
        borderRadius="md"
        borderWidth="1px"
        borderColor="gray.300"
        _focus={{ borderColor: "teal.500" }}
        />
        </FormControl>
        
        {/* Date Inputs */}
        <FormControl mr={2}>
        <DatePicker
        selected={dateFrom}
        onChange={(date) => onDateChange("date_from", date)}
        dateFormat="dd.MM.yyyy"
        isClearable
        placeholderText="Дата заезда"
        customInput={
        <Input
        size="sm"
        borderRadius="md"
        borderWidth="1px"
        borderColor="gray.300"
        _focus={{ borderColor: "teal.500" }}
        />
        }
        />
        </FormControl>
        <FormControl mr={2}>
        <DatePicker
        selected={dateTo}
        onChange={(date) => onDateChange("date_to", date)}
        dateFormat="dd.MM.yyyy"
        isClearable
        placeholderText="Дата выезда"
        customInput={
        <Input
        size="sm"
        borderRadius="md"
        borderWidth="1px"
        borderColor="gray.300"
        _focus={{ borderColor: "teal.500" }}
        />
        }
        />
        </FormControl>
        
        {/* Search Button */}
        <Button colorScheme="teal" type="submit" size="md" borderRadius="md" ml='2' mr='2'>
        Искать
        </Button>
        </Box>
        );
        };
        
        export default SearchForm;