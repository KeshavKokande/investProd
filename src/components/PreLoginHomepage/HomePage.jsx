

import Service from "./Service";
import HomepageWhy from "./HomepageWhy";
import HomepageTeam from "./HomepageTeam"
import HomepageAbout from "./HomepageAbout";
// import HomepageClient from "./HomepageClient";
import HomepageInfo from "./HomepageInfo";
import Footer from "./Footer";
import NavBar from "./NavBar";



// import '../../assest/css/bootstrap.css';
// import './../PreLoginHomepage/css/bootstrap.css'
import 'font-awesome/css/font-awesome.min.css'
import './../PreLoginHomepage/css/responsive.css';
import './../PreLoginHomepage/css/style.css.map';
import './../PreLoginHomepage/css/style.css';
import './../PreLoginHomepage/css/style.scss';
import "/node_modules/bootstrap/dist/js/bootstrap";

import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/css/bootstrap.css';





function HomePage(){
        return(
      <body >
            
            <NavBar />
            <Service />
            <HomepageAbout  />
            <HomepageWhy />
            {/* <HomepageTeam /> */}
            
            <HomepageInfo />
            <Footer />


           

        </body>

           
        )
        
}

export default HomePage;






// const loadScript = (src) => {
//   const script = document.createElement('script');
//   script.src = src;
//   script.async = true;
//   document.body.appendChild(script);
// };


// const Navbar = () => {

 

//   useEffect(() => {
//     loadScript('./../assest/js/jquery-3.4.1.min.js');
//     loadScript('./../assets/js/bootstrap.js');
//     loadScript('https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js');
//     loadScript('./../assets/js/custom.js');
//     loadScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyCh39n5U-4IoWpsVGUHWdqB6puEkhRLdmI&callback=myMap');
//     // Load Popper.js from CDN with integrity and crossorigin attributes, consider adding those checks manually or using an npm package.
//   }, []);

//   return (
//     <body>
//             <div class="hero_area">
//                 <header class="header_section">
//       <div class="container-fluid">
//         <nav class="navbar navbar-expand-lg custom_nav-container ">
//           <a class="navbar-brand" href="index.html">
//             <span>
//               Finexo
//             </span>
//           </a>

//           <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//             <span class=""> </span>
//           </button>

//           <div class="collapse navbar-collapse" id="navbarSupportedContent">
//             <ul class="navbar-nav  ">
//               <li class="nav-item active">
//                 <a class="nav-link" href="index.html">Home <span class="sr-only">(current)</span></a>
//               </li>
//               <li class="nav-item">
//                 <a class="nav-link" href="about.html"> About</a>
//               </li>
//               <li class="nav-item">
//                 <a class="nav-link" href="service.html">Services</a>
//               </li>
//               <li class="nav-item">
//                 <a class="nav-link" href="why.html">Why Us</a>
//               </li>
//               <li class="nav-item">
//                 <a class="nav-link" href="team.html">Team</a>
//               </li>
//               <li class="nav-item">
//                 <a class="nav-link" href="#"> <i class="fa fa-user" aria-hidden="true"></i> Login</a>
//               </li>
//               <form class="form-inline">
//                 <button class="btn  my-2 my-sm-0 nav_search-btn" type="submit">
//                   <i class="fa fa-search" aria-hidden="true"></i>
//                 </button>
//               </form>
//             </ul>
//           </div>
//         </nav>
//       </div>
//     </header>
           
//         <div className="slider">
//                 <Slider/>
//         </div>

//         </div>

//             <Service />
//             <HomepageAbout />
//             <HomepageWhy />
//             <HomepageTeam />
//             <HomepageClient />
//             <HomepageInfo />
//             <Footer />


           

//         </body>
//   );
// };

// export default Navbar;
