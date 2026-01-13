
import Button from "./components/atoms/Button";
import CheckBox from "./components/atoms/CheckBox";
import { Icon } from "./components/atoms/Icons/Icon";
import Input from "./components/atoms/Input";
import RadioButton from "./components/atoms/RadioButton";
import StepCircle from "./components/atoms/StepCircle";

export default function Home() {
  return (
    <main>
      <div className="flex flex-col gap-4 p-8">
        <Input placeholder="Email" type="email" />
      <Input as="textarea" placeholder="Your message" rows={6} />
      <Input
        as="select"
        placeholder="Select an option"
        options={[
          { label: "Option 1", value: "option1" },
          { label: "Option 2", value: "option2" },
        ]}
      />
      </div>
      <CheckBox label="Accept Terms" />
      <RadioButton label="Option A" name="options" value="A" />
      <Button variant="primary">Submit</Button>

  </main>
  );
}
