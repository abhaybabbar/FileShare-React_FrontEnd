import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import constantsVariable from "./constants";
import fileDownload from "js-file-download";
import { saveAs } from "file-saver";
import {
  Main,
  MainContainer,
  FileInsights,
  FilesLength,
  FilesSpaceUsed,
  UploadButton,
} from "./App";
import { AiOutlineDownload } from "react-icons/ai";
import styled from "styled-components";
import loading from "./assets/loading.gif";
import notFound from "./assets/404.gif";
import Footer from "./Footer";
import { Link } from "react-router-dom";

const FilesDownload = () => {
  const { slug } = useParams();
  const [data, setData] = useState(null);
  const [isAvailable, setIsAvailable] = useState(true);
  const [downloaded, setDownloaded] = useState(false);

  const getData = async () => {
    const response = await fetch(`${constantsVariable.backendBaseURl}/${slug}`);
    const data = await response.json();
    if (response.status === 200) {
      setData(data);
    } else if (response.status === 404) {
      setIsAvailable(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const getFileName = (filePath) => {
    var filePathArr = filePath.split("/");
    return filePathArr[filePathArr.length - 1];
  };

  const downloadFile = async (filePath) => {
    fetch(filePath)
      .then((res) => res.blob())
      .then((blob) => saveAs(blob, getFileName(filePath)));
  };

  const downloadAll = () => {
    for (let i = 0; i < data.files.length; i++) {
      var file = data.files[i];
      downloadFile(file.file);
    }
    setDownloaded(true);
  };

  return (
    <Main>
      <MainContainer>
        {!isAvailable ? (
          <Page404>
            <NotFoundImage src={notFound} alt="404 Not Found..." />
            <Link to="/">
              <UploadButton>Home</UploadButton>
            </Link>
          </Page404>
        ) : !(data === null) ? (
          <Content>
            <LogoAndText>
              <DownloadLogo />
              <DownloadText>Download is Ready</DownloadText>
            </LogoAndText>
            <hr />
            <MessageAndFiles>
              <Message>{data.message}</Message>
              <FilesData>
                <FileInsights>
                  <FilesLength>
                    <p>{data.numberOfFiles}</p>
                    <p>Total Files</p>
                  </FilesLength>
                  <FilesSpaceUsed>
                    <p>{data.totalFilesSize}</p>
                    <p>Total File Size</p>
                  </FilesSpaceUsed>
                </FileInsights>
              </FilesData>
              <Files>
                {data.files.map((file, index) => {
                  return (
                    <FileContainer>
                      <div>
                        <FileName>{getFileName(file.file)}</FileName>
                        <FileSize>{file.fileSizeInStr}</FileSize>
                      </div>
                      <div>
                        <DownloadIcon
                          size={20}
                          onClick={() => downloadFile(file.file)}
                        />
                      </div>
                    </FileContainer>
                  );
                })}
              </Files>
              <UploadButton onClick={downloadAll}>
                {downloaded ? "Downloaded!" : "Download All"}
              </UploadButton>
            </MessageAndFiles>
          </Content>
        ) : (
          <img src={loading} alt="Loading..." />
        )}
      </MainContainer>
      <Footer />
    </Main>
  );
};

export default FilesDownload;

const DownloadIcon = styled(AiOutlineDownload)`
  display: none;
  cursor: pointer;
`;

const Content = styled.div`
  width: 80%;
  height: 100%;
`;

const LogoAndText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`;

const DownloadLogo = styled(AiOutlineDownload)`
  font-size: 160px;
`;

const DownloadText = styled.p`
  font-size: 28px;
`;

const MessageAndFiles = styled.div`
  height: 60%;
`;

const Message = styled.div`
  margin: 10px 0;
  font-size: 18px;
`;

const FilesData = styled.div``;
const FileContainer = styled.div`
  padding: 10px;
  border-bottom: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:hover {
    ${DownloadIcon} {
      display: block;
    }
  }
`;
const Files = styled.div`
  margin: 10px 0;
  height: 150px;
  overflow-y: auto;
`;
const FileName = styled.p`
  font-size: 18px;
`;
const FileSize = styled.p``;

const Page404 = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const NotFoundImage = styled.img`
  height: 80%;
`;
