import React, { useState } from 'react';
import './faq.css';

const questions = [
  {
    q: "What is the role of a Campus Ambassador?",
    a: "You promote the fest in your college, share content, and get your peers to register or attend.",
  },
  {
    q: "How will I be rewarded?",
    a: "Based on your performance and referrals — you can earn certificates, goodies, and more.",
  },
];

const FAQ = ({ id }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = idx => setOpenIndex(idx === openIndex ? null : idx);

  return (
    <div className="faqs">
    <section className="section faq-section" id={id} aria-labelledby="faq-heading">
      <h2 id="faq-heading" className="faq-title">Frequently Asked Questions</h2>
      <dl className="faq-list">
        {questions.map((item, idx) => (
          <React.Fragment key={item.q}>
            <dt
              className={`faq-question${openIndex === idx ? " open" : ""}`}
              tabIndex={0}
              onClick={() => handleToggle(idx)}
              onKeyPress={e => {
                if (e.key === "Enter" || e.key === " ") handleToggle(idx);
              }}
              aria-expanded={openIndex === idx}
              aria-controls={`faq-answer-${idx}`}
              role="button"
            >
              {item.q}
            </dt>
            <dd
              id={`faq-answer-${idx}`}
              className={`faq-answer${openIndex === idx ? " expanded" : ""}`}
              style={{
                maxHeight: openIndex === idx ? "500px" : "0",
                opacity: openIndex === idx ? 1 : 0,
                overflow: "hidden",
                transition: "max-height 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.25s cubic-bezier(0.4,0,0.2,1)"
              }}
              aria-hidden={openIndex !== idx}
            >
              {item.a}
            </dd>
          </React.Fragment>
        ))}
      </dl>
    </section>
    </div>
  );
};

export default FAQ;
