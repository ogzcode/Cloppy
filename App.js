import { Provider } from 'react-redux';
import store from './src/store/store';
import Main from './src/screens/Main';

export default function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}

