import { Alert, Box, Button, FormControl, FormLabel, Slider, Typography } from '@mui/material';
import React, { useState } from 'react';
import { IFilterSettingTypeProp } from './types';

export const FilterSettingsPrice = (props: IFilterSettingTypeProp) => {
    const [price, setPrice] = useState<number[]>([0, 1000]);
    const [error, setError] = useState<string>("");

    const handleChange = (event: Event, newValue: number | number[]) => {
        setPrice(newValue as number[]);
        setError("");
    }

    const valueDisplay = (val: number): string => {
        if (val === 0) {
            return "Min"
        } else if (val === 1000) {
            return "Max"
        }

        return `$${val}`;
    }

    const addFilter = () => {
        if (price[0] === 0 && price[1] === 1000) {
            setError("No reason to filter between the min and max ;)");
            return;
        }
        
        setError("");

        props.setFilterData({
            type: "Price",
            data: price,
            visualData: `${valueDisplay(price[0])} - ${valueDisplay(price[1])}`
        })
    }

    return (
        <FormControl
            sx={{width: 1}}
        >
            <FormLabel>Price</FormLabel>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between'
            }}>
                <Typography>Min: {valueDisplay(price[0])}</Typography>
                <Typography>Max: {valueDisplay(price[1])}</Typography>
            </Box>
            <Slider data-testid={"slider"} value={price} min={0} max={1000} onChange={handleChange} sx={{width: '85%', margin: 'auto'}}/>
            <Button onClick={addFilter}>Add filter</Button>
            <Alert severity='error' sx={{display: (error === "") ? 'none' : 'inherit'}}>{error}</Alert>
        </FormControl>
    )
}