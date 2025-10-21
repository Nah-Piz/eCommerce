import { createSelector } from "@reduxjs/toolkit";

const selectItemState = (state) => state.cart;

export const selectItem = createSelector(
    [selectItemState],
    (itemState) => itemState
);

export const selectItemById = (itemId) => (state) => state.cart?.find(f => f.id === itemId);