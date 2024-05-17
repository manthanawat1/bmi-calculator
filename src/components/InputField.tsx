import InputNumber from "./InputNumber";

interface InputInterface {
  text: string;
  unit: string;
  getData: (data: [string, string]) => void;
}

function Input({ text, unit, getData }: InputInterface) {
  const handleInputChange = (value: string) => {
    getData([text, value]);
  };

  return (
    <div>
      <InputNumber onInputChange={handleInputChange} />
      <div className="text-4xl font-extralight pt-8">
        <span>{text}</span>
        <span className="text-dark-grey">&nbsp;({unit})</span>
      </div>
    </div>
  );
}

export default Input;
