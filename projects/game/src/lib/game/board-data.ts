import { ITerritoryData } from "./territory";

export const boardData: ITerritoryData[] = [
  {
    "title": "Aberdeen",
    "region": "British",
    "size": "SMALL",
    "adjacent": {
      "road": [
        "Edinburgh"
      ],
      "sea": [
        "North Atlantic Ocean",
        "North Sea"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "Birmingham",
    "region": "British",
    "size": "MEDIUM",
    "adjacent": {
      "road": [
        "Glasgow",
        "Edinburgh",
        "Newcastle",
        "Bristol",
        "London"
      ],
      "rail": [
        "Glasgow",
        "London"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "Edinburgh",
    "region": "British",
    "size": "SMALL",
    "adjacent": {
      "road": [
        "Glasgow",
        "Aberdeen",
        "Birmingham"
      ],
      "sea": [
        "North Sea"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "Newcastle",
    "region": "British",
    "size": "SMALL",
    "adjacent": {
      "road": [
        "Birmingham"
      ],
      "sea": [
        "North Sea"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "London",
    "region": "British",
    "size": "LARGE",
    "airport": true,
    "adjacent": {
      "road": [
        "Birmingham",
        "Bristol"
      ],
      "rail": [
        "Birmingham"
      ],
      "sea": [
        "North Sea",
        "English Channel"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "Plymouth",
    "region": "British",
    "size": "SMALL",
    "adjacent": {
      "road": [
        "Bristol"
      ],
      "sea": [
        "Celtic Sea",
        "English Channel"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "Bristol",
    "region": "British",
    "size": "SMALL",
    "adjacent": {
      "road": [
        "London",
        "Plymouth",
        "Birmingham"
      ],
      "sea": [
        "Celtic Sea"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "Glasgow",
    "region": "British",
    "size": "MEDIUM",
    "adjacent": {
      "road": [
        "Edinburgh",
        "Birmingham"
      ],
      "rail": [
        "Birmingham"
      ],
      "sea": [
        "North Atlantic Ocean",
        "Celtic Sea"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "Belfast",
    "region": "British",
    "size": "SMALL",
    "adjacent": {
      "sea": [
        "North Atlantic Ocean",
        "Celtic Sea"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "Dublin",
    "region": "British",
    "size": "SMALL",
    "adjacent": {
      "sea": [
        "Celtic Sea"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "Killamey",
    "region": "British",
    "size": "SMALL",
    "adjacent": {
      "sea": [
        "North Atlantic Ocean",
        "Celtic Sea"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "Bergen",
    "region": "Nordic",
    "size": "SMALL",
    "adjacent": {
      "road": [
        "Oslo"
      ],
      "sea": [
        "North Atlantic Ocean",
        "North Sea"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "Kristiansand",
    "region": "Nordic",
    "size": "SMALL",
    "adjacent": {
      "road": [
        "Oslo"
      ],
      "sea": [
        "North Sea",
        "Kattegat Bay"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "Gothenburg",
    "region": "Nordic",
    "size": "SMALL",
    "adjacent": {
      "road": [
        "Orebro",
        "Oslo",
        "Kalmar"
      ],
      "sea": [
        "Kattegat Bay"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "Copenhagen",
    "region": "Nordic",
    "size": "MEDIUM",
    "adjacent": {
      "sea": [
        "Kattegat Bay",
        "Baltic Sea"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "Kalmar",
    "region": "Nordic",
    "size": "SMALL",
    "adjacent": {
      "road": [
        "Gothenburg",
        "Orebro"
      ],
      "sea": [
        "Baltic Sea"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "Stockholm",
    "region": "Nordic",
    "size": "MEDIUM",
    "adjacent": {
      "road": [
        "Orebro"
      ],
      "rail": [
        "Orebro"
      ],
      "sea": [
        "Baltic Sea",
        "Gulf of Bothnia"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "Uppsala",
    "region": "Nordic",
    "size": "SMALL",
    "adjacent": {
      "road": [
        "Orebro",
        "Oslo"
      ],
      "sea": [
        "Gulf of Bothnia"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "Oslo",
    "region": "Nordic",
    "size": "LARGE",
    "airport": true,
    "adjacent": {
      "road": [
        "Orebro",
        "Bergen",
        "Uppsala",
        "Kristiansand",
        "Gothenburg"
      ],
      "rail": [
        "Orebro"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "Orebro",
    "region": "Nordic",
    "size": "SMALL",
    "adjacent": {
      "road": [
        "Oslo",
        "Stockholm",
        "Kalmar",
        "Uppsala",
        "Gothenburg"
      ],
      "rail": [
        "Oslo",
        "Stockholm"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "Helsinki",
    "region": "Nordic",
    "size": "MEDIUM",
    "adjacent": {
      "road": [
        "St. Petersburg"
      ],
      "rail": [
        "St. Petersburg"
      ],
      "sea": [
        "Gulf of Bothnia"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "Aalborg",
    "region": "Nordic",
    "size": "SMALL",
    "adjacent": {
      "road": [
        "Kiel"
      ],
      "sea": [
        "North Sea",
        "Kattegat Bay"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "Gijon",
    "region": "Iberian",
    "size": "SMALL",
    "adjacent": {
      "road": [
        "Bilbao",
        "Madrid"
      ],
      "sea": [
        "Bay of Biscay"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "Porto",
    "region": "Iberian",
    "size": "SMALL",
    "adjacent": {
      "road": [
        "Madrid"
      ],
      "sea": [
        "Bay of Biscay",
        "Strait of Gibralter"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "Lisbon",
    "region": "Iberian",
    "size": "MEDIUM",
    "adjacent": {
      "road": [
        "Madrid",
        "Cordoba"
      ],
      "rail": [
        "Madrid"
      ],
      "sea": [
        "Strait of Gibralter"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "Cadiz",
    "region": "Iberian",
    "size": "SMALL",
    "adjacent": {
      "road": [
        "Cordoba"
      ],
      "sea": [
        "Strait of Gibralter"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "Malaga",
    "region": "Iberian",
    "size": "SMALL",
    "adjacent": {
      "road": [
        "Cordoba",
        "Madrid"
      ],
      "sea": [
        "Strait of Gibralter",
        "Alboran Sea"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "Valencia",
    "region": "Iberian",
    "size": "SMALL",
    "adjacent": {
      "road": [
        "Barcelona",
        "Madrid"
      ],
      "sea": [
        "Alboran Sea"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "Barcelona",
    "region": "Iberian",
    "size": "MEDIUM",
    "adjacent": {
      "road": [
        "Madrid",
        "Toulouse",
        "Valencia",
        "Bilbao"
      ],
      "rail": [
        "Madrid",
        "Toulouse"
      ],
      "sea": [
        "Alboran Sea",
        "Balearic Sea"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "Bilbao",
    "region": "Iberian",
    "size": "SMALL",
    "adjacent": {
      "road": [
        "Madrid",
        "Barcelona",
        "Gijon",
        "Toulouse"
      ],
      "sea": [
        "Bay of Biscay"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "Madrid",
    "region": "Iberian",
    "size": "LARGE",
    "airport": true,
    "adjacent": {
      "road": [
        "Lisbon",
        "Barcelona",
        "Malaga",
        "Valencia",
        "Porto",
        "Gijon",
        "Cordoba",
        "Bilbao"
      ],
      "rail": [
        "Lisbon",
        "Barcelona"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "Cordoba",
    "region": "Iberian",
    "size": "SMALL",
    "adjacent": {
      "road": [
        "Madrid",
        "Cadiz",
        "Lisbon",
        "Malaga"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "Palma",
    "region": "Iberian",
    "size": "SMALL",
    "adjacent": {
      "sea": [
        "Alboran Sea",
        "Balearic Sea"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "Le Havre",
    "region": "Franco",
    "size": "SMALL",
    "adjacent": {
      "road": [
        "Brest",
        "Nantes",
        "Paris",
        "Brussels"
      ],
      "sea": [
        "English Channel"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "Marseille",
    "region": "Franco",
    "size": "MEDIUM",
    "adjacent": {
      "road": [
        "Lyon",
        "Toulouse"
      ],
      "sea": [
        "Balearic Sea"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "Brest",
    "region": "Franco",
    "size": "SMALL",
    "adjacent": {
      "road": [
        "Nantes",
        "Le Havre"
      ],
      "sea": [
        "Celtic Sea",
        "English Channel",
        "Bay of Biscay"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "Nantes",
    "region": "Franco",
    "size": "SMALL",
    "adjacent": {
      "road": [
        "Le Havre",
        "Limoges",
        "Brest",
        "Paris"
      ],
      "sea": [
        "Bay of Biscay"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "Bordeaux",
    "region": "Franco",
    "size": "SMALL",
    "adjacent": {
      "road": [
        "Toulouse",
        "Limoges"
      ],
      "sea": [
        "Bay of Biscay"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "Brussels",
    "region": "Franco",
    "size": "SMALL",
    "adjacent": {
      "road": [
        "Paris",
        "Cologne",
        "Le Havre",
        "Strasbourg",
        "Rotterdam",
        "Frankfurt"
      ],
      "rail": [
        "Paris",
        "Cologne"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "Paris",
    "region": "Franco",
    "size": "LARGE",
    "airport": true,
    "adjacent": {
      "road": [
        "Limoges",
        "Brussels",
        "Nantes",
        "Strasbourg",
        "Le Havre"
      ],
      "rail": [
        "Limoges",
        "Brussels"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "Limoges",
    "region": "Franco",
    "size": "SMALL",
    "adjacent": {
      "road": [
        "Toulouse",
        "Lyon",
        "Paris",
        "Bordeaux",
        "Nantes",
        "Strasbourg"
      ],
      "rail": [
        "Toulouse",
        "Lyon",
        "Paris"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "Toulouse",
    "region": "Franco",
    "size": "SMALL",
    "adjacent": {
      "road": [
        "Barcelona",
        "Limoges",
        "Bilbao",
        "Marseille",
        "Bordeaux",
        "Lyon"
      ],
      "rail": [
        "Barcelona",
        "Limoges"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "Lyon",
    "region": "Franco",
    "size": "MEDIUM",
    "adjacent": {
      "road": [
        "Milan",
        "Limoges",
        "Toulouse",
        "Strasbourg",
        "Marseille",
        "Genoa",
        "Zurich"
      ],
      "rail": [
        "Milan",
        "Limoges"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "Strasbourg",
    "region": "Franco",
    "size": "SMALL",
    "adjacent": {
      "road": [
        "Limoges",
        "Brussels",
        "Lyon",
        "Paris",
        "Frankfurt",
        "Stuttgart"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "Ajaccio",
    "region": "Franco",
    "size": "SMALL",
    "adjacent": {
      "sea": [
        "Balearic Sea",
        "Tyrrhenian Sea"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "Kiel",
    "region": "German",
    "size": "SMALL",
    "adjacent": {
      "road": [
        "Hamburg",
        "Aalborg",
        "Berlin"
      ],
      "sea": [
        "Baltic Sea"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "Hamburg",
    "region": "German",
    "size": "MEDIUM",
    "adjacent": {
      "road": [
        "Berlin",
        "Cologne",
        "Kiel",
        "Hanover",
        "Rotterdam"
      ],
      "sea": [
        "North Sea"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "Rotterdam",
    "region": "German",
    "size": "SMALL",
    "adjacent": {
      "road": [
        "Hamburg",
        "Brussels",
        "Cologne"
      ],
      "sea": [
        "North Sea",
        "English Channel"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "Berlin",
    "region": "German",
    "size": "LARGE",
    "airport": true,
    "adjacent": {
      "road": [
        "Hanover",
        "Dresden",
        "Poznan",
        "Kiel",
        "Hamburg",
        "Gdansk"
      ],
      "rail": [
        "Hanover",
        "Dresden",
        "Poznan"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "Hanover",
    "region": "German",
    "size": "SMALL",
    "adjacent": {
      "road": [
        "Cologne",
        "Berlin",
        "Hamburg",
        "Dresden",
        "Frankfurt"
      ],
      "rail": [
        "Cologne",
        "Berlin"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "Cologne",
    "region": "German",
    "size": "MEDIUM",
    "adjacent": {
      "road": [
        "Brussels",
        "Hanover",
        "Rotterdam",
        "Frankfurt",
        "Hamburg"
      ],
      "rail": [
        "Brussels",
        "Hanover"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "Frankfurt",
    "region": "German",
    "size": "SMALL",
    "adjacent": {
      "road": [
        "Hanover",
        "Stuttgart",
        "Strasbourg",
        "Brussels",
        "Cologne",
        "Dresden",
        "Prague"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "Stuttgart",
    "region": "German",
    "size": "SMALL",
    "adjacent": {
      "road": [
        "Munich",
        "Strasbourg",
        "Frankfurt",
        "Prague",
        "Zurich"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "Munich",
    "region": "German",
    "size": "MEDIUM",
    "adjacent": {
      "road": [
        "Vienna",
        "Prague",
        "Milan",
        "Stuttgart",
        "Venice",
        "Zurich"
      ],
      "rail": [
        "Vienna",
        "Prague",
        "Milan"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "Dresden",
    "region": "German",
    "size": "SMALL",
    "adjacent": {
      "road": [
        "Prague",
        "Berlin",
        "Frankfurt",
        "Hanover",
        "Poznan",
        "Wroclaw"
      ],
      "rail": [
        "Prague",
        "Berlin"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "Gdansk",
    "region": "Slavic",
    "size": "SMALL",
    "adjacent": {
      "road": [
        "Berlin",
        "Bialystok",
        "Warsaw",
        "Poznan"
      ],
      "sea": [
        "Baltic Sea"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "Poznan",
    "region": "Slavic",
    "size": "SMALL",
    "adjacent": {
      "road": [
        "Berlin",
        "Warsaw",
        "Dresden",
        "Gdansk",
        "Wroclaw"
      ],
      "rail": [
        "Berlin",
        "Warsaw"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "Wroclaw",
    "region": "Slavic",
    "size": "SMALL",
    "adjacent": {
      "road": [
        "Poznan",
        "Krakow",
        "Brno",
        "Dresden",
        "Prague",
        "Warsaw"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "Prague",
    "region": "Slavic",
    "size": "MEDIUM",
    "adjacent": {
      "road": [
        "Vienna",
        "Munich",
        "Dresden",
        "Stuttgart",
        "Frankfurt",
        "Wroclaw",
        "Brno"
      ],
      "rail": [
        "Vienna",
        "Munich",
        "Dresden"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "Brno",
    "region": "Slavic",
    "size": "SMALL",
    "adjacent": {
      "road": [
        "Prague",
        "Krakow",
        "Budapest",
        "Vienna",
        "Wroclaw"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "Vienna",
    "region": "Slavic",
    "size": "LARGE",
    "airport": true,
    "adjacent": {
      "road": [
        "Budapest",
        "Prague",
        "Munich",
        "Brno",
        "Venice",
        "Zagreb"
      ],
      "rail": [
        "Budapest",
        "Prague",
        "Munich"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "Budapest",
    "region": "Slavic",
    "size": "MEDIUM",
    "adjacent": {
      "road": [
        "Belgrade",
        "Vienna",
        "Sarajevo",
        "Krakow",
        "Brno",
        "Zagreb",
        "Uzhhorod",
        "Arad"
      ],
      "rail": [
        "Belgrade",
        "Vienna"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "Krakow",
    "region": "Slavic",
    "size": "SMALL",
    "adjacent": {
      "road": [
        "Budapest",
        "Wroclaw",
        "Brno",
        "Warsaw",
        "Lutsk",
        "Uzhhorod"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "Warsaw",
    "region": "Slavic",
    "size": "MEDIUM",
    "adjacent": {
      "road": [
        "Poznan",
        "Kobryn",
        "Wroclaw",
        "Krakow",
        "Bialystok",
        "Gdansk",
        "Lutsk"
      ],
      "rail": [
        "Poznan",
        "Kobryn"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "Bialystok",
    "region": "Slavic",
    "size": "SMALL",
    "adjacent": {
      "road": [
        "Warsaw",
        "Gdansk",
        "Liepaja",
        "Vilnius",
        "Kobryn"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "St. Petersburg",
    "region": "Baltic",
    "size": "MEDIUM",
    "adjacent": {
      "road": [
        "Novgorod",
        "Helsinki"
      ],
      "rail": [
        "Novgorod",
        "Helsinki"
      ],
      "sea": [
        "Gulf of Bothnia"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "Tallinn",
    "region": "Baltic",
    "size": "SMALL",
    "adjacent": {
      "road": [
        "Novgorod",
        "Riga",
        "Pskov"
      ],
      "sea": [
        "Baltic Sea",
        "Gulf of Bothnia"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "Riga",
    "region": "Baltic",
    "size": "SMALL",
    "adjacent": {
      "road": [
        "Vilnius",
        "Pskov",
        "Liepaja",
        "Braslaw",
        "Tallinn"
      ],
      "sea": [
        "Baltic Sea"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "Liepaja",
    "region": "Baltic",
    "size": "SMALL",
    "adjacent": {
      "road": [
        "Riga",
        "Bialystok",
        "Vilnius"
      ],
      "sea": [
        "Baltic Sea"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "Novgorod",
    "region": "Baltic",
    "size": "MEDIUM",
    "adjacent": {
      "road": [
        "Velikiye Luki",
        "St. Petersburg",
        "Smolensk",
        "Tallinn",
        "Pskov"
      ],
      "rail": [
        "Velikiye Luki",
        "St. Petersburg"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "Pskov",
    "region": "Baltic",
    "size": "SMALL",
    "adjacent": {
      "road": [
        "Braslaw",
        "Tallinn",
        "Novgorod",
        "Riga",
        "Velikiye Luki"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "Braslaw",
    "region": "Baltic",
    "size": "SMALL",
    "adjacent": {
      "road": [
        "Minsk",
        "Riga",
        "Velikiye Luki",
        "Vilnius",
        "Pskov"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "Vilnius",
    "region": "Baltic",
    "size": "SMALL",
    "adjacent": {
      "road": [
        "Liepaja",
        "Kobryn",
        "Braslaw",
        "Bialystok",
        "Minsk",
        "Riga"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "Kobryn",
    "region": "Baltic",
    "size": "SMALL",
    "adjacent": {
      "road": [
        "Warsaw",
        "Minsk",
        "Bialystok",
        "Vilnius",
        "Lutsk"
      ],
      "rail": [
        "Warsaw",
        "Minsk"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "Minsk",
    "region": "Baltic",
    "size": "LARGE",
    "airport": true,
    "adjacent": {
      "road": [
        "Kobryn",
        "Velikiye Luki",
        "Kiev",
        "Smolensk",
        "Vilnius",
        "Gomet",
        "Braslaw",
        "Lutsk"
      ],
      "rail": [
        "Kobryn",
        "Velikiye Luki",
        "Kiev"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "Gomet",
    "region": "Baltic",
    "size": "SMALL",
    "adjacent": {
      "road": [
        "Minsk",
        "Smolensk",
        "Kharki",
        "Kiev"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "Smolensk",
    "region": "Baltic",
    "size": "SMALL",
    "adjacent": {
      "road": [
        "Gomet",
        "Velikiye Luki",
        "Novgorod",
        "Minsk",
        "Kharki"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "Velikiye Luki",
    "region": "Baltic",
    "size": "SMALL",
    "adjacent": {
      "road": [
        "Minsk",
        "Novgorod",
        "Braslaw",
        "Pskov",
        "Smolensk"
      ],
      "rail": [
        "Minsk",
        "Novgorod"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "Tunis",
    "region": "African",
    "size": "SMALL",
    "adjacent": {
      "sea": [
        "Tyrrhenian Sea",
        "Balearic Sea"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "Annaba",
    "region": "African",
    "size": "SMALL",
    "adjacent": {
      "road": [
        "Sfax"
      ],
      "sea": [
        "Balearic Sea"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "Algiers",
    "region": "African",
    "size": "MEDIUM",
    "adjacent": {
      "road": [
        "Oran",
        "Sfax"
      ],
      "sea": [
        "Alboran Sea",
        "Balearic Sea"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "Oran",
    "region": "African",
    "size": "SMALL",
    "adjacent": {
      "road": [
        "Algiers"
      ],
      "sea": [
        "Alboran Sea"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "Nador",
    "region": "African",
    "size": "SMALL",
    "adjacent": {
      "sea": [
        "Strait of Gibralter",
        "Alboran Sea"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "Rabat",
    "region": "African",
    "size": "MEDIUM",
    "adjacent": {
      "sea": [
        "Strait of Gibralter"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "Sfax",
    "region": "African",
    "size": "SMALL",
    "adjacent": {
      "road": [
        "Algiers",
        "Annaba"
      ],
      "sea": [
        "Tyrrhenian Sea",
        "Ionian Sea"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "Zurich",
    "region": "Italian",
    "size": "SMALL",
    "adjacent": {
      "road": [
        "Lyon",
        "Stuttgart",
        "Munich",
        "Milan"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "Milan",
    "region": "Italian",
    "size": "MEDIUM",
    "adjacent": {
      "road": [
        "Munich",
        "Bologna",
        "Lyon",
        "Genoa",
        "Venice",
        "Zurich"
      ],
      "rail": [
        "Munich",
        "Bologna",
        "Lyon"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "Bologna",
    "region": "Italian",
    "size": "SMALL",
    "adjacent": {
      "road": [
        "Rome",
        "Milan",
        "Venice",
        "Genoa"
      ],
      "rail": [
        "Rome",
        "Milan"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "Genoa",
    "region": "Italian",
    "size": "SMALL",
    "adjacent": {
      "road": [
        "Bologna",
        "Lyon",
        "Milan"
      ],
      "sea": [
        "Tyrrhenian Sea",
        "Balearic Sea"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "Rome",
    "region": "Italian",
    "size": "LARGE",
    "airport": true,
    "adjacent": {
      "road": [
        "Bologna",
        "Bari",
        "Naples"
      ],
      "rail": [
        "Bologna",
        "Naples"
      ],
      "sea": [
        "Tyrrhenian Sea"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "Naples",
    "region": "Italian",
    "size": "MEDIUM",
    "adjacent": {
      "road": [
        "Bari",
        "Rome"
      ],
      "rail": [
        "Rome"
      ],
      "sea": [
        "Tyrrhenian Sea"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "Bari",
    "region": "Italian",
    "size": "SMALL",
    "adjacent": {
      "road": [
        "Rome",
        "Naples"
      ],
      "sea": [
        "Adriatic Sea",
        "Ionian Sea"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "Venice",
    "region": "Italian",
    "size": "SMALL",
    "adjacent": {
      "road": [
        "Munich",
        "Vienna",
        "Milan",
        "Bologna",
        "Zagreb"
      ],
      "sea": [
        "Adriatic Sea"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "Cagliari",
    "region": "Italian",
    "size": "SMALL",
    "adjacent": {
      "sea": [
        "Balearic Sea",
        "Tyrrhenian Sea"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "Palermo",
    "region": "Italian",
    "size": "SMALL",
    "adjacent": {
      "sea": [
        "Tyrrhenian Sea"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "Catania",
    "region": "Italian",
    "size": "SMALL",
    "adjacent": {
      "sea": [
        "Tyrrhenian Sea",
        "Ionian Sea"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "Tirana",
    "region": "Balkan",
    "size": "SMALL",
    "adjacent": {
      "road": [
        "Athens",
        "Belgrade",
        "Thessaloniki",
        "Sarajevo",
        "Skopje"
      ],
      "rail": [
        "Athens",
        "Belgrade"
      ],
      "sea": [
        "Adriatic Sea",
        "Ionian Sea"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "Athens",
    "region": "Balkan",
    "size": "LARGE",
    "airport": true,
    "adjacent": {
      "road": [
        "Tirana",
        "Thessaloniki"
      ],
      "rail": [
        "Tirana"
      ],
      "sea": [
        "Ionian Sea",
        "Aegean Sea"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "Thessaloniki",
    "region": "Balkan",
    "size": "SMALL",
    "adjacent": {
      "road": [
        "Skopje",
        "Athens",
        "Tirana",
        "Sofia"
      ],
      "sea": [
        "Aegean Sea"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "Varna",
    "region": "Balkan",
    "size": "SMALL",
    "adjacent": {
      "road": [
        "Sofia",
        "Bucharest"
      ],
      "sea": [
        "Black Sea"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "Zagreb",
    "region": "Balkan",
    "size": "SMALL",
    "adjacent": {
      "road": [
        "Venice",
        "Vienna",
        "Budapest",
        "Sarajevo"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "Sarajevo",
    "region": "Balkan",
    "size": "SMALL",
    "adjacent": {
      "road": [
        "Tirana",
        "Belgrade",
        "Budapest",
        "Zagreb"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "Belgrade",
    "region": "Balkan",
    "size": "MEDIUM",
    "adjacent": {
      "road": [
        "Tirana",
        "Bucharest",
        "Budapest",
        "Skopje",
        "Sofia",
        "Sarajevo",
        "Arad"
      ],
      "rail": [
        "Tirana",
        "Bucharest",
        "Budapest"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "Skopje",
    "region": "Balkan",
    "size": "SMALL",
    "adjacent": {
      "road": [
        "Tirana",
        "Sofia",
        "Thessaloniki",
        "Belgrade"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "Sofia",
    "region": "Balkan",
    "size": "MEDIUM",
    "adjacent": {
      "road": [
        "Thessaloniki",
        "Varna",
        "Skopje",
        "Belgrade",
        "Bucharest",
        "Istanbul"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "Heraklion",
    "region": "Balkan",
    "size": "SMALL",
    "adjacent": {
      "sea": [
        "Ionian Sea",
        "Aegean Sea"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "Nicosia",
    "region": "Balkan",
    "size": "SMALL",
    "adjacent": {
      "sea": [
        "Aegean Sea"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "Odessa",
    "region": "Ukrainian",
    "size": "MEDIUM",
    "adjacent": {
      "road": [
        "Kiev",
        "Chisinau",
        "Sevastopol",
        "Kryvyi Rih",
        "Bucharest"
      ],
      "rail": [
        "Kiev",
        "Bucharest"
      ],
      "sea": [
        "Black Sea"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "Sevastopol",
    "region": "Ukrainian",
    "size": "SMALL",
    "adjacent": {
      "road": [
        "Kryvyi Rih",
        "Odessa"
      ],
      "sea": [
        "Black Sea"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "Lutsk",
    "region": "Ukrainian",
    "size": "SMALL",
    "adjacent": {
      "road": [
        "Minsk",
        "Kobryn",
        "Warsaw",
        "Krakow",
        "Uzhhorod",
        "Vinnytsia",
        "Kiev"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "Uzhhorod",
    "region": "Ukrainian",
    "size": "SMALL",
    "adjacent": {
      "road": [
        "Krakow",
        "Budapest",
        "Arad",
        "Vinnytsia",
        "Lutsk",
        "Bacau"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "Arad",
    "region": "Ukrainian",
    "size": "SMALL",
    "adjacent": {
      "road": [
        "Budapest",
        "Belgrade",
        "Bucharest",
        "Bacau",
        "Uzhhorod"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "Bucharest",
    "region": "Ukrainian",
    "size": "LARGE",
    "airport": true,
    "adjacent": {
      "road": [
        "Belgrade",
        "Sofia",
        "Varna",
        "Bacau",
        "Arad",
        "Chisinau",
        "Odessa"
      ],
      "rail": [
        "Belgrade",
        "Odessa"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "Chisinau",
    "region": "Ukrainian",
    "size": "SMALL",
    "adjacent": {
      "road": [
        "Kiev",
        "Bucharest",
        "Odessa",
        "Bacau",
        "Vinnytsia"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "Kryvyi Rih",
    "region": "Ukrainian",
    "size": "SMALL",
    "adjacent": {
      "road": [
        "Kharki",
        "Odessa",
        "Sevastopol",
        "Kiev"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "Kharki",
    "region": "Ukrainian",
    "size": "MEDIUM",
    "adjacent": {
      "road": [
        "Gomet",
        "Smolensk",
        "Kiev",
        "Kryvyi Rih"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "Kiev",
    "region": "Ukrainian",
    "size": "MEDIUM",
    "adjacent": {
      "road": [
        "Minsk",
        "Odessa",
        "Gomet",
        "Kryvyi Rih",
        "Lutsk",
        "Kharki",
        "Chisinau",
        "Vinnytsia"
      ],
      "rail": [
        "Minsk",
        "Odessa"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "Vinnytsia",
    "region": "Ukrainian",
    "size": "SMALL",
    "adjacent": {
      "road": [
        "Bacau",
        "Chisinau",
        "Kiev",
        "Uzhhorod",
        "Lutsk"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "Bacau",
    "region": "Ukrainian",
    "size": "SMALL",
    "adjacent": {
      "road": [
        "Uzhhorod",
        "Chisinau",
        "Bucharest",
        "Vinnytsia",
        "Arad"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "Eregli",
    "region": "Turk",
    "size": "SMALL",
    "adjacent": {
      "road": [
        "Istanbul",
        "Ankara"
      ],
      "sea": [
        "Black Sea"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "Istanbul",
    "region": "Turk",
    "size": "MEDIUM",
    "adjacent": {
      "road": [
        "Sofia",
        "Izmir",
        "Ankara",
        "Eregli",
        "Eskisehir"
      ],
      "sea": [
        "Aegean Sea",
        "Black Sea"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "Izmir",
    "region": "Turk",
    "size": "SMALL",
    "adjacent": {
      "road": [
        "Eskisehir",
        "Istanbul"
      ],
      "sea": [
        "Aegean Sea"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "Antalya",
    "region": "Turk",
    "size": "SMALL",
    "adjacent": {
      "road": [
        "Ankara",
        "Eskisehir"
      ],
      "sea": [
        "Aegean Sea"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "Ankara",
    "region": "Turk",
    "size": "MEDIUM",
    "adjacent": {
      "road": [
        "Eregli",
        "Eskisehir",
        "Antalya",
        "Istanbul"
      ]
    },
    "adjacentIndices": []
  },
  {
    "title": "Eskisehir",
    "region": "Turk",
    "size": "SMALL",
    "adjacent": {
      "road": [
        "Antalya",
        "Istanbul",
        "Izmir",
        "Ankara"
      ]
    },
    "adjacentIndices": []
  }
];