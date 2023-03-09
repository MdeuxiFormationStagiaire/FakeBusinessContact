import React from 'react'

const SallesPage = () => {

  const factions : any[] = ["Empire", "Breton", "Chaos", "ElfN", "Elf", "Nain", "Cathay", "Orc", "Kislev", "Lezard", "Norsca", "Ogres", "Skavens", "Tombes", "PiratesV", "Vampires", "Sylvains"] 
  const heros : any[] = ["Malek", "Mora", "Hellb", "Lokir", "Malus", "Bra"]
  const choixAleatoire =  Math.floor(Math.random() * heros.length);
  const factionAleatoire = heros[choixAleatoire];

  return (
    <div>{factionAleatoire}</div>
  )
}

export default SallesPage