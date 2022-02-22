import React from "react";
import { AiFillHeart } from "react-icons/ai";
import styled from "styled-components";

const Footer = () => {
  return (
    <Text>
      Made with <AiFillHeart size={28} /> by Abhay{" "}
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
