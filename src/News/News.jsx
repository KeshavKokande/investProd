import React, { useState, useEffect } from 'react';
import { Box, Grid, GridItem, Heading } from '@chakra-ui/react';
import styles from './News.module.css';
import axios from 'axios';

import BreakingNews from './BreakingNews';

function News() {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
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
        <Box className={styles.containerNews}>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <Box bgColor='var(--color-bg-box-light)' padding={30} borderRadius={8} shadow='1px 1px 2px #ccc'>
                    <Heading textAlign='left' marginBottom={30}>Top News</Heading>
                    <Grid
                        className={styles.boxGrid}
                        templateRows='repeat(2, 1fr)'
                        templateColumns='repeat(2, 1fr)'
                        h='700px'
                        w='550px'
                        gap='10px'
                    >
                        {news.slice(0, 3).map((newsItem, index) => (
                            <GridItem className='styles.gridTopNews' key={index} borderRadius={8} colSpan={index === 0 ? 2 : 1} bg={newsItem.multimedia === null ? 'rgba(0, 0, 0, 0.15)' : `url(${newsItem.multimedia[0].url})`} bgRepeat="no-repeat" bgSize='cover' bgPosition='center' display='flex' alignItems='end' textAlign='left'>
                                <a href={newsItem.url} target="_blank" rel="noopener noreferrer" style={{ width: '100%' }}>
                                    <Box borderRadius='0 0 8px 8px' backgroundColor='rgba(0, 0, 0, 0.70)' p='20px'>
                                        <Heading className={styles.heading_news}as='h3' color='#fff'>{newsItem.title}</Heading>
                                    </Box>
                                </a>
                            </GridItem>
                        ))}
                    </Grid>
                </Box>
            )}
            <BreakingNews h='700px' w='700px' />
        </Box>
    );
}

export default News;
