import React, { useState, useRef } from "react";
import styled from "styled-components";
import success from "./assets/giphy.gif";
import constantsVar from "./constants";
import { UploadButton } from "./App";

const FileUploadedSuccess = ({ slug }) => {
  const linkRef = useRef(null);
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    setCopied(true);
    linkRef.current.select();
    navigator.clipboard.writeText(linkRef.current.value);
  };
  return (
    <Uploaded>
      <img src={success} alt="success..." />
      <Text>Your file(s) have been uploaded, Share using the link below.</Text>
      <ShareLink
        type="text"
        readOnly={true}
        value={`${constantsVar.hostURL}/${slug}`}
        ref={linkRef}
        onClick={handleCopy}
      />
      <UploadButton onClick={handleCopy}>
        {copied ? "Copied!" : "Copy Link"}
      </UploadButton>
    </Uploaded>
  );
};

export default FileUploadedSuccess;

const Uploaded = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
`;
const Text = styled.p`
  font-size: 22px;
`;

const ShareLink = styled.input`
  padding: 10px;
  width: 80%;
  font-size: 18px;
`;
