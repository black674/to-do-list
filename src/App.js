import './App.css';
import CardContainer from './components/TodoList';
import { ThemeProvider,createTheme } from '@mui/material/styles';
import { green } from '@mui/material/colors';


const theme = createTheme({
  palette: {
    primary: {
      main: '#262F89',
    },
    secondary: {
      main: green[500],
    },
    buttons: {
      main: '#FF0000'
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
    <div className="App">
      <CardContainer />
    </div>
    </ThemeProvider>
  );
}

export default App;
