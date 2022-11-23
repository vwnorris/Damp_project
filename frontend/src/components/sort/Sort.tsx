import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack } from '@mui/material';
import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { useStores } from '../../hooks';
import { SortType } from '../../types';
import { ResetButton } from '../resetbutton';

export const Sort = observer(() => {

    const [type, setType] = useState<string>("NONE");
    const [ascending, setAscending] = useState<string>("ascending");
    const [sortButtonDisabled, setSortButtonDisabled] = useState<boolean>(true);

    const { store } = useStores();

    useEffect(() => {
        // store.dataStore.setSort(SortType[type as keyof typeof SortType], (ascending === "ascending") ? true : false);
        
        if (store.dataStore.sort.type === SortType.NONE) {
            setSortButtonDisabled(true);
        }
        else {
            setSortButtonDisabled(false);
        }
    }, [store.dataStore.sort.type]);

    const handleChangeType = (event: SelectChangeEvent) => {
        setType(event.target.value);
        store.dataStore.setSort(SortType[event.target.value as keyof typeof SortType], (ascending === "ascending") ? true : false);
    }

    const handleChangeAscending = (event: SelectChangeEvent) => {
        setAscending(event.target.value);
        store.dataStore.setSort(SortType[type as keyof typeof SortType], (event.target.value === "ascending") ? true : false);
    }

    const applySort = () => {
        store.dataStore.setSort(SortType[type as keyof typeof SortType], (ascending === "ascending") ? true : false);
        store.dataStore.reloadData();
    }

    

    return (
        <Stack gap={0} direction="column">
            <Stack gap={1} direction='row' sx={{my: 2, width: 1}}>
                <FormControl data-testid={"type-dropdown"}>
                    <InputLabel data-testid={"5134"} id="typeLabel">Type</InputLabel>
                    <Select data-testid={"1942"} id="typeSelect" labelId="typeLabel" value={store.dataStore.sort.type} label="type" onChange={handleChangeType}>
                        <MenuItem data-testid={"none-dropdown"} value={SortType.NONE}>None</MenuItem>
                        <MenuItem data-testid={"name-dropdown"} value={SortType.NAME}>Name</MenuItem>
                        <MenuItem value={SortType.RELEASEDATE}>Release date</MenuItem>
                        <MenuItem value={SortType.PRICE}>Price</MenuItem>
                    </Select>
                </FormControl>
                <FormControl>
                    <InputLabel id="howLabel">How</InputLabel>
                    <Select id="howSelect" labelId="typehowLabelLabel" value={store.dataStore.sort.ascending === true ? "ascending" : "descending"} label="type" onChange={handleChangeAscending}>
                        <MenuItem value={"ascending"}>Ascending</MenuItem>
                        <MenuItem value={"descending"}>Descending</MenuItem>
                    </Select>
                </FormControl>
                <Button data-testid={"sort-button"} disabled={sortButtonDisabled} variant='outlined' sx={{backgroundColor: "#BEBEBE"}} onClick={applySort}>Sort</Button>
            </Stack>
            <ResetButton/>
        </Stack>
    )
})