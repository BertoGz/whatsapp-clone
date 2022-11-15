declare module "*.webp" {
  export default "" as string;
}
declare module "quickblox/quickblox" {
  export default "*" as any;
}
declare module "@mui/material/styles" {
  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}

declare module "*.png" {
  export default "" as string;
}
type TypeDataEntityQbUserSession = { user_id: number };
type TypeDataEntityDialog = {};
type TypeDataEntityRelationship = {
  user_id: number;
  relationship_id: number;
  isInitiator: boolean;
  initiator_id: number;
  who_block: number;
  status: 0 | 1 | 2 | 3 | 4;
};
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
  relationship: TypeDataEntityRelationship;
};
type TypeDataEntityContact = TypeDataEntityQbUser & {
  relationship: TypeDataEntityRelationship;
};
