import { IllusaState as S } from '../..';

export const selectCurrentScene = (state: S) => state.scenes.current;

export const selectIsEditing = (state: S) => state.scenes.editing;
