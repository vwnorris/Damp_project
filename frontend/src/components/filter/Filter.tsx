import React, { useRef, useState } from 'react';
import { ExpandMore } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, Box, Card, Chip, Popover, Typography } from '@mui/material';
import { observer } from 'mobx-react';
import { useStores } from '../../hooks';
import { FilterSettings } from './FilterSettings';
import { IFilterData } from '../../types';

export const Filter = observer(() => {
    const { store } = useStores();
    const [activeFilter, setActiveFilter] = useState<string>("");

    const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
    const anchorRef = useRef<HTMLDivElement>(null);
    const open = Boolean(anchorEl);

    const [filterInfo, setFilterInfo] = useState<HTMLElement | null>(null);
    const openFilterInfo = Boolean(filterInfo);    


    const addFilter = (filter: string, data: IFilterData) => {
        store.filterStore.addFilter(filter, data);
        handleClose();
    }

    const removeFilter = (filter: string) => {
        store.filterStore.removeFilter(filter);
    }

    const handleClick = (event: React.MouseEvent<HTMLDivElement>, filter: string) => {
        setActiveFilter(filter);
        setAnchorEl(anchorRef.current);
    }

    const handleClose = () => {
        setAnchorEl(null);
        setActiveFilter("");
    }

    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>, filter: any) => {
        store.filterStore.selectFilter(filter)
        setFilterInfo(event.currentTarget);
      };
    
      const handlePopoverClose = () => {
        store.filterStore.unSelectFilter()
        setFilterInfo(null);
      };

    return (
        <Box>
           <Accordion data-testid="filters">
                <AccordionSummary expandIcon={<ExpandMore/>}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Typography variant='h5'>Filters</Typography> 
                        {Array.from(store.filterStore.activeFilters).map(a => <Chip data-testid={a.name+"Active"} sx={{margin: 0.5, backgroundColor: a.color, color: 'white'}} key={`${a.name}-activeDisplay`} label={a.name}/>)}
                    </Box>
                </AccordionSummary>
                <AccordionDetails>
                <Typography variant='h6'>All filters</Typography>
                    <Card sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        padding: 2
                    }} ref={anchorRef}>
                        {Array.from(store.filterStore.allFilters).map(a => 
                            <Chip 
                                sx={{margin: 0.5, backgroundColor: a.color, color: 'white'}} 
                                key={`${a.name}`} 
                                label={a.name} 
                                variant='filled' 
                                clickable
                                data-testid={a.name} 
                                onClick={(event) => handleClick(event, a.name)}
                                aria-owns={open ? 'mouse-over-popover' : undefined}
                                aria-haspopup="true"
                                onMouseEnter={(event) => handlePopoverOpen(event, a)}
                                onMouseLeave={handlePopoverClose}/>
                        )}
                    </Card>
                    <Typography variant='h6'>Active filters</Typography>
                    <Card sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        padding: 2
                    }}>
                        {Array.from(store.filterStore.activeFilters).length === 0 && <Chip label={"No filters added"}/>}
                        {Array.from(store.filterStore.activeFilters).map(a => <Chip sx={{margin: 0.5, backgroundColor: a.color, color: 'white'}} key={`${a.name}-active`} label={`${a.name} | ${a.data!.visualData}`} clickable onClick={() => removeFilter(a.name)}/>)}
                    </Card>
                    <Popover open={open} onClose={handleClose} anchorEl={anchorEl} anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}>
                        <FilterSettings filter={activeFilter} callBack={addFilter}/>
                    </Popover>
                    <Popover
                        id="mouse-over-popover"
                        sx={{ pointerEvents: 'none' }}
                        open={openFilterInfo}
                        anchorEl={filterInfo}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'center'}}
                        transformOrigin={{ vertical: 'top', horizontal: 'center'}}
                        onClose={handlePopoverClose}
                        disableRestoreFocus
                    >
                        <Typography variant='body2' sx={{p:2}}>{store.filterStore.selectedFilter?.description}</Typography>
                    </Popover>
                </AccordionDetails>
           </Accordion>
        </Box>
    )
});