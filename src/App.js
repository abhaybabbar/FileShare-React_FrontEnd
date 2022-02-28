import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { AiFillFileAdd, AiFillCloseCircle } from "react-icons/ai";
import constantsVar from "./constants";
import FileUploadedSuccess from "./FileUploadedSuccess";
import uploading from "./assets/uploading.gif";
import Footer from "./Footer";

function App() {
  const [files, setFiles] = useState([]);
  const [haveFiles, setHaveFiles] = useState(false);
  const [uploadedData, setUplaodedData] = useState(null);
  const [totalFilesSize, setTotalFileSize] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const hiddenFileInput = useRef(null);
  const textAreaInput = useRef(null);

  const handleClick = (e) => {
    hiddenFileInput.current.click();
  };

  const handleSelectedFiles = (e) => {
    setFiles((prevState) => {
      setHaveFiles(true);
      let newArray = [...prevState, ...e.target.files];
      console.log(newArray);
      return newArray;
    });
  };

  const handleFileDelete = (file) => {
    setFiles((prevState) => {
      return prevState.filter((item) => {
        return item != file;
      });
    });
  };

  useEffect(() => {
    if (files.length > 0) {
      let size = files.reduce((a, b) => {
        return a + b["size"];
      }, 0);
      setTotalFileSize(size);
    } else {
      setHaveFiles(false);
    }
  }, [files]);

  const getFileSize = (fileSize) => {
    var i = 0;
    var fSExt = new Array("Bytes", "KB", "MB", "GB");
    while (fileSize > 900) {
      fileSize /= 1024;
      i++;
    }
    return Math.round(fileSize * 100) / 100 + " " + fSExt[i];
  };

  const handleServerUpload = async () => {
    setIsUploading(true);
    const formData = new FormData();
    console.log("---------------");
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }
    formData.append("message", textAreaInput.current.value);
    try {
      const response = await fetch(
        `${constantsVar.backendBaseURl}/file-upload/`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      if (response.status === 200) {
        console.log(data);
        setUplaodedData(data);
      } else {
        console.log("no");
        // do something
      }
    } catch (e) {
      console.log(e);
    }
    setIsUploading(false);
  };

  return (
    <Main>
      <MainContainer>
        {uploadedData === null ? (
          <>
            <input
              type="file"
              style={{ display: "none" }}
              ref={hiddenFileInput}
              multiple
              onChange={handleSelectedFiles}
            />
            {!haveFiles ? (
              <DropContainer onClick={handleClick}>
                <AiFillFileAdd size={60} className="fileicon" />
                <InitialText>Start By Adding Some Files</InitialText>
              </DropContainer>
            ) : isUploading ? (
              <img src={uploading} alt="Uploading.." />
            ) : (
              <HaveFiles>
                <AlternateDropContainer>
                  <FilesDetail>
                    {files.map((file, index) => {
                      return (
                        <FileContainer key={index}>
                          <FileDetail>
                            <div>
                              <FileName>{file.name}</FileName>
                              <FileSize>{getFileSize(file.size)}</FileSize>
                            </div>
                            <div>
                              <CloseIcon
                                size={20}
                                onClick={() => handleFileDelete(file)}
                              />
                            </div>
                          </FileDetail>
                          <hr />
                        </FileContainer>
                      );
                    })}
                  </FilesDetail>
                  <FileInsights>
                    <FilesLength>
                      <p>{files.length}</p>
                      <p>Total Files</p>
                    </FilesLength>
                    <FilesSpaceUsed>
                      <p>{getFileSize(totalFilesSize)}</p>
                      <p>Total File Size</p>
                    </FilesSpaceUsed>
                  </FileInsights>
                  {!(totalFilesSize > 262144000) ? (
                    <UploadButton onClick={handleClick}>
                      Upload more Files
                    </UploadButton>
                  ) : (
                    <DisabledUploadButton>
                      Max Total Size is 250MB
                    </DisabledUploadButton>
                  )}
                </AlternateDropContainer>
                <MessageAndUpload>
                  <TextBox
                    placeholder="message(optional)"
                    ref={textAreaInput}
                  ></TextBox>
                  {!(totalFilesSize > 262144000) ? (
                    <UploadToServer onClick={handleServerUpload}>
                      Upload
                    </UploadToServer>
                  ) : (
                    <DisabledUploadToServer>Upload</DisabledUploadToServer>
                  )}
                </MessageAndUpload>
              </HaveFiles>
            )}
          </>
        ) : (
          <FileUploadedSuccess slug={uploadedData.slug}></FileUploadedSuccess>
        )}
      </MainContainer>
      <Footer />
    </Main>
  );
}

export default App;

const Main = styled.div`
  background-color: ${constantsVar.backgroundColor};
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const MainContainer = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 80%;
  border-radius: 20px;
  padding: 20px;
  overflow-y: auto;

  @media (max-width: 1200px) {
    width: 70%;
  }

  @media (max-width: 600px) {
    width: 95%;
  }
`;

const DropContainer = styled.div`
  border: 3px dashed ${constantsVar.mainColor};
  height: 100%;
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    transform: scale(1.02);
  }
`;

const AlternateDropContainer = styled.div`
  width: 100%;
`;

const CloseIcon = styled(AiFillCloseCircle)`
  display: none;
  cursor: pointer;
  @media (max-width: 600px) {
    display: block;
  }
`;

const FilesDetail = styled.div`
  height: 250px;
  overflow-y: auto;
  margin-bottom: 10px;
`;
const FileContainer = styled.div`
  padding-right: 10px;

  &:hover {
    ${CloseIcon} {
      display: block;
    }
  }
`;

const FileDetail = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
`;

const FileName = styled.p`
  font-size: 17px;
  word-break: break-all;
`;
const FileSize = styled.p`
  font-size: 14px;
`;

const UploadButton = styled.button`
  background-color: ${constantsVar.backgroundColor};
  padding: 15px;
  border: none;
  color: white;
  font-size: 18px;
  cursor: pointer;
  width: 100%;
  margin-bottom: 10px;
  border-radius: 10px;

  &:hover {
    transform: scale(1.01);
  }
`;

const DisabledUploadButton = styled(UploadButton)`
  background-color: rgba(0, 0, 0, 0.4);
  cursor: not-allowed;
`;

const InitialText = styled.p`
  font-size: 18px;
`;

const HaveFiles = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0 10px;
`;

const FileInsights = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;
const FilesLength = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const FilesSpaceUsed = styled(FilesLength)``;

const MessageAndUpload = styled.div`
  width: 100%;
  display: flex;
  gap: 15px;
  align-items: center;
  justify-content: space-betweeen;
  height: 100%;
`;

const TextBox = styled.textarea`
  resize: none;
  padding: 5px;
  width: 70%;
  height: 80%;
  font-size: 15px;
`;

const UploadToServer = styled(UploadButton)`
  width: 30%;
  height: 60%;
  padding: 5px;
  font-size: 16px;
`;

const DisabledUploadToServer = styled(UploadToServer)`
  background-color: rgba(0, 0, 0, 0.4);
  cursor: not-allowed;
`;

export {
  UploadButton,
  Main,
  MainContainer,
  FileInsights,
  FilesLength,
  FilesSpaceUsed,
};
