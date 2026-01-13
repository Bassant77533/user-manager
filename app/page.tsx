

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
 import { ColumnDef } from '@tanstack/react-table'
import { DataTable } from "./components/organisms/Table";
 import InterestsSelect from "./components/molecules/InterestsSelect";
import CategorySelect from "./components/molecules/CategorySelect";
import CountrySelect from "./components/molecules/CountrySelect";
import TagsSelect from "./components/molecules/TagsSelect";
import SingleSelect from "./components/molecules/SingleSelect";
import SuccessModal from "./components/pages/SuccessModal";
import CountrySelectClient from "./components/molecules/CountrySelect";

type User = {
  name: string
  email: string
}

export const userColumns: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
]
 export default function Home() {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    country: ''
  })
    const [tags, setTags] = useState<string[]>([])

  const [interests, setInterests] = useState<string[]>([])
  const [category, setCategory] =  useState('technology')
const [country, setCountry] = useState<string>()

  const [gender, setGender] = useState('')
const data = [
  { name: 'Mohamed', email: 'mo@example.com' },
  { name: 'Nada', email: 'nada@example.com' },
]
  return (
    <main> 
 
    <InterestsSelect
      label="Interests"
      value={interests}
      onChange={setInterests}
      max={3}
      options={[
        { label: 'Technology', value: 'technology' },
        { label: 'Design', value: 'design' },
        { label: 'Business', value: 'business' },
        { label: 'Marketing', value: 'marketing' },
        { label: 'Art', value: 'art' },
      ]}
    />
      <CategorySelect
      label="Category"
      value={category}
      onChange={setCategory}
      options={[
        { label: 'Technology', value: 'technology' },
        { label: 'Design', value: 'design' },
        { label: 'Business', value: 'business' },
        { label: 'Marketing', value: 'marketing' },
        { label: 'Education', value: 'education' },
      ]}
    />


         <CountrySelect
          label="Country of Residence"
          value={formData.country}
          onChange={(country) => setFormData({...formData, country})}
          placeholder="Select your country"
        />
<TagsSelect
      label="Tags"
      value={tags}
      onChange={setTags}
      options={[
        { label: 'Urgent', value: 'urgent' },
        { label: 'Important', value: 'important' },
        { label: 'Bug', value: 'bug' },
        { label: 'Feature', value: 'feature' },
        { label: 'Enhancement', value: 'enhancement' },
      ]}
    />

     <SingleSelect
      label="Gender *"
      value={gender}
      onChange={setGender}
      options={[
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' },
      ]}
    />

    const [open, setOpen] = React.useState(false)

<>
  <Button
    variant="primary"
    onClick={() => setOpen(true)}
  >
    Add User
  </Button>

  <SuccessModal
    open={open}
    onClose={() => setOpen(false)}
    onConfirm={() => {
      setOpen(false)
    }}
  />
</>

  </main>
  );
}
