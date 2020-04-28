import { IllusaState } from '../..';
import { createSelector } from '@reduxjs/toolkit';

export const selectCurrentSceneId = (state: IllusaState) =>
    state.scenes.current;

export const selectAllScenes = (state: IllusaState) => state.scenes.all;

export const selectScene = createSelector(
    [selectCurrentSceneId, selectAllScenes],
    (id, all) => all[id]
);
