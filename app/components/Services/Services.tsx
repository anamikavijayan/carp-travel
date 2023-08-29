"use client"

import { useState, useRef } from "react"

import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade } from 'swiper/modules';
import { animated, useTransition } from '@react-spring/web'

import { options, services } from "@/app/utils/staticData/services"

import { Overlay } from "../Overlay/Overlay"
import { SingleService } from "./SingleService"
import { ServicesMenu } from "./ServicesMenu"

import 'swiper/css';
import 'swiper/css/effect-fade';
import './ServicesSwiper.scss'

export const Services: React.FC = () => {
    const [slideNum, setSlideNum] = useState<number>(1);
    const [promo, setPromo] = useState<string>(services[0].promo);

    const swiperRef: any = useRef<typeof Swiper | null>(null);
    const bgSwiperRef: any = useRef<typeof Swiper | null>(null);

    const transition = useTransition(slideNum, {
        exitBeforeEnter: true,
        from: {
          opacity: 0,
        },
        enter: {
          opacity: 1,
        },
        leave: {
          opacity: 0,
        },
        config: (item, index, phase) => ({
            duration: phase === 'enter' ? 700 : 500, 
        }),
    })

    const handleMenuOptionSelect = (e: React.MouseEvent<HTMLLIElement>) => {
        const currentOptionIndex = options.indexOf(e.currentTarget.innerHTML);

        // handle double-click on the selected option
        if (currentOptionIndex === -1) {
            return;
        }

        const currentOptionId = currentOptionIndex + 1;
        const currentSlide = services.find(s => s.id === currentOptionId);

        setSlideNum(currentOptionId);

        slideTo(currentOptionIndex);

        if(currentSlide) {
            setPromo(currentSlide.promo);
        }
    }

    const slideTo = (index: number) => {
        if (swiperRef) {
            swiperRef.current.swiper.slideTo(index, 1500);
            bgSwiperRef.current.swiper.slideTo(index, 1500);
        }
    };


    return (
        <section 
            id="services"
            className="relative bg-cover bg-no-repeat bg-center transition-all ease-in duration-500 delay-100 
                before:w-full before:h-[291px] before:absolute before:top-0 before:left-0 before:right-0 
                before:bg-section-top-gradient before:opacity-75 
                tab:before:h-[247px] desk:before:h-[241px] desk:before:opacity-25 
                after:w-full after:h-[291px] after:absolute after:bottom-0 after:left-0 after:right-0 
                after:bg-section-bottom-gradient after:opacity-75
                tab:after:h-[247px] desk:after:h-[241px] desk:after:opacity-25"
        >
            
            {/* background swiper */}
            <Swiper
                ref={bgSwiperRef}
                effect={'fade'}
                slidesPerView={1}
                fadeEffect={{
                    crossFade: true,
                }}
                speed={1500}
                allowTouchMove={false}
                modules={[EffectFade]}
                grabCursor={false}
                style={{position: "absolute", top: 0, bottom: 0, left: 0, right: 0, zIndex: -1}}
            >
                {services.map(s => 
                    <SwiperSlide 
                        key={s.id} 
                        className="background-slide"
                        style={{backgroundImage: `url(/images/${s.bg})`}}
                    >
                    </SwiperSlide>
                )}
            </Swiper>

            <Overlay overlay="overlay">
                <div 
                    className="section px-5 pt-[54px] pb-[56px] h-[851px] relative
                        tab:px-8 tab:py-16 tab:h-[621px]
                        desk:px-6 desk:py-[104px] desk:h-[779px]"
                >
                    <h2 className="title mb-6 tab:mb-0">
                        We <span className="font-medium">offer</span>
                    </h2>

                    {/* slide counter */}
                    <div 
                        className=" mb-[13px] text-right text-[43px] font-thin leading-[43px]
                            tab:mb-0 tab:absolute tab:top-16 tab:left-[515px] tab:text-[67px] tab:leading-[67px]
                            desk:top-[104px] desk:left-[644px] desk:text-[98px] desk:leading-[98px] "
                    >
                        0
                        {transition((style, slideNum) => (
                            <animated.span style={style}>{slideNum}</animated.span>
                        ))}
                        /
                        <span className="opacity-20">0{services.length}</span>
                    </div>
                    
                    {/* slide info swiper */}
                    <Swiper
                        ref={swiperRef}
                        effect={'fade'}
                        slidesPerView={1}
                        fadeEffect={{
                            crossFade: true,
                          }}
                        speed={1500}
                        allowTouchMove={false}
                        modules={[EffectFade]}
                        grabCursor={false}
                        className="tab:w-full tab:h-full"
                    >
                        {services.map(s => 
                            <SwiperSlide key={s.id}>
                                <SingleService
                                    image={s.image}
                                    promo={s.promo}
                                    title={s.title}
                                    text={s.text}
                                />
                            </SwiperSlide>
                        )}
                    </Swiper>

                    {/* menu */}
                    <ServicesMenu 
                        slideNum={slideNum}
                        promo={promo}
                        handleMenuOptionSelect={handleMenuOptionSelect}
                    />
                </div>
            </Overlay>
        </section>
    )
}