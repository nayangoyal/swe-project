// import React from 'react'
// import image1 from './images/lnmiit_1.jpg'
// import image2 from './images/lnmiit_2.jpg'
import image3 from './images/lnmiit3.png'
import image4 from './images/lnmiit4.jpg'
import image5 from './images/lnmiit5.jpg'
import menu from './images/menu.jpg'
import rule from './images/rule.jpg'
import availibility from './images/availibility.jpg'
// // import Slider from './BasicSlider';
// import './homePage.css';

// const HomePage = () => {

//     var slides = document.querySelectorAll('.slide');
//     var btns = document.querySelectorAll('.btn');
//     let currentSlide = 1;

//     // Javascript for image slider manual navigation
//     var manualNav = function(manual){       slides.forEach((slide) => {
//         slide.classList.remove('active');

//         btns.forEach((btn) => {
//             btn.classList.remove('active');
//         });
//     });
//         slides[manual].classList.add('active');
//         btns[manual].classList.add('active');
//     }

//     btns.forEach((btn, i) => {
//         btn.addEventListener("click", () => {
//             manualNav(i);
//             currentSlide = i;
//         });
//     });

//     // javascript for image slider autoplay navigation
//     var repeat = function(activeClass){
//         let active = document.getElementsByClassName('active');
//         let i = 1;

//         var repeater = () =>{
//             setTimeout(function(){
//                 [...active].forEach((activeSlide) => {
//                     activeSlide.classList.remove('active');
//                 })
//                 slides[i].classList.add('active');
//                 btns[i].classList.add('active');
//                 i++;

//                 if(slides.length === i)
//                 {
//                     i = 0;
//                 }
//                 if(i>=slides.length)
//                 {
//                     return;
//                 }
//                 repeater();
//             }, 10000);
//         }
//         repeater();
//     }
//     repeat();
//     return (
//         <div>
//             <div className='img-slider'>
//             <div className='slide active'>
//             <img src={image1} alt="lnmiit1" />
//             </div>
//             <div className='slide'>
//             <img src={image2} alt="lnmiit2" />
//             </div>
//             <div className='slide'>
//             <img src={image3} alt="lnmiit3" />
//             </div>
//             <div className='slide'>
//             <img src={image4} alt="lnmiit4" />
//             </div>
//             <div className='navigation'>
//             <div className='btn active'></div>
//             <div className='btn'></div>
//             <div className='btn'></div>
//             <div className='btn'></div>
//             </div>
//             </div>
//             {/* <Slider /> */}
//         </div>
//     )
// }

// export default HomePage



import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import Card from './Card';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './homePage.css';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

export default function HomePage() {
  return (
    <div style={{backgroundColor: "#F5EBE0", paddingBottom: "118px"}}>
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
        <div className='img-div'>
        <img className='home-img' src={image3} alt='image3' />
        </div>
        </SwiperSlide>
        <SwiperSlide>
        <div className='img-div'>
        <img className='home-img' src={image4} alt='image3' />
        </div>
        </SwiperSlide>
        <SwiperSlide>
        <div className='img-div'>
        <img className='home-img' src={image5} alt='image3' />
        </div>
        </SwiperSlide>
      </Swiper>

      <div className="cardRow" >
          <Card
            title='Rules & Regulations'
            imageUrl={rule}
            body='Alumni Meets, Research Conferences, Fests, find all upcoming events here.'
            redirect='https://drive.google.com/file/d/17qJ3mKWQhu9-sr1YUVg1cDmdxECR-x6q/view'
            success='true'
          />
          <Card
            title='Availibility'
            imageUrl={availibility}
            body='A researcher, alumni or a parent, book rooms for all your needs here'
            redirect={localStorage.getItem('userToken') ? './Available' : './login'}
            success='false'
          />
          <Card
            title='Dining'
            imageUrl={menu}
            body='One cannot think well, sleep well, if one has not dined well.Your culinary needs,here'
            redirect='https://drive.google.com/file/d/1W5uhpswAGQDHcq3mZ2lwgfp8AhuMWI7g/view'
            success='true'
          />
        </div>
    </div>
  );
}
