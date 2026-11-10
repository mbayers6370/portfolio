// Sample itinerary. Named landmarks use OpenStreetMap coordinates; unnamed stops are approximate.
export type TripStop = {
  time: string;
  title: string;
  duration: string;
  note: string;
  coordinate: readonly [number, number];
};
export const itineraryDays: {
  label: string;
  weekday: string;
  title: string;
  stops: TripStop[];
}[] = [
  {
    label: "Lakes",
    weekday: "Saturday",
    title: "The lake & the mountain",
    stops: [
      {
        time: "7:40",
        title: "Early train in",
        duration: "1 h 50",
        note: "Arrive at Kawaguchiko Station.",
        coordinate: [138.7686811, 35.4984295],
      },
      {
        time: "9:30",
        title: "Lakeside walk",
        duration: "1 h",
        note: "Walk along the lake.",
        coordinate: [138.7465374, 35.52329],
      },
      {
        time: "12:15",
        title: "Noodles for lunch",
        duration: "45 min",
        note: "Have noodles for lunch.",
        coordinate: [138.7643, 35.5086],
      },
      {
        time: "15:00",
        title: "Pagoda steps",
        duration: "1 h 30",
        note: "Walk up to the pagoda.",
        coordinate: [138.8013556, 35.5012871],
      },
      {
        time: "18:30",
        title: "Hot spring, early night",
        duration: "Evening",
        note: "Relax at the hot spring.",
        coordinate: [138.7794071, 35.48393],
      },
    ],
  },
  {
    label: "Old town",
    weekday: "Sunday",
    title: "Streets worth slowing for",
    stops: [
      {
        time: "8:30",
        title: "Coffee in Yoshida",
        duration: "45 min",
        note: "Grab coffee and breakfast.",
        coordinate: [138.7995, 35.4896],
      },
      {
        time: "10:00",
        title: "Honcho Street",
        duration: "1 h",
        note: "Browse the shops.",
        coordinate: [138.8003, 35.4878],
      },
      {
        time: "11:45",
        title: "Under the cedar trees",
        duration: "1 h",
        note: "Visit the shrine.",
        coordinate: [138.7926376, 35.4710138],
      },
      {
        time: "14:00",
        title: "One more lake",
        duration: "1 h 30",
        note: "Stop by Lake Yamanaka.",
        coordinate: [138.8526, 35.4165],
      },
      {
        time: "16:30",
        title: "Back before dark",
        duration: "Evening",
        note: "Grab a snack for the train.",
        coordinate: [138.7954457, 35.4835487],
      },
    ],
  },
];
