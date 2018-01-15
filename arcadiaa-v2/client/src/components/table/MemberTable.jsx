import React from 'react';

const classNameBasedOnCrowns = (clanChestCrowns) => {
    if (clanChestCrowns < 10) {
        return 'table-danger';
    } else if (clanChestCrowns >= 10 && clanChestCrowns < 20) {
        return 'table-warning';
    } else {
        return 'table-success';
    }
}

const translateRole = {
    'member': 'Membre',
    'elder': 'Aîné',
    'coLeader': 'Chef adjoint',
    'leader': 'Chef'
};

const MemberTable = ({data: {name, role, clanChestCrowns, trophies, ...rest}}) => (
    <tr className={classNameBasedOnCrowns(clanChestCrowns)}>
        <td>{name}</td>
        <td>{translateRole[role]}</td>
        <td>{trophies}</td>
        <td>{clanChestCrowns}</td>
    </tr>
);

export default MemberTable;