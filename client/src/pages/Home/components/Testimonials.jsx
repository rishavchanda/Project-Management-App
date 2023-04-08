import React from 'react';
import styled from 'styled-components';

const TestimonialsContainer = styled.div`
  background-color: #060B27;
  padding: 50px 0;
`;

const TestimonialCard = styled.div`
  background-color: #1C1E27;
  border-radius: 20px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
  padding: 30px;
  text-align: center;
  margin: 0 20px;
  width: 300px;
`;

const TestimonialText = styled.p`
  font-size: 18px;
  line-height: 1.5;
  color: #fff;
`;

const TestimonialAuthor = styled.p`
  font-size: 16px;
  font-weight: bold;
  margin-top: 20px;
  color: #854CE6;
`;

const Testimonials = () => {
  const testimonialsData = [{ id: 1, text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor justo quis felis malesuada, a feugiat elit tristique.', author: 'John Doe', jobTitle: 'CEO' }, { id: 2, text: 'Donec laoreet elit in malesuada tempus. Aliquam pretium blandit commodo. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.', author: 'Jane Smith', jobTitle: 'Marketing Manager' }, { id: 3, text: 'Fusce eget turpis eget nulla fringilla auctor. Praesent eget mi nec quam dictum consequat nec eu nibh.', author: 'David Lee', jobTitle: 'Software Engineer' }];

  return (
    <TestimonialsContainer>
      <h2>Testimonials</h2>
      <div>
        {testimonialsData.map(testimonial => (
          <TestimonialCard key={testimonial.id}>
            <TestimonialText>"{testimonial.text}"</TestimonialText>
            <TestimonialAuthor>{testimonial.author}, {testimonial.jobTitle}</TestimonialAuthor>
          </TestimonialCard>
        ))}
      </div>
    </TestimonialsContainer>
  );
};

export default Testimonials;
