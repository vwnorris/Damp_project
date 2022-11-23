import React from 'react';
import { Box } from '@mui/material';
import { FilterSettingsAchievements, FilterSettingsGenre, FilterSettingsPopularTags, FilterSettingsPrice, FilterSettingsReleaseDate } from './FilterSettingTypes';
import { IFilterData } from '../../types';

export const FilterSettings = (props: {filter: string, callBack: (filter: string, data: IFilterData) => void}) => {

    const handleChangeFilter = (data: IFilterData) => {
        props.callBack(props.filter, data);
    }

    return (
        <Box sx={{
            maxWidth: "350px",
            width: 0.9,
            minWidth: '250px',
            padding: 2,
            overflow: "hidden"
        }}>
            {props.filter === "Genre" && <FilterSettingsGenre setFilterData={handleChangeFilter}/>}
            {props.filter === "Price" && <FilterSettingsPrice setFilterData={handleChangeFilter}/>}
            {props.filter === "ReleaseDate" && <FilterSettingsReleaseDate setFilterData={handleChangeFilter}/>}
            {props.filter === "Achievements" && <FilterSettingsAchievements setFilterData={handleChangeFilter}/>}
            {props.filter === "Tags" && <FilterSettingsPopularTags setFilterData={handleChangeFilter}/>}
        </Box>
    )
}