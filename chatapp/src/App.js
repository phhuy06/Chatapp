import Landing from './pages/Landing/index';
import Main from './pages/Main/index';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Logo from './components/Logo';
function App() {
    return (
        <BrowserRouter>
            <div className="app">
                <Logo />
                <Routes>
                    <Route path="/" element={<Main />}></Route>
                    <Route path="/landing" element={<Landing />}></Route>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
