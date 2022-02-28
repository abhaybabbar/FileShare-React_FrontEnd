import React from "react";
import { AiFillHeart } from "react-icons/ai";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Text>
      Made with <AiFillHeart size={28} /> by{" "}
      <Author href="https://www.linkedin.com/in/babbarabhay/" target="_blank">
        Abhay
      </Author>
    </Text>
  );
};

export default Footer;

const Text = styled.p`
  color: white;
  font-size: 22px;
  display: flex;
  gap: 3px;
  align-items: center;
`;

const Author = styled.a`
  text-decoration: underline;
`;
