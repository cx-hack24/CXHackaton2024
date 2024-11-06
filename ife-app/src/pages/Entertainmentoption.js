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

const defaultImages = [9, 10, 12, 13];


export default function Entertainmentoption() {

    const [isLoading, setIsLoading] = useState(true);
    const [displayImages, setDisplayImages] = useState([]);


    useEffect(() => {
        setIsLoading(false);
        
        try {
            const rawData = localStorage.getItem('recommendation');
            if (rawData) {
                const parsedData = JSON.parse(rawData);
                if (parsedData?.recommendations?.length > 0) {
                    // Use recommendations if they exist
                    const recommendations = parsedData.recommendations.slice(0, 4);
                    setDisplayImages(recommendations.map(item => ({
                        imageNumber: parseInt(item.itemId) - 101,
                        itemId: item.itemId
                    })));
                } else {
                    // Use default images
                    setDisplayImages(defaultImages.map(num => ({
                        imageNumber: num,
                        itemId: num + 101
                    })));
                }
            } else {
                // Use default images if no recommendations
                setDisplayImages(defaultImages.map(num => ({
                    imageNumber: num,
                    itemId: num + 101
                })));
            }
        } catch (error) {
            // Use default images in case of any error
            setDisplayImages(defaultImages.map(num => ({
                imageNumber: num,
                itemId: num + 101
            })));
        }
    }, []);

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
                                    {displayImages.map((item, index) => {
                                        try {
                                            const imagePath = require(`../movie_posters/image_${item.imageNumber}.jpg`);
                                            return (
                                                <div 
                                                    key={index} 
                                                    style={{ 
                                                        backgroundImage: `url(${imagePath})`,
                                                        backgroundSize: 'cover',
                                                    }}
                                                    className="rounded-xl h-[290px] w-full"
                                                />
                                            );
                                        } catch (error) {
                                            console.error(`Failed to load image ${item.imageNumber}:`, error);
                                            return (
                                                <div 
                                                    key={index} 
                                                    className="rounded-xl h-[290px] w-full bg-gray-200 flex items-center justify-center"
                                                >
                                                    Image not available
                                                </div>
                                            );
                                        }
                                    })}
                                </div>
                            </RightWrapper>
                        </ContentWrapper>
                    </ContentWrapper>
                </Right>
            </motion.div>
        </Container>
    );
}