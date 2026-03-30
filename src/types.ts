export type JobCategory = 'Technology' | 'Healthcare' | 'Finance' | 'Education' | 'Retail' | 'Other';
export type JobType = 'Full-time' | 'Part-time' | 'Contract' | 'Internship' | 'Remote';

export interface Job {
  id: number;
  title: string;
  company: string;
  category: JobCategory;
  type: JobType;
  location: string;
  description: string;
  salary?: string;
  logoBase64?: string;
  attachmentBase64?: string;
  attachmentName?: string;
  date: string;
}

export interface Resume {
  name: string;
  email: string;
  fileName: string;
  fileBase64: string;
  date: string;
}
