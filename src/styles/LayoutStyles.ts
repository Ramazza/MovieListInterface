import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  padding-bottom: 20px;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  width: 90%; 
  max-width: 1400px; 
  margin: auto; 
  padding-top: 20px;
`;

export const Button = styled.button`
  margin-top: 20px;
  padding: 12px 24px;
  font-size: 1rem;
  border: none;
  background: #ff4500;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: 0.3s;
  &:hover {
    background: #e03c00;
  }
`;
