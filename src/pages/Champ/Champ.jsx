import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import style from "./Champ.module.css";

const Champ = () => {
  const { champId } = useParams();
  const [championData, setChampionData] = useState(null);
  const [skins, setSkins] = useState(null);
  const [skinIds, setSkinIds] = useState([]);
  const [currentSkin, setCurrentSkin] = useState(0);

  useEffect(() => {
    const fetchChampionData = async () => {
      try {
        const response = await fetch(
          `https://ddragon.leagueoflegends.com/cdn/14.9.1/data/en_US/champion/${champId}.json`
        );
        const data = await response.json();
        const champion = data.data[champId];

        setSkins(champion.skins);
        setChampionData(champion);
      } catch (error) {
        console.error("Error fetching champion data:", error);
      }
    };

    if (champId) {
      fetchChampionData();
    }
  }, [champId]);

  useEffect(() => {
    if (skins) {
      const skinIds = skins.map((skin) => skin.num);
      setSkinIds(skinIds);
    }
  }, [skins]);

  const handlePrevSkin = () => {
    setCurrentSkin((prevSkin) =>
      prevSkin === 0 ? skinIds.length - 1 : prevSkin - 1
    );
  };

  const handleNextSkin = () => {
    setCurrentSkin((prevSkin) => (prevSkin + 1) % skinIds.length);
  };

  return (
    <div className={style.champContainer}>
      {championData && (
        <>
          <div className={`${style.skinsContainer} ${style.panLeft}`}>
            <img
              key={skinIds[currentSkin]}
              src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champId}_${skinIds[currentSkin]}.jpg`}
              alt={`${championData.name} Skin ${skinIds[currentSkin]}`}
            />
          </div>

          <div className={style.skinButtonsContainer}>
            <div className={style.prevSkin} onClick={handlePrevSkin}>
              -
            </div>
            <div className={style.nextSkin} onClick={handleNextSkin}>
              +
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Champ;
