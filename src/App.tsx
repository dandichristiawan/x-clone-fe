import Router from "./router"
import TopBarProgress from 'react-topbar-progress-indicator';

TopBarProgress.config({
  barColors: {
    '0': '#139bf0',
    '1.0': '#139bf0',
  },
  shadowBlur: 5,
});


function App() {
  return <Router />
}

export default App
