export interface NewAlert {
  message: string;
  type: 'error' | 'success' | 'info';
}

export interface QueueAlert extends NewAlert {
  id: string;
}
