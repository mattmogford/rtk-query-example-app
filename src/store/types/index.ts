// POST data required when creating a new variant
export type NewVariant = {
  name: string;
  description: string;
  private: boolean;
  variant: string;
};

// An existing variant
export type Variant = NewVariant & {
  finished: boolean;
  id: string;
  started: boolean;
  createdAt: string;
  startedAt: string;
  finishedAt: string;
};

export type ServiceType = {
  name: string;
  createdBy: string;
  description: string;
  orderTypes: string[];
};

// Request headers
export enum Headers {
  Authorization = "authorization",
  Accept = "Accept",
}
