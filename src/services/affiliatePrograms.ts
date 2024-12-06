// Mock data for affiliate programs
const mockAffiliatePrograms = [
  { name: "EcoStore", category: "Sustainable Living" },
  { name: "TechGadgets", category: "Technology" },
  { name: "HealthyLife", category: "Wellness" },
  { name: "SmartHome", category: "Digital Transformation" },
  { name: "WorkFromHome", category: "Remote Work" }
];

export async function getAffiliatePrograms() {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockAffiliatePrograms;
}