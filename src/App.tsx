import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SideBar from './components/sidebar/SideBar';
import HomePage from './pages/Accueil/Home';
import ReservationPage from './pages/Reservations/ReservationsPage';
import ReservationsPromotionsPage from './pages/Reservations/Promotions/ReservationsPromotionsPage';
import ReservationsAutresPage from './pages/Reservations/Autres/ReservationsAutresPage';
import FormateursPage from './pages/Formateur/FormateursPage';
import FormateurFichePage from './pages/Formateur/FormateurFichePage';
import FormateurAddPage from './pages/Formateur/FormateurAddPage';
import StagiairesPage from './pages/Stagiaires/StagiairesPage';
import StagiaireFichePage from './pages/Stagiaires/StagiaireFichePage';
import StagiaireAddPage from './pages/Stagiaires/StagiaireAddPage';
import SallesPage from './pages/Salles/SallesPage';
import SalleFichePage from './pages/Salles/SalleFichePage';
import SalleAddPage from './pages/Salles/SalleAddPage';
import UtilisateurPage from './pages/Utilisateurs/UtilisateurPage';
import AffichagePage from './pages/Affichage/AffichagePage';
import UtilisateurFichePage from './pages/Utilisateurs/UtilisateurFichePage';
import UtilisateurAddPage from './pages/Utilisateurs/UtilisateurAddPage';
import ReservationsPromotionFichePage from './pages/Reservations/Promotions/ReservationsPromotionFichePage';
import ReservationsPromotionAddPage from './pages/Reservations/Promotions/ReservationsPromotionAddPage';
import ReservationsAutresFichePage from './pages/Reservations/Autres/ReservationsAutresFichePage';
import ReservationsAutresAddPage from './pages/Reservations/Autres/ReservationsAutresAddPage';
import Modal from 'react-modal';
import './App.css';

Modal.setAppElement('#root')

function App() {
  return (
    <>
      <BrowserRouter>
        <SideBar>
          <Routes>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/reservations' element={<ReservationPage/>}/>
            <Route path='/reservations/promotions' element={<ReservationsPromotionsPage/>}/>
            <Route path='/reservations/promotions/:id' element={<ReservationsPromotionFichePage/>}/>
            <Route path='/reservations/promotions/add' element={<ReservationsPromotionAddPage/>}/>
            <Route path='/reservations/autres' element={<ReservationsAutresPage/>}/>
            <Route path='/reservations/autres/:id' element={<ReservationsAutresFichePage/>}/>
            <Route path='/reservations/autres/add' element={<ReservationsAutresAddPage/>}/>
            <Route path='/formateurs' element={<FormateursPage/>}/>
            <Route path='/formateurs/:id' element={<FormateurFichePage/>}/>
            <Route path='/formateurs/add' element={<FormateurAddPage/>}/>
            <Route path='/salles' element={<SallesPage/>}/>
            <Route path='/salles/:id' element={<SalleFichePage/>}/>
            <Route path='/salles/add' element={<SalleAddPage/>}/>
            <Route path='/stagiaires' element={<StagiairesPage/>}/>
            <Route path='/stagiaires/:id' element={<StagiaireFichePage/>}/>
            <Route path='/stagiaires/add' element={<StagiaireAddPage/>}/>
            <Route path='/affichage' element={<AffichagePage/>}/>
            <Route path='/utilisateurs' element={<UtilisateurPage/>}/>
            <Route path='/utilisateurs/:id' element={<UtilisateurFichePage/>}/>
            <Route path='/utilisateurs/add' element={<UtilisateurAddPage/>}/>
            <Route path='*' element={<>not found</>}/>
          </Routes>
        </SideBar>
      </BrowserRouter>
    </>
  );
}

export default App;
