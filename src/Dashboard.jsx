import React, { useState } from "react";
import styled from "styled-components";
import { __DATA__ } from "./DashboardData";
import {Link} from "react-router-dom";
import { useHistory } from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import {
  MainContainer,
  Container,
  ContainerTitle,
  BarChartContainer,
  Number,
  BlackLine,
  MakeBar
} from "./styles";

function Dashboard() {
  const history = useHistory();
  return (
    <div className="dashboard">
      <div class="container">
        <div class="row align-items-center my-0">
          <div class="col-lg-7">
            <Container>
              <ContainerTitle> Dashboard </ContainerTitle> 
              <MainContainer>
                
                {__DATA__.map(({diff, distance, colors }, i) => {
                  return (
                    <BarChartContainer key={i}>
                      <Number color={colors[1]}>{diff} {distance}</Number>
                      <MakeBar height={distance * 2} colors={colors} />
                    </BarChartContainer>
                  );
                })}
              </MainContainer>
              <BlackLine />
            </Container>
            {/* <div class="chart-wrap vertical">
              
              
              <div class="grid">
                <div class="bar" style="--bar-value:20%;" data-name="Your Blog" title="Your Blog 85%"></div>
              </div>
            </div> */}
          </div>
          <div class="col-lg-5">
            <h1 class="font-weight-light">Join a new session!</h1>
            <p>
              Choose question difficulty:
            </p>
            <div>
                <Button onClick={() => history.push('/editoreasy')}>Easy</Button>
            </div>
            <div>
                <Button theme="orange" onClick={() => history.push('/editormedium')}>
                Medium
                </Button>
            </div>
            <div>
                <Button theme="red" onClick={() => history.push('/editorhard')}>
                Hard
                </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const theme = {
  green: {
    default: "#3ec779",
    hover: "#29ba6a"
  },
  orange: {
    default: "#f0b13c",
    hover: "#dba753"
  },
  red: {
    default: "#c24f32",
    hover: "#9e351c"
  }
};

const Button = styled.button`
  background-color: ${(props) => theme[props.theme].default};
  color: white;
  padding: 5px 15px;
  border-radius: 5px;
  outline: 0;
  text-transform: uppercase;
  margin: 10px 0px;
  cursor: pointer;
  box-shadow: 0px 2px 2px lightgray;
  transition: ease background-color 250ms;
  &:hover {
    background-color: ${(props) => theme[props.theme].hover};
  }
  &:disabled {
    cursor: default;
    opacity: 0.7;
  }
`;

Button.defaultProps = {
  theme: "green"
};

function clickMe() {
  alert("You clicked me!");
}

function clickMe2() {
  
  //history.push('/about');
}

const ButtonToggle = styled(Button)`
  opacity: 0.7;
  ${({ active }) =>
    active &&
    `
    opacity: 1; 
  `}
`;

const Tab = styled.button`
  padding: 10px 30px;
  cursor: pointer;
  opacity: 0.6;
  background: white;
  border: 0;
  outline: 0;
  border-bottom: 2px solid transparent;
  transition: ease border-bottom 250ms;
  ${({ active }) =>
    active &&
    `
    border-bottom: 2px solid black;
    opacity: 1;
  `}
`;

function TabGroup() {
  const [active, setActive] = useState(types[0]);
  return (
    <>
      <div>
        {types.map((type) => (
          <Tab
            key={type}
            active={active === type}
            onClick={() => setActive(type)}
          >
            {type}
          </Tab>
        ))}
      </div>
      <p />
      <p> Your payment selection: {active} </p>
    </>
  );
}

const types = ["Cash", "Credit Card", "Bitcoin"];

function ToggleGroup() {
  const [active, setActive] = useState(types[0]);
  return (
    <div>
      {types.map((type) => (
        <ButtonToggle active={active === type} onClick={() => setActive(type)}>
          {type}
        </ButtonToggle>
      ))}
    </div>
  );
}
  

export default Dashboard;