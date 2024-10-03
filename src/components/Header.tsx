import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

const Header: React.FC = () => {
  const router = useRouter();
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const isActive = (pathname: string) => router.pathname === pathname;

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
    toggleSearch();
  };

  return (
    <header className="header-v4">
      <div className="container-menu-desktop ">
        <div className="top-bar fixed-top"></div>
        <div className="wrap-menu-desktop how-shadow1">
          <nav className="limiter-menu-desktop container">
            <Link href="/">
              <a className="logo">
                <img src="/images/icons/logo-01.png" alt="IMG-LOGO" />
              </a>
            </Link>

            <div className="menu-desktop">
              <ul className="main-menu">
                <li className={isActive("/") ? "active-menu" : ""}>
                  <Link href="/">
                    <a>Home</a>
                  </Link>
                </li>

                <li className={isActive("/shop") ? "active-menu" : ""}>
                  <Link href="/shop">
                    <a>Shop</a>
                  </Link>
                </li>

                <li className={isActive("/blog") ? "active-menu" : ""}>
                  <Link href="/blog">
                    <a>Blog</a>
                  </Link>
                </li>

                <li className={isActive("/about") ? "active-menu" : ""}>
                  <Link href="/about">
                    <a>About</a>
                  </Link>
                </li>
              </ul>
            </div>

            <div className="wrap-icon-header flex-w flex-r-m h-full">
              <div className="flex-c-m h-full p-r-24">
                {/* Search Toggle */}
                <div className="icon-header-item cl2 hov-cl1 trans-04 p-lr-11" onClick={toggleSearch}>
                  <i className="zmdi zmdi-search"></i>
                </div>
              </div>
            </div>
          </nav>
        </div>
        {/* Search Modal */}
        <div
          className={`modal-search-header flex-c-m trans-04 ${
            searchVisible ? "show-modal-search" : ""
          } js-hide-modal-search`}>
          <div className="container-search-header">
            <button className="flex-c-m btn-hide-modal-search trans-04" onClick={toggleSearch}>
              <img src="/images/icons/icon-close2.png" alt="CLOSE" />
            </button>

            <form className="wrap-search-header flex-w p-l-15" onSubmit={handleSearchSubmit}>
              <button className="flex-c-m trans-04">
                <i className="zmdi zmdi-search"></i>
              </button>
              <input
                className="plh3"
                type="text"
                name="search"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
