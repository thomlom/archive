import express from 'express';
import axios from 'axios';

import {requireAuth} from '../middlewares';

import Member from '../models/member';

const router = express.Router();

const getClan = async() => {
    const response = await axios.get('http://api.cr-api.com/clan/PVJ9PQ', {
        headers: {
            auth: 'api key'
        }
    });

    return response.data;
}

const getPlayer = async tag => {
    const response = await axios.get(`http://api.cr-api.com/player/${tag}?keys=trophies,rank,arena,clan,stats,games,chestCycle,deckLink`, {
        headers: {
            auth: 'api key'
        }
    });

    return response.data;
}

const jokersToAdd = (chestCrowns) => {
    if (chestCrowns < 10) {
        return -1;
    } else {
        return 1;
    }
}

router.get('/', (req, res, next) => {
    getClan().then(clan => {
        return res.json(clan);
    });
});

router.get('/members', (req, res, next) => {
    Member
        .find()
        .then(members => {
            return res.json(members);
        });
});

router.get('/update/:tag', (req, res, next) => {
    const tag = req.params.tag;
    getPlayer(tag).then(data => {
        Member
            .findOne({tag})
            .then(memberToUpdate => {
                memberToUpdate.data = data;
                member.save();
            });
    });
});

router.post('/create', (req, res, next) => {
    getClan().then(clan => {
        clan
            .members
            .forEach(member => {
                let {tag, name} = member;
                getPlayer(tag).then(player => {
                    Member
                        .findOne({tag})
                        .then(res => {
                            if (!res) {
                                let memberToCreate = new Member({tag, name, joker: 0, data: player});
                                memberToCreate.save();
                            }
                        });
                });
            });
    });
});

router.post('/joker', (req, res, next) => {
    getClan().then(clan => {
        clan
            .members
            .forEach(member => {
                let {tag, clanChestCrowns} = member;
                Member
                    .findOne({tag})
                    .then(memberToUpdate => {
                        let jokers = memberToUpdate.joker;
                        let newJokers = jokers += jokersToAdd(clanChestCrowns);
                        memberToUpdate.joker = newJokers;
                        memberToUpdate
                            .jokerHistory
                            .push(newJokers);
                        memberToUpdate.save();
                    });
            });
    });
});

export default router;