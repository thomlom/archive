import React from 'react';

const TableHeader = ({name, selected, isReversed, translation, handleSelect}) => (
    <th
        className={selected === name
        ? 'selected'
        : ''}
        onClick={() => handleSelect(name)}>
        {translation} {selected === name
        ? (
                <span className="float-right badge badge-secondary">{isReversed
                        ? 'Décroissant'
                        : 'Croissant'}</span>
            )
            : null
}
    </th>
);

export default TableHeader;