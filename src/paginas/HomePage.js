import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import Player from "./Components/Player";
import GeneroMusical from "./Components/Generos";
import Top50 from "./Components/Top50";
import CardFavoritas from "./Components/CardsFavoritas";

const HomePage = () => {
  const [artists, setArtists] = useState([]);
  const [topMusics, setTopMusics] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedTracks, setSearchedTracks] = useState([]);
  const [playingTrack, setPlayingTrack] = useState(null);
  const [topArtista, setTopArtista] = useState([]);
  const [artistasGlobais, setArtistasGlobais] = useState([]);
  const [error, setError] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const audioRef = useRef(null);

  const token = window.localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      axios
        .get("https://api.spotify.com/v1/me/top/artists", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setArtists(response.data.items);
        })
        .catch(() => {
          setError("Erro ao buscar os artistas.");
        });

      buscarArtista();
      novidades();
    }
  }, [token]);

  const novidades = () => {
    axios
      .get("https://api.spotify.com/v1/browse/new-releases", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setTopMusics(res.data);
      })
      .catch((erro) => {
        console.log("Erro ao buscar lançamentos:", erro.response.data);
      });
  };

  const buscarArtista = () => {
    axios
      .get(
        "https://api.spotify.com/v1/playlists/37i9dQZEVXbMDoHDwVN2tF/tracks",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log("Resposta recebida1:", res.data);
        setTopArtista(res.data.items[0]);
        setArtistasGlobais(res.data);
      })
      .catch((erro) => {
        console.error(
          "Erro ao buscar o artista:",
          erro.response ? erro.response.data : erro.message
        );
      });
  };

  useEffect(() => {
    if (searchTerm.trim()) {
      handleSearch();
    }
  }, [searchTerm]);

  const handleSearch = () => {
    axios
      .get(`https://api.spotify.com/v1/search?q=${searchTerm}&type=track`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setSearchedTracks(res.data.tracks.items);
      })
      .catch(() => {
        setError("Erro ao buscar músicas.");
      });
  };

  const playTrack = (track) => {
    setPlayingTrack(track);
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const skipTrack = () => {
    if (currentTrackIndex < searchedTracks.length - 1) {
      setCurrentTrackIndex((prevIndex) => prevIndex + 1);
      setPlayingTrack(searchedTracks[currentTrackIndex + 1]);
    }
  };

  const previousTrack = () => {
    if (currentTrackIndex > 0) {
      setCurrentTrackIndex((prevIndex) => prevIndex - 1);
      setPlayingTrack(searchedTracks[currentTrackIndex - 1]);
    }
  };


  return (
    <ContainerGeral>
      <MainContainer>
        <SearchSection>
          <SearchInput
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Pesquise pela música"
          />
          <SearchButton onClick={handleSearch}>
            <FaSearch />
          </SearchButton>
        </SearchSection>

        {searchTerm === "" ? (
          <CardTopOne>
            <NomeArtistaGlobal>{topArtista?.track?.name}</NomeArtistaGlobal>
            <ImagemMusica src={topArtista?.track?.album?.images[0]?.url} />
          </CardTopOne>
        ) : (
          <SearchedTracksSection>
            <TrackList>
              {searchedTracks.map((track) => (
                <TrackItem key={track.id}>
                  <TrackDetails onClick={() => playTrack(track)}>
                    <TrackImage src={track.album.images[0].url} />
                    <TrackName>{track.name}</TrackName>
                  </TrackDetails>
                  <MinutosMusica>
                    {Math.floor(track.duration_ms / 60000)}:
                    {("0" + Math.floor((track.duration_ms % 60000) / 1000)).slice(-2)}
                  </MinutosMusica>
                </TrackItem>
              ))}
            </TrackList>
          </SearchedTracksSection>
        )}

        <CardFavoritas artists={artists} />
      </MainContainer>

      <Sidebar>
        <Top50 artistasGlobais={artistasGlobais} />
        <GeneroMusical />
        <Player
          playingTrack={playingTrack}
          togglePlayPause={togglePlayPause}
          isPlaying={isPlaying}
          audioRef={audioRef}
          skipTrack={skipTrack}
          previousTrack={previousTrack}
        />
      </Sidebar>
    </ContainerGeral>
  );
};

const ContainerGeral = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: row;
  background-color: #181818;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const MainContainer = styled.div`
  width: 70%;
  height: 100%;
  padding: 3rem;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    width: 100%;
    padding: 1rem;
  }
`;

const SearchSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const SearchButton = styled.button`
  margin-left: 0.5rem;
  padding: 0.5rem 1rem;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #CCC;
  }
`;

const CardTopOne = styled.div`
  width: 100%;
  height: 50%;
  background: linear-gradient(145deg, #1e1e1e, #282828);
  border-radius: 15px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    height: auto;
    flex-direction: column;
    padding: 1rem;
  }
`;

const NomeArtistaGlobal = styled.h2`
  color: #fff;
  font-size: 22px;
  font-weight: 600;
  padding: 2rem;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.7);
`;

const ImagemMusica = styled.img`
  width: 50%;
  max-height: 300px;
  min-height: 250px;
  object-fit: cover;
  border-radius: 15px;
  transition: box-shadow 0.3s ease-in-out;

  &:hover {
    box-shadow: 0px 8px 30px rgba(255, 255, 255, 0.2);
  }

  @media (max-width: 768px) {
    width: 80%;
    max-height: 200px;
  }
`;

const SearchedTracksSection = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 300px;
  overflow-y: auto;
  margin-bottom: 2rem;

   &::-webkit-scrollbar {
    height: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #1db954;
    border-radius: 50px;
  }
`;

const TrackList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const TrackItem = styled.li`
  display: flex;
  font-size: 12px;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
`;

const TrackDetails = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const TrackImage = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 4px;
  margin-right: 1rem;
`;

const TrackName = styled.span`
  color: #fff;
`;

const MinutosMusica = styled.span`
  color: #ccc;
`;

const Sidebar = styled.div`
  width: 30%;
  height: 100%;
  background-color: #121212;
  padding: 3rem;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    width: 100%;
    padding: 1rem;
  }
`;

export default HomePage;
