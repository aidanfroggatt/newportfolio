import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import InfoPage from './pages/InfoPage.jsx';
import WorkPage from "./pages/WorkPage.jsx";
import ProjectPage from './pages/ProjectPage.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import './App.css';

function App() {
    return (
        <Router>
            <Header/>
            <Routes>
                <Route path="/" element={<WorkPage/>} />
                <Route path="/info" element={<InfoPage/>} />
                <Route path="/project/:projectID" element={<ProjectPage/>}/>
            </Routes>
            <Footer/>
        </Router>
    )
}

export default App;
