export class Publication {
  id: string
  created_at: Date
  updated_at: Date
  user_id: string
  title: string
  text: string
  liked_by_user_ids: string[]
}
