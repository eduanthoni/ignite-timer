import { ActionTypes } from "./actions";

export interface CycleData {
  id: string,
  task: string,
  minutesAmount: number,
  startDate: Date,
  stopDate?: Date,
  completedDate?: Date
}

interface CycleState {
  cycles: CycleData[],
  activeCycleId: string | null
}

export function cyclesReducer(state: CycleState, action: any) {
  switch(action.type) {
    case ActionTypes.ADD_NEW_CYCLE:
      return {
        ...state,
        cycles: [...state.cycles, action.payload.newCycle],
        activeCycleId: action.payload.newCycle.id
      };
    case ActionTypes.STOP_CURRENT_CYCLE:
      return {
        ...state,
        cycles: state.cycles.map(cycle => {
          if(cycle.id === state.activeCycleId) {
            return {...cycle, stopDate: new Date()}
          } else {
            return cycle
          }
        }),
        activeCycleId: null
      }
    case ActionTypes.RESET_ACTIVE_CYCLE:
      return {
        ...state,
        activeCycleId: action.payload.id
      }
    case ActionTypes.MARK_FINISHED_CYCLE:
      return {
        ...state,
        cycles: state.cycles.map(cycle => {
          if(cycle.id === state.activeCycleId) {
            return {...cycle, completedDate: new Date()}
          } else {
            return cycle
          }
        }),
        activeCycleId: null
      }
    default:
      return state
  }
}