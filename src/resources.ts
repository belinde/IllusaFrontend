import { SceneTypeMeta, AttributeMeta } from './types';

export const sceneTypes: SceneTypeMeta[] = [
    {
        key: 'cosmos',
        userAvailable: false,
        description: 'A single multiverse, owned by a single entity.',
    },
    {
        key: 'plane',
        userAvailable: true,
        description:
            'a continuous space where every location is physically reacheable.',
    },
    {
        key: 'region',
        userAvailable: true,
        description: 'a geographical area with coherent attributes.',
    },
];

export const attributes: AttributeMeta[] = [
    {
        key: 'cold',
        availableIn: 'region',
        description: "snow and ice everywhere",
    },
    {
        key: 'temperate',
        availableIn: 'region',
        description: "the climate you always desired",
    },
    {
        key: 'warm',
        availableIn: 'region',
        description: "a tropical or sub-trobical climate",
    },
    {
        key: 'high_magic',
        availableIn: 'plane',
        description: "magic is common and strong enchantments can reshape the world",
    },
    {
        key: 'low_magic',
        availableIn: 'plane',
        description: "magic is uncommon, but it can be powerful or flebile",
    },
    {
        key: 'no_magic',
        availableIn: 'plane',
        description: "magic doesn't exists, it's only physics",
    },
];
