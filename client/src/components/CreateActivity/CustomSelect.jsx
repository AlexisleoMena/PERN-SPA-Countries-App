import React from "react";
import Select from "react-select";
let styles = {
  placeholder: (base) => ({
    ...base,
    fontSize: '1rem',
    color: "#06065051",
  }),
  control: (provided, state) => ({
    ...provided,
    backgroundColor: "#F4F9FC",
    textIndent: "5px",
    border: state.isFocused ? "2px solid #06065051 !important" : "1px solid #80808078 !important",
    boxShadow: 'none'
  }),
  option: (provided, state) => ({
    ...provided,
    fontWeight: state.isSelected ? "bold" : "normal",
    backgroundColor: state.isSelected ? "#060650c0" : "#F4F9FC",
    color: state.isSelected ? "#fff" : "#060650c0",
    fontSize: "17px",
  }),
  singleValue: (provided, state) => ({
    ...provided,
    color: "#060650c0",
    fontSize: "17px",
  }),
  multiValue: (provided, state) => ({
    ...provided,
    border: "1px solid #060650c0",
    borderRadius: "5px",
  }),
  multiValueLabel: (provided, state) => ({
    ...provided,
    backgroundColor: "#060650c0",
    color: "#fff",
    borderRadius: "0"
  }),
  multiValueRemove: (provided, state) => ({
    ...provided,
    color: "#eb1b1b",
    borderRadius: "0",
    ':hover': {
      backgroundColor: "#eb1b1b",
      color: 'white',
    }
  })
};

export const CustomSelect = ({ className, placeholder, field, form, options, isMulti = false }) => {
  const onChange = (option) => {
    form.setFieldValue(field.name, isMulti ? option.map((item) => item.value) : option.value);
  };
  const getValue = () => {
    if (options) {
      return isMulti
        ? options.filter(option => field.value.indexOf(option.value) >= 0)
        : options.find(option => option.value === field.value);
    }
    return isMulti ? [] : '';
  };
  return (
    <Select
      styles={styles}
      className={className}
      name={field.name}
      value={getValue() || null}
      onChange={onChange}
      placeholder={placeholder}
      options={options}
      isMulti={isMulti}
    />
  )
};
export default CustomSelect;