import React, { useState, useEffect } from "react";

// Function to fetch the latest patch version of League of Legends
async function fetchLatestPatchVersion() {
  try {
    const response = await fetch(
      "https://ddragon.leagueoflegends.com/api/versions.json"
    );
    const data = await response.json();
    return data[0]; // Return the first version, which is usually the latest
  } catch (error) {
    console.error("Error fetching patch version:", error);
    return null;
  }
}

// Function to fetch a random champion from the given patch version
async function fetchRandomChampion(patchVersion) {
  try {
    const response = await fetch(
      `https://ddragon.leagueoflegends.com/cdn/${patchVersion}/data/en_US/champion.json`
    );
    const data = await response.json();
    const champions = Object.keys(data.data);
    const randomChampionKey =
      champions[Math.floor(Math.random() * champions.length)];
    const randomChampion = data.data[randomChampionKey];
    return randomChampion;
  } catch (error) {
    console.error("Error fetching random champion:", error);
    return null;
  }
}

function ChampCard() {
  const [latestPatchVersion, setLatestPatchVersion] = useState(null);
  const [champion, setChampion] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const patchVersion = await fetchLatestPatchVersion();
      if (patchVersion) {
        setLatestPatchVersion(patchVersion);
        const randomChampion = await fetchRandomChampion(patchVersion);
        setChampion(randomChampion);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      {champion && latestPatchVersion && (
        <div>
          <img
            src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champion.id}_0.jpg`}
            alt={champion.name}
          />
        </div>
      )}
    </>
  );
}

export default ChampCard;
