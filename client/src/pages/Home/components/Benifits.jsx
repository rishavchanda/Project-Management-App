import styled from 'styled-components';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ForumIcon from '@mui/icons-material/Forum';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HeroBgAnimation from '../components/HeroBgAnimation'

const FeaturesWrapper = styled.section`
  padding: 40px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #181622;
  padding-bottom: 150px;
`;

const FeaturesTitle = styled.div`
  font-size: 52px;
  text-align: center;
  font-weight: 800;
  margin-top: 30px;
    color: #854CE6;
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

const Content = styled.div`
position: relative;
`;


const FeaturesContainer = styled.div`
    position: relative;
    z-index: 1;
    grid-template-columns: repeat(2, 1fr);
    display: grid;
    grid-column-gap: 60px;
    grid-row-gap: 60px;
    @media (max-width: 768px) {
        grid-template-columns: repeat(1, 1fr);
        grid-column-gap: 30px;
        grid-row-gap: 30px;
        
    }
`;

const FeatureCard = styled.div`
  width: 350px;
  height: 190px;
  position: relative;
  background-color: hsl(250, 24%, 9%);
  border: 0.1px solid #854CE6;
  border-radius: 16px;
  padding: 24px 42px;
  box-shadow: rgba(23, 92, 230, 0.15) 0px 4px 24px;
  transition: transform 0.2s ease-in-out;
  display: flex;
  &:hover {
    transform: translateY(-10px);
  }
  @media (max-width: 925px) {
    width: 300px;
    }

  @media (max-width: 728px)
  {
    padding: 20px 20px;
  }

`;

const FeatureIcon = styled.div`
  width: 80px;
  height: 80px;
  color:  #854CE6;
  position: absolute;
  top: 0px;
  right: 0px;
  flex-grow: 1;
  border-top-right-radius: 16px;
  border-bottom-left-radius: 60%;
  border-top-left-radius: 40%;
  border-bottom-right-radius: 40%;
  border: 2px solid hsl(220, 80%, 75%,8%);
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 925px) {
    width: 60px;
    height: 60px;
    }
`;

const FeatureTitle = styled.div`
  font-size: 20px;
  color: #854CE6;
  margin-bottom: 10px;
  margin-top: 30px;
  font-weight: 600;
`;

const FeatureCardDescription = styled.div`
  font-size: 16px;
  line-height: 1.5;
  color: hsl(246,  6%, 65%);
`;


const BgImage = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  @media (max-width: 768px) {
    display: none;
  }
`;

const featuresData = [{ icon: <TrendingUpIcon />, title: 'Increased Productivity', description: 'Effortlessly manage your personal projects and assign tasks to team members while keeping track of progress.', },
{ icon: <ForumIcon />, title: 'Improved Communication', description: 'Keep everyone on the same page and reduce misunderstandings with clear communication.', },
{ icon: <CheckCircleOutlineIcon />, title: 'Better Project Outcomes', description: 'Make informed decisions and track progress to ensure successful project outcomes.', }];

const Benefits = () => {

    return (
        <FeaturesWrapper>
            <FeaturesTitle>Benefits</FeaturesTitle>
            <FeatureDescription>Discover the many benefits of using our app to manage your personal and team projects.</FeatureDescription>
            <Content>
                {/* <HeroBgAnimation style={{ position: 'absolute', top: 20, left: 20, width: '80%', height: '80%', zIndex: -1 }} /> */}
                <FeaturesContainer>
                    {featuresData.map((feature, index) => (
                        <FeatureCard key={index} >
                            <div style={{flex: 1}}>
                                <FeatureTitle>{feature.title}</FeatureTitle>
                                <FeatureCardDescription>{feature.description}</FeatureCardDescription>
                            </div>
                            <FeatureIcon>
                                {feature.icon}
                            </FeatureIcon>
                        </FeatureCard>
                    ))}
                </FeaturesContainer>
                <BgImage>
                    <HeroBgAnimation />
                </BgImage>

            </Content>
        </FeaturesWrapper>
    );
};

export default Benefits;
