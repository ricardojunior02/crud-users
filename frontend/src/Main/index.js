import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './styles.css';

import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';

import Logo from '../components/Logo';
import Footer from '../components/Footer';
import Nav from '../components/Nav';


const MainPage = props => {
  return (
    <BrowserRouter>
      <div className="app">
        <Logo />
        <Nav />
        <Routes />
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default MainPage;