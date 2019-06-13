import React from 'react';
import PropTypes from 'prop-types';
import Head from '../components/Head';
import UserInfo from '../components/UserInfo';
import Charts from '../components/Charts';
import Repos from '../components/Repos';
import Footer from '../components/Footer';
import Corner from '../components/Corner';

const User = props => {
  const username = props.query.id;

  return (
    <main>
      <Head title="OctoProfile" />
      <Corner />
      <UserInfo username={username} />
      <Charts username={username} />
      <Repos username={username} />
      <Footer />
    </main>
  );
};

User.propTypes = {
  query: PropTypes.object,
};

export default User;
