import React from "react";

const SearchResultStyle: React.CSSProperties = {
  color: "black",
};

interface SearchResultProps {
  cSegment?: [];
}

const SearchResult: React.FC<SearchResultProps> = ({ cSegment }) => {
  return (
    <div style={SearchResultStyle}>
      <div>子域名</div>
      <div>端口</div>
      {cSegment &&
        cSegment.map((res) => {
          return (
            <>
              <div key={res}> {res}</div>
            </>
          );
        })}
    </div>
  );
};

export default SearchResult;
