import React from "react";
import { styled } from "@mui/system";

import InputField from "./InputField";
import BodyRatioInterface from "./BodyRatioInterface";

const RatiosForm = [
  { text: "height", unit: "cm" },
  { text: "weight", unit: "kg" },
];

interface RatioInterface {
  onRatio: (data: BodyRatioInterface) => void;
}

function BodyRatioField({ onRatio }: RatioInterface) {
  const [ratios, setRatios] = React.useState<BodyRatioInterface>({
    height: null,
    weight: null,
  });

  const getRatios = ([key, value]: string[]) => {
    setRatios((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  React.useEffect(() => {
    onRatio(ratios);
  });

  return (
    <div className="pt-16 px-5 flex justify-center md:pt-8">
      <CustomContainer className="flex flex-col justify-center max-w-xs md:flex-row md:max-w-xs">
        {RatiosForm.map(({ text, unit }, index) => (
          <InputField
            key={index}
            text={text}
            unit={unit}
            getData={getRatios}
          />
        ))}
      </CustomContainer>
    </div>
  );
}

const CustomContainer = styled("div")(`
  gap: 18rem;

  @media (max-width: 48em) {
    gap: 4rem;
  }
`);

export default BodyRatioField;
