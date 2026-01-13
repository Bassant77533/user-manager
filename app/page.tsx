

"use client"; 
import { useState } from "react";
import Button from "./components/atoms/Button";
import CheckBox from "./components/atoms/CheckBox";
import { Icon } from "./components/atoms/Icons/Icon";
import Input from "./components/atoms/Input";
import RadioButton from "./components/atoms/RadioButton";
import StepCircle from "./components/atoms/StepCircle";
import InputField from "./components/molecules/InputField";
import CheckboxGroup from "./components/molecules/CheckboxGroup";
import RadioGroup from "./components/molecules/RadioButtonGroup";
import ProgressBar from "./components/organisms/ProgressBar";
 export default function Home() {
  const [interests, setInterests] = useState<string[]>([])
  const [gender, setGender] = useState('')

  return (

    <main>
  <InputField
  label="Email Address"
  type="email"
  placeholder="you@example.com"
  helperText="We'll never share your email."
  leftIcon={<Icon name="mail" />}
/>

<InputField
  label="Password"
  type="password"
  placeholder="••••••••"
  error="Password must be at least 8 characters."
  leftIcon ={<Icon name="mail" />}
/>


<CheckboxGroup
  label="Select your interests"
  options={[
    'Technology',
    'Design',
    'Business',
    'Marketing',
    'Other',
  ]}
  values={interests}
  onChange={setInterests}
/>

<RadioGroup
  label="Select your gender"
  name="gender"
  options={[
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
  ]}
  value={gender}
  onChange={setGender}
/>

<Button variant="secondary" icon="eye">main</Button>


 <ProgressBar
  steps={[
    { id: 1, title: 'Personal Info' },
    { id: 2, title: 'Preferences' },
    { id: 3, title: 'Review' },
  ]}
  currentStep={2}
/>
  </main>
  );
}
