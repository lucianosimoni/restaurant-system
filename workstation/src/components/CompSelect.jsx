import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useState } from 'react';
import { PropTypes } from 'prop-types';

/**
 * Returns a Material UI Select element with the desirable options.
 *
 * @param {string} title - The label of the selector element
 * @param {array} items - List of Objects containing *t* (title) and *v* (value)
 * @param {"filled"|"standard"} variant - Can be 'filled' or 'standard'.
 */
export default function CompSelect({ title, items, variant }) {
  const [selection, setSelection] = useState('');

  const handleChange = (e) => {
    setSelection(e.target.value);
  };

  return (
    <FormControl fullWidth variant={variant}>
      <InputLabel id="demo-simple-select-label">{title}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selection}
        label={title}
        onChange={handleChange}
      >
        {items &&
          items.map((item, i) => (
            <MenuItem value={item.v} key={i}>
              {item.t}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
}

CompSelect.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      t: PropTypes.string.isRequired,
      v: PropTypes.string.isRequired,
    }),
  ).isRequired,
  variant: PropTypes.oneOf(['filled', 'standard']).isRequired,
};
