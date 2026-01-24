export type TimerTemplate = {
  id: string;
  name: string;
  work: number; // seconds
  rest: number; // seconds
  rounds: number;
  color: string;
};

export const TIMER_TEMPLATES: TimerTemplate[] = [
  {
    id: "tabata",
    name: "Tabata",
    work: 20,
    rest: 10,
    rounds: 8,
    color: "#E23636", // Red for intensity
  },
  {
    id: "hiit_standard",
    name: "Standard HIIT",
    work: 30,
    rest: 30,
    rounds: 10,
    color: "#F78C6B", // Orange
  },
  {
    id: "emom_10",
    name: "EMOM 10min",
    work: 60,
    rest: 0,
    rounds: 10,
    color: "#51E5FF", // Blue
  },
  {
    id: "boxing",
    name: "Boxing Rounds",
    work: 180, // 3 mins
    rest: 60, // 1 min
    rounds: 12,
    color: "#FFD700", // Gold
  },
];
