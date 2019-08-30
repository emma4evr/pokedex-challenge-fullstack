import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import {blue} from '@material-ui/core/colors'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'

const BlueCheckbox = withStyles({
  root: {
    color: blue[100],
    "&$checked": {
      color: blue[300]
    }
  },
  checked: {}
})(props => <Checkbox color="default" {...props} />);

export default function CheckboxLabels({
  label,
  checked,
  handleChange,
  action
}) {
  return (
    <FormControlLabel
      control={
        <BlueCheckbox
          checked={checked}
          onChange={() => handleChange(!checked, action)}
          value="checked"
        />
      }
      label={label}
    />
  );
}
