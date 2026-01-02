"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import "swiper/css";
import { ChevronDoubleDownIcon } from "@heroicons/react/24/outline";

export default function HeroSwiper() {
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
      spaceBetween={0}
      slidesPerView={1}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
      className="w-full lg:h-[800px] h-96 relative"
      autoplay
    >
      <SwiperSlide className="relative w-full h-full">
        <img
          src="/Slider-Idee.jpg"
          alt="Slider"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
      </SwiperSlide>
      <SwiperSlide className="relative w-full h-full">
        <img
          src="/Slider-Sia.jpg"
          alt="Slider"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
      </SwiperSlide>
      <SwiperSlide className="relative w-full h-full">
        <img
          src="/Slider-Jan.jpg"
          alt="Slider"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
      </SwiperSlide>
      <div className="absolute bottom-6 left-1/2 translateY-1/2 z-10">
        <ChevronDoubleDownIcon className="w-8 h-8 text-white animate-bounce duration-300" />
      </div>
    </Swiper>
  );
}
