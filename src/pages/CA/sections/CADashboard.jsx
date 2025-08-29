
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import '../../../styles/ca/ca_dashboard.css'; // optional styling

const CADashboard = () => {
  return (
    <div className="ca-dashboard">
      <Navbar />
      <main className='ca-dashboard main '>
        <h1>Welcome to the Campus Ambassador Program</h1>
        <p>Please join the Whatsapp Channel for further communication.</p>
      </main>
      <Footer/>
    </div>
  );
};

export default CADashboard;
