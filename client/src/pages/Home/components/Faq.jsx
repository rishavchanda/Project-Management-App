import styled from "styled-components";

const FaqContainer = styled.section`
  background-color: #060B27;
  color: #fff;
  padding: 80px 0;
`;

const FaqTitle = styled.h2`
  text-align: center;
  font-size: 36px;
  margin-bottom: 40px;
`;

const FaqList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const FaqItem = styled.li`
  margin-bottom: 20px;
`;

const FaqQuestion = styled.h4`
  font-size: 24px;
  margin-bottom: 10px;
`;

const FaqAnswer = styled.p`
  font-size: 18px;
`;

const Faq = () => {
  const faqData = [
    {
      question: "Is my data secure?",
      answer:
        "Yes, we take security very seriously and use the latest encryption technology to protect your data.",
    },
    {
      question: "How much does the app cost?",
      answer:
        "Our app has a variety of pricing plans to fit any budget, starting at just $9.99/month.",
    },
    {
      question: "What kind of support is available?",
      answer:
        "We offer 24/7 support via email and live chat to ensure you get the help you need.",
    },
  ];

  return (
    <FaqContainer>
      <FaqTitle>Frequently Asked Questions</FaqTitle>
      <FaqList>
        {faqData.map((faq, index) => (
          <FaqItem key={index}>
            <FaqQuestion>{faq.question}</FaqQuestion>
            <FaqAnswer>{faq.answer}</FaqAnswer>
          </FaqItem>
        ))}
      </FaqList>
    </FaqContainer>
  );
};

export default Faq;
