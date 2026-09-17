export type SupportRequestStatus = 'open' | 'in-progress' | 'resolved';

export interface SupportRequest {
    id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    status: SupportRequestStatus;
    createdAt: string;
}