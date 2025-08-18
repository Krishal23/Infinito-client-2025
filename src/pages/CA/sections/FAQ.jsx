import React, { useState } from "react";
import "./faq.css";

const faqs = [
  {
    question: "What is the aim of the Campus Ambassador Program?",
    answer:
      "The program aims to cultivate student leaders who promote the excitement and spirit of Infinito across their colleges, communities, and events.",
  },
  {
    question: "Who is eligible to apply as a Campus Ambassador?",
    answer:
      "Students with good communication skills, enthusiasm for the fest, and involvement in extracurricular activities are encouraged to apply.",
  },
  {
    question: "How do I register for the CA program?",
    answer:
      "You must register through the official channel provided by the Infinito team. Details will be shared on our website and social media handles.",
  },
  {
    question: "What are the main roles & responsibilities of a CA?",
    answer:
      "Your role includes bringing participation from your college, giving regular updates about Infinito, encouraging registrations, representing the fest, assisting with event logistics, and promoting Infinito positively.",
  },
  // {
  //   question: "What benefits do I get as a CA?",
  //   answer:
  //     "You gain experience in leadership and event management, receive a certificate, enjoy exclusive CA merchandise, free tickets, and networking opportunities.",
  // },
  // {
  //   question: "How will my performance be evaluated?",
  //   answer:
  //     "Performance will be tracked via event attendance, social media engagement, referrals, and student feedback, with points awarded for each activity.",
  // },
  {
    question: "What rewards & recognition are available for top CAs?",
    answer:
      "Top performers will get exclusive goodies, social media shoutouts, selfies with celebrities, surprise gifts, and featured recognition during Infinito.",
  },
  // {
  //   question: "What communication guidelines should I follow?",
  //   answer:
  //     "Use social media responsibly, respond to emails professionally, and attend scheduled meetings while maintaining a positive representation of Infinito.",
  // },
  // {
  //   question: "Is there a code of conduct?",
  //   answer:
  //     "Yes. You must maintain professionalism, integrity, and respect. Any violation of the code of conduct may result in termination from the program.",
  // },
  {
    question: "Who can I contact for queries about the program?",
    answer:
      "You can reach out to our official team by: (+91 87703 XXXXX) or  (+91 96954 XXXXX).",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faqs">
      <div className="faq-section">
        <h2 className="faq-title">INFINITO 2024 – Campus Ambassador FAQ</h2>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div key={index}>
              <div
                className={`faq-question ${
                  openIndex === index ? "open" : ""
                }`}
                onClick={() => toggleFAQ(index)}
              >
                {faq.question}
              </div>
              <div
                className={`faq-answer ${
                  openIndex === index ? "expanded" : ""
                }`}
              >
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
