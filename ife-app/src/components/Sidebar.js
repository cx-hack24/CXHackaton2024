import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import alishan from "../resources/alishan.jpg";
import Cathaylogo from "../resources/Cathaylogo.png";
import { RiMovie2Line, RiMusic2Line, RiGamepadLine } from "react-icons/ri";
import { LanguageToggle } from "../components/Button.js";

const Container = styled.div`
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

const Wrapper = styled.div`
  position: relative;
`;

const Method = styled.div`
  margin: 8px 0;
`;

const Label = styled.label``;

const Radiobutton = styled.input``;

export default function Sidebar({fadeIn}) {
    const [selectedOption, setSelectedOption] = useState(() => {
        const savedCategory = localStorage.getItem('selectedCategory');

        switch(savedCategory) {
            case 'movies':
                return 'movie';
            case 'music':
                return 'music';
            case 'games':
                return 'game';
            default:
                return 'movie';
        }
    });

    const handleChange = (e) => {
        setSelectedOption(e.target.value);
    };

    return (
        <Container className="w-[30%] h-full flex flex-col p-[48px]">
            <Wrapper className="justify-between flex">
                <img src={Cathaylogo} alt="Cathaylogo" className="w-[198px] h-[28px] brightness-200"/>
            </Wrapper>
            
            <motion.div 
                className="flex flex-col h-full mt-[48px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: fadeIn ? 1 : 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >                
                <Wrapper className="flex flex-col h-full mt-[24px]">
                    <Method className="rounded-lg">
                        <Radiobutton 
                            type="radio"
                            id="movie"
                            name="entertainment"
                            value="movie"
                            className="hidden peer"
                            checked={selectedOption === 'movie'}
                            onChange={handleChange}
                        />
                        <Label 
                            htmlFor="movie" 
                            className="inline-flex items-center p-3 w-full text-white rounded-lg cursor-pointer peer-checked:bg-white/30 hover:bg-white/20"
                        >
                            <div className="flex items-center">
                                <RiMovie2Line className="w-6 h-6 mr-3"/>
                                <div className="font-medium">Movie</div>
                            </div>
                        </Label>
                    </Method>

                    <Method className="rounded-lg">
                        <Radiobutton 
                            type="radio"
                            id="music"
                            name="entertainment"
                            value="music"
                            className="hidden peer"
                            checked={selectedOption === 'music'}
                            onChange={handleChange}
                        />
                        <Label 
                            htmlFor="music" 
                            className="inline-flex items-center p-3 w-full text-white rounded-lg cursor-pointer peer-checked:bg-white/30 hover:bg-white/20"
                        >
                            <div className="flex items-center">
                                <RiMusic2Line className="w-6 h-6 mr-3"/>
                                <div className="font-medium">Music</div>
                            </div>
                        </Label>
                    </Method>

                    <Method className="rounded-lg">
                        <Radiobutton 
                            type="radio"
                            id="game"
                            name="entertainment"
                            value="game"
                            className="hidden peer"
                            checked={selectedOption === 'game'}
                            onChange={handleChange}
                        />
                        <Label 
                            htmlFor="game" 
                            className="inline-flex items-center p-3 w-full text-white rounded-lg cursor-pointer peer-checked:bg-white/30 hover:bg-white/20"
                        >
                            <div className="flex items-center">
                                <RiGamepadLine className="w-6 h-6 mr-3"/>
                                <div className="font-medium">Game</div>
                            </div>
                        </Label>
                    </Method>
                </Wrapper>
            </motion.div>
            
            <Wrapper className="flex w-full h-10">
                <LanguageToggle onClick={() => console.log("hello")}/>
            </Wrapper>
        </Container>
    );
}