// types.ts - Type Definitions and Constants

export interface TermsCondition {
   id: string;
   type: 'manufacturer' | 'dealer' | 'revised';
   documentType: string;
   version: string;
   content: string;
   isActive: boolean;
   createdBy: string;
   createdDate: string;
   lastModified: string;
   applicableFor: string[];
}

export interface HistoryItem {
   id: string;
   termsId: string;
   version: string;
   date: string;
   user: string;
   changes: string;
   action: 'created' | 'updated' | 'activated' | 'deactivated';
   previousVersion?: string;
}

export type ModalMode = 'view' | 'edit' | 'create';

export const DOCUMENT_TYPES = [
   'Sales Invoice',
   'Service Invoice',
   'Quotation',
   'Proforma Invoice',
   'Purchase Order',
   'Job Card',
   'Gate Pass',
   'Delivery Challan',
];
