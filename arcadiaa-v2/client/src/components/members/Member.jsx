import React from 'react';
import {Link} from 'react-router-dom';

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

const Member = (props) => {
    const {data, tag, name} = props.data;
    return (
        <div className="member">
            <Link
                to={{
                pathname: `/members/${tag}`,
                state: {
                    data: props.data,
                    tag,
                    name
                }
            }}>
                <h6>{name}</h6>
            </Link>
        </div>
    );
}

export default Member;