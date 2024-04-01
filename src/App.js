import {BrowserRouter,Route,Routes,Navigate} from 'react-router-dom'
import {useAuthContext} from './hooks/useAuthContext'
/* import Home from './pages/Home'; */
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';
import Sidemenu from './components/sidebar/Sidemenu';
import Dashboard from './pages/Dashboard';
import CenterForm from './components/CenterForm';
import CenterPage from './pages/CenterPage';
import PackageForm from './components/PackageForm';
import PackagePage from './pages/PackagePage';
import MemberForm from './components/MemberForm';
import MemberPage from './pages/MemberPage';
import Member from './components/Member';
import EditMember from './components/EditMember';
import EditCenter from './components/EditCenter';
import EditPackage from './components/EditPackage';
import TransactionPage from './pages/TransactionPage';
import ExpiredMember from './pages/ExpiredMember';
import TrainerPage from './pages/TrainerPage';
import TrainerForm from './components/trainer/TrainerForm';
import ViewTrainerDetails from './components/trainer/ViewTrainerDetails';
import EditTrainer from './components/trainer/EditTrainer';
import ShowExpired from './components/ShowExpired';
import RenewMember from './components/RenewMember';





function App() {
  const {user}=useAuthContext()
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
      {user ? (<div>
        <Sidemenu/>
      </div>) : <Navigate to="/login" />}
      <div className="pages">
        <Routes>
          <Route path='/login' element={!user ? <Login/> : <Navigate to="/" />} />
          <Route path='/'  element= {<Dashboard/>} />
          <Route path='/centers'  element= {<CenterPage/>} />
          <Route path='/addcenter'  element= {<CenterForm/>} />
          <Route path='/editcenter'  element= {<EditCenter/>} />
          <Route path='/trainers'  element= {<TrainerPage/>} />
          <Route path='/viewtrainer'  element= {<ViewTrainerDetails/>} />
          <Route path='/addtrainer'  element= {<TrainerForm/>} />
          <Route path='/edittrainer'  element= {<EditTrainer/>} />
          <Route path='/packages'  element= {<PackagePage/>} />
          <Route path='/addpackage'  element= {<PackageForm/>} />
          <Route path='/editpackage'  element= {<EditPackage/>} />
          <Route path='/members'  element= {<MemberPage/>} />
          <Route path='/addmember'  element= {<MemberForm/>} />
          <Route path='/memberdetail'  element= {<Member/>} />
          <Route path='/editmember'  element= {<EditMember/>} />
          <Route path='/tranctions'  element= {<TransactionPage/>} />
          <Route path='/expired'  element= {<ExpiredMember/>} />
          <Route path='/showexpired'  element= {<ShowExpired/>} />
          <Route path='/renewmember'  element= {<RenewMember/>} />
          <Route path='/signup' element={user ? <Signup/> : <Navigate to="/login" />} />

          
        </Routes>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
