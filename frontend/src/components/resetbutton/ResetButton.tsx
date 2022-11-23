import { Button } from "@mui/material";
import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { useStores } from "../../hooks";

export const ResetButton = observer(() => {
  const [showButton, setShowButton] = useState<boolean>(false);
  const { store } = useStores();

  useEffect(() => {
    setShowButton(store.enableResetButton);
  }, [store.enableResetButton]);

  const handleReset = () => {
    store.resetStores();
  };

  return (
    <div>
      {showButton && (
        <Button
          data-testid={"reset-button"}
          variant="outlined"
          color="error"
          sx={{
            width: {
              sx: 1,
              md: 0.1,
            },
            borderRadius: 1,
          }}
          onClick={handleReset}
        >
          Reset
        </Button>
      )}
    </div>
  );
});
