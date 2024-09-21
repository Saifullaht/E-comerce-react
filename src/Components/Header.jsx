import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from './Button';
import { ThemeContext } from "../Contaxt/ThemeContaxt";
import { signOut } from 'firebase/auth';
import { auth } from '././utils/firebase';
import { UserContext } from '../Contaxt/UserContaxt';

function Header() {
  const { user } = useContext(UserContext);
  const { theme, setTheme } = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);
  const goToHomePage = () => navigate("/");

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleSignOut = async () => {
      await signOut(auth);
      navigate("/");
      console.log("logout hai ya nahi", handleSignOut);
      
    
  };

  const themeClasses = theme === 'light'
    ? 'text-black bg-gray-300'
    : 'text-white bg-gray-900';

  return (
    <header className={`${themeClasses} body-font`}>
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-blue-500 hover:text-blue-300">
            <img
              src="https://cdn-icons-png.flaticon.com/128/3146/3146124.png"
              alt="Logo"
              className="w-10 h-10"
            />
          </Link>
          <button
            onClick={goToHomePage}
            className="hidden md:block bg-gray-500 text-white px-4 py-2 rounded text-sm hover:bg-gray-700 focus:outline-none">
            Go Back Home
          </button>
        </div>
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="hover:text-blue-400">Home</Link>
          <Link to="/Weather" className="hover:text-blue-400">Weather</Link>
          <Link to="/BuyProduct" className="hover:text-blue-400">Buy Product</Link>
          <Link to="/Box" className="hover:text-blue-400">Customize Box</Link>

          {user.isLogin ? (
            <div className="flex items-center">
              <Link to="/Profile" className="mx-2">{user.username}</Link>
              <Button content={"Sign Out"} onClick={handleSignOut} />
            </div>
          ) : (
            <Link to="/LoginUp" className="rounded-lg block px-4 py-2 hover:text-blue-400">Login</Link>
          )}

          <Button
            content={theme === 'dark' ? 'Light' : 'Dark'}
            onClick={toggleTheme}
          />
        </div>
        <button className="md:hidden text-gray-400 focus:outline-none" onClick={toggleMenu}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className={`md:hidden ${theme === 'light' ? 'bg-gray-300' : 'bg-gray-800'} ${theme === 'light' ? 'text-black' : 'text-white'}`}>
          <Link to="/" className="block px-4 py-2 hover:bg-blue-700">Home</Link>
          <Link to="/Weather" className="block px-4 py-2 hover:bg-blue-700">Weather</Link>
          <Link to="/BuyProduct" className="block px-4 py-2 hover:bg-blue-700">Buy Product</Link>
          <Link to="/Box" className="block px-4 py-2 hover:bg-blue-700">Customize Box</Link>

          {user.isLogin ? (
            <div className="flex items-center">
              <Link to="/Profile" className="mx-2">{user.username}</Link>
              <Button content={"Sign Out"} onClick={handleSignOut} />
            </div>
          ) : (
            <Link to="/LoginUp" className="rounded-lg block px-4 py-2 hover:text-blue-400">Login</Link>
          )}

          <Button
            content={theme === 'dark' ? 'Light' : 'Dark'}
            onClick={toggleTheme}
          />
          <button
            onClick={goToHomePage}
            className="bg-gray-500 text-white px-4 py-2 rounded w-full text-sm hover:bg-gray-700 mt-2">
            Go Back Home
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;