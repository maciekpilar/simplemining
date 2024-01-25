import { useState } from "react";
import { QuestionType } from "../../types";
import { motion } from "framer-motion";
import chevron from "../../assets/chevron-right.svg";
import styles from "./question.module.scss";

interface Props {
  key: number;
  question: QuestionType;
}

const Question = ({ question }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <h3 onClick={() => setIsOpen(!isOpen)} className={styles.question__title}>
        {question.title}
        <motion.img
          animate={{ rotate: isOpen ? 90 : 0 }}
          src={chevron}
          alt="chevron icon"
          width={30}
          height={30}
        />
      </h3>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          dangerouslySetInnerHTML={{ __html: question.content }}
          className={styles.question__content}
        />
      )}
    </div>
  );
};

export default Question;
