import React, {useState, useEffect} from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css'; 
import { motion } from "framer-motion";



import alishan from "../resources/alishan.jpg";
import Cathaylogo from "../resources/Cathaylogo.png";
import Movie from "../resources/Movie.jpg";
import Music from "../resources/Music.jpg";
import Game from "../resources/Game.jpg";
import { formatDateTime } from "../scripts/adhoc";
import { Buttonfull, ButtonSecond, LanguageToggle } from "../components/Button.js";
import { RiMovie2Line, RiMusic2Line, RiGamepadLine} from "react-icons/ri";
import Entertainmentcard from "../components/Entertainmentcard.js";



const Container = styled.div``;
const Left = styled.div`
  background-image: url(${alishan});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgb(0, 0, 0); 
    opacity: 0.5;
    pointer-events: none;
  }
`;
const LeftWrapper = styled.div`
  position: relative; 
`;
const Right = styled.div``;
const RightWrapper = styled.div``;

const ContentWrapper = styled.div``;



export default function EntertainmentList() {
    const [isTransitioning, setIsTransitioning] = useState(false);

    const currentDateTime = formatDateTime(new Date());
    const entertainmentTypes = [
        {
            title: "Movies",
            icon: RiMovie2Line,
            image: Movie
        },
        {
            title: "Music",
            icon: RiMusic2Line,
            image: Music
        },
        {
            title: "Games",
            icon: RiGamepadLine,
            image: Game
        }
    ];


    useEffect(() => {
        const handleTransition = () => {
            setIsTransitioning(true);
        };
    
        document.addEventListener('startTransition', handleTransition);
    
        const exploreButton = document.querySelector('a[href="/entertainmentoptions"]');
        if (exploreButton) {
            exploreButton.addEventListener('click', (e) => {
                e.preventDefault();
                setIsTransitioning(true);
                setTimeout(() => {
                    window.location.href = '/entertainmentoptions';
                }, 500);
            });
        }
    
        return () => {
            document.removeEventListener('startTransition', handleTransition);
            const exploreButton = document.querySelector('a[href="/entertainmentoptions"]');
            if (exploreButton) {
                exploreButton.removeEventListener('click', () => {});
            }
        };
    }, []);
    
    return(
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full h-full"
        >
            <Container className="flex w-full h-full">
                <motion.div
                    initial={{ width: "40%" }}
                    animate={{ width: isTransitioning ? "30%" : "40%" }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                    <Left className="w-full h-full flex flex-col p-[48px]">
                        <LeftWrapper className="flex justify-between items-end mb-10">
                            <img src={Cathaylogo} alt="Cathaylogo" className="w-[198px] h-[28px] mb-2"/>
                            <motion.div 
                                initial={{ opacity: 1 }}
                                animate={{ opacity: isTransitioning ? 0 : 1 }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                                className="flex items-end font-thin text-white text-[20px]"
                            >
                                CX777
                            </motion.div>
                        </LeftWrapper>
                        <LeftWrapper className="flex flex-col justify-start h-full">
                            <motion.div
                                initial={{ opacity: 1 }}
                                animate={{ opacity: isTransitioning ? 0 : 1 }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                            >
                                <ContentWrapper className="font-semibold text-white text-[64px]">
                                    25A
                                </ContentWrapper>
                                <ContentWrapper className="font-medium text-white text-[20px] mt-[-10px]">
                                    Hong Kong to Taipei
                                </ContentWrapper>
                            </motion.div>
                        </LeftWrapper>
                        <LeftWrapper className="flex w-full h-10">
                            <LanguageToggle onClick={() => console.log("hello")}/>
                        </LeftWrapper>
                    </Left>
                </motion.div>
                <motion.div
                    initial={{ width: "60%", opacity: 1 }}
                    animate={{ 
                        width: isTransitioning ? "70%" : "60%",
                        opacity: isTransitioning ? 0 : 1 
                    }}
                    transition={{ 
                        duration: 0.5, 
                        ease: "easeInOut",
                        opacity: { duration: 0.3 } // Faster opacity transition
                    }}
                    className="h-full"
                >
                    <Right className="w-full h-full flex flex-col py-[48px]">
                        <RightWrapper className="flex px-[48px] justify-end mt-2 font-semibold text-[20px]">
                            {currentDateTime}
                        </RightWrapper>
                        <RightWrapper className="h-full flex flex-col justify-center px-[48px]">
                            <ContentWrapper className="font-semibold text-[36px]">
                                What to Enjoy Today?
                            </ContentWrapper>
                            <ContentWrapper className="font text-gray mb-10">
                                Feels good to move | Move beyond
                            </ContentWrapper>
                            <ContentWrapper className="flex gap-2">
                                <Buttonfull url="/entertainmentoptions" text="Explore More"/>
                                <ButtonSecond url="/" text="Personalize"/>
                            </ContentWrapper>
                        </RightWrapper>
                        <RightWrapper className="flex justify-center w-full">
                            <Splide
                                options={{
                                    type: 'slide',
                                    perPage: 1.5,
                                    gap: '1rem',
                                    drag: true,
                                    arrows: false,
                                    pagination: false,
                                    padding: { left: '1rem', right: '4rem' },
                                    focus: 'center',
                                    trimSpace: true,
                                    start: 0,
                                    snap: true,
                                    speed: 400,
                                    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
                                    dragMinThreshold: 5,
                                    flickPower: 100,
                                    flickMaxPages: 1,
                                    wheelMinThreshold: 2,
                                    bound: true,
                                    cloneStatus: false,
                                    fixedWidth: '300px',
                                    height: '375px', // Added height with extra padding for shadow
                                    breakpoints: {
                                        1024: {
                                            perPage: 1.3,
                                            gap: '0.75rem',
                                            padding: { left: '0.75rem', right: '3rem' }
                                        },
                                        768: {
                                            perPage: 1.2,
                                            gap: '0.5rem',
                                            padding: { left: '0.5rem', right: '2rem' }
                                        }
                                    }
                                }}
                                className="w-full"
                            >
                                {entertainmentTypes.map((entertainment, index) => (
                                    <SplideSlide key={index} className="flex justify-center items-center py-[25px]">
                                        <Entertainmentcard 
                                            title={entertainment.title}
                                            icon={entertainment.icon}
                                            image={entertainment.image}
                                            href={"/entertainmentoptions"}
                                        />
                                    </SplideSlide>
                                ))}
                            </Splide>
                        </RightWrapper>
                    </Right>
                </motion.div>
            </Container>
        </motion.div>
    );
}