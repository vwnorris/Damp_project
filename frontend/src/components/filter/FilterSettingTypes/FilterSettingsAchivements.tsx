import { Alert, Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup} from '@mui/material';
import React, { useState } from 'react';
import { IFilterSettingTypeProp } from './types';

const ValueToString = [
    {
        val: "1",
        text: 'No achievements'
    },
    {
        val: "2",
        text: 'Has achievements'
    },
    {
        val: "3",
        text: '1-10 achievements'
    },
    {
        val: "4",
        text: "10-20 achievements"
    },
    {
        val: "5",
        text: "20+ achievements"
    }
]

export const FilterSettingsAchievements = (props: IFilterSettingTypeProp) => {
    const [active, setActive] = useState<string>("");
    const [error, setError] = useState<string>("");

    const getVisualDataString = (value: string) => {
        for (let a of ValueToString) {
            if (a.val === value) {
                return a.text;
            }
        }
        return "";
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setActive((event.target as HTMLInputElement).value);
        setError("");
    }

    const addFilter = () => {
        if (active === "") {
            setError("Please select a value to filter");
            return;
        }

        setError("");

        props.setFilterData({
            type: "Achievements",
            data: parseInt(active),
            visualData: getVisualDataString(active)
        })
    }

    return (
        <FormControl>
            <FormLabel>Achievements</FormLabel>
            <RadioGroup value={active} onChange={handleChange}>
                {ValueToString.map(a => <FormControlLabel key={a.val} value={a.val} label={a.text} control={<Radio/>}/>)}
            </RadioGroup>
            <Button onClick={addFilter}>Add filter</Button>
            <Alert severity='error' sx={{display: (error === "") ? 'none' : 'inherit'}}>{error}</Alert>
        </FormControl>
    )
}