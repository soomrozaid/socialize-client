import {
  SET_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  MARK_NOTIFICATIONS_READ,
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
    } else {
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
      const newLikeState = {
        ...state,
        likes: [
          ...state.likes,
          {
            userHandle: state.credentials.handle,
            screamId: action.payload.screamId,
          },
        ],
      };
      saveState(newLikeState);
      return newLikeState;
    case UNLIKE_SCREAM:
      const newUnlikeState = {
        ...state,
        likes: state.likes.filter(
          (like) => like.screamId !== action.payload.screamId
        ),
      };
      saveState(newUnlikeState);
      return newUnlikeState;
    case MARK_NOTIFICATIONS_READ:
      state.notifications.forEach((not) => (not.read = true));
      const newMarkedNotifiState = state;
      saveState(newMarkedNotifiState);
      return {
        ...state,
      };
    default:
      return state;
  }
}
