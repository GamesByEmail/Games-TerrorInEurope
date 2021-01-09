export interface IMapPoint {
  x: number
  y: number
}
export interface ICityMapData {
  location: IMapPoint
  titles: {
    location: IMapPoint
    title?: string
  }[]
  anchor?: IMapPoint
  type?: string
  titleClass?: string
}
export const cityMapData: { [index: string]: ICityMapData } = {
  "Aberdeen": {
    "location": {
      "x": 415,
      "y": 280
    },
    "titles": [
      {
        "location": {
          "x": 69,
          "y": 1
        }
      }
    ]
  },
  "Birmingham": {
    "location": {
      "x": 419,
      "y": 548
    },
    "titles": [
      {
        "location": {
          "x": 78,
          "y": -32
        }
      }
    ]
  },
  "Edinburgh": {
    "location": {
      "x": 385,
      "y": 352
    },
    "titles": [
      {
        "location": {
          "x": 71,
          "y": 1
        }
      }
    ]
  },
  "Newcastle": {
    "location": {
      "x": 446,
      "y": 416
    },
    "titles": [
      {
        "location": {
          "x": 68,
          "y": 2
        }
      }
    ]
  },
  "London": {
    "location": {
      "x": 493,
      "y": 623
    },
    "titles": [
      {
        "location": {
          "x": -20,
          "y": 37
        }
      }
    ],
    "anchor": {
      "x": 39,
      "y": 8
    }
  },
  "Plymouth": {
    "location": {
      "x": 322,
      "y": 701
    },
    "titles": [
      {
        "location": {
          "x": -65,
          "y": 2
        }
      }
    ]
  },
  "Bristol": {
    "location": {
      "x": 353,
      "y": 625
    },
    "titles": [
      {
        "location": {
          "x": -52,
          "y": -1
        }
      }
    ]
  },
  "Glasgow": {
    "location": {
      "x": 317,
      "y": 367
    },
    "titles": [
      {
        "location": {
          "x": -27,
          "y": -33
        }
      }
    ]
  },
  "Belfast": {
    "location": {
      "x": 264,
      "y": 434
    },
    "titles": [
      {
        "location": {
          "x": -58,
          "y": 5
        }
      }
    ]
  },
  "Dublin": {
    "location": {
      "x": 259,
      "y": 521
    },
    "titles": [
      {
        "location": {
          "x": -52,
          "y": 2
        }
      }
    ]
  },
  "Killamey": {
    "location": {
      "x": 110,
      "y": 591
    },
    "titles": [
      {
        "location": {
          "x": 0,
          "y": 34
        }
      }
    ]
  },
  "Bergen": {
    "location": {
      "x": 654,
      "y": 79
    },
    "titles": [
      {
        "location": {
          "x": 0,
          "y": 34
        }
      }
    ]
  },
  "Kristiansand": {
    "location": {
      "x": 767,
      "y": 206
    },
    "titles": [
      {
        "location": {
          "x": 2,
          "y": -30
        }
      }
    ]
  },
  "Gothenburg": {
    "location": {
      "x": 905,
      "y": 253
    },
    "titles": [
      {
        "location": {
          "x": 76,
          "y": -3
        }
      }
    ]
  },
  "Copenhagen": {
    "location": {
      "x": 919,
      "y": 371
    },
    "titles": [
      {
        "location": {
          "x": 2,
          "y": -30
        }
      }
    ]
  },
  "Kalmar": {
    "location": {
      "x": 1063,
      "y": 302
    },
    "titles": [
      {
        "location": {
          "x": 0,
          "y": 35
        }
      }
    ]
  },
  "Stockholm": {
    "location": {
      "x": 1127,
      "y": 149
    },
    "titles": [
      {
        "location": {
          "x": 5,
          "y": 38
        }
      }
    ]
  },
  "Uppsala": {
    "location": {
      "x": 1133,
      "y": 57
    },
    "titles": [
      {
        "location": {
          "x": -26,
          "y": -30
        }
      }
    ]
  },
  "Oslo": {
    "location": {
      "x": 867,
      "y": 93
    },
    "titles": [
      {
        "location": {
          "x": 0,
          "y": -35
        }
      }
    ]
  },
  "Orebro": {
    "location": {
      "x": 1006,
      "y": 145
    },
    "titles": [
      {
        "location": {
          "x": -2,
          "y": -33
        }
      }
    ]
  },
  "Helsinki": {
    "location": {
      "x": 1364,
      "y": 76
    },
    "titles": [
      {
        "location": {
          "x": -1,
          "y": -33
        }
      }
    ]
  },
  "Aalborg": {
    "location": {
      "x": 830,
      "y": 286
    },
    "titles": [
      {
        "location": {
          "x": -60,
          "y": 1
        }
      }
    ]
  },
  "Gijon": {
    "location": {
      "x": 275,
      "y": 1043
    },
    "titles": [
      {
        "location": {
          "x": 3,
          "y": 35
        }
      }
    ]
  },
  "Porto": {
    "location": {
      "x": 164,
      "y": 1166
    },
    "titles": [
      {
        "location": {
          "x": 3,
          "y": 34
        }
      }
    ]
  },
  "Lisbon": {
    "location": {
      "x": 151,
      "y": 1279
    },
    "titles": [
      {
        "location": {
          "x": 2,
          "y": 37
        }
      }
    ]
  },
  "Cadiz": {
    "location": {
      "x": 234,
      "y": 1359
    },
    "titles": [
      {
        "location": {
          "x": 0,
          "y": 35
        }
      }
    ]
  },
  "Malaga": {
    "location": {
      "x": 339,
      "y": 1363
    },
    "titles": [
      {
        "location": {
          "x": -3,
          "y": -31
        }
      }
    ]
  },
  "Valencia": {
    "location": {
      "x": 472,
      "y": 1258
    },
    "titles": [
      {
        "location": {
          "x": -2,
          "y": 33
        }
      }
    ]
  },
  "Barcelona": {
    "location": {
      "x": 554,
      "y": 1146
    },
    "titles": [
      {
        "location": {
          "x": 12,
          "y": 36
        }
      }
    ]
  },
  "Bilbao": {
    "location": {
      "x": 390,
      "y": 1057
    },
    "titles": [
      {
        "location": {
          "x": -3,
          "y": 34
        }
      }
    ]
  },
  "Madrid": {
    "location": {
      "x": 347,
      "y": 1197
    },
    "titles": [
      {
        "location": {
          "x": 1,
          "y": -33
        }
      }
    ]
  },
  "Cordoba": {
    "location": {
      "x": 290,
      "y": 1285
    },
    "titles": [
      {
        "location": {
          "x": 5,
          "y": -28
        }
      }
    ]
  },
  "Palma": {
    "location": {
      "x": 565,
      "y": 1243
    },
    "titles": [
      {
        "location": {
          "x": 6,
          "y": 35
        }
      }
    ]
  },
  "Le Havre": {
    "location": {
      "x": 491,
      "y": 724
    },
    "titles": [
      {
        "location": {
          "x": -15,
          "y": 33
        }
      }
    ]
  },
  "Marseille": {
    "location": {
      "x": 669,
      "y": 1065
    },
    "titles": [
      {
        "location": {
          "x": 5,
          "y": 36
        }
      }
    ]
  },
  "Brest": {
    "location": {
      "x": 317,
      "y": 795
    },
    "titles": [
      {
        "location": {
          "x": 0,
          "y": 34
        }
      }
    ]
  },
  "Nantes": {
    "location": {
      "x": 409,
      "y": 863
    },
    "titles": [
      {
        "location": {
          "x": 4,
          "y": 33
        }
      }
    ]
  },
  "Bordeaux": {
    "location": {
      "x": 438,
      "y": 981
    },
    "titles": [
      {
        "location": {
          "x": 3,
          "y": -30
        }
      }
    ]
  },
  "Brussels": {
    "location": {
      "x": 631,
      "y": 677
    },
    "titles": [
      {
        "location": {
          "x": 31,
          "y": 37
        }
      }
    ]
  },
  "Paris": {
    "location": {
      "x": 569,
      "y": 769
    },
    "titles": [
      {
        "location": {
          "x": 60,
          "y": -1
        }
      }
    ]
  },
  "Limoges": {
    "location": {
      "x": 545,
      "y": 891
    },
    "titles": [
      {
        "location": {
          "x": 63,
          "y": -2
        }
      }
    ]
  },
  "Toulouse": {
    "location": {
      "x": 530,
      "y": 1044
    },
    "titles": [
      {
        "location": {
          "x": 11,
          "y": 33
        }
      }
    ]
  },
  "Lyon": {
    "location": {
      "x": 665,
      "y": 932
    },
    "titles": [
      {
        "location": {
          "x": 0,
          "y": 38
        }
      }
    ]
  },
  "Strasbourg": {
    "location": {
      "x": 719,
      "y": 793
    },
    "titles": [
      {
        "location": {
          "x": -30,
          "y": 31
        }
      }
    ]
  },
  "Ajaccio": {
    "location": {
      "x": 786,
      "y": 1109
    },
    "titles": [
      {
        "location": {
          "x": 1,
          "y": 33
        }
      }
    ]
  },
  "Kiel": {
    "location": {
      "x": 848,
      "y": 447
    },
    "titles": [
      {
        "location": {
          "x": 2,
          "y": 37
        }
      }
    ]
  },
  "Hamburg": {
    "location": {
      "x": 766,
      "y": 497
    },
    "titles": [
      {
        "location": {
          "x": -77,
          "y": 7
        }
      }
    ]
  },
  "Rotterdam": {
    "location": {
      "x": 622,
      "y": 590
    },
    "titles": [
      {
        "location": {
          "x": 5,
          "y": -31
        }
      }
    ]
  },
  "Berlin": {
    "location": {
      "x": 944,
      "y": 554
    },
    "titles": [
      {
        "location": {
          "x": -2,
          "y": -35
        }
      }
    ]
  },
  "Hanover": {
    "location": {
      "x": 800,
      "y": 592
    },
    "titles": [
      {
        "location": {
          "x": 0,
          "y": -33
        }
      }
    ]
  },
  "Cologne": {
    "location": {
      "x": 713,
      "y": 634
    },
    "titles": [
      {
        "location": {
          "x": -4,
          "y": -32
        }
      }
    ]
  },
  "Frankfurt": {
    "location": {
      "x": 790,
      "y": 695
    },
    "titles": [
      {
        "location": {
          "x": 1,
          "y": -29
        }
      }
    ]
  },
  "Stuttgart": {
    "location": {
      "x": 797,
      "y": 779
    },
    "titles": [
      {
        "location": {
          "x": 5,
          "y": -32
        }
      }
    ]
  },
  "Munich": {
    "location": {
      "x": 893,
      "y": 815
    },
    "titles": [
      {
        "location": {
          "x": -4,
          "y": -32
        }
      }
    ]
  },
  "Dresden": {
    "location": {
      "x": 967,
      "y": 640
    },
    "titles": [
      {
        "location": {
          "x": -67,
          "y": 0
        }
      }
    ]
  },
  "Gdansk": {
    "location": {
      "x": 1145,
      "y": 450
    },
    "titles": [
      {
        "location": {
          "x": -1,
          "y": -33
        }
      }
    ]
  },
  "Poznan": {
    "location": {
      "x": 1077,
      "y": 557
    },
    "titles": [
      {
        "location": {
          "x": 57,
          "y": -11
        }
      }
    ]
  },
  "Wroclaw": {
    "location": {
      "x": 1094,
      "y": 646
    },
    "titles": [
      {
        "location": {
          "x": 1,
          "y": 33
        }
      }
    ]
  },
  "Prague": {
    "location": {
      "x": 975,
      "y": 727
    },
    "titles": [
      {
        "location": {
          "x": 67,
          "y": -13
        }
      }
    ]
  },
  "Brno": {
    "location": {
      "x": 1084,
      "y": 754
    },
    "titles": [
      {
        "location": {
          "x": 46,
          "y": 6
        }
      }
    ]
  },
  "Vienna": {
    "location": {
      "x": 1035,
      "y": 823
    },
    "titles": [
      {
        "location": {
          "x": 4,
          "y": 39
        }
      }
    ]
  },
  "Budapest": {
    "location": {
      "x": 1168,
      "y": 859
    },
    "titles": [
      {
        "location": {
          "x": 78,
          "y": 2
        }
      }
    ]
  },
  "Krakow": {
    "location": {
      "x": 1186,
      "y": 711
    },
    "titles": [
      {
        "location": {
          "x": 60,
          "y": 5
        }
      }
    ]
  },
  "Warsaw": {
    "location": {
      "x": 1219,
      "y": 587
    },
    "titles": [
      {
        "location": {
          "x": 4,
          "y": 39
        }
      }
    ]
  },
  "Bialystok": {
    "location": {
      "x": 1262,
      "y": 504
    },
    "titles": [
      {
        "location": {
          "x": -3,
          "y": -33
        }
      }
    ]
  },
  "St. Petersburg": {
    "location": {
      "x": 1547,
      "y": 94
    },
    "titles": [
      {
        "location": {
          "x": -1,
          "y": -33
        }
      }
    ]
  },
  "Tallinn": {
    "location": {
      "x": 1322,
      "y": 138
    },
    "titles": [
      {
        "location": {
          "x": 0,
          "y": 34
        }
      }
    ]
  },
  "Riga": {
    "location": {
      "x": 1334,
      "y": 283
    },
    "titles": [
      {
        "location": {
          "x": -16,
          "y": -32
        }
      }
    ]
  },
  "Liepaja": {
    "location": {
      "x": 1224,
      "y": 340
    },
    "titles": [
      {
        "location": {
          "x": -1,
          "y": -32
        }
      }
    ]
  },
  "Novgorod": {
    "location": {
      "x": 1588,
      "y": 182
    },
    "titles": [
      {
        "location": {
          "x": -83,
          "y": 8
        }
      }
    ]
  },
  "Pskov": {
    "location": {
      "x": 1495,
      "y": 254
    },
    "titles": [
      {
        "location": {
          "x": -2,
          "y": 34
        }
      }
    ]
  },
  "Braslaw": {
    "location": {
      "x": 1470,
      "y": 376
    },
    "titles": [
      {
        "location": {
          "x": -4,
          "y": -31
        }
      }
    ]
  },
  "Vilnius": {
    "location": {
      "x": 1372,
      "y": 435
    },
    "titles": [
      {
        "location": {
          "x": 0,
          "y": 35
        }
      }
    ]
  },
  "Kobryn": {
    "location": {
      "x": 1350,
      "y": 573
    },
    "titles": [
      {
        "location": {
          "x": 56,
          "y": 4
        }
      }
    ]
  },
  "Minsk": {
    "location": {
      "x": 1464,
      "y": 492
    },
    "titles": [
      {
        "location": {
          "x": 64,
          "y": 7
        }
      }
    ]
  },
  "Gomet": {
    "location": {
      "x": 1589,
      "y": 568
    },
    "titles": [
      {
        "location": {
          "x": 1,
          "y": 33
        }
      }
    ]
  },
  "Smolensk": {
    "location": {
      "x": 1642,
      "y": 428
    },
    "titles": [
      {
        "location": {
          "x": -2,
          "y": 36
        }
      }
    ]
  },
  "Velikiye Luki": {
    "location": {
      "x": 1575,
      "y": 319
    },
    "titles": [
      {
        "location": {
          "x": 60,
          "y": -4
        },
        "title": "Velikiye"
      },
      {
        "location": {
          "x": 60,
          "y": 15
        },
        "title": "Luki"
      }
    ]
  },
  "Tunis": {
    "location": {
      "x": 834,
      "y": 1343
    },
    "titles": [
      {
        "location": {
          "x": 0,
          "y": 34
        }
      }
    ]
  },
  "Annaba": {
    "location": {
      "x": 729,
      "y": 1345
    },
    "titles": [
      {
        "location": {
          "x": 2,
          "y": 34
        }
      }
    ]
  },
  "Algiers": {
    "location": {
      "x": 593,
      "y": 1358
    },
    "titles": [
      {
        "location": {
          "x": 0,
          "y": 39
        }
      }
    ]
  },
  "Oran": {
    "location": {
      "x": 461,
      "y": 1401
    },
    "titles": [
      {
        "location": {
          "x": -2,
          "y": 35
        }
      }
    ]
  },
  "Nador": {
    "location": {
      "x": 346,
      "y": 1428
    },
    "titles": [
      {
        "location": {
          "x": 2,
          "y": 35
        }
      }
    ]
  },
  "Rabat": {
    "location": {
      "x": 223,
      "y": 1477
    },
    "titles": [
      {
        "location": {
          "x": -3,
          "y": -34
        }
      }
    ]
  },
  "Sfax": {
    "location": {
      "x": 869,
      "y": 1455
    },
    "titles": [
      {
        "location": {
          "x": -1,
          "y": 36
        }
      }
    ]
  },
  "Zurich": {
    "location": {
      "x": 776,
      "y": 856
    },
    "titles": [
      {
        "location": {
          "x": 5,
          "y": 32
        }
      }
    ]
  },
  "Milan": {
    "location": {
      "x": 819,
      "y": 935
    },
    "titles": [
      {
        "location": {
          "x": 3,
          "y": 36
        }
      }
    ]
  },
  "Bologna": {
    "location": {
      "x": 878,
      "y": 1010
    },
    "titles": [
      {
        "location": {
          "x": 11,
          "y": 32
        }
      }
    ]
  },
  "Genoa": {
    "location": {
      "x": 785,
      "y": 1016
    },
    "titles": [
      {
        "location": {
          "x": -2,
          "y": 32
        }
      }
    ]
  },
  "Rome": {
    "location": {
      "x": 904,
      "y": 1122
    },
    "titles": [
      {
        "location": {
          "x": 61,
          "y": -11
        }
      }
    ],
    "anchor": {
      "x": -38,
      "y": 2
    }
  },
  "Naples": {
    "location": {
      "x": 993,
      "y": 1187
    },
    "titles": [
      {
        "location": {
          "x": 6,
          "y": 35
        }
      }
    ]
  },
  "Bari": {
    "location": {
      "x": 1090,
      "y": 1164
    },
    "titles": [
      {
        "location": {
          "x": -2,
          "y": 35
        }
      }
    ]
  },
  "Venice": {
    "location": {
      "x": 935,
      "y": 941
    },
    "titles": [
      {
        "location": {
          "x": 17,
          "y": 33
        }
      }
    ]
  },
  "Cagliari": {
    "location": {
      "x": 808,
      "y": 1258
    },
    "titles": [
      {
        "location": {
          "x": -44,
          "y": 28
        }
      }
    ]
  },
  "Palermo": {
    "location": {
      "x": 953,
      "y": 1297
    },
    "titles": [
      {
        "location": {
          "x": -2,
          "y": -29
        }
      }
    ]
  },
  "Catania": {
    "location": {
      "x": 1007,
      "y": 1352
    },
    "titles": [
      {
        "location": {
          "x": 2,
          "y": 35
        }
      }
    ]
  },
  "Tirana": {
    "location": {
      "x": 1175,
      "y": 1150
    },
    "titles": [
      {
        "location": {
          "x": -4,
          "y": 32
        }
      }
    ]
  },
  "Athens": {
    "location": {
      "x": 1322,
      "y": 1316
    },
    "titles": [
      {
        "location": {
          "x": -73,
          "y": 6
        }
      }
    ],
    "anchor": {
      "x": 37,
      "y": 2
    }
  },
  "Thessaloniki": {
    "location": {
      "x": 1299,
      "y": 1195
    },
    "titles": [
      {
        "location": {
          "x": 29,
          "y": 31
        }
      }
    ]
  },
  "Varna": {
    "location": {
      "x": 1483,
      "y": 1066
    },
    "titles": [
      {
        "location": {
          "x": 2,
          "y": 33
        }
      }
    ]
  },
  "Zagreb": {
    "location": {
      "x": 1055,
      "y": 943
    },
    "titles": [
      {
        "location": {
          "x": 1,
          "y": 32
        }
      }
    ]
  },
  "Sarajevo": {
    "location": {
      "x": 1133,
      "y": 1031
    },
    "titles": [
      {
        "location": {
          "x": 4,
          "y": 33
        }
      }
    ]
  },
  "Belgrade": {
    "location": {
      "x": 1208,
      "y": 993
    },
    "titles": [
      {
        "location": {
          "x": 22,
          "y": 36
        }
      }
    ]
  },
  "Skopje": {
    "location": {
      "x": 1252,
      "y": 1125
    },
    "titles": [
      {
        "location": {
          "x": 0,
          "y": -32
        }
      }
    ]
  },
  "Sofia": {
    "location": {
      "x": 1341,
      "y": 1085
    },
    "titles": [
      {
        "location": {
          "x": 2,
          "y": 37
        }
      }
    ]
  },
  "Heraklion": {
    "location": {
      "x": 1386,
      "y": 1415
    },
    "titles": [
      {
        "location": {
          "x": 0,
          "y": 36
        }
      }
    ]
  },
  "Nicosia": {
    "location": {
      "x": 1658,
      "y": 1421
    },
    "titles": [
      {
        "location": {
          "x": 0,
          "y": 37
        }
      }
    ]
  },
  "Odessa": {
    "location": {
      "x": 1593,
      "y": 901
    },
    "titles": [
      {
        "location": {
          "x": 8,
          "y": 35
        }
      }
    ]
  },
  "Sevastopol": {
    "location": {
      "x": 1669,
      "y": 995
    },
    "titles": [
      {
        "location": {
          "x": -21,
          "y": 31
        }
      }
    ]
  },
  "Lutsk": {
    "location": {
      "x": 1384,
      "y": 656
    },
    "titles": [
      {
        "location": {
          "x": 0,
          "y": 38
        }
      }
    ]
  },
  "Uzhhorod": {
    "location": {
      "x": 1309,
      "y": 784
    },
    "titles": [
      {
        "location": {
          "x": -2,
          "y": -32
        }
      }
    ]
  },
  "Arad": {
    "location": {
      "x": 1270,
      "y": 914
    },
    "titles": [
      {
        "location": {
          "x": 3,
          "y": 34
        }
      }
    ]
  },
  "Bucharest": {
    "location": {
      "x": 1402,
      "y": 993
    },
    "titles": [
      {
        "location": {
          "x": 94,
          "y": 8
        }
      }
    ]
  },
  "Chisinau": {
    "location": {
      "x": 1493,
      "y": 855
    },
    "titles": [
      {
        "location": {
          "x": 2,
          "y": 35
        }
      }
    ]
  },
  "Kryvyi Rih": {
    "location": {
      "x": 1673,
      "y": 780
    },
    "titles": [
      {
        "location": {
          "x": -50,
          "y": -3
        },
        "title": "Kryvyi"
      },
      {
        "location": {
          "x": -50,
          "y": 16
        },
        "title": "Rih"
      }
    ]
  },
  "Kharki": {
    "location": {
      "x": 1671,
      "y": 670
    },
    "titles": [
      {
        "location": {
          "x": -30,
          "y": -34
        }
      }
    ]
  },
  "Kiev": {
    "location": {
      "x": 1573,
      "y": 682
    },
    "titles": [
      {
        "location": {
          "x": -51,
          "y": 11
        }
      }
    ]
  },
  "Vinnytsia": {
    "location": {
      "x": 1473,
      "y": 752
    },
    "titles": [
      {
        "location": {
          "x": -4,
          "y": 35
        }
      }
    ]
  },
  "Bacau": {
    "location": {
      "x": 1399,
      "y": 885
    },
    "titles": [
      {
        "location": {
          "x": 0,
          "y": 36
        }
      }
    ]
  },
  "Eregli": {
    "location": {
      "x": 1619,
      "y": 1136
    },
    "titles": [
      {
        "location": {
          "x": 0,
          "y": 36
        }
      }
    ]
  },
  "Istanbul": {
    "location": {
      "x": 1508,
      "y": 1156
    },
    "titles": [
      {
        "location": {
          "x": 5,
          "y": 38
        }
      }
    ]
  },
  "Izmir": {
    "location": {
      "x": 1436,
      "y": 1301
    },
    "titles": [
      {
        "location": {
          "x": -1,
          "y": -34
        }
      }
    ]
  },
  "Antalya": {
    "location": {
      "x": 1579,
      "y": 1370
    },
    "titles": [
      {
        "location": {
          "x": -5,
          "y": -31
        }
      }
    ]
  },
  "Ankara": {
    "location": {
      "x": 1656,
      "y": 1241
    },
    "titles": [
      {
        "location": {
          "x": -6,
          "y": 39
        }
      }
    ]
  },
  "Eskisehir": {
    "location": {
      "x": 1550,
      "y": 1258
    },
    "titles": [
      {
        "location": {
          "x": -1,
          "y": 34
        }
      }
    ]
  }
};