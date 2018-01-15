import React from 'react';

const assetURL = 'https://cr-api.github.io/cr-api-assets/chests/';

const ChestImage = ({type, days}) => (
    <figure className="figure">
        <img
            className="figure-img chest-image img-fluid rounded"
            src={`${assetURL}/chest-${type}.png`}/>
        <figcaption class="figure-caption text-center">{days}</figcaption>
    </figure>
);

export default ChestImage;