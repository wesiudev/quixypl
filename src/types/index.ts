export interface IProjectImage {
  src: string;
  desc: string;
}

export interface IProject {
  name: string;
  desc: string;
  images: IProjectImage[];
  url: string;
  time: string;
  price: any;
  days: number;
  id: string;
  creationTime: number;
  isPaid: boolean;
  extraDays: number;
  salaryValue: string;
  duration: string;
  tags: any;
  userType: string;
  pseudo: string;
}

export type GenerateIdeaParams = {
  additional: string;
  place: string;
  product: string;
  target: string;
  investment: string;
};
export type ImageProps = {
  src: string;
  prompt: string;
  author: string;
  isPublic: boolean;
  likes: number;
  comments: [];
  creationTime: number;
};

export type IdeaResponse = {
  name: string;
  content: string;
};

export type Offer = {
  generatedIdeaTitle: string;
  generatedIdeaDesc: string;
  offerCategory: string;
  offerSubcategory: string;
  candidates: Candidate[];
  offerPrice: number;
  bids: Bid[];
  opId: string;
  opJoined: Date;
  opProfileComments: Comment[];
  opTotalSpent: number;
  opTotalReceived: number;
  opProfileVerified: boolean;
};

export type JobPosting = {
  authorId: string;
  creationTime: number;
  days: string;
  description: string;
  email: string;
  expirationTime: number;
  id: string;
  isPaid: boolean;
  location: string;
  name: string;
  phone: string;
  price: number;
  requirements: string;
  salary: string;
  salaryValue: string;
  tags: Array<{
    categoryTitle: string;
    categoryUrl: string;
    slugTitle: string;
    slugUrl: string;
  }>;
  title: string;
  url: string;
  website: string;
  slug: string;
  category: string;
  job: string;
};
export type Candidate = {
  id: string;
  name: string;
  email: string;
  verified: boolean;
  profileComments: Comment[];
  totalSpent: number;
  totalReceived: number;
  profileVerified: boolean;
};

export type Bid = {
  id: string;
  amount: number;
  createdAt: Date;
  candidateId: string;
  offerId: string;
};

export type Comment = {
  id: string;
  text: string;
  createdAt: Date;
  authorId: string;
  authorName: string;
  authorEmail: string;
  authorVerified: boolean;
  offerId?: string;
  candidateId?: string;
};
export type JobOffer = {
  city: string; // City where the job is located
  days: number; // Duration of the job in days
  description: string; // Job description in HTML format
  email: string; // Contact email for the job
  isPaid: boolean; // Whether the job is paid or not
  location: string; // Additional location details
  name: string; // Name of the company or person offering the job
  phone: string; // Contact phone number
  places: string[]; // Array of place types (e.g., 'Hybrydowy')
  preferences: string[]; // Array of job preferences (e.g., 'Umowa o pracę', 'Pełny etat')
  price: number; // Price or hourly rate for the job
  region: string; // Region where the job is located
  requirements: string; // Additional job requirements
  salary: string; // Salary type (e.g., 'Per Milestone')
  salaryValue: string; // General salary value (optional field)
  salaryValueBruttoFrom: number | string; // Gross salary range (from)
  salaryValueBruttoTo: number | string; // Gross salary range (to)
  salaryValueNettoFrom: number | string; // Net salary range (from)
  salaryValueNettoTo: number | string; // Net salary range (to)
  specializations: string[]; // Array of specializations (e.g., 'AI/ML')
  tags: string[]; // Array of tags associated with the job
  technologies: string[]; // Array of technologies required for the job
  title: string; // Title of the job offer
  website: string; // Company or job website URL
  logo: string;
  niceToHave: string;
  responsibilities: string;
  weOffer: string;
  job: string;
  category: string;
  slug: string;
  creationTime: string;
  uid: string;
  level: string;
};

export interface Tag {
  url: string;
  categoryUrl: string;
  categoryTitle: string;
  slugUrl: string;
  slugTitle: string;
}
