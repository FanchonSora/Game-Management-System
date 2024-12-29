// src/data/gameData.js

const libGameData = {
    1: {
      title: "Bro Falls: Ultimate Showdown",
      progress: {
        levelPercentage: 75, // Percentage of level completed
        expPercentage: 50,    // Percentage of experience points
        achievementsPercentage: 60, // Percentage of achievements unlocked
      },
      achievements: [
        { id: 1, name: "First Blood" },
        { id: 2, name: "Sharp Shooter" },
        { id: 3, name: "Survivor" },
      ],
    },
    2: {
      title: "Business Tour",
      progress: {
        levelPercentage: 40,
        expPercentage: 30,
        achievementsPercentage: 20,
      },
      achievements: [
        { id: 4, name: "Entrepreneur" },
        { id: 5, name: "Investor" },
      ],
    },
    3: {
      title: "Counter-Strike 2",
      progress: {
        levelPercentage: 90,
        expPercentage: 80,
        achievementsPercentage: 70,
      },
      achievements: [
        { id: 6, name: "Headshot Master" },
        { id: 7, name: "Terrorist Eliminator" },
        { id: 8, name: "Bomb Defuser" },
      ],
    },
    4: {
      title: "Cube Racer",
      progress: {
        levelPercentage: 60,
        expPercentage: 45,
        achievementsPercentage: 55,
      },
      achievements: [
        { id: 9, name: "Speedster" },
        { id: 10, name: "Obstacle Overcome" },
      ],
    },
    5: {
      title: "Goose Goose Duck",
      progress: {
        levelPercentage: 50,
        expPercentage: 35,
        achievementsPercentage: 40,
      },
      achievements: [
        { id: 11, name: "Master Goose" },
        { id: 12, name: "Lone Survivor" },
      ],
    },
    6: {
      title: "One-armed Cook",
      progress: {
        levelPercentage: 30,
        expPercentage: 25,
        achievementsPercentage: 20,
      },
      achievements: [
        { id: 13, name: "Culinary Novice" },
        { id: 14, name: "Recipe Apprentice" },
      ],
    },
    7: {
      title: "Poppy Playtime",
      progress: {
        levelPercentage: 85,
        expPercentage: 70,
        achievementsPercentage: 65,
      },
      achievements: [
        { id: 15, name: "Puzzle Solver" },
        { id: 16, name: "Ghost Hunter" },
        { id: 17, name: "Survivalist" },
      ],
    },
    8: {
      title: "TOXIKK",
      progress: {
        levelPercentage: 55,
        expPercentage: 40,
        achievementsPercentage: 50,
      },
      achievements: [
        { id: 18, name: "Toxic Master" },
        { id: 19, name: "Elemental Conqueror" },
      ],
    },
    // Additional Games Added Below
    9: {
      title: "Fortnite",
      progress: {
        levelPercentage: 80,
        expPercentage: 65,
        achievementsPercentage: 70,
      },
      achievements: [
        { id: 20, name: "Battle Royale Champion" },
        { id: 21, name: "Builder Pro" },
        { id: 22, name: "Victory Royale" },
      ],
    },
    10: {
      title: "Minecraft",
      progress: {
        levelPercentage: 90,
        expPercentage: 85,
        achievementsPercentage: 80,
      },
      achievements: [
        { id: 23, name: "Master Builder" },
        { id: 24, name: "Redstone Engineer" },
        { id: 25, name: "Explorer" },
      ],
    },
    11: {
      title: "Overwatch",
      progress: {
        levelPercentage: 70,
        expPercentage: 60,
        achievementsPercentage: 75,
      },
      achievements: [
        { id: 26, name: "Hero Master" },
        { id: 27, name: "Support Specialist" },
        { id: 28, name: "Tank Mastery" },
      ],
    },
    12: {
      title: "Among Us",
      progress: {
        levelPercentage: 65,
        expPercentage: 50,
        achievementsPercentage: 55,
      },
      achievements: [
        { id: 29, name: "Impostor" },
        { id: 30, name: "Crewmate" },
        { id: 31, name: "Saboteur" },
      ],
    },
    13: {
      title: "Apex Legends",
      progress: {
        levelPercentage: 75,
        expPercentage: 60,
        achievementsPercentage: 65,
      },
      achievements: [
        { id: 32, name: "Legendary Hero" },
        { id: 33, name: "Squad Leader" },
        { id: 34, name: "Champion" },
      ],
    },
    14: {
      title: "Valorant",
      progress: {
        levelPercentage: 85,
        expPercentage: 75,
        achievementsPercentage: 80,
      },
      achievements: [
        { id: 35, name: "Agent Master" },
        { id: 36, name: "Spike Defuser" },
        { id: 37, name: "Clutch Player" },
      ],
    },
    15: {
      title: "League of Legends",
      progress: {
        levelPercentage: 95,
        expPercentage: 90,
        achievementsPercentage: 85,
      },
      achievements: [
        { id: 38, name: "Summoner Master" },
        { id: 39, name: "Champion Slayer" },
        { id: 40, name: "Ultimate Strategist" },
      ],
    },
    16: {
      title: "The Witcher 3: Wild Hunt",
      progress: {
        levelPercentage: 88,
        expPercentage: 80,
        achievementsPercentage: 75,
      },
      achievements: [
        { id: 41, name: "Monster Slayer" },
        { id: 42, name: "Master Alchemist" },
        { id: 43, name: "Saga Completer" },
      ],
    },
    17: {
      title: "Cyberpunk 2077",
      progress: {
        levelPercentage: 70,
        expPercentage: 55,
        achievementsPercentage: 60,
      },
      achievements: [
        { id: 44, name: "Street Samurai" },
        { id: 45, name: "Net Runner" },
        { id: 46, name: "Corporate Raider" },
      ],
    },
    18: {
      title: "Hades",
      progress: {
        levelPercentage: 60,
        expPercentage: 50,
        achievementsPercentage: 65,
      },
      achievements: [
        { id: 47, name: "Godslayer" },
        { id: 48, name: "Master of Tartarus" },
        { id: 49, name: "Olympian Conqueror" },
      ],
    },
    19: {
      title: "Stardew Valley",
      progress: {
        levelPercentage: 85,
        expPercentage: 70,
        achievementsPercentage: 80,
      },
      achievements: [
        { id: 50, name: "Farming Pro" },
        { id: 51, name: "Animal Husbandry" },
        { id: 52, name: "Miner Extraordinaire" },
      ],
    },
    20: {
      title: "Red Dead Redemption 2",
      progress: {
        levelPercentage: 90,
        expPercentage: 85,
        achievementsPercentage: 80,
      },
      achievements: [
        { id: 53, name: "Outlaw" },
        { id: 54, name: "Gunfighter" },
        { id: 55, name: "Tracker" },
      ],
    },
    21: {
      title: "God of War",
      progress: {
        levelPercentage: 95,
        expPercentage: 90,
        achievementsPercentage: 85,
      },
      achievements: [
        { id: 56, name: "Blades of Chaos Mastery" },
        { id: 57, name: "Runic Attunement" },
        { id: 58, name: "Mythic Conqueror" },
      ],
    },
    22: {
      title: "Dark Souls III",
      progress: {
        levelPercentage: 80,
        expPercentage: 65,
        achievementsPercentage: 70,
      },
      achievements: [
        { id: 59, name: "Ashen Warrior" },
        { id: 60, name: "Bonfire Keeper" },
        { id: 61, name: "Undead Slayer" },
      ],
    },
  };
  
  export default libGameData;
  