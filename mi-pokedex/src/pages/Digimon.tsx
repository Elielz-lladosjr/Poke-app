import { useEffect, useState } from "react";
import Card from "../components/Card";

export default function Digimon() {
  const [digis, setDigis] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      const data = await fetch("https://digimon-api.vercel.app/api/digimon")
        .then(r => r.json());

      const random10 = Array.from({ length: 10 }, () => {
        const index = Math.floor(Math.random() * data.length);
        return data[index];
      });

      setDigis(random10);
    }
    load();
  }, []);

  return (
    <div className="digimon-grid">
  {digis.map((d, i) => (
    <Card
  key={i}
  name={d.name}
  img={d.img}
  level={typeof d.level === "number" ? d.level : 0}
/>
  ))}
</div>

  );
}
