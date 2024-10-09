import React from "react";
import styled from "styled-components";

const CardFavoritas = ({ artists }) => {
  console.log("artistas", artists);
  return (
    <>
      <AlbumSection>
        <SectionTitle>Artista que você curte</SectionTitle>
        <AlbumCarousel>
          {artists.map((artist) => (
            <BoxCard key={artist.id}>
              <AlbumCard src={artist.images[0]?.url} />
              <ArtistNameText>{artist.name}</ArtistNameText>
            </BoxCard>
          ))}
        </AlbumCarousel>
      </AlbumSection>
    </>
  );
};

export default CardFavoritas;

const AlbumSection = styled.div`
  margin-top: 3rem;

  @media (max-width: 768px) {
    margin-top: 10px;
  }
`;

const SectionTitle = styled.h2`
  color: white;
`;

const AlbumCarousel = styled.div`
  display: flex;
  margin-top: 1rem;
  overflow-x: scroll;
  padding-bottom: 1rem;

  &::-webkit-scrollbar {
    height: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #1db954;
    border-radius: 10px;
  }
`;

const BoxCard = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 10rem;
  border-radius: 10px;
`;

const AlbumCard = styled.img`
  width: 70%;
  height: 6rem;
  border-radius: 10px;

   @media (max-width: 768px) {
      width: 60%;
        height: 5rem;
  }
`;

const ArtistNameText = styled.p`
  color: #ccc;
  font-size: 14px;
  margin-top: 5px;

  @media (max-width: 768px) {
    font-size: 10px;
  }
`;
