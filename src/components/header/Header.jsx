import './header.css';
import { useNavigate } from 'react-router-dom';

// klickar man på headern navigeras man tillbaks till landing pagens url
const Header = () => {
  const navigateTo = useNavigate();
  
  return (
    <header>
        <h2 onClick={() => navigateTo(`/`)}>The Board App</h2>
    </header>
  )
}

export default Header