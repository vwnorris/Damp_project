import React, { useEffect, useState } from "react";
import ArrowCircleUpRoundedIcon from "@mui/icons-material/ArrowCircleUpRounded";

export const BackToTopButton = (props: {darkmode?: boolean}) => {
  const [backToTopButton, setBackToTopButton] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 600) {
        setBackToTopButton(true);
      } else {
        setBackToTopButton(false);
      }
    });
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setBackToTopButton(false);
  };

  return (
    <div data-testid="back-to-top"
      style={{
        position: "fixed",
        bottom: "20px",
        right: "50%",
      }}
    >
      {backToTopButton && (
        <ArrowCircleUpRoundedIcon
          data-testid="ArrowIcon"
          onClick={scrollToTop}
          sx={{
            backgroundColor: props.darkmode ? '#121212': 'white',
            borderRadius: "50%",
            width: 50,
            height: 50,
            '&:hover': {
              cursor: 'pointer'
            }
          }}
        />
      )}
    </div>
  );
};
