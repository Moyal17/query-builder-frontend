import React, { Component } from 'react';
import { Link } from "react-router-dom";
import QueryBuilder from "../../Components/QueryBuilder/QueryBuilder";
import 'antd/dist/antd.less';

class QueryBuilderPage extends Component {


  render() {
    return (
      <main id="main">
        <h1>Query Builder Page</h1>
        <Link to={'/'}>hoME</Link>
        <QueryBuilder/>
      </main>
    );
  }
}

export default QueryBuilderPage;
