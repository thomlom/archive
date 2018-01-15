import React from 'react';

import ChestImage from './ChestImage';

const assetURL = 'https://cr-api.github.io/cr-api-assets/chests/';

const Profile = (props) => {
    const state = props.location.state;
    const {data, name, tag, joker} = state.data;
    const {
        arena,
        chestCycle,
        clan,
        deckLink,
        games,
        trophies,
        stats
    } = data;
    return (
        <div className="main">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h2>{name}</h2>
                        <p>{tag}</p>
                    </div>
                    <div className="col-12">
                        <h2>Cycle de coffres</h2>
                        <div>
                            <p>À venir</p>
                            {chestCycle
                                .upcoming
                                .map((type, i) => <img
                                    className="img-responsive chest-image"
                                    key={i}
                                    src={`${assetURL}/chest-${type}.png`}/>)}
                            <div>
                                <ChestImage type="giant" days={chestCycle.giant}/>
                                <ChestImage type="magical" days={chestCycle.magical}/>
                                <ChestImage type="epic" days={chestCycle.epic}/>
                                <ChestImage type="legendary" days={chestCycle.legendary}/>
                                <ChestImage type="supermagical" days={chestCycle.superMagical}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;