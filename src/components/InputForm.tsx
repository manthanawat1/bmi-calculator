import React from "react";
import SelectGender from "./SelectGender";
import BodyRatioField from "./BodyRatioField";
import Button from "./Button";
import BodyRatioInterface from "./BodyRatioInterface";

function InputForm() {
  const genderRef = React.useRef<string>("");
  const ratioRef = React.useRef<BodyRatioInterface>({});

  const handleGender = (gender: string) => {
    genderRef.current = gender;
  };

  const handleRatio = (ratios: BodyRatioInterface) => {
    ratioRef.current = ratios;
  };

  const getValue = () => {
    const gender = genderRef.current;
    const ratio = ratioRef.current;
    if (gender && ratio["height"] && ratio["weight"]) {
      return [genderRef.current, ratio];
    } else {
      alert("Please provide all values.");
      return undefined;
    }
  };

  return (
    <>
      <SelectGender onGender={handleGender} />
      <BodyRatioField onRatio={handleRatio} />
      <Button getValue={getValue} />
    </>
  );
}

export default InputForm;
