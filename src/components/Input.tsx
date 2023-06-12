import {forwardRef} from 'react' // allows this component to recieve a "ref" and pass it to a child component (in this case, the TextField)
import {TextField} from '@mui/material'

interface InputType {
    name: string,
    placeholder: string
}

const Input = forwardRef((props: InputType, ref) => {
  return (
    <TextField
        variant="outlined"
        margin="normal"
        inputRef={ref}
        fullWidth={true}
        type="text"
        {...props} // <--- "spread operator"
    >
    </TextField>
  )
})

export default Input
