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

// Full Terms Data with all 8 documents
export const TERMS_DATA: TermsCondition[] = [
    {
        id: '1',
        type: 'manufacturer',
        documentType: 'Sales Invoice',
        version: 'v1.2',
        content: `MANUFACTURER TERMS AND CONDITIONS - SALES INVOICE

1. PAYMENT TERMS
   1.1 Payment must be made within 30 days from the date of invoice.
   1.2 All payments shall be made in the currency specified on the invoice.
   1.3 Late payment will attract interest at the rate of 2% per month or part thereof.
   1.4 Payment shall be made by bank transfer, cheque, or other approved methods.

2. WARRANTY
   2.1 All products are covered by manufacturer warranty as specified in the warranty card.
   2.2 Warranty period commences from the date of delivery.
   2.3 Warranty covers manufacturing defects only and does not cover normal wear and tear.
   2.4 Warranty is void if the product is tampered with or repaired by unauthorized personnel.

3. DELIVERY
   3.1 Delivery timelines are estimates and not guaranteed unless specifically agreed in writing.
   3.2 Risk of loss passes to the buyer upon delivery.
   3.3 The manufacturer is not liable for delays caused by force majeure events.

4. RETURNS AND CANCELLATIONS
   4.1 Returns are accepted within 7 days of delivery for defective products only.
   4.2 Cancellations after order confirmation may attract a cancellation fee of 10%.
   4.3 Custom orders are non-returnable and non-cancellable.

5. LIABILITY
   5.1 The manufacturer's liability is limited to the invoice value of the products.
   5.2 The manufacturer is not liable for indirect or consequential damages.

6. GOVERNING LAW
   6.1 This agreement shall be governed by the laws of the jurisdiction where the manufacturer is registered.
   6.2 Any disputes shall be subject to the exclusive jurisdiction of courts in the manufacturer's location.`,
        isActive: true,
        createdBy: 'Manufacturer Admin',
        createdDate: '2025-01-15',
        lastModified: '2025-11-20',
        applicableFor: ['Sales Invoice', 'Proforma Invoice']
    },
    {
        id: '2',
        type: 'dealer',
        documentType: 'Service Invoice',
        version: 'v2.0',
        content: `DEALER BRANCH TERMS AND CONDITIONS - SERVICE INVOICE

1. SERVICE CHARGES
   1.1 All service charges are exclusive of applicable taxes unless stated otherwise.
   1.2 Service charges are subject to change based on the complexity of work required.
   1.3 Diagnostic charges are non-refundable even if service is not performed.
   1.4 Emergency service calls will attract additional charges as per our rate card.

2. PARTS AND MATERIALS
   2.1 All replacement parts are genuine OEM parts unless customer specifically requests alternatives.
   2.2 Parts replacement is subject to availability and may require advance ordering.
   2.3 Customer-supplied parts are not covered under our service warranty.
   2.4 Old replaced parts remain property of the dealer unless customer requests return.

3. SERVICE WARRANTY
   3.1 Service work is warranted for 90 days from the date of service completion.
   3.2 Warranty covers workmanship only and does not extend to parts already under manufacturer warranty.
   3.3 Warranty is void if the vehicle is serviced elsewhere during the warranty period.
   3.4 Service warranty does not cover consequential damages or failures.

4. VEHICLE CUSTODY
   4.1 The dealer will exercise reasonable care while vehicle is in our custody.
   4.2 The dealer is not responsible for personal items left in the vehicle.
   4.3 Maximum liability for vehicle damage while in custody is limited to INR 50,000.
   4.4 Vehicles left beyond 15 days after service completion will attract storage charges.

5. PAYMENT AND COLLECTION
   5.1 Full payment is required before vehicle delivery unless credit terms are pre-approved.
   5.2 We accept cash, card, UPI, and bank transfer payments.
   5.3 Vehicles will not be released until full payment is received.
   5.4 For corporate accounts, payment is due within 15 days of invoice date.`,
        isActive: true,
        createdBy: 'Branch Manager',
        createdDate: '2025-02-10',
        lastModified: '2025-12-01',
        applicableFor: ['Service Invoice', 'Job Card']
    },
    {
        id: '3',
        type: 'manufacturer',
        documentType: 'Quotation',
        version: 'v1.5',
        content: `MANUFACTURER TERMS AND CONDITIONS - QUOTATION

1. QUOTATION VALIDITY
   1.1 This quotation is valid for 30 days from the date of issue.
   1.2 Prices are subject to change after the validity period.
   1.3 Prices are based on current tax rates and may change if tax rates are revised.
   1.4 This quotation is subject to product availability at the time of order confirmation.

2. PRICING
   2.1 All prices are in Indian Rupees (INR) unless otherwise specified.
   2.2 Prices include applicable GST unless mentioned as "exclusive of taxes".
   2.3 Additional charges may apply for customization, special colors, or accessories.
   2.4 Insurance, registration, and handling charges are additional unless included in the quote.

3. ORDER CONFIRMATION
   3.1 This quotation does not constitute a binding agreement until confirmed by a purchase order.
   3.2 Advance payment may be required to confirm the order as per company policy.
   3.3 Order confirmation is subject to credit approval for corporate customers.`,
        isActive: true,
        createdBy: 'Manufacturer Admin',
        createdDate: '2025-03-05',
        lastModified: '2025-11-15',
        applicableFor: ['Quotation']
    },
    {
        id: '4',
        type: 'dealer',
        documentType: 'Purchase Order',
        version: 'v1.8',
        content: `DEALER BRANCH TERMS AND CONDITIONS - PURCHASE ORDER

1. ORDER ACCEPTANCE
   1.1 This purchase order is subject to acceptance by the supplier within 48 hours.
   1.2 Acceptance may be by written confirmation, commencement of work, or delivery of goods.
   1.3 Any modifications to this PO must be mutually agreed in writing.

2. DELIVERY TERMS
   2.1 Delivery must be made to the address specified on this purchase order.
   2.2 Delivery must be made during business hours (9 AM to 6 PM, Monday to Saturday).
   2.3 Supplier must notify us at least 24 hours before delivery.
   2.4 Partial deliveries are not accepted unless pre-approved in writing.

3. QUALITY AND INSPECTION
   3.1 All goods must meet the specifications mentioned in this purchase order.
   3.2 We reserve the right to inspect goods upon delivery.
   3.3 Defective or non-conforming goods will be rejected and returned at supplier's cost.

4. PAYMENT TERMS
   4.1 Payment terms are as specified on this purchase order (typically 30/45/60 days).
   4.2 Payment will be processed only after successful delivery and quality inspection.
   4.3 Payment will be made by RTGS/NEFT to the supplier's registered bank account.`,
        isActive: true,
        createdBy: 'Purchase Manager',
        createdDate: '2025-01-20',
        lastModified: '2025-12-05',
        applicableFor: ['Purchase Order']
    },
    {
        id: '5',
        type: 'manufacturer',
        documentType: 'Proforma Invoice',
        version: 'v1.0',
        content: `MANUFACTURER TERMS AND CONDITIONS - PROFORMA INVOICE

1. PROFORMA INVOICE VALIDITY
   1.1 This proforma invoice is valid for 15 days from the date of issue.
   1.2 This is not a tax invoice and cannot be used for accounting purposes.
   1.3 Final invoice will be issued upon payment confirmation and dispatch.

2. ORDER CONFIRMATION
   2.1 Order will be confirmed only upon receipt of advance payment as specified.
   2.2 Advance payment is typically 100% for retail customers and 50% for corporate accounts.
   2.3 Balance payment (if applicable) must be made before dispatch.

3. PRODUCT AVAILABILITY
   3.1 Products are subject to availability at the time of order confirmation.
   3.2 Lead time mentioned is approximate and may vary based on current stock levels.
   3.3 In case of non-availability, full refund will be processed or alternative suggested.`,
        isActive: true,
        createdBy: 'Sales Manager',
        createdDate: '2025-04-20',
        lastModified: '2025-11-25',
        applicableFor: ['Proforma Invoice', 'Sales Invoice']
    },
    {
        id: '6',
        type: 'dealer',
        documentType: 'Gate Pass',
        version: 'v2.2',
        content: `DEALER BRANCH TERMS AND CONDITIONS - GATE PASS

1. AUTHORIZATION
   1.1 This gate pass authorizes the movement of goods/vehicle as specified herein.
   1.2 This gate pass must be produced at the exit gate for verification.
   1.3 Goods/vehicle cannot be removed without proper authorization and signed gate pass.

2. VEHICLE/GOODS DETAILS
   2.1 All details mentioned on this gate pass must match with actual vehicle/goods being moved.
   2.2 Any discrepancy must be reported immediately to the issuing authority.
   2.3 Unauthorized items found during exit check will be confiscated.

3. VALIDITY
   3.1 This gate pass is valid only for the date and time mentioned.
   3.2 Expired gate passes will not be honored and fresh pass must be obtained.
   3.3 Single use only - pass becomes invalid after one-time exit.`,
        isActive: true,
        createdBy: 'Security Manager',
        createdDate: '2025-05-10',
        lastModified: '2025-12-02',
        applicableFor: ['Gate Pass', 'Delivery Challan']
    },
    {
        id: '7',
        type: 'dealer',
        documentType: 'Job Card',
        version: 'v2.1',
        content: `DEALER BRANCH TERMS AND CONDITIONS - JOB CARD

1. SERVICE AUTHORIZATION
   1.1 This job card authorizes the service work as described and approved by the customer.
   1.2 Additional work required will not be performed without customer approval.
   1.3 Customer signature on this job card confirms authorization for described work.

2. VEHICLE ACCEPTANCE
   2.1 Customer confirms that vehicle condition is as noted on this job card.
   2.2 Any pre-existing damage must be noted before service commencement.
   2.3 Customer must remove all valuables from the vehicle before handing over.
   2.4 Dealer is not responsible for items left in the vehicle.

3. SERVICE TIMELINE
   3.1 Estimated completion time is approximate and not guaranteed.
   3.2 Delays due to parts unavailability or unforeseen issues will be communicated promptly.
   3.3 Customer will be notified via phone/SMS when vehicle is ready for collection.

4. WARRANTY ON SERVICE
   4.1 Service work is warranted for 90 days or 2,000 km, whichever comes first.
   4.2 Warranty covers workmanship defects only.
   4.3 Warranty void if vehicle is serviced elsewhere during warranty period.`,
        isActive: true,
        createdBy: 'Service Manager',
        createdDate: '2025-06-01',
        lastModified: '2025-12-05',
        applicableFor: ['Job Card', 'Service Invoice']
    },
    {
        id: '8',
        type: 'manufacturer',
        documentType: 'Delivery Challan',
        version: 'v1.3',
        content: `MANUFACTURER TERMS AND CONDITIONS - DELIVERY CHALLAN

1. DELIVERY CONFIRMATION
   1.1 This delivery challan confirms dispatch of goods as per sales order/invoice.
   1.2 Delivery challan number must be referenced in all correspondence.
   1.3 This is not a tax invoice - final invoice will be issued separately.

2. RECEIPT AND INSPECTION
   2.1 Customer must inspect goods immediately upon delivery.
   2.2 Any shortage or damage must be noted on the delivery challan before driver leaves.
   2.3 Claims for shortage or damage not noted on challan will not be entertained.
   2.4 Customer signature confirms receipt of goods in good condition as per challan.

3. DELIVERY RESPONSIBILITIES
   3.1 Goods are delivered at customer's risk after handover.
   3.2 Customer must provide adequate manpower for unloading at delivery location.
   3.3 Driver is not responsible for unloading unless specifically agreed.

4. TRANSPORTATION
   4.1 Transportation charges are as per sales agreement.
   4.2 Insurance coverage (if any) is as mentioned in the sales order.
   4.3 Transit damage must be reported within 24 hours with photographic evidence.`,
        isActive: true,
        createdBy: 'Logistics Manager',
        createdDate: '2025-07-15',
        lastModified: '2025-12-03',
        applicableFor: ['Delivery Challan', 'Gate Pass']
    }
];

// History Data
export const HISTORY_DATA: HistoryItem[] = [
    {
        id: 'h1',
        termsId: '2',
        version: 'v2.0',
        date: '2025-12-01',
        user: 'Branch Manager',
        changes: 'Updated payment terms section and added UPI payment method',
        action: 'updated',
        previousVersion: 'v1.5'
    },
    {
        id: 'h2',
        termsId: '2',
        version: 'v1.5',
        date: '2025-10-15',
        user: 'Branch Admin',
        changes: 'Added warranty clause for service work and extended warranty period to 90 days',
        action: 'updated',
        previousVersion: 'v1.0'
    },
    {
        id: 'h3',
        termsId: '2',
        version: 'v1.0',
        date: '2025-02-10',
        user: 'Branch Manager',
        changes: 'Initial version created',
        action: 'created'
    },
    {
        id: 'h4',
        termsId: '1',
        version: 'v1.2',
        date: '2025-11-20',
        user: 'Manufacturer Admin',
        changes: 'Updated return policy and added force majeure clause',
        action: 'updated',
        previousVersion: 'v1.1'
    },
    {
        id: 'h5',
        termsId: '1',
        version: 'v1.1',
        date: '2025-08-10',
        user: 'Manufacturer Admin',
        changes: 'Modified payment terms from 45 days to 30 days',
        action: 'updated',
        previousVersion: 'v1.0'
    },
    {
        id: 'h6',
        termsId: '7',
        version: 'v2.1',
        date: '2025-12-05',
        user: 'Service Manager',
        changes: 'Added vehicle custody clause and storage charges policy',
        action: 'updated',
        previousVersion: 'v2.0'
    },
    {
        id: 'h7',
        termsId: '4',
        version: 'v1.8',
        date: '2025-12-05',
        user: 'Purchase Manager',
        changes: 'Updated delivery terms and added 48-hour notification requirement',
        action: 'updated',
        previousVersion: 'v1.7'
    },
    {
        id: 'h8',
        termsId: '6',
        version: 'v2.2',
        date: '2025-12-02',
        user: 'Security Manager',
        changes: 'Enhanced security verification process',
        action: 'updated',
        previousVersion: 'v2.1'
    }
];