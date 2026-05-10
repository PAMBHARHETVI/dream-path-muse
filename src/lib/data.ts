import tokyo from "@/assets/dest-tokyo.jpg";
import bali from "@/assets/dest-bali.jpg";
import paris from "@/assets/dest-paris.jpg";
import iceland from "@/assets/dest-iceland.jpg";
import dubai from "@/assets/dest-dubai.jpg";
import santorini from "@/assets/hero-bg.jpg";

export const destinations = [
  { id: "tokyo", name: "Tokyo", country: "Japan", img: tokyo, popularity: 98, budget: "$$$", tag: "Neon Nights" },
  { id: "bali", name: "Bali", country: "Indonesia", img: bali, popularity: 95, budget: "$$", tag: "Tropical Bliss" },
  { id: "paris", name: "Paris", country: "France", img: paris, popularity: 99, budget: "$$$", tag: "City of Lights" },
  { id: "iceland", name: "Reykjavík", country: "Iceland", img: iceland, popularity: 88, budget: "$$$$", tag: "Aurora Magic" },
  { id: "dubai", name: "Dubai", country: "UAE", img: dubai, popularity: 92, budget: "$$$$", tag: "Skyline Wonder" },
  { id: "santorini", name: "Santorini", country: "Greece", img: santorini, popularity: 96, budget: "$$$", tag: "Aegean Dream" },
];

export const trips = [
  {
    id: "1", name: "Japan Discovery", cover: tokyo,
    dates: "Jun 12 – Jun 26", days: 14, cities: ["Tokyo", "Kyoto", "Osaka"],
    budget: 4200, spent: 2840, status: "Active",
  },
  {
    id: "2", name: "Mediterranean Escape", cover: santorini,
    dates: "Aug 02 – Aug 14", days: 12, cities: ["Athens", "Santorini", "Mykonos"],
    budget: 5600, spent: 0, status: "Planning",
  },
  {
    id: "3", name: "Bali Soul Reset", cover: bali,
    dates: "Mar 18 – Mar 28", days: 10, cities: ["Ubud", "Canggu", "Uluwatu"],
    budget: 2800, spent: 2750, status: "Completed",
  },
  {
    id: "4", name: "Northern Lights Hunt", cover: iceland,
    dates: "Jan 05 – Jan 12", days: 7, cities: ["Reykjavík", "Vík", "Akureyri"],
    budget: 3900, spent: 0, status: "Planning",
  },
];

export const activities = [
  { id: "a1", title: "Shibuya Crossing Walk", category: "Culture", city: "Tokyo", cost: 0, img: tokyo },
  { id: "a2", title: "Sushi Omakase Dinner", category: "Food", city: "Tokyo", cost: 180, img: tokyo },
  { id: "a3", title: "Mount Fuji Day Trip", category: "Adventure", city: "Tokyo", cost: 120, img: iceland },
  { id: "a4", title: "Rooftop Jazz Bar", category: "Nightlife", city: "Tokyo", cost: 60, img: dubai },
  { id: "a5", title: "Tegallalang Rice Terraces", category: "Adventure", city: "Bali", cost: 25, img: bali },
  { id: "a6", title: "Eiffel Tower Picnic", category: "Culture", city: "Paris", cost: 35, img: paris },
];

export const packingItems = [
  { id: "p1", category: "Documents", name: "Passport", packed: true },
  { id: "p2", category: "Documents", name: "Travel Insurance", packed: true },
  { id: "p3", category: "Documents", name: "Visa Copy", packed: false },
  { id: "p4", category: "Clothing", name: "Light Jacket", packed: true },
  { id: "p5", category: "Clothing", name: "Walking Shoes", packed: false },
  { id: "p6", category: "Clothing", name: "Swimwear", packed: false },
  { id: "p7", category: "Electronics", name: "Camera + Charger", packed: false },
  { id: "p8", category: "Electronics", name: "Universal Adapter", packed: true },
  { id: "p9", category: "Electronics", name: "Power Bank", packed: false },
];

export const itinerary = [
  {
    day: 1, date: "Jun 12", city: "Tokyo",
    items: [
      { time: "09:00", title: "Arrive at Haneda Airport", cost: 0, type: "Travel" },
      { time: "13:00", title: "Check-in: Park Hyatt Tokyo", cost: 320, type: "Stay" },
      { time: "19:00", title: "Ramen at Ichiran Shibuya", cost: 18, type: "Food" },
    ],
  },
  {
    day: 2, date: "Jun 13", city: "Tokyo",
    items: [
      { time: "08:00", title: "Tsukiji Outer Market", cost: 25, type: "Food" },
      { time: "11:00", title: "Senso-ji Temple", cost: 0, type: "Culture" },
      { time: "15:00", title: "TeamLab Borderless", cost: 32, type: "Culture" },
      { time: "21:00", title: "Golden Gai Bar Crawl", cost: 80, type: "Nightlife" },
    ],
  },
  {
    day: 3, date: "Jun 14", city: "Kyoto",
    items: [
      { time: "07:30", title: "Shinkansen to Kyoto", cost: 95, type: "Travel" },
      { time: "12:00", title: "Fushimi Inari Shrine", cost: 0, type: "Culture" },
      { time: "18:00", title: "Kaiseki Dinner — Gion", cost: 220, type: "Food" },
    ],
  },
];

export const budgetBreakdown = [
  { name: "Stay", value: 1200, color: "var(--color-chart-1)" },
  { name: "Food", value: 640, color: "var(--color-chart-2)" },
  { name: "Activities", value: 480, color: "var(--color-chart-3)" },
  { name: "Travel", value: 380, color: "var(--color-chart-4)" },
  { name: "Other", value: 140, color: "var(--color-chart-5)" },
];

export const dailySpend = [
  { day: "D1", amount: 338 }, { day: "D2", amount: 155 }, { day: "D3", amount: 315 },
  { day: "D4", amount: 240 }, { day: "D5", amount: 410 }, { day: "D6", amount: 180 },
  { day: "D7", amount: 290 }, { day: "D8", amount: 360 }, { day: "D9", amount: 220 },
];
