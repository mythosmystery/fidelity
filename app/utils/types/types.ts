import { RepairOrder, Customer, User, Product, Estimate, Invoice, Part } from '@prisma/client';

export type RepairType = RepairOrder & {
   customer: Customer & { enteredBy: User };
   intakeBy: User;
   product: Product;
   tech: User | null;
   estimates: EstimateType[];
};

export type EstimateType = Estimate & {
   invoice: Invoice;
   preparedBy: User;
   parts: Part;
};
