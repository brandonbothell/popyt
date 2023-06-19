export type ParsedUrl = {
  video?: { id?: string }
  playlist?: { id?: string }
  channel?: { id?: string; username?: string }
}
