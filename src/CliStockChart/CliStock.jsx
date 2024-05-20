import React, { useEffect, useState } from 'react'
import Loading from './Loading';
import { Line } from 'react-chartjs-2'
import { Tag, Box, Button, VStack, HStack, Heading, Text, Link, Input, InputGroup, InputLeftElement } from "@chakra-ui/react"
import axios from 'axios';
import { BsSearch } from 'react-icons/bs'
import { Chart } from 'chart.js/auto';
 
import symbols from './Symbol.json'; // Importing symbols JSON file
 
function Stock() {
  const [companies, setCompanies] = useState([
    {
      name: 'RELIANCE',
      symbol: 'RELIANCE.BSE'
    },
    {
      name: 'WIPRO',
      symbol: 'WIPRO.BSE'
    },
    {
      name: 'INFOSYS',
      symbol: 'INFY.BSE'
    },
    {
      name: 'HDFC BANK',
      symbol: 'HDFCBANK.BSE'
    },
    {
      name: 'TCS',
      symbol: 'TCS.BSE'
    },
    {
      name: 'TATA MOTORS',
      symbol: 'TATAMOTORS.BSE'
    },
    {
      name: 'TATA POWER',
      symbol: 'TATAPOWER.BSE'
    },
    {
      name: 'TECH MAHINDRA',
      symbol: 'TECHM.BSE'
    }
  ]);
 
  const [company, setCompany] = useState({
    name: 'RELIANCE',
    symbol: 'RELIANCE.BSE',
    latestPrice: 0
  });
  const [graphColor, setGraphColor] = useState('#81c995');
  const [list, setlist] = useState([]);
  const [suggestionList, setSuggestionList] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [isInputFocused, setInputFocus] = useState(false);
 
  const fetch = async (symbol, days) => {
    setLoading(true)
    const options = {
      method: 'GET',
      url: 'https://alpha-vantage.p.rapidapi.com/query',
      params: {
        function: 'TIME_SERIES_DAILY_ADJUSTED',
        symbol: `${symbol}`,
        outputsize: 'compact',
        datatype: 'json'
      },
      headers: {
        'X-RapidAPI-Key': '11bb523631msh1a9fe002c29a832p1e05bdjsnd4bfb9b1cfad',
        'X-RapidAPI-Host': 'alpha-vantage.p.rapidapi.com'
      }
    };
    try {
      axios.request(options)
        .then(({ data }) => {
          let l = Array(days), j = days - 1;
          for (let i in data["Time Series (Daily)"]) {
            l[j--] = [data["Time Series (Daily)"][i]["4. close"], i]
            if (j < 0)
              break;
          }
          setCompany((prev) => (
            {
              ...prev,
              latestPrice: l[days - 1][0]
            }
          ));
          setlist(l);
          if (l[0][0] < l[days - 1][0])
            setGraphColor('#81c995')
          else
            setGraphColor('#f93625')
          setLoading(false)
        })
    } catch (error) {
      console.error(error);
    }
  }
 
  useEffect(() => {
    fetch('RELIANCE.BSE', 60) // Fetching data for 3 months (60 days)
  }, [])
 
  let prices = {
    labels: list.map(x => {
      const parts = x[1].split('-');
      return `${parts[2]}-${parts[1]}-${parts[0]}`
    }),
    datasets: [{
      label: 'stock price',
      data: list.map(x => x[0]),
      borderColor: graphColor,
      backgroundColor: graphColor,
    }],
  }
 
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false
  }
 
  async function fetchSuggestions() {
    // Filter the symbols based on the query
    const filteredSymbols = symbols.filter(symbol =>
      symbol.toLowerCase().includes(query.toLowerCase())
    );
 
    setSuggestionList(filteredSymbols);
  }
 
  async function handleChange(event) {
    const searchKeyword = event.target.value;
    setQuery(searchKeyword);
    if (searchKeyword === '') {
      setSuggestionList([])
      return
    }
  }
 
  function handleSearch(name, symbol) {
    setQuery('')
    setCompany({
      name,
      symbol,
      latestPrice: 0
    })
    fetch(symbol, 60) // Fetching data for 3 months (60 days)
  }
 
  function handleBlur() {
    setTimeout(() => {
      setInputFocus(false)
    }, 1000);
  }
 
  useEffect(() => {
    if (query === '') {
      setSuggestionList([])
      return;
    }
    let timeOutId = setTimeout(() => {
      fetchSuggestions()
    }, 300);
    return () => {
      clearTimeout(timeOutId)
    }
  }, [query])
 
  return (
    <VStack pt='3' fontFamily={'Roboto Slab'} alignItems='center' borderRadius='0.7rem' >
   
      <HStack width='100%' justifyContent='space-between'>
  <Heading textAlign='left' >Market Updates</Heading>
  <Box display="flex" alignItems="center">
    <Box flexGrow="1" pos='relative'>
      <InputGroup>
        <InputLeftElement m='0'>
          <BsSearch />
        </InputLeftElement>
        <Input placeholder='Search any stock' textAlign='center' bgColor='whiteAlpha.300'
          fontWeight='semibold'
          isInvalid
          errorBorderColor='teal'
          onChange={(e) => handleChange(e)}
          value={query}
          minW={['40vw', '20vw']}
          onFocus={() => setInputFocus(true)}
          onBlur={handleBlur}
          color='black !important'
        />
      </InputGroup>
      <Box pos='absolute'
        top={'100%'}
        width='100%'
        bgColor='#c7c3c0'
        color='black'
        zIndex='10'
      >
        {isInputFocused && suggestionList.length > 0 &&
          suggestionList.map((symbol, index) =>
            <HStack fontWeight='bold'
              onClick={() => handleSearch(symbol, symbol)} // Use the symbol itself as the name
              _hover={
                { backgroundColor: '#fcf3ec' }
              }
              key={index}
            >
              <Box
                textAlign='left' m='1'
                fontFamily={"'Roboto', sans-serif;"}
                borderBottom='1px'
                borderColor='gray.500'
              >{symbol}</Box>
            </HStack>
          )
        }
      </Box>
    </Box>
  </Box>
</HStack>
 
      {/* Period & chart */}
      <Box display='flex' flexDir={['column', 'row']} maxW={['95vw', '80vw']} >
        <Box >
          <Box w={['90vw', '40vw']}  >
            <VStack  align={'start'}>
              <Text  color={'black'} ml={['1', '8']} fontSize={['1xl', '2xl', '3xl'] } fontFamily={"sans-serif;"} fontWeight={"semibold"}>{company.name} - {'\u20B9'}{company.latestPrice}</Text>
              <HStack >
                <Box>
                  <Link mr='2' fontSize={['sm', 'md', 'lg']} onClick={() => fetch(company.symbol, 7)}>
                    <Tag size={['sm', 'md', 'lg']} fontWeight='bold' variant='solid' colorScheme='twitter'>
                      1 week
                    </Tag>
                  </Link>
                </Box>
                <Box>
                  <Link mr='2' fontSize={['sm', 'md', 'lg']} onClick={() => fetch(company.symbol, 30)}>
                    <Tag size={['sm', 'md', 'lg']} fontWeight='bold' variant='solid' colorScheme='twitter'>
                      1 month
                    </Tag>
                  </Link>
                </Box>
                <Box>
                  <Link mr='2' fontSize={['sm', 'md', 'lg']} onClick={() => fetch(company.symbol, 60)}>
                    <Tag size={['sm', 'md', 'lg']} fontWeight='bold' variant='solid' colorScheme='twitter'>
                      3 month
                    </Tag>
                  </Link>
                </Box>
              </HStack>
            </VStack>
          </Box>
          <Box display='flex' flexDir={['column', 'row']} justifyContent={'space-between'}>
            <Box>
              <Box className='chart'
                w={{ base: "80vw", lg: "60vw" }}
                h='50vh'
              >
                {loading ? <Loading /> : <Line data={prices} options={chartOptions} />}
              </Box>
            </Box>
          </Box>
        </Box>
        {/* Companies list */}
        <Box p='5' display='flex' flexDirection={'column'} justifyContent='flex-start' alignItems='center' color={'black'}>
          <Text fontSize={['1xl', '2xl']} mb="3" fontFamily={"sans-serif;"} fontWeight={"semibold"}>Other Companies</Text>
          {companies.map((companyEle, i) => (
            <Button color={'black'} key={i} onClick={() => handleSearch(companyEle.name, companyEle.symbol)} size='lg' mb='1' alignSelf="flex-start" maxW={['40vw', '10vw']} width={['80vw', '30vw']}>
              {companyEle.name}
            </Button>
          ))}
        </Box>
      </Box>
    </VStack>
  );
}
 
export default Stock;