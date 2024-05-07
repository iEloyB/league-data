import ChampCard from "../../components/ChampCard/ChampCard";

function Intro() {
  return (
    <>
      <section className="imagesWrapper topAnimation">
        <ChampCard />
        <ChampCard />
        <ChampCard />
        <ChampCard />
      </section>
      <section className="imagesWrapper bottomAnimation">
        <ChampCard />
        <ChampCard />
        <ChampCard />
        <ChampCard />
      </section>
      <section className="imagesWrapper topAnimation">
        <ChampCard />
        <ChampCard />
        <ChampCard />
        <ChampCard />
      </section>
      <section className="imagesWrapper bottomAnimation">
        <ChampCard />
        <ChampCard />
        <ChampCard />
        <ChampCard />
      </section>
      <section className="imagesWrapper topAnimation">
        <ChampCard />
        <ChampCard />
        <ChampCard />
        <ChampCard />
      </section>
    </>
  );
}

export default Intro;
