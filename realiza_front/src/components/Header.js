import React, { useState, useContext } from 'react';
import { CiMail } from "react-icons/ci";
import { IoIosNotifications } from "react-icons/io";
import { IoIosSearch } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Header = () => {
    const [searchText, setSearchText] = useState('');
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleProfileClick = () => {
        if (user) {
            navigate('/perfil');
          } else {
            navigate('/login');
          }
    };
    return (
        <header className="flex items-center justify-end p-4 bg-[#F5F6FB]">
            <div className="flex items-center space-x-4">
                <div className="relative w-96">
                    <input
                        type="text"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        placeholder="Buscar"
                        className="pl-10 pr-4 py-2 rounded-full border-2 border-gray bg-[#F5F6FB] text-gray-500 focus:outline-none w-full"
                    />
                    {!searchText && (
                        <IoIosSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    )}
                </div>
                {/* 
<<<<<<< HEAD
                <Link to="/" className="text-xl font-bold text-[#DDEAF3]">
                    Redgenera AgroMaule
                </Link>
            </div>
=======
 */}
{/* >>>>>>> origin/frontv2 */}

                <div className="flex space-x-4 items-center">
                <div className="w-8 h-8 border-2 border-gray rounded-full flex items-center justify-center cursor-pointer">
                        <IoIosNotifications className="text-black" />
                    </div>
                    <div className="w-8 h-8 border-2 border-gray rounded-full flex items-center justify-center cursor-pointer">
                        <CiMail className="text-black" />
                    </div>

                    <div className="w-0.5 h-8 bg-gray-400"></div>
                    {/* Este es el div que redirige al login al hacer clic */}
                    <div
                        className="w-8 h-8 bg-gray-400 rounded-full cursor-pointer"
                        onClick={handleProfileClick}
                    ></div>
                    <div className="text-xl font-regular text-black cursor-pointer" onClick={handleProfileClick}>{user ? `Bienvenido, ${user.nombre}` : "Login"}</div>
                </div>
            </div>
        </header>
    );
};

export default Header;

