import styled from 'styled-components';
import HeroBgAnimation from '../components/HeroBgAnimation'


const FeaturesWrapper = styled.section`
  padding: 40px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #13111C;
`;

const FeaturesTitle = styled.div`
  font-size: 42px;
  text-align: center;
  font-weight: 700;
  margin-top: 30px;
    color: hsl(220, 80%, 75%);
    @media (max-width: 768px) {
        margin-top: 12px;
        font-size: 24px;
    }
`;


const FeatureDescription = styled.p`
  font-size: 20px;
  line-height: 1.5;
  font-weight:600px;
  width: 100%;
  max-width: 700px;
  text-align: center;
  color: hsl(246,  6%, 65%);
  margin-bottom: 80px;
  @media (max-width: 768px) {
    width: 100%;
      font-size: 16px;
      margin-bottom: 60px;
  }
`;


const FeaturesContainer = styled.div`
    grid-template-columns: repeat(2, 1fr);
    display: grid;
    grid-column-gap: 40px;
    grid-row-gap: 40px;
    @media (max-width: 768px) {
        grid-template-columns: repeat(1, 1fr);
        grid-column-gap: 30px;
        grid-row-gap: 30px;
        
    }
`;

const FeatureCard = styled.div`
  width: 300px;
  height: 200px;
  background-color: hsl(250, 24%, 9%);
  border: 1px solid #854CE6;
  border-radius: 16px;
  padding: 24px 42px;
  box-shadow: rgba(23, 92, 230, 0.15) 0px 4px 24px;
  transition: transform 0.2s ease-in-out;
  &:hover {
    transform: translateY(-10px);
  }
  @media (max-width: 768px) {
    padding: 12px 20px;
    }

`;

const FeatureIcon = styled.i`
  font-size: 3rem;
  color: #854CE6;
  margin-bottom: 20px;
`;

const FeatureTitle = styled.h3`
  font-size: 20px;
  color: hsl(220, 80%, 75%);
  margin-bottom: 10px;
`;

const FeatureCardDescription = styled.p`
  font-size: 16px;
  line-height: 1.5;
  color: hsl(246,  6%, 65%);
`;

const featuresData = [{ icon: 'fa-tasks', title: 'Project Management', description: 'Effortlessly manage your personal projects and assign tasks to team members while keeping track of progress.', }, { icon: 'fa-users', title: 'Team Collaboration', description: 'Collaborate with your team members in real-time, assign tasks, and keep track of your team’s progress.', }, { icon: 'fa-users', title: 'Community Building', description: 'Connect with members of similar interests, build communities, and grow your network.', }, { icon: 'fa-clock', title: 'Time Tracking', description: 'Track your time and improve your productivity by setting goals and keeping track of your progress.', },];

const Features = () => {
  return (
    <FeaturesWrapper>
      <FeaturesTitle>Key Features</FeaturesTitle>
      <FeatureDescription>Discover how our app simplifies project management and makes collaboration effortless.</FeatureDescription>
      <div style={{ position: 'relative' }}>
        {/* <HeroBgAnimation style={{ position: 'absolute', top: 20, left: 20, width: '80%', height: '80%', zIndex: -1 }} /> */}
        <FeaturesContainer>
          {featuresData.map((feature, index) => (
            <FeatureCard key={index} >
              <div style={{ position: 'relative' ,zIndex: 1}}>
                <FeatureIcon className={`fas ${feature.icon}`} />
                <FeatureTitle>{feature.title}</FeatureTitle>
                <FeatureCardDescription>{feature.description}</FeatureCardDescription>
              </div>
            </FeatureCard>
          ))}
        </FeaturesContainer>
      </div>
    </FeaturesWrapper>
  );
};

export default Features;