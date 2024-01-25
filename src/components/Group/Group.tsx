import Question from "../Question/Question";
import { GroupType, QuestionType } from "../../types";
import styles from "./group.module.scss";

interface Props {
  group: GroupType;
  questions: QuestionType[];
}

const Group = ({ group, questions }: Props) => {
  return (
    <div>
      <h2 className={styles.group__header}>{group.name}</h2>
      {questions.map((question) => (
        <Question key={question.id} question={question} />
      ))}
    </div>
  );
};

export default Group;
