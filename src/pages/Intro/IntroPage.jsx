import React, { useState, useEffect } from "react";
import ChampCard from "../../components/ChampCard/ChampCard";
import styles from "./IntroPage.module.css";

function Intro() {
  const [patchVersion, setPatchVersion] = useState(null);
  const [randomChampions, setRandomChampions] = useState([]);
  const [selectedChamp, setselectedChamp] = useState(null);

  useEffect(() => {
    async function fetchPatchVersion() {
      try {
        const response = await fetch(
          "https://ddragon.leagueoflegends.com/api/versions.json"
        );
        const data = await response.json();
        const latestVersion = data[0];
        setPatchVersion(latestVersion);

        const champions = await fetchRandomChampions(latestVersion, 25);
        setRandomChampions(champions);
      } catch (error) {
        console.error("Error fetching patch version and champions:", error);
      }
    }

    fetchPatchVersion();
  }, []);

  useEffect(() => {
    if (randomChampions.length > 0) {
      setTimeout(() => {
        window.location.href = `/champ/${randomChampions[12].id}`;
      }, 4500);
    }
  }, [randomChampions]);

  async function fetchRandomChampions(patchVersion, count) {
    try {
      const response = await fetch(
        `https://ddragon.leagueoflegends.com/cdn/${patchVersion}/data/en_US/champion.json`
      );
      const data = await response.json();
      const championsData = Object.values(data.data);

      const shuffledChampions = shuffleArray(championsData);

      return shuffledChampions.slice(0, count);
    } catch (error) {
      console.error("Error fetching random champions:", error);
      return [];
    }
  }

  function shuffleArray(array) {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  }

  return (
    <article className={styles.mainWrapper}>
      <section className={`${styles.imagesWrapper} ${styles.topAnimation}`}>
        {randomChampions.slice(0, 5).map((champion) => (
          <ChampCard
            key={champion.id}
            championId={champion.id}
            patchVersion={patchVersion}
          />
        ))}
      </section>

      <section className={`${styles.imagesWrapper} ${styles.bottomAnimation}`}>
        {randomChampions.slice(5, 10).map((champion) => (
          <ChampCard
            key={champion.id}
            championId={champion.id}
            patchVersion={patchVersion}
          />
        ))}
      </section>

      <section className={`${styles.imagesWrapper} ${styles.topAnimation}`}>
        {randomChampions.slice(10, 15).map((champion) => (
          <ChampCard
            key={champion.id}
            championId={champion.id}
            patchVersion={patchVersion}
          />
        ))}
      </section>

      <section className={`${styles.imagesWrapper} ${styles.bottomAnimation}`}>
        {randomChampions.slice(15, 20).map((champion) => (
          <ChampCard
            key={champion.id}
            championId={champion.id}
            patchVersion={patchVersion}
          />
        ))}
      </section>

      <section className={`${styles.imagesWrapper} ${styles.topAnimation}`}>
        {randomChampions.slice(20, 25).map((champion) => (
          <ChampCard
            key={champion.id}
            championId={champion.id}
            patchVersion={patchVersion}
          />
        ))}
      </section>
    </article>
  );
}

export default Intro;
