import './DropdownMenu.scss';
import React, { useEffect } from 'react';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

export const DropdownMenu = ({ names, setFilterBy }: { names: Array<string>; setFilterBy: any }) => {
  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      maxWidth: 300,
      textTransform: 'capitalize',
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    chip: {
      margin: 2,
    },
    noLabel: {
      marginTop: theme.spacing(3),
    },
  }));

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  function getStyles(name: string, categoryName: string[], theme: Theme) {
    return {
      textTransform: 'capitalize',
      fontWeight:
        categoryName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  const classes = useStyles();
  const theme = useTheme();
  const [categoryName, setCategoryName] = React.useState([]);
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const value: any = event.target.value
    const valueForFilter = value === "all" ? "" : value;
    setCategoryName(value);
    setFilterBy(valueForFilter);
    handleClose()
  };


  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id='demo-mutiple-name-label'>Category</InputLabel>
        <Select
          labelId='demo-mutiple-name-label'
          id='demo-mutiple-name'
          value={categoryName}
          open={open}
          onOpen={handleOpen}
          onChange={handleChange}
          input={<Input />}
          MenuProps={MenuProps}
        >
          <MenuItem value="all">
            <em>All</em>
          </MenuItem>
          {names?.map((name: string) => (
            <MenuItem
              key={name}
              value={name}
              // style={getStyles(name, categoryName, theme)}
            >
              {name}
            </MenuItem>
          ))}

        </Select>
      </FormControl>
    </div>
  );
};
