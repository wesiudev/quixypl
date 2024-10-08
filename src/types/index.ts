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
  isRecruitment: boolean;
  price: any;
  isPaid: boolean;
  days: number;
  type: "quick" | "normal";
  id: string;
  expirationTime: number;
  companySize: string;
  creationTime: number;
  extraDays: number;
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
