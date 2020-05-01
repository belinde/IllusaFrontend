import { IllusaState as S } from '../..';
import { createSelector } from '@reduxjs/toolkit';

export const selectCurrentSceneId = (state: S) => state.scenes.current;

export const selectIsEditing = (state: S) => state.scenes.editing;

export const selectAllScenes = (state: S) => state.scenes.all;

export const selectScene = createSelector(
    [selectCurrentSceneId, selectAllScenes],
    (id, all) => all[id]
);
