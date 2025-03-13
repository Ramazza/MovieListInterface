import React, { useState } from "react";
import styled from "styled-components";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalContent = styled.div`
  background: #1c1c1c;
  padding: 20px;
  border-radius: 10px;
  width: 90%;
  max-width: 600px;
  color: white;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  position: relative;
`;

// 🔥 Impede que o clique dentro do modal feche ele
const ModalInner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: red;
  color: white;
  border: none;
  padding: 5px 10px;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: darkred;
  }
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 10px;
`;

const Info = styled.p`
  margin: 5px 0;
  font-size: 1rem;
`;

const OpinionInput = styled.textarea`
  width: 100%;
  height: 80px;
  margin-top: 10px;
  padding: 10px;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  outline: none;
  resize: none;
`;

const SaveButton = styled.button`
  width: 100%;
  margin-top: 10px;
  padding: 10px;
  font-size: 1rem;
  background: #ff4500;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: 0.3s;

  &:hover {
    background: #e03c00;
  }
`;

interface MovieModalProps {
  movie: {
    name: string;
    director?: string;
    actors?: string[];
    duration?: number;
    imdbRating?: number;
    description?: string;
    opinion?: string;
  };
  isOpen: boolean;
  onClose: () => void;
  onSaveOpinion: (opinion: string) => void;
}

const MovieModal: React.FC<MovieModalProps> = ({ movie, isOpen, onClose, onSaveOpinion }) => {
  const [opinion, setOpinion] = useState(movie.opinion || "");

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}> {/* ⛔ Impede propagação */}
        <CloseButton onClick={onClose}>X</CloseButton>
        <ModalInner>
          <Title>{movie.name}</Title>
          <Info>🎬 Diretor: {movie.director || "Desconhecido"}</Info>
          <Info>🎭 Atores: {movie.actors?.join(", ") || "Não disponível"}</Info>
          <Info>⏳ Duração: {movie.duration ? `${movie.duration} min` : "Não disponível"}</Info>
          <Info>⭐ IMDb: {movie.imdbRating ? movie.imdbRating.toFixed(1) : "Não disponível"}</Info>
          <Info>📖 Descrição: {movie.description || "Nenhuma descrição disponível"}</Info>

          <h3>📝 Opinião</h3>
          <OpinionInput 
            value={opinion} 
            onChange={(e) => setOpinion(e.target.value)}
            placeholder="Escreva sua opinião sobre o filme..."
          />
          <SaveButton onClick={() => onSaveOpinion(opinion)}>Salvar Opinião</SaveButton>
        </ModalInner>
      </ModalContent>
    </ModalOverlay>
  );
};

export default MovieModal;
