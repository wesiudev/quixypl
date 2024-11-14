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
export interface JobListing {
  days: number;
  description: any;
  email: string;
  isPaid: boolean;
  location: string;
  name: string;
  phone: string;
  price: number;
  requirements: string;
  salary: string;
  salaryValue: string;
  tags: Tag[];
  title: string;
  website: string;
}

export interface Tag {
  url: string;
  categoryUrl: string;
  categoryTitle: string;
  slugUrl: string;
  slugTitle: string;
}
