import React, { useState } from "react";
import styled, { keyframes } from "styled-components";

// import { useHistory } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import investlogogo from './../../assest/images/investlogogo.png'


const move = keyframes`
0%{
    opacity:0;

}
95%{
    opacity:1;

}

`;
const BackgroundBox = styled.div`
  background-color: #beeefb;
  height: 50vh;
  width: 50%;

  display: flex;
  justify-content: center;
  align-items: center;

  margin: 15rem auto;

  position: relative;
  border-radius: 23px;
  border: 1px solid #053271;

  .text1 {
    z-index: ${(props) => (props.clicked ? "-700" : "700")};
    transform: ${(props) =>
      props.clicked ? "translateX(0)" : "translateX(80%)"};
    transition: transform 1s ease-in-out;
    animation: ${(props) => (props.clicked ? move : "none")} 1.5s;
  }

  .text2 {
    z-index: ${(props) => (props.clicked ? "700" : "-700")};
    animation: ${(props) => (props.clicked ? "none" : move)} 1.5s;

    transform: ${(props) =>
      props.clicked ? "translateX(-70%)" : "translateX(0%)"};
    transition: transform 1s ease-in-out;
  }

  .signin {
    position: absolute;
    top: 0%;
    text-align: center;
    z-index: ${(props) => (props.clicked ? "-400" : "400")};
    transform: ${(props) => (props.clicked ? "none" : "translateX(-40%)")};
    transition: all 0.75s;
    opacity: ${(props) => (props.clicked ? "0" : "1")};
  }
  .signup {
    position: absolute;
    top: 0%;
    text-align: center;
    z-index: ${(props) => (props.clicked ? "400" : "-400")};
    transform: ${(props) => (props.clicked ? "translateX(40%)" : "none")};
    transition: all 0.75s;
    opacity: ${(props) => (props.clicked ? "1" : "0")};
  }
`;

const Box1 = styled.div`
  background-color: #f1fdcd;
  width: 50%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;

  transform: ${(props) =>
    props.clicked ? "translateX(90%)" : "translateX(10%)"};

  transition: transform 1s;

  &::after,
  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #f1fdcd;

    z-index: -200;
  }

  &::before {
    top: 3rem;
    border-radius: 23px;
    border: 4px solid #97b1e3;
  }

  &::after {
    bottom: 3rem;
    border-radius: 23px 23px 0 0;
    border-top: 4px solid #97b1e3;
    border-right: 4px solid #97b1e3;
    border-left: 4px solid #97b1e3;
  }
`;

const Box2 = styled.div`
  background-color: #97b1e3;
  width: 45%;
  height: 100%;
  position: absolute;
  right: 0;
  top: 0;

  z-index: 600;
  transform: ${(props) =>
    props.clicked ? "translateX(-122%)" : "translateX(0%)"};
  transition: transform 1s;

  border-radius: ${(props) =>
    props.clicked ? "23px 0 0 23px" : "0 23px 23px 0"};
`;

const Form = styled.form`
  color: #1b1b1b;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 0 4rem;

  /* z-index: 100; */
`;

const Input = styled.input`
  background-color: #fff;
  border: none;
  border-bottom: 2px solid #97b1e3;

  padding: 1rem 2rem;
  margin: 0.5rem 0rem;
  width: 90%;

  &:focus {
    outline: none;
    border: none;
    border: 2px solid#97b1e3;
  }
`;


const Button = styled.button`
  border-radius: 3px;
  padding: 1rem 3.5rem;
  margin-top: 1rem;
  border: 1px solid black;
  background-color: black;
  color: #fff;
  text-transform: uppercase;
  cursor: pointer;
  letter-spacing: 1px;

  box-shadow: 0 7px #999;

  &:hover {
    background-color: #1b1b1b;
  }
  &:active {
    background-color: black;

    box-shadow: 0 5px #666;
    transform: translateY(4px);
  }

  &:focus {
    outline: none;
  }
`;

const Title = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 2rem;
`;

const Link = styled.a`
  text-decoration: none;
  color: #333;
  font-size: 1.4rem;
  margin: 1rem 0;
`;


const ButtonAnimate = styled.button`
  position: absolute;
  z-index: 1000;
  height: 5rem;
  width: 5rem;
  top: 70%;
  border: none;
  cursor: pointer;

  right: ${(props) => (props.clicked ? "55%" : "42%")};

  transform: ${(props) => (props.clicked ? "rotate(0deg)" : "rotate(360deg)")};

  transition: all 1.5s;
  background-color: transparent;

  &::before {
    content: "💸";
    font-size: 8rem;
  }

  &:focus {
    outline: none;
  }
`;

const Text = styled.div`
  position: absolute;
  z-index: 1000;
  font-size: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  letter-spacing: 0.2rem;
  color: #fff;

  padding: 0 2rem;

  .attention {
    font-size: 2.5rem;
    position: relative;
    margin-top: 2rem;
  }

  .attention-icon {
    position: absolute;
    right: ${(props) => (props.clicked ? "0" : "none")};
    top: 100%;
    font-size: 5rem;
  }
`;

// Google SSO Button component
const GoogleSSOButton = styled.button`
opacity: ${(props) => (props.isActive ? "1" : "0")};
visibility: ${(props) => (props.isActive ? "visible" : "hidden")};
border-radius: 3px;
padding: 1rem 3.5rem;
margin-top: 1rem;
border: 1px solid black;
background-color: black;
color: #fff;
text-transform: uppercase;
cursor: pointer;
letter-spacing: 1px;

box-shadow: 0 7px #999;

&:hover {
  background-color: #1b1b1b;
}
&:active {
  background-color: black;

  box-shadow: 0 5px #666;
  transform: translateY(4px);
}

&:focus {
  outline: none;
}

.signin,
  .signup {
    position: absolute;
    top: 0;
    text-align: center;
    transform: translateX(-50%);
    transition: all 1s;
    opacity: ${(props) => (props.clicked ? "1" : "0")};
    visibility: ${(props) => (props.clicked ? "visible" : "hidden")};
  }
`;

function SignIn() {
  
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();





  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('https://team4api.azurewebsites.net/api/v1/check-auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.status === 'success') {
        // console.log('Login successful:', data);
        localStorage.setItem('token', data.token); // Store the token securely

        // Redirect based on the user role
        if (data.user.role === 'client') {
          navigate('/Client_landing'); // Redirect to user dashboard
        } else if (data.user.role === 'advisor') {
          navigate('/Advisor_landing'); // Redirect to advisor dashboard
        }
      } else {
        // If login is not successful, show the error to the user
        console.error('Login failed:', data.message);
      }
    } catch (error) {
      console.error('Login request failed:', error);
      
    }
  };
  

  return (
    <>
    <div/>
      {" "}
      <BackgroundBox clicked={click}>
        <ButtonAnimate clicked={click} onClick={handleClick}></ButtonAnimate>

        <form onSubmit={handleSubmit}className="signin">
          <Title>Sign In</Title>
          <Input type="email" name="email" id="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <Input
            type="password"
            value={password}
            id="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
                    required
          />
          <Link href="#">Forgot Your Password?</Link>
          <Button>Sign In</Button>
          {/* Google SSO Button */}
          <GoogleSSOButton href="https://team4api.azurewebsites.net/api/v1/check-auth/signin-google" isActive={!click || click}>Sign In with Google</GoogleSSOButton>
        </form>

        <Form className="signup">
          <Title>Sign Up</Title>
          <Input
            type="text"
            name="username"
            id="usernameId"
            placeholder="Username"
          />

          <Input type="email" name="email" id="emailId" placeholder="Email" />
          <Input
            type="password"
            name="password"
            id="passwordId"
            placeholder="Password"
          />
          <Link href="#" onClick={handleClick}>
            Already have an Account?
          </Link>
          <Button>Sign Up</Button>
          <GoogleSSOButton isActive={click}>Sign Up with Google</GoogleSSOButton>
        </Form>

        <Text className="text1" clicked={click}>

          <img src={investlogogo} width={100}></img>
          <h1>Welcome!</h1>
          Don't have an account?
          <br />
          <span className="attention">Click on Emoji</span>
          <span className="attention-icon"></span>
        </Text>

        <Text className="text2" clicked={click}>
        <img src={investlogogo} width={100}></img>
          <h1>Hi There!</h1>
          Already have an account?
          <br />
          <span className="attention">Click on Emoji</span>
          <span className="attention-icon"></span>
        </Text>

        <Box1 clicked={click} />
        <Box2 clicked={click} />
      </BackgroundBox>
    </>
  );
}

export default SignIn;