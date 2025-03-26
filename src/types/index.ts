export interface User {
  id: string;
  email: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  date: string;
  completed: boolean;
  subject_id?: string;
  user_id: string;
  created_at: string;
}

export interface Subject {
  id: string;
  name: string;
  color: string;
  user_id: string;
  created_at: string;
}
