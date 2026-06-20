import React from "react";
import { useToken } from "../../hooks/useToken";

const Header = () => {
  const { logout } = useToken();
  return (
    <div>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Header;
