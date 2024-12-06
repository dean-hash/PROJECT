import { UnifiedIntelligenceField } from '../utils/unifiedIntelligenceField';

interface SupporterAccount {
  name: string;
  amountOwed: number;
  repaymentPriority: number;
  repaymentSchedule: 'immediate' | 'gradual';
}

class SupporterAccountManager {
  private supporters: SupporterAccount[] = [
    { name: 'Mike Calabrese', amountOwed: 50000, repaymentPriority: 2, repaymentSchedule: 'gradual' },
    { name: 'Joe Savoy', amountOwed: 50000, repaymentPriority: 2, repaymentSchedule: 'gradual' },
    { name: 'Alex Huang', amountOwed: 5000, repaymentPriority: 3, repaymentSchedule: 'gradual' },
    { name: 'Michael Maher', amountOwed: 250000, repaymentPriority: 4, repaymentSchedule: 'gradual' },
    { name: 'Todd Thompson', amountOwed: 64000, repaymentPriority: 1, repaymentSchedule: 'immediate' }
  ];

  private uif: UnifiedIntelligenceField;

  constructor() {
    this.uif = UnifiedIntelligenceField.getInstance();
  }

  getSupporters() {
    return this.supporters;
  }

  async allocateIncome(amount: number) {
    // Simulate allocation logic
    const allocations = this.supporters.map(supporter => ({
      name: supporter.name,
      amount: (amount * supporter.repaymentPriority) / this.supporters.reduce((sum, s) => sum + s.repaymentPriority, 0)
    }));
    return allocations;
  }

  async updateRepayments(allocations: any) {
    // Simulate repayment tracking logic
    this.supporters = this.supporters.map(supporter => {
      const allocation = allocations.find((a: any) => a.name === supporter.name);
      if (allocation) {
        return {
          ...supporter,
          amountOwed: Math.max(0, supporter.amountOwed - allocation.amount)
        };
      }
      return supporter;
    });
  }
}

export const supporterAccountManager = new SupporterAccountManager();