// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css"; 
// import "slick-carousel/slick/slick-theme.css";

// function App() {
//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 3,
//     slidesToScroll: 1
//   };
//   return (
//     <div className='w-4/4 m-auto'>
//       <div className="mt-20">
//       <Slider {...settings}>
//         {data.map((d) => (
//           <div key={d.name} className="bg-white h-[450px] text-black rounded-xl">
//             <div className='h-56 bg-indigo-500 flex justify-center items-center rounded-t-xl'>
//               <img src={d.img} alt="" className="h-44 w-44 rounded-full"/>
//             </div>

//             <div className="flex flex-col items-center justify-center gap-4 p-4">
//               <p className="text-xl font-semibold">{d.name}</p>
//               <p className="text-center">{d.review}</p>
//               <button className='bg-indigo-500 text-white text-lg px-6 py-1 rounded-xl'>Read More</button>
//             </div>
//           </div>
//         ))}
//       </Slider>
//       </div>

//     </div>
//   );
// }

// const data = [
//   {
//     name: `Kashif`,
//     img: `/students/John_Morgan.jpg`,
//     review: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`
//   },
//   {
//     name: `Aditya`,
//     img: `/students/Ellie_Anderson.jpg`,
//     review: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`
//   },
//   {
//     name: `Shubham`,
//     img: `/students/Nia_Adebayo.jpg`,
//     review: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`
//   },
//   {
//     name: `Parichay`,
//     img: `/students/Rigo_Louie.jpg`,
//     review: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`
//   },
//   {
//     name: `Keshav`,
//     img: `/students/Mia_Williams.jpg`,
//     review: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`
//   },

// ];

// export default App;



import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './../../components/AdvisorCardsPage/TestpageAdv.css'

export default function TestpageAdv({ advisor }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
  };



  return (

    <div className="bg-white h-[450px] text-black rounded-xl">
      <div className='h-56 bg-indigo-500 flex justify-center items-center rounded-t-xl'>
        <img src="https://avatar.iran.liara.run/public/boy" alt="" className="h-44 w-44 rounded-full" />
      </div>

      <div className="flex flex-col items-center justify-center gap-4 p-4">
        {/* Check if advisor.name is defined before accessing it */}
        <p className="text-xl font-semibold">{advisor.name || 'Unknown Name'}</p>
        {/* You can uncomment and modify this section if you have a review property */}
        {/* <p className="text-center">{advisor.review}</p> */}
        <button className='bg-indigo-500 text-white text-lg px-6 py-1 rounded-xl'>Read More</button>
      </div>

    </div>
  );
}



