import Service from "./Service";
import HomepageWhy from "./HomepageWhy";
import HomepageAbout from "./HomepageAbout";
import HomepageInfo from "./HomepageInfo";
import Footer from "./Footer";
import NavBar from "./NavBar";
import 'font-awesome/css/font-awesome.min.css'
import './../PreLoginHomepage/css/responsive.css';
import './../PreLoginHomepage/css/style.css.map';
import './../PreLoginHomepage/css/style.css';
import './../PreLoginHomepage/css/style.scss';
import "/node_modules/bootstrap/dist/js/bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

function HomePage(){
        return(
      <body >
            <NavBar />
            <Service />
            <HomepageAbout  />
            <HomepageWhy />
            <HomepageInfo />
            <Footer />
        </body>      
        )
}

export default HomePage;