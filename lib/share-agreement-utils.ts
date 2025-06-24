// Helper function to validate account number format
export function validateAccountNumber(accountNumber: string): boolean {
  // Basic validation - in real implementation, you'd check against your database
  return accountNumber.length >= 8 && /^[A-Z0-9]+$/.test(accountNumber.toUpperCase());
}

// Helper function to calculate settlement date (T+2)
export function calculateSettlementDate(executionDate: Date = new Date()): Date {
  const settlementDate = new Date(executionDate);
  
  // Add 2 business days
  let daysAdded = 0;
  while (daysAdded < 2) {
    settlementDate.setDate(settlementDate.getDate() + 1);
    // Skip weekends (Saturday = 6, Sunday = 0)
    if (settlementDate.getDay() !== 0 && settlementDate.getDay() !== 6) {
      daysAdded++;
    }
  }
  
  return settlementDate;
}

// Helper function to format currency
export function formatCurrency(amount: number, currency: string = 'CAD'): string {
  return `${currency} $${amount.toLocaleString()}`;
} 