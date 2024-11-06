import React, {useState, useEffect} from "react";
import styled from "styled-components";
import { motion } from "framer-motion";


import { FiSearch } from "react-icons/fi";
import { Buttonfull, ButtonSecond } from "../components/Button.js";
import Sidebar from "../components/Sidebar.js";

const Container = styled.div``;
const Right = styled.div``;
const RightWrapper = styled.div``;
const ContentWrapper = styled.div``;
const SearchBar = styled.div``;

export default function Entertainmentoption() {

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(false); // Trigger fade-in animations on component mount
    }, []);

    const itemId = JSON.parse(localStorage.getItem('recommendation')).recommendations.slice(0, 4);

    return(
        <Container className="flex w-full h-full">
            <Sidebar fadeIn={!isLoading}/>
            <motion.div 
                className="w-full h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
            >
                <Right className="w-full h-full flex flex-col p-[48px]">
                    <RightWrapper className="flex justify-end relative">
                        <SearchBar className="flex items-center gap-3 bg-lightgray rounded-xl p-2">
                            <FiSearch className="text-gray"/>
                            <input type="text" placeholder="Search" className="bg-transparent border-none focus:outline-none"/>
                        </SearchBar>
                    </RightWrapper>

                    <ContentWrapper className="flex font-semibold text-[25px] mt-8 gap-7">
                        <RightWrapper className="flex flex-col">
                            <div className=" mb-4 font-semibold">Featured</div>
                            <div className="bg-[url('./movie_posters/image_83.jpg')] bg-cover rounded-2xl relative h-[600px] w-[350px] flex items-end p-8">
                                <Buttonfull text="Watch Now" onClick={() => console.log("Watch Now clicked")} />
                            </div>
                        </RightWrapper>
                        <ContentWrapper className="w-full flex flex-col">
                            <RightWrapper className="flex justify-between mb-4">
                                <div className=" mb-1 font-semibold text-[25px]">Just for you</div>
                                <ButtonSecond text="Explore More"/>
                            </RightWrapper>

                            <RightWrapper>
                                <div className="grid grid-cols-2 gap-4">
                                    {itemId.map((item, index) => (
                                        console.log(parseInt(item.itemId)),
                                        <div 
                                            key={index} 
                                            className={`bg-[url('./movie_posters/image_${parseInt(item.itemId) - parseInt(101)}.jpg')] bg-cover rounded-xl h-[290px] w-full`}
                                        />
                                    ))}
                                </div>
                            </RightWrapper>
                        </ContentWrapper>
                    </ContentWrapper>
                </Right>
            </motion.div>
        </Container>
    );
}