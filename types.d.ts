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
type TypeDataEntityMessage = {
  all_read: boolean;
  attachments: Array<unknown>;
  chat_dialog_id: string; //dialog_id
  created_at: string;
  date_sent: number;
  delivered_ids: Array<number>;
  message: string;
  read: boolean;
  read_ids: Array<number>;
  recipient_id: number;
  sender_id: number;
  updated_at: string;
  _id: number; // message_id
};
type TypeDataEntityDialog = {
  _id: string;
  created_at: string;
  data: { relationship_id: number };
  last_message: string | null;
  last_message_date_sent: string | null;
  last_message_id: string | null;
  last_message_user_id: string | null;
  name: string;
  occupants_ids: Array<number>;
  photo: string | null;
  type: 1 | 2 | 3;
  updated_at: string;
  user_id: number;
  xmpp_room_jid: number | null;
  unread_messages_count: number;
};
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
type TypeDataEntityContact = {
  user: TypeDataEntityQbUser;
  dialog: TypeDataEntityDialog;
  relationship: TypeDataEntityRelationship;
};
type TypePropsContactListItem = {
  user: TypeDataEntityContact;
} & {
  dialog: TypeDataEntityDialog;
};
