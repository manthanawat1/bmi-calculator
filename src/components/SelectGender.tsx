import { useState } from "react";
import BoyIcon from "@mui/icons-material/Boy";
import GirlIcon from "@mui/icons-material/Girl";
import { styled } from "@mui/material/styles";

interface GenderInterface {
  onGender: (data: string) => void;
}

function SelectGender({ onGender }: GenderInterface) {
  const [gender, setGender] = useState<string | null>(null);

  const selectGender = (gender: string) => {
    setGender(gender);
    onGender(gender);
  };

  return (
    <>
      <div className="pt-8 px-5">
        <CustomizedBoyIcon
          sx={{
            color: `${gender === "male" ? "#5403ce" : "#c7c7c7"}`,
          }}
          onClick={() => selectGender("male")}
        />
        <CustomizedGirlIcon
          sx={{
            color: `${gender === "female" ? "#5403ce" : "#c7c7c7"}`,
          }}
          onClick={() => selectGender("female")}
        />
      </div>
      <p className="text-dark-grey font-light">(Please Choose your gender!)</p>
    </>
  );
}

const CustomizedBoyIcon = styled(BoyIcon)`
  font-size: 9.375rem;

  & > path {
    transition: all 0.3s ease-in-out;
  }

  & > path:hover {
    cursor: pointer;
  }
`;

const CustomizedGirlIcon = styled(GirlIcon)`
  font-size: 9.375rem;

  & > path {
    transition: all 0.3s ease-in-out;
  }

  & > path:hover {
    cursor: pointer;
  }
`;

export default SelectGender;
