export type ServiceType = {
  name: string;
  description: string;
};

export type NewServiceType = ServiceType;

// Request headers
export enum Headers {
  Authorization = "authorization",
  Accept = "Accept",
}
