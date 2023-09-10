import { Box, Button, Container, FormControl, Heading, Input, InputGroup, InputLeftAddon, Stack, StackDivider, Text, Textarea, keyframes } from '@chakra-ui/react'
import React, { useState } from 'react'
import Papa from 'papaparse'
import { Card, CardHeader, CardBody } from '@chakra-ui/react'
import { motion } from 'framer-motion'


const MailForm = () => {

    const [from_name, setFromName] = useState();
    const [subject, setSubject] = useState();
    const [message, setMessage] = useState();
    const [validMail, setValidMail] = useState([]);
    const [inValidMail, setInValidMail] = useState([]);
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const validResult = [];
    const inValidResult = [];
    const noOfValidEmails = validMail.length
    const noOfInValidEmails = inValidMail.length

    const handleSubmit = (e) => {
        e.preventDefault()
        window.sendEmail(from_name, validMail, subject, message, noOfValidEmails);
        console.log(validMail);
    }

    const handleFileSubmit = (e) => {
        const file = e.target.files[0]
        Papa.parse(file, {
            header: true,
            complete: async (results) => {
                results.data.map((el) => {
                    const valid = re.test(el.EmailAddress);
                    if (valid) {
                        validResult.push(el.EmailAddress)
                    } else {
                        inValidResult.push(el.EmailAddress)
                    }
                })
                setValidMail(validResult)
                setInValidMail(inValidResult)
            }
        })
    }

    const animationKeysMailForm = keyframes`
    0% {transform : translateY(-1000px)}
    100% {transform : translateY(0px)}`;

    const animationKeysValidMails = keyframes`
    0% {transform : translateX(-500px)}
    100% {transform : translateX(0px)}`;

    const animationKeysInValidMails = keyframes`
    0% {transform : translateX(-1000px)}
    100% {transform : translateX(0px)}`;

    const animationKeysInfo = keyframes`
    0% {transform : translateX(-700px)}
    100% {transform : translateX(0px)}`;

    const mailFormAnimation = `${animationKeysMailForm} 2s ease`;
    const validMailAnimation = `${animationKeysValidMails} 1s ease`;
    const inValidMailAnimation = `${animationKeysInValidMails} 1s ease`;
    const infoAnimation = `${animationKeysInfo} 2s ease`;

    return (
        <div className='mainContainer'>
            {validMail.length > 0 &&
                <Card className='card' ml='4rem' overflow='scroll' h='30rem' textAlign='center'w='17rem'
                    as={motion.div}
                    animation={validMailAnimation}
                >
                    <CardHeader>
                        <Heading fontSize='md' fontWeight='medium'>{`Valid Email Addresses - ${noOfValidEmails}`}</Heading>
                    </CardHeader>
                    <CardBody mt='-1rem'>
                        <Stack divider={<StackDivider />} spacing='4'>
                            <Box>
                                {validMail.map((el, i) => {
                                    return <Text pt='2' fontSize='sm' key={i}>{el}</Text>
                                })}
                            </Box>
                        </Stack>
                    </CardBody>
                </Card>
            }
            {inValidMail.length > 0 &&
                <Card className='card' ml='4rem' overflow='scroll' h='30rem' textAlign='center' w='17rem'
                    as={motion.div}
                    animation={inValidMailAnimation}
                >
                    <CardHeader>
                        <Heading fontSize='md' fontWeight='medium'>{`Invalid Email Addresses - ${noOfInValidEmails}`}</Heading>
                    </CardHeader>
                    <CardBody mt='-1rem'>
                        <Stack divider={<StackDivider />} spacing='4'>
                            <Box>
                                {inValidMail.map((el, i) => {
                                    return <Text pt='2' fontSize='sm' key={i}>{el}</Text>
                                })}
                            </Box>
                        </Stack>
                    </CardBody>
                </Card>}

            {validMail.length === 0 && inValidMail.length === 0 && 
                <Container width='32rem' className='infoContainer' w='75%'
                    as={motion.div}
                    animation={infoAnimation}
                >
                    <Heading mb='2rem' fontSize='2rem' fontWeight='medium'>Bulk Mail Sender...</Heading>
                    <Text>Bulk Mail Sender is the simplest and most modern solution to deliver email to multiple recipients. Enjoy the experience of sending mail by just one click.</Text>
                </Container>
            }
            <Container className='mailFormCard' p='2rem' borderRadius='6px' width='75%' mt='2rem' 
                as={motion.div}
                animation={mailFormAnimation}
            >
                <Heading textAlign='center' fontWeight='medium' >Mass Mail Dispatcher</Heading>
                <form onSubmit={handleSubmit}>
                    <FormControl >
                        <Input required placeholder='From Address(Email Id)' onChange={(e) => setFromName(e.target.value)} border='1px' borderColor='gray.400' mt='2rem' w='100%' fontSize='.8rem' />
                        <Input required type='file' accept='.csv' onChange={handleFileSubmit} border='1px' borderColor='gray.400' className='csv' mt='2rem' fontSize='.8rem' />
                        <Text color='red.400' fontSize='.8rem'>(only csv files)</Text>
                        <Input required placeholder='Subject' onChange={(e) => setSubject(e.target.value)} mt='2rem' border='1px' borderColor='gray.400' fontSize='.8rem' />
                        <Textarea required placeholder='Your Meassage...' onChange={(e) => setMessage(e.target.value)} mt='2rem' border='1px' borderColor='gray.400' fontSize='.8rem' />
                        <Text mt='1rem' color='red.400' fontSize='.9rem'>**Make sure email ids in the csv file should be under the column EmailAddress</Text>
                        <Button mt='1rem' type="submit">Submit</Button>
                    </FormControl>
                </form>
            </Container>
        </div>
    )
}

export default MailForm
