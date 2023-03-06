import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { getUserQueries } from '../../store/actions';
import QueryBuilder from "../../Components/QueryBuilder/QueryBuilder";
import QueryExecutor from "../../Components/QueryExecutor/QueryExecutor";
import 'antd/dist/antd.less';

class QueryBuilderPage extends Component {
  constructor (props) {
    super(props);
    this.state = {
      queryList: [
        {
        id: 'n3l2nl41', name: 'Get Movie Titles', description: 'getting all movie titles from the DB.',
        response: {
            command: 'SELECT',
            rowCount: 18,
            rows: [
              { title: 'Star Wars' },
              { title: 'Finding Nemo' },
              { title: 'Forrest Gump' },
              { title: 'American Beauty' },
              { title: 'Raiders of the Lost Ark' },
              { title: 'Indiana Jones and the Temple of Doom' },
              { title: 'Indiana Jones and the Last Crusade' },
              { title: 'Beverly Hills Cop' },
              { title: 'Armageddon' },
              { title: 'Beverly Hills Cop II' },
              { title: 'Gladiator' },
              { title: 'Back to the Future' },
              { title: 'Predator' },
              { title: 'The Untouchables' },
              { title: 'Charlie and the Chocolate Factory' },
              { title: 'The Lord of the Rings: The Fellowship of the Ring' },
              { title: 'The Lord of the Rings: The Two Towers' },
              { title: 'The Lord of the Rings: The Return of the King' }
            ]
          }
        },
        {
          id: 'n3l2n32m32', name: 'Get Movie Titles & Release Dates', description: 'getting all movie titles & release dates from the DB.',
          response: {
            command: 'SELECT',
            rowCount: 10,
            rows: [
              { title: 'Armageddon' },
              { title: 'Beverly Hills Cop II' },
              { title: 'Gladiator' },
              { title: 'Back to the Future' },
              { title: 'Predator' },
              { title: 'The Untouchables' },
              { title: 'Charlie and the Chocolate Factory' },
              { title: 'The Lord of the Rings: The Fellowship of the Ring' },
              { title: 'The Lord of the Rings: The Two Towers' },
              { title: 'The Lord of the Rings: The Return of the King' }
            ]
          }
        }
        ],
    };
  }

  async componentDidMount () {
    try {
      // const data = await this.props.getUserQueries();
    } catch (e) {
      console.log('handle error');
    }
  }

  handleQueryResult() {

  }

  render() {
    const { queryList } = this.state;
    return (
      <main id="main">
        <h1>Query Builder Page</h1>
        <Link to={'/'}>Home</Link>
        <QueryBuilder queryResult={(query) => {this.handleQueryResult(query)}}/>
        <div className="flex-100 layout-row layout-wrap layout-align-start-start padd15">
        { queryList && queryList.length > 0 && queryList.map((query) => <QueryExecutor key={query.id} query={query}/> )}
        </div>
      </main>
    );
  }
}

const mapStateToProps = state => ({
  user: state.userR.userInfo,
  queryList: state.queryR.queryList
});

const mapDispatchToProps = dispatch => ({
  getUserQueries: () => dispatch(getUserQueries()),
});

export default connect(mapStateToProps, mapDispatchToProps)(QueryBuilderPage);
