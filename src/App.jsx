import Exchange from './components/exchange/Exchange'
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material';
import './App.css'
let theme = createTheme({
  palette: {
    primary: {
      main: '#FFFFFF',
    },
    secondary: {
      main: '#edf2ff',
    },
  },
});
function App() {


  return (
    <>
      <div className='app'>
        <ThemeProvider theme={theme}>
          <Exchange />
        </ThemeProvider>
      </div>

    </>
  )
}

export default App
