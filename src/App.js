import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes';
import ScrollTop from './components/ScrollTop';

const App = () => (
  <Router>
    <ScrollTop />
    <Routes />
  </Router>
);

export default App;
