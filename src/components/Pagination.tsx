import React, { useRef } from "react";
import styled from "styled-components";

const PaginationWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
`;

const PageButton = styled.button<{ active?: boolean }>`
  padding: 8px 12px;
  font-size: 1rem;
  border: none;
  background: ${({ active }) => (active ? "#ff4500" : "#333")};
  color: white;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: 0.3s;

  &:hover {
    background: ${({ active }) => (active ? "#e03c00" : "#444")};
  }

  &:disabled {
    background: #555;
    cursor: not-allowed;
  }
`;

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const topRef = useRef<HTMLDivElement | null>(null);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    const visiblePages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        visiblePages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        visiblePages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        visiblePages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        visiblePages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }

    return visiblePages.map((page, index) =>
      typeof page === "number" ? (
        <PageButton key={index} active={page === currentPage} onClick={() => handlePageChange(page)}>
          {page}
        </PageButton>
      ) : (
        <span key={index} style={{ color: "#ccc", fontSize: "1rem" }}> {page} </span>
      )
    );
  };

  return (
    <>
      <div ref={topRef}></div>
      <PaginationWrapper>
        <PageButton onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          ⬅ Anterior
        </PageButton>

        {renderPageNumbers()}

        <PageButton onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Próxima ➡
        </PageButton>
      </PaginationWrapper>
    </>
  );
};

export default Pagination;
