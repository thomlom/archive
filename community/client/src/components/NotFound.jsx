import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = ({ location }) => (
    <div>
        <h3 className="title text-center">
            <code>Error 404 : {location.pathname} Not Found</code>
            <h4>Please, go back to the <Link to="/">homepage</Link></h4>
        </h3>
    </div>
);

export default NotFound;