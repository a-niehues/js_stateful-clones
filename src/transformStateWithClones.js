'use strict';

function transformStateWithClones(state, actions) {
  const stateHistory = [];
  let lastState = { ...state };

  for (const action of actions) {
    const currentState = { ...lastState };

    switch (action.type) {
      case 'addProperties':
        Object.assign(currentState, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete currentState[key];
        }
        break;

      case 'clear':
        for (const key in currentState) {
          delete currentState[key];
        }
        break;

      default:
        break;
    }

    stateHistory.push(currentState);
    lastState = currentState;
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
