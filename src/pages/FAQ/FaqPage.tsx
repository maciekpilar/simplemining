import { useState, useEffect } from "react";
import faqData from "../../constants/02-faq.json";
import Group from "../../components/Group/Group";
import { FAQDataType, GroupType } from "../../types";
import { useSearchParams } from "react-router-dom";
import styles from "./faqPage.module.scss";

const FAQPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const data = faqData as FAQDataType;
  const searchTerm = searchParams.get("search") || "";
  const [search, setSearch] = useState(searchTerm || "");
  const [filteredQuestions, setFilteredQuestions] = useState(faqData.questions);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      // Setting search params
      if (search) {
        setSearchParams({ search });
      } else {
        // Clearing search params if search is empty
        setSearchParams({});
      }

      // Question Filtering
      const regex = new RegExp(search.split(/\s+/).join(".*"), "i");
      const filtered = data.questions.filter(
        (q) => regex.test(q.title) || regex.test(q.content)
      );
      setFilteredQuestions(filtered);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [search, setSearchParams, data.questions]);

  return (
    <div className={styles.faq__wrapper}>
      <h1 className={styles.faq__header_h1}>
        FAQ - Frequently Asked Questions
      </h1>
      <h2 className={styles.faq__header_h2}>
        Look for Your question, maybe it is answered here. If not, just text to
        us.
      </h2>
      <input
        type="text"
        value={search}
        placeholder="Search questions..."
        onChange={(e) => setSearch(e.target.value)}
        className={styles.faq__input}
      />
      <div className={styles.faq__columns}>
        <div className={styles.faq__columnsLeft}>
          {faqData.groups.left.map((group) => (
            <Group
              key={group.id}
              group={group as GroupType}
              questions={filteredQuestions.filter(
                (q) => q.groupId === group.id
              )}
            />
          ))}
        </div>
        <div className={styles.faq__columnsRight}>
          {faqData.groups.right.map((group) => (
            <Group
              key={group.id}
              group={group as GroupType}
              questions={filteredQuestions.filter(
                (q) => q.groupId === group.id
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
