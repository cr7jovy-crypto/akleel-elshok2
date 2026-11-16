export type SectionId =
  | 'home'
  | 'bible'
  | 'katamars'
  | 'verses'
  | 'stories'
  | 'acts'
  | 'tafasir'
  | 'quiz'
  | 'about';

export interface LastReadPosition {
  bookId: string;
  chapter: number;
}
