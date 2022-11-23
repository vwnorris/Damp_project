import {
  Box,
  Button,
  Popover,
  TextField,
  Typography,
} from "@mui/material";
import { observer } from "mobx-react";
import React, { useEffect, useRef, useState } from "react";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { useStores } from "../../hooks";
import "../../App.css";
import CloseIcon from '@mui/icons-material/Close';


export const Search = observer(() => {
  
  const [openHelper, setOpenHelper] = useState<boolean>(false);
  const helperRef = useRef<HTMLDivElement>(null);

  const [openResetSearch, setOpenResetSearch] = useState<boolean>(false);
  
  const { store } = useStores();


  useEffect(() => {
    if (store.dataStore.searchString.length > 0) {
      setOpenResetSearch(true);
    } else {
      setOpenResetSearch(false);
    }
  }, [store.dataStore.searchString.length]);


  const handleOpenHelper = () => {
    setOpenHelper(true);
  };

  const handleCloseHelper = () => {
    setOpenHelper(false);
  };

  const handleClickOpen = () => {
    setOpenHelper(!openHelper);
  };


  const handleResetSearch = () => {
    store.dataStore.setSearchString("");
    store.dataStore.reloadData();
  };


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value !== "") {  
      setOpenResetSearch(true);
    } else {
      setOpenResetSearch(false);
    }
    store.dataStore.setSearchString(event.target.value);
    store.dataStore.reloadData();
  };

  return (
    <Box sx={{ my: 1, width: 1, display: "flex", flexDirection: "row" }}>
      <TextField
        data-testid="searchBox"
        sx={{ flexGrow: 1 }}
        value={store.dataStore.searchString}
        onChange={handleChange}
        InputProps={{
          endAdornment: (
            <div className="parent">
              
               {openResetSearch && <Button
                  data-testid="reset-search"
                  className="child"
                  sx={{ width: "fit-content", marginTop: 0}}
                  onClick={handleResetSearch}
                >
                  <CloseIcon />
                </Button>}
              
              <Typography
                className="child"
                sx={{ width: "fit-content", marginTop: 0.8  }}
                ref={helperRef}
                onClick={handleClickOpen}
                onMouseEnter={handleOpenHelper}
                onMouseLeave={handleCloseHelper}
              >
                <HelpOutlineIcon />
              </Typography>
            </div>
          ),
        }}
        label="search"
      />
      <Popover
        id="search-helper"
        sx={{ pointerEvents: "none" }}
        open={openHelper}
        anchorEl={helperRef.current}
        onClose={handleCloseHelper}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Typography variant="body2" sx={{ p: 2 }} onClick={handleCloseHelper}>
          You can search by game name, developer, or publisher
        </Typography>
      </Popover>
    </Box>
  );
});
