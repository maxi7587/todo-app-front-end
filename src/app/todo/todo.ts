export class Todo {
  id: string;
  description: string;
  status: 'NEW'|'IN_PROGRESS'|'DONE'|'CANCELLED';
  createdAt: Date;
}
