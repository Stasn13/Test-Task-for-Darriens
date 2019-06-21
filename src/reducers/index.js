import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router'
import Settings from './Settings';
import ChatData from './Chat';
import Contact from './Contact';
import Mail from './Mail';
import ToDo from './ToDo';
import Auth from './Auth';
import AlbumsReducer from './AlbumsReducer';
import UsersReducer from './UsersReducer'


export default (history) => combineReducers({
  router: connectRouter(history),
  settings: Settings,
  chatData: ChatData,
  contacts: Contact,
  mail: Mail,
  toDo: ToDo,
  auth: Auth,
  albums: AlbumsReducer,
  users: UsersReducer
});
