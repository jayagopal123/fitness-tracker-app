export type Exercise = {
  id: string;
  name: string;
  muscle: string;
  category:
    | "Chest"
    | "Back"
    | "Legs"
    | "Shoulders"
    | "Arms"
    | "Core"
    | "Cardio";
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  description: string;
  benefits: string[];
  primaryMuscles: string[];
  secondaryMuscles: string[];
};

export const EXERCISES: Exercise[] = [
  // CHEST
  {
    id: "chest_bench_press",
    name: "Barbell Bench Press",
    muscle: "Chest",
    category: "Chest",
    difficulty: "Intermediate",
    description:
      "Lie on a flat bench. Grip the barbell slightly wider than shoulder-width. Lower the bar to your chest and press it back up to the starting position.",
    benefits: [
      "Builds pectoral muscle mass",
      "Increases pushing strength",
      "Engages triceps and shoulders",
    ],
    primaryMuscles: ["Pectoralis Major"],
    secondaryMuscles: ["Triceps Brachii", "Anterior Deltoids"],
  },
  {
    id: "chest_incline_dumbbell",
    name: "Incline Dumbbell Press",
    muscle: "Chest",
    category: "Chest",
    difficulty: "Intermediate",
    description:
      "Sit on an incline bench holding dumbbells. Press them up until your arms are extended, then lower them slowly to chest level.",
    benefits: [
      "Targets upper chest",
      "Improves shoulder stability",
      "Allows greater range of motion",
    ],
    primaryMuscles: ["Clavicular Pectoralis"],
    secondaryMuscles: ["Triceps", "Front Delts"],
  },
  {
    id: "chest_pushup",
    name: "Push Up",
    muscle: "Chest",
    category: "Chest",
    difficulty: "Beginner",
    description:
      "Start in a plank position. Lower your body until your chest nearly touches the floor, then push back up.",
    benefits: [
      "No equipment needed",
      "Builds core stability",
      "Functional pushing strength",
    ],
    primaryMuscles: ["Pectoralis Major"],
    secondaryMuscles: ["Triceps", "Core", "Anterior Deltoids"],
  },
  {
    id: "chest_dips",
    name: "Dips",
    muscle: "Chest",
    category: "Chest",
    difficulty: "Advanced",
    description:
      "Using parallel bars, lower your body by bending your arms while leaning forward slightly. Push back up to the top.",
    benefits: [
      "Excellent for lower chest definition",
      "Builds tricep mass",
      "Increases shoulder flexibility",
    ],
    primaryMuscles: ["Lower Pectoralis"],
    secondaryMuscles: ["Triceps", "Anterior Deltoids"],
  },

  // BACK
  {
    id: "back_deadlift",
    name: "Deadlift",
    muscle: "Back",
    category: "Back",
    difficulty: "Advanced",
    description:
      "Stand with feet hip-width apart. Hinge at hips to grip bar. Keep back flat, drive through heels to stand up straight.",
    benefits: [
      "Full body compound movement",
      "Builds posterior chain",
      "Increases raw strength",
    ],
    primaryMuscles: ["Erector Spinae", "Glutes", "Hamstrings"],
    secondaryMuscles: ["Lats", "Traps", "Forearms"],
  },
  {
    id: "back_pullup",
    name: "Pull Up",
    muscle: "Back",
    category: "Back",
    difficulty: "Intermediate",
    description:
      "Hang from a bar with palms facing away. Pull your body up until your chin passes the bar. Lower slowly.",
    benefits: [
      "Builds back width (lats)",
      "Increases functional pulling strength",
      "Improves grip strength",
    ],
    primaryMuscles: ["Latissimus Dorsi"],
    secondaryMuscles: ["Biceps", "Rhomboids"],
  },
  {
    id: "back_rows",
    name: "Barbell Row",
    muscle: "Back",
    category: "Back",
    difficulty: "Intermediate",
    description:
      "Bend knees slightly and hinge forward at hips. Pull the barbell towards your lower chest/waist.",
    benefits: [
      "Thickens the back",
      "Improves posture",
      "Strengthens lower back isometrically",
    ],
    primaryMuscles: ["Rhomboids", "Lats"],
    secondaryMuscles: ["Biceps", "Rear Deltoids"],
  },

  // LEGS
  {
    id: "legs_squat",
    name: "Barbell Squat",
    muscle: "Legs",
    category: "Legs",
    difficulty: "Advanced",
    description:
      "Place bar on upper back. Feet shoulder-width. Lower hips back and down. Drive back up.",
    benefits: [
      "King of leg exercises",
      "Releases anabolic hormones",
      "Builds core strength",
    ],
    primaryMuscles: ["Quadriceps", "Glutes"],
    secondaryMuscles: ["Hamstrings", "Calves", "Core"],
  },
  {
    id: "legs_press",
    name: "Leg Press",
    muscle: "Legs",
    category: "Legs",
    difficulty: "Beginner",
    description:
      "Sit in the machine, place feet on platform. Push platform away until legs are extended (soft knees). Lower slowly.",
    benefits: [
      "Isolates legs without back strain",
      "Allows heavy loading",
      "Safety stops available",
    ],
    primaryMuscles: ["Quadriceps"],
    secondaryMuscles: ["Glutes", "Hamstrings"],
  },
  {
    id: "legs_lunge",
    name: "Walking Lunges",
    muscle: "Legs",
    category: "Legs",
    difficulty: "Intermediate",
    description:
      "Step forward with one leg, lowering hips until both knees are bent at approx 90 degrees.",
    benefits: [
      "Improves balance",
      "Unilateral leg development",
      "Functional movement",
    ],
    primaryMuscles: ["Quads", "Glutes"],
    secondaryMuscles: ["Hamstrings", "Core"],
  },
  {
    id: "legs_rdl",
    name: "Romanian Deadlift",
    muscle: "Hamstrings",
    category: "Legs",
    difficulty: "Intermediate",
    description:
      "Hold bar. Keep legs slightly bent but stiff. Hinge at hips to lower bar along legs until stretch is felt.",
    benefits: [
      "Isolates hamstrings",
      "Builds glutes",
      "Improves hip hinge mechanics",
    ],
    primaryMuscles: ["Hamstrings"],
    secondaryMuscles: ["Glutes", "Lower Back"],
  },

  // SHOULDERS
  {
    id: "shoulder_ohp",
    name: "Overhead Press",
    muscle: "Shoulders",
    category: "Shoulders",
    difficulty: "Intermediate",
    description:
      "Stand with bar on front shoulders. Press bar vertically overhead until arms locked out. Return to start.",
    benefits: [
      "Builds total shoulder mass",
      "Engages core for stability",
      "Functional vertical pushing",
    ],
    primaryMuscles: ["Anterior Deltoid"],
    secondaryMuscles: ["Triceps", "Upper Chest", "Lateral Deltoid"],
  },
  {
    id: "shoulder_latraise",
    name: "Lateral Raise",
    muscle: "Shoulders",
    category: "Shoulders",
    difficulty: "Beginner",
    description:
      "Stand holding dumbbells at sides. Raise arms out to sides until shoulder height.",
    benefits: [
      "Widons the shoulders",
      "Isolates medial deltoid",
      "Improves V-taper look",
    ],
    primaryMuscles: ["Lateral Deltoid"],
    secondaryMuscles: ["Traps"],
  },
  {
    id: "shoulder_facepull",
    name: "Face Pulls",
    muscle: "Shoulders",
    category: "Shoulders",
    difficulty: "Beginner",
    description:
      "Using a cable rope set high, pull rope towards your face, separating hands at the end.",
    benefits: [
      "Best for shoulder health",
      "Corrects posture",
      "Targets often neglected rear delts",
    ],
    primaryMuscles: ["Rear Deltoid", "Rotator Cuff"],
    secondaryMuscles: ["Rhomboids", "Traps"],
  },

  // ARMS
  {
    id: "arms_bicepcurl",
    name: "Barbell Curl",
    muscle: "Arms",
    category: "Arms",
    difficulty: "Beginner",
    description:
      "Stand holding barbell. Curl weight up towards chest while keeping elbows pinned to sides.",
    benefits: [
      "Builds overall bicep mass",
      "Simple execution",
      "Allow relatively heavy weight",
    ],
    primaryMuscles: ["Biceps Brachii"],
    secondaryMuscles: ["Forearms"],
  },
  {
    id: "arms_tricepex",
    name: "Tricep Pushdown",
    muscle: "Arms",
    category: "Arms",
    difficulty: "Beginner",
    description:
      "Use cable machine. Keep elbows at sides. Push bar/rope down until arms fully extended.",
    benefits: ["Isolates triceps", "Constant tension", "Easy to drop set"],
    primaryMuscles: ["Triceps Brachii (Lateral Head)"],
    secondaryMuscles: ["Triceps Brachii (Long Head)"],
  },
  {
    id: "arms_hammer",
    name: "Hammer Curl",
    muscle: "Arms",
    category: "Arms",
    difficulty: "Beginner",
    description:
      "Hold dumbbells with neutral grip (palms facing each other). Curl up.",
    benefits: [
      "Targets brachialis (thickness)",
      "Forearm development",
      "Stronger grip",
    ],
    primaryMuscles: ["Brachialis", "Brachioradialis"],
    secondaryMuscles: ["Biceps"],
  },

  // CORE
  {
    id: "core_plank",
    name: "Plank",
    muscle: "Core",
    category: "Core",
    difficulty: "Beginner",
    description:
      "Hold a pushup position but on your elbows. Keep body in straight line. Hold.",
    benefits: [
      "Total core stability",
      "Prevents back pain",
      "Isometric strength",
    ],
    primaryMuscles: ["Transverse Abdominis"],
    secondaryMuscles: ["Rectus Abdominis", "Obliques"],
  },
  {
    id: "core_russiantwist",
    name: "Russian Twist",
    muscle: "Core",
    category: "Core",
    difficulty: "Intermediate",
    description:
      "Sit on floor, feet lifted. Twist torso from side to side, touching floor.",
    benefits: ["Targets obliques", "Rotational strength", "Improves balance"],
    primaryMuscles: ["Obliques"],
    secondaryMuscles: ["Rectus Abdominis"],
  },

  // CARDIO
  {
    id: "cardio_treadmill",
    name: "Treadmill Run",
    muscle: "Cardio",
    category: "Cardio",
    difficulty: "Beginner",
    description: "Running or walking on treadmill machinery.",
    benefits: ["Cardiovascular health", "Calorie burning", "Leg endurance"],
    primaryMuscles: ["Heart"],
    secondaryMuscles: ["Legs"],
  },
];
