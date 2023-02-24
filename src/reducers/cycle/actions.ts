import { CycleData } from "./reducer";

export enum ActionTypes {
  ADD_NEW_CYCLE = 'ADD_NEW_CYCLE',
  STOP_CURRENT_CYCLE = 'STOP_CURRENT_CYCLE',
  RESET_ACTIVE_CYCLE = 'RESET_ACTIVE_CYCLE',
  MARK_FINISHED_CYCLE = 'MARK_FINISHED_CYCLE'
}

export function addNewCycleAction(newCycle: CycleData) {
  return {
    type: ActionTypes.ADD_NEW_CYCLE,
    payload: {
      newCycle
    }
  }
}

export function stopCurrentCycleAction() {
  return {
    type: ActionTypes.STOP_CURRENT_CYCLE
  }
}

export function markFinishedCycleAction() {
  return {
    type: ActionTypes.MARK_FINISHED_CYCLE
  }
}

export function resetActiveCycleAction(id: string | null) {
  return {
    type: ActionTypes.RESET_ACTIVE_CYCLE,
    payload: {
      id
    }
  }
}