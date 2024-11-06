import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { GenerateQRCode } from "../scripts/adhoc";
import homekong from "../resources/homekong.jpg";
import Cathaylogo from "../resources/Cathaylogo.png";
import { formatDateTime } from "../scripts/adhoc";
import { Buttonfull } from "../components/Button.js";

const Container = styled.div`
  background-image: url(${homekong});
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
    background-color: rgb(0, 150, 160); 
    opacity: 0.14;
    pointer-events: none;
  }
`;

const Wrapper = styled.div`
  position: relative; 
`;
const ContentWrapper = styled.div``;


export default function Homepage() {
    const [isExiting, setIsExiting] = useState(false);
    const currentDateTime = formatDateTime(new Date());

    useEffect(() => {
        let intervalId;

        const checkRecommendation = async () => {
            try {
                const response = await fetch(`http://a0eb4493f3aeb48dc99786a3b979009f-1295882383.ap-southeast-1.elb.amazonaws.com/ife/recommendation/LAX25A`);
                // const response = await fetch(`http://localhost:3000/ife/recommendation/LAX25A`);

                if (response.status === 200) {
                    const data = await response.json();
                    localStorage.setItem('recommendation', JSON.stringify(data));
                    setIsExiting(true);
                    setTimeout(() => {
                        window.location.href = '/entertainmentoptions';
                    }, 500);
                    clearTimeout(intervalId);
                } else {
                    intervalId = setTimeout(checkRecommendation, 4000);
                }
            } catch (error) {
                console.error("Error checking recommendation:", error);
                intervalId = setTimeout(checkRecommendation, 4000);
            }
        };

        checkRecommendation();

        return () => {
            if (intervalId) {
                clearTimeout(intervalId);
            }
        };
    }, []);

    useEffect(() => {
        const startButton = document.querySelector('a[href="/entertainment"]');
        if (startButton) {
            startButton.addEventListener('click', (e) => {
                e.preventDefault();
                setIsExiting(true);
                setTimeout(() => {
                    window.location.href = '/entertainment';
                }, 500);
            });
        }
    }, []);



    return(
        <motion.div 
            className="w-full h-full"
            animate={{ opacity: isExiting ? 0.3 : 1 }}
            transition={{ duration: 0.3 }}
        >
            <Container className="flex flex-col w-full h-full p-[48px]">
                <Wrapper className="justify-between flex">
                    <ContentWrapper className="p-1">
                        <img src={Cathaylogo} alt="Cathaylogo" className="w-[198px] h-[28px]"/>
                    </ContentWrapper>
                    <ContentWrapper className="flex items-end font-semibold text-white text-[20px]">
                        {currentDateTime}
                    </ContentWrapper>            
                </Wrapper>
                <Wrapper className="flex flex-col justify-center items-center h-full">
                    <ContentWrapper className="font-semibold text-white text-[36px] my-3">
                        Welcome on board!
                    </ContentWrapper>
                    <ContentWrapper className="my-7">
                        <div className="bg-black/30 p-6 rounded-lg inline-block">
                            {GenerateQRCode('LAX25A')}
                        </div>
                    </ContentWrapper>
                    <ContentWrapper className="my-3">
                        <Buttonfull url="/entertainment" text="Let's Start!"/>
                    </ContentWrapper>
                </Wrapper>
                <Wrapper className="flex flex-col justify-start">
                    <ContentWrapper className="font-semibold text-white text-[64px]">
                        25A
                    </ContentWrapper>
                    <ContentWrapper className="font-medium text-white text-[20px] mt-[-10px]">
                        Hong Kong to Taipei
                    </ContentWrapper>
                </Wrapper>
            </Container>
        </motion.div>
    )
}