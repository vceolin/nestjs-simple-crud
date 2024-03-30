export class Comment {
  id: string
  publication_id: string
  user_id: string
  created_at: Date
  updated_at: Date
  text: string
  in_reply_to?: string
  liked_by_user_ids: string[]
}
