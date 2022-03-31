import { FunctionalComponent, h } from 'preact';
import { Provider } from 'react-redux';
import { store } from '../store';
import EditorsView from '../views/editors';
import Header from './header';


const App: FunctionalComponent = () => {
    return (
        <Provider store={store}>
            <div id="preact_root" class="flex flex-col">
                <Header />
                <EditorsView />
            </div>
        </Provider>
    );
};

export default App;
