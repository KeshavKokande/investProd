import React, { useState, useEffect } from 'react';
import { Box, Grid, GridItem, Heading } from '@chakra-ui/react'
import styles from './News.module.css'

import SkewLoader from "react-spinners/SkewLoader"
import axios from 'axios';
function BreakingNews({ w, h }) {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get('https://api.nytimes.com/svc/topstories/v2/business.json?api-key=JdjDRJVla0Pkg1dPJTqO6nf43oIBNf6W');
                if (response.status === 200 && response.data.results) {
                    console.count('fetching news..');
                    const articles = response.data.results.filter(news => news.item_type === 'Article');
                    setNews(articles);
                }
            } catch (error) {
                console.error('Error fetching news:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    return (
        <>
            {
                !news.length > 0
                    ? <SkewLoader
                        color="#3F51B5"
                        cssOverride={{ margin: 'auto' }}
                        loading
                        size={30}
                        speedMultiplier={1}
                    />
                    : <Box className='box' w={w ? w : 'fit-content'}>
                        <br />
                        <Heading >Breaking News</Heading>
                        <br />
                        <br />
                    
                        <Box className={styles.containerLatestNews}>
                            <Grid
                                className={styles.boxGrid}
                                templateRows='repeat(6, 1fr)'
                                templateColumns='repeat(1, 1fr)'
                                h={h ? h : 'fit-content'}
                                gap='10px'
                            >
                                {
                                    news.slice(0, 15).map((news, index) => {
                                        return (
                                            <GridItem key={index} colSpan={1} bg={news.multimedia === null ? 'rgba(0, 0, 0, 0.15)!important' : `url(${news.multimedia[0].url})`} bgRepeat="no-repeat" bgSize='cover' bgPosition='center' borderRadius={8}>
                                                <a href={news.url} target="_blank" rel="noopener noreferrer" style={{ width: '100%' }}>
                                                    <Box h='150px' backgroundColor='rgba(0, 0, 0, 0.7)!important' display='flex' alignItems='center' textAlign='left' p='20px' borderRadius={8} >
                                                        <Heading className={styles.heading_news} as='h3' color='#fff' >{news.title}</Heading>
                                                    </Box>
                                                </a>
                                            </GridItem>
                                        )
                                    })
                                }
                            </Grid>
                        </Box>
                    </Box>
            }
        </>
    )
}

export default BreakingNews