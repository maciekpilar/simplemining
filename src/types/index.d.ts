export interface QuestionType {
  id: number;
  groupId: number;
  title: string;
  content: string;
}

export interface GroupType {
  id: number;
  columnType: "left" | "right";
  name: string;
}

export interface FAQDataType {
  groups: {
    left: GroupType[];
    right: GroupType[];
  };
  questions: QuestionType[];
}
