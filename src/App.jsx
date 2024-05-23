import Exchange from './components/exchange/Exchange'
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material';
import './App.css'
let theme = createTheme({
  palette: {
    primary: {
      main: '#607d8b',
    },
    secondary: {
      main: '#edf2ff',
    },
  },
});
function App() {


  return (
    <>
      <ThemeProvider theme={theme}>
        <Exchange />
      </ThemeProvider>
    </>
  )
}

export default App
