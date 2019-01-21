import React from 'react';

/* eslint react/prefer-stateless-function: 0 */
/* eslint no-useless-constructor: 0 */

export default class DashboardPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { username } = this.props;
    return (
      <div className='dashboard-container'>
        <div>
          <h1>This is { username }&apos;s dashboard</h1>
          <p>This is a paragraph from the dashboard.</p>
        </div>
        <div className='row'>
          <div className='column'>
            <div className='orange-column'>
              Some Text in Column One
            </div>
          </div>
          <div className='column'>
            <div className='blue-column'>
              Some Text in Column Two
            </div>
          </div>
          <div className='column'>
            <div className='green-column'>
              Some Text in Column Three
            </div>
          </div>
          <div className='column'>
            <div className='orange-column'>
              Some Text in Column Four
            </div>
          </div>
          <div className='column'>
            <div className='blue-column'>
              Some Text in Column Five
            </div>
          </div>
          <div className='column'>
            <div className='green-column'>
              Some Text in Column Six
            </div>
          </div>
          <div className='column'>
            <div className='orange-column'>
              Some Text in Column Seven
            </div>
          </div>
          <div className='column'>
            <div className='blue-column'>
              Some Text in Column Eight
            </div>
          </div>
          <div className='column'>
            <div className='green-column'>
              Some Text in Column Nine
            </div>
          </div>
          <div className='column'>
            <div className='orange-column'>
              Some Text in Column Ten
            </div>
          </div>
          <div className='column'>
            <div className='blue-column'>
              Some Text in Column Eleven
            </div>
          </div>
          <div className='column'>
            <div className='green-column'>
              Some Text in Column Twelve
            </div>
          </div>
        </div>
        <div className='row-reverse'>
          <div className='column'>
            <div className='green-column'>
              Some Text in Row 2, Column One
            </div>
          </div>
          <div className='column'>
            <div className='orange-column'>
              Some Text in Row 2, Column Two
            </div>
          </div>
          <div className='column'>
            <div className='blue-column'>
              Some Text in Row2, Column Three
            </div>
          </div>
          <div className='column'>
            <div className='green-column'>
              Some Text in Row 2, Column Four
            </div>
          </div>
          <div className='column'>
            <div className='orange-column'>
              Some Text in Row 2, Column Five
            </div>
          </div>
          <div className='column'>
            <div className='blue-column'>
              Some Text in Row2, Column Six
            </div>
          </div>
          <div className='column'>
            <div className='green-column'>
              Some Text in Row 2, Column Seven
            </div>
          </div>
          <div className='column'>
            <div className='orange-column'>
              Some Text in Row 2, Column Eight
            </div>
          </div>
          <div className='column'>
            <div className='blue-column'>
              Some Text in Row2, Column Nine
            </div>
          </div>
          <div className='column'>
            <div className='green-column'>
              Some Text in Row 2, Column Ten
            </div>
          </div>
          <div className='column'>
            <div className='orange-column'>
              Some Text in Row 2, Column Eleven
            </div>
          </div>
          <div className='column'>
            <div className='blue-column'>
              Some Text in Row2, Column Twelve
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='double-column'>
            <div className='blue-column'>
              Some Text in row 3 double column 1
            </div>
          </div>
          <div className='column'>
            <div className='green-column'>
              something in row 3 column 2
            </div>
          </div>
        </div>
      </div>
    );
  }
}


// Pure function es lint is requesting
// export default function DashboardPage(props) {
//     const { username } = props;
//     return (
//         <div classNameName='row'>
//             <div classNameName='col-12 col-sm-12'>
//                 <h1>This is { username }'s dashboard</h1>
//                 <p>This is a paragraph from the dashboard.</p>
//             </div>
//         </div>
//     );
// }
