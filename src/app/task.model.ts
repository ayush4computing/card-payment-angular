export interface Task {
    id: number;
    title: string;
    description: string;
    done: boolean;
    priority?: 'low' | 'medium' | 'high';
    dueDate?: Date | null; // Add dueDate property
  }
  