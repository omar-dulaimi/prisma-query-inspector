import React, { FC } from "react";
import "./Header.css";

interface HeaderProps {}

const Header: FC<HeaderProps> = () => (
  <div className="header">
    <a href="#default" className="logo">
      Prisma Query Inspector
    </a>
  </div>
);

export default Header;
