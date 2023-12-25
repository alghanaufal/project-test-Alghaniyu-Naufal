import React, {useState, useEffect} from 'react';
import { Link, useLocation } from 'react-router-dom';

const Nav = () => {
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
        const currentScrollPos = window.scrollY;
        const isScrollingDown = currentScrollPos < prevScrollPos;

        setVisible(isScrollingDown);

        setPrevScrollPos(currentScrollPos);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
        window.removeEventListener("scroll", handleScroll);
        };
    }, [prevScrollPos]);

    const isAtTop = window.scrollY === 0;
    
    const location = useLocation();
    const getNavLinkClass = (path) => {
    const isActive = location.pathname === path;
    return isActive
    ? 'border-b-2 border-white-600 pb-1 transition cursor-pointer'
    : 'hover:text-white hover:border-white hover:border-b-2 transition cursor-pointer';
    };

    return (
        <div>
        <nav
        className={`bg-orange-500 z-50 fixed w-full transition-all duration-300 ${
            visible ? "opacity-100" : "opacity-0"
        } ${isAtTop ? "opacity-100" : ""}`}>
        <div className="h-10hz flex justify-between z-50 text-white lg:py-5 px-20 px-20 py-4 flex-1">
            <div className="flex items-center flex-1">
            <img className='h-8 w-auto' src="./logo.png" alt="" />
            </div>
            <div className="lg:flex md:flex lg: flex-1 items center justify-end font-normal hidden">
            <div className="flex-10">
                <ul className="flex gap-8 mr-16 text-[18px]">
                <Link to="/" className={getNavLinkClass('/')}>
                    <li>Work</li>
                </Link>
                <Link to="/about" className={getNavLinkClass('/about')}>
                    <li>About</li>
                </Link>
                <Link to="/services" className={getNavLinkClass('/services')}>
                    <li>Services</li>
                </Link>
                <Link to="/ideas" className={getNavLinkClass('/ideas')}>
                    <li>Ideas</li>
                </Link>
                <Link to="/careers" className={getNavLinkClass('/careers')}>
                    <li>Careers</li>
                </Link>
                <Link to="/contact" className={getNavLinkClass('/contact')}>
                    <li>Contact</li>
                </Link>
                </ul>
            </div>
            </div>
        </div>
        </nav>
        </div>
    );
};

export default Nav;
