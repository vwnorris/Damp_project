import { Alert, Button, FormControl, FormGroup, FormLabel, Stack, TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import React, { useEffect, useState } from 'react';
import { IFilterSettingTypeProp } from './types';
import { Dayjs } from 'dayjs';

export const FilterSettingsReleaseDate = (props: IFilterSettingTypeProp) => {
    const [startDate, setStartDate] = useState<Dayjs | null>(null);
    const [endDate, setEndDate] = useState<Dayjs | null>(null);
    const [error, setError] = useState<string>("");

    useEffect (() => {
        setError("");
    }, [startDate, endDate])

    const addFilter = () => {
        let visualDataString;
        // formats the visual string based on what dates you picked
        if (startDate !== null && endDate !== null) {
            visualDataString = `Between ${startDate.format('DD/MM/YYYY')} and ${endDate.format('DD/MM/YYYY')}`;
        } else if (startDate !== null && endDate === null) {
            visualDataString = `After ${startDate.format('DD/MM/YYYY')}`;
        } else if (startDate === null && endDate !== null) {
            visualDataString = `Before ${endDate.format('DD/MM/YYYY')}`;
        } else {
            setError("Please select valid dates.")
            return;
        }

        props.setFilterData({
            type: 'ReleaseDate',
            data: [(startDate !== null) ? startDate.toDate() : null, (endDate !== null) ? endDate.toDate() : null],
            visualData: visualDataString
        })
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <FormControl className='filterCard'>
                <FormLabel>Released</FormLabel>
                <FormGroup>
                    <Stack gap={2}>
                        <DatePicker
                            label={"after"}
                            value={startDate}
                            disableFuture={true}
                            onChange={(value) => {
                                setStartDate(value);
                            }}
                            renderInput={(params) => <TextField {...params}/>}
                        />
                        <DatePicker
                            label={"before"}
                            value={endDate}
                            disableFuture={true}
                            onChange={(value) => {
                                setEndDate(value);
                            }}
                            renderInput={(params) => <TextField {...params}/>}
                        />
                    </Stack>
                </FormGroup>
                <Button onClick={addFilter}>Add filter</Button>
            </FormControl>
            <Alert severity='error' sx={{display: (error === "") ?  'none' : 'inherit'}}>{error}</Alert>
        </LocalizationProvider>
    )
}