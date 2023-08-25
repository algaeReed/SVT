import { Layout } from "antd";
import { Header, Content, Footer } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";

const SearchResultStyle: React.CSSProperties = {
  color: "black",
};

function SearchResult() {
  return (
    <div style={SearchResultStyle}>
      <div>子域名</div>
      <div>端口</div>
    </div>
  );
}

export default SearchResult;
