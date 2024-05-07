import React, { useState, useEffect } from "react";
import styles from "./ChampCard.module.css";

function ChampCard({ championId, patchVersion }) {
  const [champion, setChampion] = useState(null);

  useEffect(() => {
    async function fetchChampionData() {
      try {
        const response = await fetch(
          `https://ddragon.leagueoflegends.com/cdn/${patchVersion}/data/en_US/champion/${championId}.json`
        );
        const data = await response.json();
        const championData = data.data[championId];
        setChampion(championData);
      } catch (error) {
        console.error(`Error fetching champion data for ${championId}:`, error);
      }
    }

    fetchChampionData();
  }, [championId, patchVersion]);

  const backgroundImageStyle = champion
    ? {
        backgroundImage: `url(https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${championId}_0.jpg)`,
      }
    : {};

  return <div className={styles.champImage} style={backgroundImageStyle}></div>;
}

export default ChampCard;
