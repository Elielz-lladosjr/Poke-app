import { useEffect, useState } from "react";
import Card from "../components/Card";

export default function Digimon() {
  const [digis, setDigis] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      const data = await fetch("https://digimon-api.vercel.app/api/digimon")
        .then(r => r.json());

      // Seleccionamos 10 aleatorios y agregamos stats simulados
      const random10 = Array.from({ length: 10 }, () => {
        const index = Math.floor(Math.random() * data.length);
        const digi = data[index];

        return {
          ...digi,
          hp: Math.floor(Math.random() * 100) + 50,        // HP entre 50 y 149
          attack: Math.floor(Math.random() * 50) + 20,     // Ataque entre 20 y 69
          defense: Math.floor(Math.random() * 50) + 20,    // Defensa entre 20 y 69
          xp: Math.floor(Math.random() * 1000) + 100,      // XP entre 100 y 1099
        };
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
          level={d.level || "Unknown"}
          hp={d.hp}
          attack={d.attack}
          defense={d.defense}
          xp={d.xp}
        />
      ))}
    </div>
  );
}
