import {
  SET_USER,
  // SET_ERRORS,
  // CLEAR_ERRORS,
  // LOADING_UI,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
} from "../types";

const initialState = {
  authenticated: false,
  loading: false,
  credentials: {},
  likes: [],
  notifications: [],
};

function saveState(state) {
  try {
    if (state === null) {
      console.log("state", "null");
    } else {
      console.log(state);
      const preparedState = JSON.stringify(state);
      localStorage.setItem("state", preparedState);
    }
  } catch (err) {
    console.log(err);
  }
}

function getState() {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) {
      console.log("null");
      return initialState;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.log(err);
    return initialState;
  }
}

const localState = getState();

export default function (state = localState, action) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
      };
    case SET_UNAUTHENTICATED:
      return initialState;
    case SET_USER:
      saveState(action.payload);
      return {
        authenticated: true,
        loading: false,
        ...action.payload,
      };
    case LOADING_USER:
      return {
        ...state,
        loading: true,
      };
    case LIKE_SCREAM:
      return {
        ...state,
        likes: [
          ...state.likes,
          {
            userHandle: state.credentials.handle,
            screamId: action.payload.screamId,
          },
        ],
      };
    case UNLIKE_SCREAM:
      return {
        ...state,
        likes: state.likes.filter(
          (like) => like.screamId !== action.payload.screamId
        ),
      };
    default:
      return state;
  }
}
