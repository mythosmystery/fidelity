import { RepairOrder, Customer, User, Product, Estimate, Invoice, Part } from '@prisma/client';

export type RepairType = RepairOrder & {
   customer: Customer;
   intakeBy: User;
   product: Product;
   tech: User | null;
   esimates: EstimateType[];
};

export type EstimateType = Estimate & {
   invoice: Invoice;
   preparedBy: User;
   parts: Part;
};
