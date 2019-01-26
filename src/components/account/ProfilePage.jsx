import React from 'react';

export default function ProfilePage(props) {
  const { match } = props;
  return (
    <div className='row'>
      <div className='col-sm-12 col-md-8'>
        This is the profile page. The profile id is: {match.params.id}
      </div>
    </div>
  );
}
