import { FaqType } from "@/enums/FaqType";

export interface CountryModel {
  value: string;
  label: string;
  language: string;
}

export interface FaqsModel {
  id: number;
  question: string;
  answer: string;
  type: FaqType;
}

export interface ExistEmailModel {
  exist: boolean;
}

export interface AccountGameRequestDto {
  username: string;
  password: string;
  realm_name: string;
  expansion: string;
  game_mail: string;
}

export interface AccountWebRequestDto {
  country: string;
  date_of_birth: string;
  first_name: string;
  last_name: string;
  cell_phone: string | null;
  email: string;
  password: string;
  language: string;
  token: string;
}

export interface LoginData {
  jwt: string;
  refresh_token: string;
  expiration_date: string;
  avatar_url: string;
  language: string;
  pending_validation: boolean;
}

export interface Characters {
  characters: Character[];
  total_quantity: number;
}

export interface Character {
  id: number;
  race_logo: string;
  class_logo: string;
  name: String;
  race: String;
  gender: String;
  class: String;
  level: number;
  xp: number;
  money: number;
  flags: String;
  note: String;
  race_id: number;
  class_id: number;
}

export interface AccountsDto {
  accounts: AccountsModel[];
  size: number;
}

export interface AccountsModel {
  id: number;
  username: string;
  account_id: number;
  email: string;
  realm: string;
  realmlist: string;
  server_id: number;
  expansion: string;
  expansion_id: number;
  web_site: string;
  avatar: string;
  status: boolean;
}

export interface AccountBannedModel {
  active: boolean;
  reason: string;
  ban_date: string;
  banned_by: string;
  unban_date: string;
}

export interface AccountMutedModel {
  mute_date: string;
  mute_time: string;
  muted_by: string;
  reason: string;
}

export interface Friends {
  friends: Character[];
  total_quantity: number;
}

interface UserModel {
  id: number;
  country: string;
  date_of_birth: string;
  first_name: string;
  last_name: string;
  cell_phone: string;
  email: string;
  rol_name: string;
  status: boolean;
  verified: boolean;
}

interface AccountBanned {
  id: number;
  bandate: string;
  unbandate: string;
  banned_by: string;
  ban_reason: string;
  active: boolean;
}

export interface AccountDetailDto {
  id: number;
  username: string;
  email: string;
  expansion: string;
  online: boolean;
  failed_logins: string;
  join_date: string;
  last_ip: string;
  mute_reason: string;
  mute_by: string;
  mute: boolean;
  last_login: string;
  os: string;
  realm: string;
  account_banned: AccountBanned;
}

export interface AccountChangePasswordGameDto {
  server_id: number;
  account_id: number;
  password: string;
  new_password: string;
}

interface Mails {
  id: number;
  message_type: number;
  sender_name: string;
  subject: string;
  body: string;
  has_items: boolean;
  expire_time: string;
  deliver_time: string;
  money: number;
  items: Items[];
}
export interface Items {
  item_id: number;
}

export interface MailsDto {
  mails: Mails[];
  size: number;
}

export interface GuildDto {
  id: number;
  name: string;
  avatar: string;
  leader_name: string;
  emblem_style: number;
  emblem_color: number;
  border_style: number;
  border_color: number;
  info: string;
  motd: string;
  create_date: string;
  bank_money: number;
  server_name: string;
  server_id: number;
  discord: string;
  members: number;
}

export interface GuildsDto {
  guilds: GuildDto[];
  size: number;
}

export interface GuildData {
  id: number;
  name: string;
  leader_name: string;
  emblem_style: number;
  emblem_color: number;
  border_style: number;
  public_access: boolean;
  border_color: number;
  info: string;
  motd: string;
  create_date: string;
  bank_money: number;
  formatted_bank_money: string;
  members: number;
  benefits: Benefit[];
  claimed_benefits: number;
  is_leader: boolean;
  discord: string;
  multi_faction: boolean;
  server_name: string;
}

interface Benefit {
  id: number;
  guild_id: number;
  logo: string;
  acquisition_date: string;
  expiration_date: string;
  title: string;
  sub_title: string;
  description: string;
}

export interface Profession {
  id: number;
  logo: string;
  name: string;
  value: number;
  max: number;
  service: Service;
}

interface Service {
  id: number;
  character_id: number;
  skill_id: number;
  name: string;
  description: string;
  score: number;
  is_public: boolean;
}

export interface BankPlans {
  id: number;
  name: string;
  description: string;
  price: number;
  logo: string;
  frecuency: number;
  features: [];
  button: string;
}

export interface ServerAvailableBank {
  id: number;
  name: string;
}

export interface CategoryDetail {
  id: number;
  name: string;
  description: string;
  disclaimer: string;
  products: Product[];
}

export interface Product {
  id: number;
  name: string;
  disclaimer: string;
  category: string;
  price: number;
  discount: number;
  discount_price: number;
  use_points: boolean;
  description: string;
  img_url: string;
  partner: string;
  reference_number: string;
}

export interface ProductDetail {
  id: number;
  name: string;
  disclaimer: string;
  category: string;
  price: number;
  discount: number;
  use_points: boolean;
  description: string;
  img_url: string;
  partner: string;
  server_id: number;
  reference_number: string;
  details: ProductDetailsModel[];
}

interface ProductDetailsModel {
  id: number;
  product_id: number;
  title: string;
  description: string;
  img_url: string;
}

export interface Transaction {
  id: number;
  price: number;
  currency: string;
  status: string;
  progress: number;
  date: string;
  reference_number: string;
  product_name: string;
  logo: string;
}
export interface TransactionDto {
  transactions: Transaction[];
  size: number;
}
export interface BuyRedirectDto {
  redirect: string;
  confirmation_url: string;
  response_url: string;
  buyer_email: string;
  signature: string;
  currency: string;
  tax_return_base: string;
  tax: string;
  amount: string;
  reference_code: string;
  description: string;
  account_id: string;
  merchant_id: string;
  test: string;
  is_payment: boolean;
}

/* Modelo para obtener el widget de la home*/
interface Benefit {
  img: string;
  alt: string;
  title: string;
}
export interface PassAzerothData {
  title: string;
  benefits: Benefit[];
  description: string;
  btn: string;
}
/* Modelo para obtener el widget Pill de la home*/
export interface WidgetPillHome {
  img: string;
  url: string;
}
/* Modelo para obtener el plan disponible para subscripciones*/
export interface PlanModel {
  name: string;
  price: number;
  discount: number;
  discounted_price: number;
  status: boolean;
  subscribe_url: string;
}
/* Modelo para obtener los beneficios premium de las  subscripciones*/
export interface SubscriptionBenefits {
  benefits: SubscriptionsBenefit[];
  size: number;
}
export interface SubscriptionsBenefit {
  id: number;
  img: string;
  name: string;
  description: string;
  reactivable: boolean;
  command: string;
  btn_txt: string;
}

/* Modelo para obtener las promociones disponibles*/
export interface PromotionsDto {
  promotions: PromotionsModel[];
  size: number;
}

export interface PromotionsModel {
  id: number;
  img: string;
  name: string;
  description: string;
  type: string;
  amount: number;
  btn_txt: string;
  min_lvl: number;
  max_lvl: number;
}

export interface GuildMemberDto {
  id: number;
  name: string;
  leader_name: string;
  emblem_style: number;
  emblem_color: number;
  border_style: number;
  public_access: boolean;
  border_color: number;
  info: string;
  motd: string;
  create_date: string;
  bank_money: number;
  formatted_bank_money: string;
  members: number;
  benefits: Benefit[];
  claimed_benefits: number;
  is_leader: boolean;
  discord: string;
  multi_faction: boolean;
  server_name: string;
  available_benefits: number;
}

export interface UserDetailDto {
  id: number | null;
  username: string;
  country: string;
  language: string;
  date_of_birth: Date | null;
  first_name: string;
  last_name: string;
  cell_phone: string;
  email: string;
  status: boolean;
  avatar: string;
  pending_validation: boolean;
}

/* Modelo para obtener los datos de la machine lotery*/

export interface MachineDto {
  logo: string;
  name: string;
  type: string;
  message: string;
  winner: boolean;
}
/* Modelo para obtener los datos de los coints lotery*/

export interface MachineCoinsDto {
  coins: number;
}

/* SERVERS MODELOS USADOS PARA LAS API DEL CONTROLADOR SERVERS */

export interface ServerModel {
  id: number;
  name: string;
  status: boolean;
  emulator: string;
  avatar: string;
  expansion: string;
  exp_name: string;
  web_site: string;
}

export interface ServerModel {
  id: number;
  name: string;
  status: boolean;
  emulator: string;
  avatar: string;
  expansion: string;
  creation_date: string;
  web_site: string;
  exp_name: string;
  api_key: string;
}

export interface AssociatedServers {
  realms: ServerModel[];
  size: number;
}

/*  MODELOS USADOS PARA LA DASHBOARD */

export interface CreditLoansServer {
  loans: number;
  users: CreditLoansUser[];
}

export interface CreditLoansUser {
  id: number;
  name: string;
  application_date: string; // Usamos string por si es una fecha ISO en formato string
  debtor: boolean;
  payment_date: string; // También puede ser un string, como la fecha ISO
  amount: number;
}

/** Modelo  Bancario para la dash Linechar */
export interface CreditLoansServerData {
  [year: string]: {
    [month: string]: {
      [day: string]: {
        loans: number;
        payments: number;
      };
    };
  };
}

/** Modelo  Usado para las cuentas de los clientes del servidor */

export interface ServerAllAccounts {
  accounts: AccountsServer[];
  size: number;
}
export interface AccountsServer {
  id: number;
  username: string;
  email: string;
  expansion: string;
  online: boolean;
  failed_logins: string;
  last_ip: string;
  os: string;
  mute: boolean;
  banned: boolean;
}
/** Modelo  Usado para mostrar los datos recopilados del servidor  */
export interface DashboardMetrics {
  total_users: number;
  online_users: number;
  total_guilds: number;
  external_registrations: number;
  character_count: number;
  alianzas: number;
  hordas: number;
  redeemed_promotions: number;
  range_level: RangeLevelDto[];
}

export interface RangeLevelDto {
  level_range: number;
  user_count: number;
}

export interface CharacterInventory {
  character_id: number;
  bag: number;
  slot: number;
  item: number;
  item_id: number;
  instance_id: number;
  name: string;
}

export interface ServerVdpDto {
  type: string;
  name: string;
  realmlist: string;
  disclaimer: string;
  information: { [key: string]: string };
  cards: CardVdp[];
  events: EventsVdp[];
  url: string;
  logo: string;
  header_center_img: string;
  header_right_img: string;
  header_left_img: string;
  youtube_url: string;
}

export interface CardVdp {
  id: number;
  value: string;
  icon: number;
  description: string;
}
export interface EventsVdp {
  id: number;
  img: string;
  title: string;
  description: string;
  disclaimer: string;
}

export interface ConfigsResponse {
  [key: string]: string;
}

export interface PlansAcquisition {
  name: string;
  price: string;
  description: string;
  features: string[];
  button_text: string;
  url: string;
}
