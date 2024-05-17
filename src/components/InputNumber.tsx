import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/system";

interface InputNumberProps {
  onInputChange: (value: string) => void;
}

export default function FormPropsTextFields({
  onInputChange,
}: InputNumberProps) {
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <CustomizedTextField
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="filled"
          onChange={(e) => onInputChange(e.target.value)}
        />
      </div>
    </Box>
  );
}

const CustomizedTextField = styled(TextField)`
  & .MuiInputBase-input {
    padding: 0;
    height: 40px;
    font-family: "Prompt", sans-serif;
    font-weight: 300;
    font-size: 2rem;
    color: #5403ce;
    text-align: center;
  }
`;
