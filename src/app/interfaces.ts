export interface Theme {
  id: number;
  name: string;
  color: string;
  price: number;
  itens: number[];
}

export interface Rent {
  id: number;
  date: string;
  start_hours: string;
  end_hours: string;
  client: number;
  theme: number; // ID do tema
  address: number;
}

export interface Client {
  id: number;
  name: string;
  email: string;
}


export interface Item {
  id: number;
  name: string;
  description: string;
}


export interface Address {
  id: number; 
  street: string;
  number: number;
  complement?: string; // Pode ser opcional
  district: string;
  city: string;
  state: string;
}
