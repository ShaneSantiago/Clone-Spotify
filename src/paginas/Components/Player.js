import React from "react";
import { FaBackward, FaForward, FaPause, FaPlay } from "react-icons/fa";
import styled from "styled-components";

const Player = ({
  playingTrack,
  audioRef,
  isPlaying,
  togglePlayPause,
  skipTrack,
  previousTrack,
}) => {
  return (
    <>
      <NowPlaying>
        <PlayerBox>
          {playingTrack ? (
            <>
              <TrackInfo>
                <AlbumImage src={playingTrack.album.images[0]?.url} />
                <TrackDetailsPlayer>
                  <TrackName>{playingTrack.name}</TrackName>
                  <ArtistNameText>
                    {playingTrack.artists[0]?.name}
                  </ArtistNameText>
                </TrackDetailsPlayer>
              </TrackInfo>
              <audio ref={audioRef} src={playingTrack.preview_url} />
              <PlayerControls>
                <PlayerControls>
                  <ControlButton onClick={previousTrack}>
                    <FaBackward />
                  </ControlButton>
                  <ControlButton onClick={togglePlayPause}>
                    {isPlaying ? <FaPause /> : <FaPlay />}
                  </ControlButton>
                  <ControlButton onClick={skipTrack}>
                    <FaForward />
                  </ControlButton>
                </PlayerControls>
              </PlayerControls>
            </>
          ) : (
            <TrackName>Nenhuma música sendo tocada</TrackName>
          )}
        </PlayerBox>
      </NowPlaying>
    </>
  );
};
export default Player;

const NowPlaying = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #ccc;
  border-radius: 10px;
`;

const PlayerBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: #101010;
  padding: 1rem;
  border-radius: 10px;
`;

const TrackInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const AlbumImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 5px;
  margin-right: 1rem;
`;

const TrackDetailsPlayer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const TrackName = styled.h4`
  color: white;
  font-size: 16px;
  margin: 0;
`;

const ArtistNameText = styled.p`
  color: #ccc;
  font-size: 14px;
  margin-top: 5px;
`;

const PlayerControls = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const ControlButton = styled.button`
  background-color: #1db954;
  border: none;
  padding: 0.5rem 1rem;
  color: white;
  cursor: pointer;
  border-radius: 5px;
`;
