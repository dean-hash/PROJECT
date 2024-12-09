import { OpenAI } from 'openai';
import axios from 'axios';

interface RegulatoryRequirement {
  regulation: string;
  agency: string;
  requirements: string[];
  penalties: string[];
  deadlines: Date[];
  applicableIndustries: string[];
  companyThresholds: {
    employeeCount?: number;
    revenue?: number;
    locations?: string[];
  };
}

interface ProductCapability {
  primaryFunction: string;
  secondaryFunctions: string[];
  regulatoryAlignment: {
    regulation: string;
    satisfiedRequirements: string[];
    coverageLevel: number;
  }[];
  industryApplications: string[];
}

interface CompanyProfile {
  name: string;
  industry: string[];
  employeeCount: number;
  locations: string[];
  operationalRisks: string[];
  existingCoverage: string[];
  decisionMakers: {
    role: string;
    name: string;
    priorities: string[];
    communicationPreferences: string[];
  }[];
}

interface ComplianceGap {
  requirement: string;
  currentStatus: 'uncovered' | 'partial' | 'critical';
  potentialImpact: {
    financial: number;
    operational: string[];
    reputational: string[];
  };
  recommendedSolutions: {
    product: string;
    coverageMatch: number;
    implementation: string[];
  }[];
}

export class ComplianceMappingService {
  private openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  private readonly SEC_API_KEY = process.env.SEC_API_KEY;
  private readonly REGULATORY_API_KEY = process.env.REGULATORY_API_KEY;

  async mapProductToRegulations(
    productCapabilities: ProductCapability
  ): Promise<Map<string, RegulatoryRequirement[]>> {
    try {
      const completion = await this.openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `Analyze product capabilities and identify ALL potential regulatory requirements it could help satisfy.
                     Consider both primary and secondary functions.
                     Look for non-obvious applications and compliance requirements.
                     Consider international regulations and requirements.`
          },
          {
            role: "user",
            content: JSON.stringify(productCapabilities)
          }
        ]
      });

      return new Map(Object.entries(JSON.parse(completion.choices[0].message.content)));
    } catch (error) {
      console.error('Error mapping product to regulations:', error);
      throw error;
    }
  }

  async identifyComplianceGaps(
    company: CompanyProfile,
    regulations: RegulatoryRequirement[]
  ): Promise<ComplianceGap[]> {
    try {
      // Gather additional company data from SEC filings and other sources
      const [secFilings, industryRequirements, operationalRisks] = await Promise.all([
        this.fetchSECFilings(company.name),
        this.fetchIndustryRequirements(company.industry),
        this.fetchOperationalRisks(company.locations)
      ]);

      const completion = await this.openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `Analyze company profile against regulatory requirements.
                     Identify gaps in compliance and coverage.
                     Consider international operations and requirements.
                     Evaluate potential impacts of non-compliance.
                     Look for non-obvious regulatory obligations based on company operations.`
          },
          {
            role: "user",
            content: JSON.stringify({
              company,
              regulations,
              secFilings,
              industryRequirements,
              operationalRisks
            })
          }
        ]
      });

      return JSON.parse(completion.choices[0].message.content);
    } catch (error) {
      console.error('Error identifying compliance gaps:', error);
      throw error;
    }
  }

  async createTargetedOutreach(
    decisionMaker: CompanyProfile['decisionMakers'][0],
    complianceGaps: ComplianceGap[],
    productCapabilities: ProductCapability
  ): Promise<{
    subject: string;
    body: string;
    callToAction: string;
    supportingData: any;
  }> {
    try {
      const completion = await this.openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `Create highly personalized outreach based on decision maker's profile and compliance needs.
                     Focus on their specific responsibilities and priorities.
                     Emphasize regulatory requirements and risk mitigation.
                     Include relevant data and compliance deadlines.
                     Make the value proposition clear and compliance-focused.`
          },
          {
            role: "user",
            content: JSON.stringify({
              decisionMaker,
              complianceGaps,
              productCapabilities
            })
          }
        ]
      });

      return JSON.parse(completion.choices[0].message.content);
    } catch (error) {
      console.error('Error creating targeted outreach:', error);
      throw error;
    }
  }

  private async fetchSECFilings(companyName: string) {
    return axios.get(`https://api.sec.gov/submissions`, {
      params: {
        company: companyName
      },
      headers: {
        'Authorization': `Bearer ${this.SEC_API_KEY}`
      }
    });
  }

  private async fetchIndustryRequirements(industries: string[]) {
    return axios.get(`https://api.regulations.gov/v3/requirements`, {
      params: {
        industries: industries.join(',')
      },
      headers: {
        'Authorization': `Bearer ${this.REGULATORY_API_KEY}`
      }
    });
  }

  private async fetchOperationalRisks(locations: string[]) {
    return axios.get(`https://api.regulations.gov/v3/risks`, {
      params: {
        locations: locations.join(',')
      },
      headers: {
        'Authorization': `Bearer ${this.REGULATORY_API_KEY}`
      }
    });
  }
}

export const complianceMappingService = new ComplianceMappingService();
