import React from 'react';

export default class DashboardPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { username } = this.props;
        return (
            <div className="row">
                <div className="col-12 col-sm-12">
                    <h1>This is { username }'s dashboard</h1>
                    <p>This is a paragraph from the dashboard.</p>
                </div>
            </div>
        );
    }
}

// Pure function es lint is requesting
// export default function DashboardPage(props) {
//     const { username } = props;
//     return (
//         <div className="row">
//             <div className="col-12 col-sm-12">
//                 <h1>This is { username }'s dashboard</h1>
//                 <p>This is a paragraph from the dashboard.</p>
//             </div>
//         </div>
//     );
// }
