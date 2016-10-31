import React from 'react';
import { StyleSheet, css } from 'aphrodite';

import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import GroupWork from 'material-ui/svg-icons/action/group-work';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import Paper from 'material-ui/Paper';

import Constants from '../constants';
import Page from './Page';

const styles = StyleSheet.create({
  banner: {
    width: '100%',
    height: '500px',
    backgroundColor: Constants.primaryColor,
    fontFamily: 'Raleway',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#ffffff',
  },
  portrait: {
    height: '100px',
    width: '100px',
    borderRadius: '50%',
    padding: '4px',
    border: '1px solid #ddd',
  },
  paper: {
    margin: '20px',
    width: '80%',
    textAlign: 'center',
    fontFamily: 'Raleway',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  container: {
    width: '100%',
    height: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
});

const ProblemHistoryList = ({ problems }) => {
  const problemList = problems.map(problem => <ListItem primaryText={problem.title} leftIcon={<ActionGrade />} />);
  return (
    <List>
      <Subheader>Problem History</Subheader>
      {problemList}
    </List>
  );
};

const Profile = ({ username, problems = [{ title: 'title1' }] }) => (
  <Page>
    <div className={css(styles.banner)}>
      <img src="/static/image/portrait_sample.png" className={css(styles.portrait)} />
      <h3>{username}</h3>
      <Paper zDepth={3} className={css(styles.paper)}>
        <List>
          <Subheader>Ranking</Subheader>
          <ListItem primaryText="1" leftIcon={<GroupWork />} disabled />
        </List>
        <Divider />
        <List>
          <Subheader>Dave</Subheader>
          <ListItem primaryText="Awesome." disabled />
        </List>
      </Paper>
    </div>
    <div className={css(styles.container)}>
      <Paper zDepth={3} className={css(styles.paper)}>
        <ProblemHistoryList problems={problems} />
      </Paper>
    </div>
  </Page>
);

export default Profile;
