import { Box } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { ChangeEvent, useState } from 'react';
import CustomTextField from '../CustomTextField';

export interface IOption {
  id?: string;
  label: string;
  value: string | any;
}

interface IOptions {
  options: IOption[];
  placeholder: string;
  value?: string | undefined;
  onChange?: (e: ChangeEvent<any>) => void;
  error?: boolean | undefined;
  helperText?: string | false | undefined;
  name?: string;
  handleSelected: (value: string) => void;
  onBlur?: () => void;
  disabled?: boolean;
}

const Select = ({
  options,
  placeholder,
  error,
  helperText,
  name,
  handleSelected,
  onBlur,
  disabled,
}: IOptions) => {
  const [inputValue, setInputValue] = useState('');

  return (
    <Autocomplete
      id="select"
      fullWidth
      options={options}
      autoHighlight
      onBlur={onBlur}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        const findId = options.find((elem) => elem.label === newInputValue);
        setInputValue(newInputValue);
        handleSelected(findId?.value!);
      }}
      isOptionEqualToValue={(option: any, value) =>
        option.value === value.value
      }
      getOptionLabel={(option) => option.label}
      disabled={disabled}
      renderOption={(props, option) => (
        <Box
          component="li"
          sx={{ fontSize: 15, '& > span': { mr: '10px', fontSize: 18 } }}
          {...props}
        >
          {option.label}
        </Box>
      )}
      renderInput={(params) => (
        <CustomTextField
          {...params}
          name={name}
          error={error}
          helperText={helperText}
          placeholder={placeholder}
          autoComplete="off"
          inputProps={{
            ...params.inputProps,
            autoComplete: 'off',
          }}
        />
      )}
    />
  );
};

export default Select;
