import React from "react";
import styled from "styled-components";

const Top50 = ({ artistasGlobais }) => {
  return (
    <>
      <TrendingArtistsSection>
        <SidebarTitle>GLOBAL TOP 50</SidebarTitle>
        {artistasGlobais?.items?.map((artista, index) => (
          <ArtistItem key={artista.id}>
            <ArtistNumber>{index + 1}</ArtistNumber>
            <ImagemAlbum
              src={artista.track.album.images[0]?.url}
              alt={artista.track.name}
            />
            <NomeMusica>{artista.track.name}</NomeMusica>
          </ArtistItem>
        ))}
      </TrendingArtistsSection>
    </>
  );
};

export default Top50;

const TrendingArtistsSection = styled.div`
  display: flex;
  flex-direction: column;
  overflow-x: scroll;
  padding-bottom: 1rem;
  height: 350px;
  width: 100%;

  &::-webkit-scrollbar {
    height: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #1db954;
    border-radius: 50px;
  }

  @media (max-width: 768px) {
    height: 250px;
    width: 100%;
  }

  @media (max-width: 480px) {
    height: 200px;
  }
`;

const SidebarTitle = styled.h3`
  color: white;
  margin-bottom: 1rem;
`;

const ArtistItem = styled.div`
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const ArtistNumber = styled.p`
  margin-right: 10px;
  font-size: 14px;
  color: #ccc;
`;

const ImagemAlbum = styled.img`
  width: 15%;
  height: 100%;
  object-fit: cover;
`;

const NomeMusica = styled.p`
  color: white;
  font-size: 14px;
  text-align: right;
  flex: 1;
`;
