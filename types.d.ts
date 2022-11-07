declare module "*.webp" {
  export default "" as string;
}

declare module "*.png" {
  export default "" as string;
}
type TypeDataEntityContact = any;

type TypeDataEntityQbUser = {
  id: number;
  full_name: string;
  email: string;
  login: string;
  phone: number | null;
  website: string | null;
  created_at: string;
  updated_at: string;
  last_request_at: string;
  external_user_id: number | null;
  facebook_id: number | null;
  blob_id: number | null;
  custom_data: any;
  age_over16: boolean;
  parents_contacts: string;
  user_tags: any;
  friend:{subscription:string,ask:string}
};
