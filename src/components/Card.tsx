import React from "react";
import styled from "styled-components";

const CardWrapper = styled.div`
  background: #292929;
  padding: 10px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s;
  position: relative;
  cursor: pointer;
  min-width: 180px;
  max-width: 220px;

  &:hover {
    transform: scale(1.05);
  }
`;

const Image = styled.div<{ imageUrl?: string }>`
  width: 100%;
  aspect-ratio: 2 / 3;
  border-radius: 5px;
  background: ${({ imageUrl }) =>
    imageUrl ? `url(${imageUrl}) center/cover no-repeat` : "white"};
`;

const CardTitle = styled.h3`
  margin: 10px 0;
  font-size: 1rem;
`;

const Info = styled.p`
  font-size: 0.9rem;
  color: #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;

const Description = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  color: white;
  padding: 10px;
  border-radius: 8px;
  opacity: 0;
  transition: opacity 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: justify;
  font-size: 0.9rem;

  ${CardWrapper}:hover & {
    opacity: 1;
  }
`;

const extractYear = (dateString?: string | number): string => {
  if (!dateString) return "Desconhecido";
  if (typeof dateString === "number") return dateString.toString();
  const yearMatch = dateString.match(/\d{4}/);
  return yearMatch ? yearMatch[0] : "Desconhecido";
};

interface CardProps {
  movie: {
    name: string;
    posterPath?: string;
    releaseDate?: string;
    date?: number;
    score?: number;
    description?: string;
  };
}

const Card: React.FC<CardProps> = ({ movie }) => {
  return (
    <CardWrapper>
      <Image imageUrl={movie.posterPath} />
      <CardTitle>{movie.name}</CardTitle>
      <Info>📅 Lançamento: {extractYear(movie.releaseDate)}</Info>
      <Info>👀 Visto em: {extractYear(movie.date)}</Info>
      <Info>⭐ Nota: {movie.score?.toFixed(1) ?? "N/A"}</Info>
      <Description>{movie.description}</Description>
    </CardWrapper>
  );
};

export default Card;
