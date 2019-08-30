import React, {useState} from 'react'
import Downshift from 'downshift'
import TextField from '@material-ui/core/TextField'
import Popper from '@material-ui/core/Popper'
import Paper from '@material-ui/core/Paper'
import Fade from '@material-ui/core/Fade'
import Typography from '@material-ui/core/Typography'

import './style.css'

const SearchBox = (props) => {
  const {items, handleSearchEvent} = props
  const [anchorEl, setAnchorEl] = useState(null);

  function handleClick(event) {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  }

  return (
    <Downshift
      onChange={selection => {
        if (selection) {
          handleSearchEvent(selection.name)
        } else {
          alert('selection cleared')
        }
      }}
      itemToString={item => (item ? item.name.toLowerCase() : '')}
    >
      {({
        getInputProps,
        getItemProps,
        getLabelProps,
        getMenuProps,
        isOpen,
        inputValue,
        highlightedIndex,
        selectedItem,
      }) => {
        const id = isOpen ? 'simple-popper' : undefined
        return (
          <div onClick={handleClick}>
            <TextField
              {...getInputProps()}
              id="outlined-name"
              label="Name"
              className="SearchBox"
              value={inputValue}
              margin="normal"
              variant="outlined"
            />
            {isOpen
              ?
              <Popper id={id} open={isOpen} anchorEl={anchorEl} placement="bottom" transition>
                {({TransitionProps}) => (
                  <Fade {...TransitionProps} timeout={350}>
                    <Paper square style={{marginTop: '9.25em', width: '11.5em'}}>
                      {items
                        .filter(item => !inputValue || item.name.toLowerCase().includes(inputValue.toLowerCase()))
                        .map((item, index) => (
                          <Typography className="Suggestion">
                            <div
                              {...getItemProps({
                                key: item.name,
                                index,
                                item,
                              })}
                            >
                              {item.name}
                            </div>
                          </Typography>
                        ))
                      }
                    </Paper>
                  </Fade>
                )}
              </Popper>
              : null
            }
          </div>
        )
      }}
    </Downshift>
  )
}

export default SearchBox
