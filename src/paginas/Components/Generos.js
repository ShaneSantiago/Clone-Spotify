import React from "react";
import styled from "styled-components";

const GeneroMusical = () => {
  return (
    <>
      <GenresSection>
        <SidebarTitle>Gêneros</SidebarTitle>
        <GenresList>
          <GenreItem>Hip-hop</GenreItem>
          <GenreItem>House</GenreItem>
          <GenreItem>Pop</GenreItem>
          <GenreItem>Blues</GenreItem>
          <GenreItem>Country</GenreItem>
          <GenreItem>Rock</GenreItem>
        </GenresList>
      </GenresSection>
    </>
  );
};
export default GeneroMusical;

const GenresSection = styled.div`
  margin-bottom: 15px;
`;

const SidebarTitle = styled.h3`
  color: white;
  margin-bottom: 1rem;
`;

const GenresList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const GenreItem = styled.span`
  padding: 0.5rem 1rem;
  font-size: 10px;
  background-color: #282828;
  color: white;
  border-radius: 15px;
`;
