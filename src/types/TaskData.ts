
export interface TaskData {
  id: string;
  type: string;
  date: string;
  location: string;
  status: 'verified' | 'pending' | 'rejected';
  reward: number;
  imageUrl: string;
}
