import React from "react";
import styled from "styled-components";

const HeaderWrapper = styled.header`
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  padding: 20px;
  width: 100vw;
  background: #292929;
  border-bottom: 3px solid #ff4500;
`;

const Header: React.FC = () => {
  return <HeaderWrapper>Movie List</HeaderWrapper>;
};

export default Header;
