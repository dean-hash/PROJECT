import { OpenAI } from 'openai';
import axios from 'axios';

interface SocioeconomicData {
  region: string;
  medianIncome: number;
  educationLevels: Map<string, number>;
  economicMobility: number;
  majorEmployers: string[];
}

interface EducationalMetrics {
  schoolDistrict: string;
  honorRollPercentage: number;
  graduationRate: number;
  collegeAcceptanceRate: number;
  averageGPA: number;
}

interface CareerPathway {
  field: string;
  entryRequirements: string[];
  timeToCompletion: number;
  projectedIncome: {
    initial: number;
    fiveYear: number;
    tenYear: number;
  };
  financialAidOptions: string[];
  roi: number;
}

interface TransformativeOpportunity {
  targetDemographic: string;
  currentSituation: {
    challenges: string[];
    barriers: string[];
    potentials: string[];
  };
  pathway: CareerPathway;
  impactMetrics: {
    incomeDelta: number;
    careerLongevity: number;
    skillTransferability: number;
    generationalImpact: number;
  };
  accessibilityFactors: {
    financialAid: boolean;
    prerequisites: string[];
    supportServices: string[];
  };
}

export class OpportunityMappingService {
  private openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  private readonly EDUCATION_API_KEY = process.env.EDUCATION_API_KEY;
  private readonly LABOR_STATS_API_KEY = process.env.LABOR_STATS_API_KEY;

  async identifyTransformativeOpportunities(
    region: string,
    industry: string
  ): Promise<TransformativeOpportunity[]> {
    try {
      // Gather comprehensive data
      const [socioeconomicData, educationMetrics, careerData] = await Promise.all([
        this.fetchSocioeconomicData(region),
        this.fetchEducationMetrics(region),
        this.fetchCareerPathways(industry)
      ]);

      const completion = await this.openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `Identify transformative career opportunities that can break cycles of poverty. 
                     Focus on high-ROI education paths that are accessible with financial aid.
                     Look for matches between honor roll students in lower-income areas and high-growth careers.
                     Consider long-term impact including generational wealth potential.`
          },
          {
            role: "user",
            content: JSON.stringify({
              socioeconomicData,
              educationMetrics,
              careerData
            })
          }
        ]
      });

      return JSON.parse(completion.choices[0].message.content);
    } catch (error) {
      console.error('Error identifying transformative opportunities:', error);
      throw error;
    }
  }

  async mapBarriersToResources(opportunity: TransformativeOpportunity): Promise<Map<string, string[]>> {
    try {
      const completion = await this.openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `Analyze barriers to accessing career opportunities and map them to available resources.
                     Consider financial aid, support services, mentorship programs, and prerequisite assistance.
                     Focus on practical solutions that can overcome specific barriers.`
          },
          {
            role: "user",
            content: JSON.stringify(opportunity)
          }
        ]
      });

      return new Map(Object.entries(JSON.parse(completion.choices[0].message.content)));
    } catch (error) {
      console.error('Error mapping barriers to resources:', error);
      throw error;
    }
  }

  async calculateLifetimeValue(pathway: CareerPathway): Promise<{
    individual: number;
    generational: number;
    communityImpact: number;
  }> {
    try {
      const completion = await this.openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `Calculate the long-term value of a career pathway.
                     Consider individual earnings, potential generational wealth creation,
                     and broader community economic impact.`
          },
          {
            role: "user",
            content: JSON.stringify(pathway)
          }
        ]
      });

      return JSON.parse(completion.choices[0].message.content);
    } catch (error) {
      console.error('Error calculating lifetime value:', error);
      throw error;
    }
  }

  private async fetchSocioeconomicData(region: string): Promise<SocioeconomicData> {
    const response = await axios.get(`https://api.census.gov/data/v1/socioeconomic`, {
      params: {
        region,
        metrics: ['income', 'education', 'employment']
      }
    });
    return response.data;
  }

  private async fetchEducationMetrics(region: string): Promise<EducationalMetrics[]> {
    const response = await axios.get(`https://api.education.gov/v1/metrics`, {
      params: {
        region,
        metrics: ['gpa', 'graduation', 'college-acceptance']
      },
      headers: {
        'Authorization': `Bearer ${this.EDUCATION_API_KEY}`
      }
    });
    return response.data;
  }

  private async fetchCareerPathways(industry: string): Promise<CareerPathway[]> {
    const response = await axios.get(`https://api.bls.gov/v1/careers`, {
      params: {
        industry,
        metrics: ['salary', 'growth', 'requirements']
      },
      headers: {
        'Authorization': `Bearer ${this.LABOR_STATS_API_KEY}`
      }
    });
    return response.data;
  }
}

export const opportunityMappingService = new OpportunityMappingService();
