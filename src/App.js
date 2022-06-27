import "./App.css";
import ThreeJs from "./threeJsComponents";
import HtmlContainer from "./htmlComponents";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import useStore from "./zoustan";

const randomColor = () => {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  return "#" + randomColor;
};

const createData = (name, count) => {
  return { name, count, color: randomColor() };
};

const shuffleArray = (array) => {
  let resultArray = array.sort(function () {
    return Math.random() - 0.5;
  });

  for (let i = 0; i < 10; i++) {
    resultArray = resultArray.sort(function () {
      return Math.random() - 0.5;
    });
  }

  return resultArray;
};

function App() {
  const setIsFocused = useStore((state) => state.setIsFocused);
  const setIsSpinning = useStore((state) => state.setIsSpinning);
  return (
    <>
      <ThreeJs />
      <Box
        style={{
          position: "absolute",
          right: 0,
          top: 5,
          zIndex: 3,
          padding: "10px 20px",
          background: "rgba(228, 228, 228, 0.95)",
          borderRadius: "8px",

          height: "94vh",
          overflow: "scroll",
        }}
      >
        <HtmlContainer />
      </Box>
      <Box
        style={{
          display: "flex",
          position: "absolute",
          left: "20px",
          bottom: "20px",
          zIndex: 3,
          width: "600px",
          gap: "10px",
        }}
      >
        <Button
          onClick={setIsFocused}
          variant="contained"
          color="success"
          style={{
            marginLeft: "0px !important",
            marginRight: "0px !important",
            width: "100%",
            fontFamily: "Saira Stencil One",
            fontSize: "20px",
          }}
        >
          Focus On Winner
        </Button>
        <Button
          onClick={() => setIsSpinning(true)}
          variant="contained"
          color="success"
          style={{
            marginLeft: "0px !important",
            marginRight: "0px !important",
            width: "100%",
            fontFamily: "Saira Stencil One",
            fontSize: "20px",
          }}
        >
          Spin The Wheel
        </Button>
      </Box>
    </>
  );
}

export default App;
